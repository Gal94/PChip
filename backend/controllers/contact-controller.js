const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const { validationResult } = require("express-validator");

const HttpError = require("../utils/httperror");

//TODO: export to a differen util file || REMOVE CONSOLE.LOG
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SENDGRID_API,
    },
  })
);

exports.postContactMe = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError(
      "Failed to send the email. Please make sure all of the fields are filled correctly.",
      422
    );
    return next(error);
  }

  const { messageBody, title, sender } = req.body;

  try {
    await transporter.sendMail({
      to: process.env.BUSINESS_EMAIL,
      from: process.env.SENDGRID_EMAIL,
      subject: title,
      html: `<p>Hello SadAndRadArtisty, </p>
      <p>You have a new mail from: ${sender} </p>
      <hr>
      <p>${messageBody}</hr>`,
    });
  } catch (err) {
    return next(new HttpError("Failed to send email, please try again", 500));
  }
  res.status(200).json({ message: "Email has been sent successfully" });
};
