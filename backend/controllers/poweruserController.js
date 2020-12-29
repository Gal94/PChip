const { validationResult } = require('express-validator');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const jwt = require('jsonwebtoken');

const Poweruser = require('../models/poweruser');
const HttpError = require('../utils/httperror');

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SENDGRID_API,
    },
  })
);

exports.postLogin = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    //Bad input
    const error = new HttpError(
      'Invalid input, please check that your email and password are valid.',
      422
    );
    return next(error);
  }

  const { email, password } = req.body;
  let Keri;
  try {
    Keri = await Poweruser.findOne({ email: email });
  } catch (error) {
    //DB server connection timed out
    return next(
      new HttpError(
        'Connection to the DB server has been timed out, please try again.',
        500
      )
    );
  }
  if (!Keri) {
    //Keri wasnt found - wrong email given
    return next(
      new HttpError(
        'Invalid input, please check that your email and password are valid.',
        404
      )
    );
  }

  let doesMatch;
  try {
    doesMatch = await bcrypt.compare(password, Keri.password);
  } catch (err) {
    return next(new HttpError(err, 500));
  }

  if (!doesMatch) {
    //USER AUTH LOGIC
    return next(new HttpError('Password is incorrect', 401));
  }

  //generate a token to return to the front end
  const token = jwt.sign(
    {
      userId: Keri._id,
      email: Keri.email,
    },
    process.env.PASSWORD_HASH,
    { expiresIn: '1h' }
  );
  res.status(200).json({ token: token, userId: Keri._id.toString() });
};

exports.postReset = async (req, res, next) => {
  crypto.randomBytes(32, async (err, buffer) => {
    if (err) {
      return next(
        new HttpError('Operation failed, please try again later.', 500)
      );
    }
    const token = buffer.toString('hex');
    let Keri;
    try {
      //Find Keri based on her email
      Keri = await Poweruser.findOne({ email: req.body.email });
    } catch (err) {
      return next(new HttpError(err, 500));
    }
    if (!Keri) {
      return next(
        new HttpError('Operation failed, unknown email provided', 404)
      );
    }

    //Token will be valid for 30 minutes
    Keri.resetToken = token;
    Keri.resetTokenExpiration = Date.now() + 1800000;
    await Keri.save();

    //Send email

    try {
      await transporter.sendMail({
        to: req.body.email,
        from: process.env.SENDGRID_EMAIL,
        subject: 'Password Reset',
        html: `
      <p>You requested a password reset</p>
      <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password.</p> 
      `,
      });
    } catch (err) {
      return next(new HttpError(err, 500));
    }
    res.status(200).json({ success: true });
  });
};

//NEED TO TEST - the change password page
exports.getNewPass = async (req, res, next) => {
  const token = req.params.token;
  let Keri;

  try {
    Keri = await Poweruser.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() },
    });
  } catch (err) {
    return next(
      new HttpError(
        'Connection to the DB server has been timed out, please try again.',
        500
      )
    );
  }

  if (!Keri) {
    return next(
      new HttpError(
        'Password token has expired, please try to reset your password again',
        408
      )
    );
  }

  res.status(200).json({ userId: Keri._id.toString(), passToken: token });
};

exports.postNewPass = async (req, res, next) => {
  const { newPass, userId, passToken } = req.body;
  let newKeri;
  let oldKeri;
  try {
    oldKeri = await Poweruser.findOne({
      _id: userId,
      resetToken: passToken,
      resetTokenExpiration: { $gt: Date.now() },
    });
  } catch (err) {
    return next(
      new HttpError(
        'Connection to the DB server has been timed out, please try again.',
        500
      )
    );
  }

  if (!oldKeri) {
    return next(
      new HttpError(
        'Password token has expired, please try to reset your password again',
        408
      )
    );
  }

  newKeri = oldKeri;
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(newPass, 12);
  } catch (err) {
    return next(new HttpError('An error has occured with bcrypt', 500));
  }

  newKeri.password = hashedPassword;
  newKeri.resetToken = undefined;
  newKeri.resetTokenExpiration = undefined;

  try {
    await newKeri.save();
  } catch (err) {
    return next(
      new HttpError(
        'Connection to the DB server has been timed out, please try again.',
        500
      )
    );
  }
  console.log('managed to change password');
  res
    .status(200)
    .json({ success: true, message: 'Password has been changed successfully' });
};

exports.getIsLoggedIn = async (req, res, next) => {
  if (!req.isAuth) {
    return next(new HttpError('Please log in to view this page', 401));
  }
  
  // try to find user by the userId supplied
  let user;
  try {
    user = await Poweruser.findById(req.userId);
  } catch (err) {
    return next(
      new HttpError(
        'Connection to the DB server has been timed out, please try again.',
        500
      )
    );
  }

  if (!user) {
    return next(new HttpError('Could not find a user', 401));
  }

  res.status(200).json({ message: 'User has been verified' });
};
