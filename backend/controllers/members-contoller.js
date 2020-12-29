const mongoose = require('mongoose');
const { v4: uuid } = require('uuid');
const fs = require('fs');

const HttpError = require('../utils/httperror');
const Member = require('../models/member');
const Poweruser = require('../models/poweruser');

exports.getMembers = async (req, res, next) => {
    let companyMembers;
    try {
        companyMembers = await Member.find({}, '-creator');
    } catch (err) {
        return next(
            new HttpError(
                'Connection to the DB server has been timed out, please try again.',
                500
            )
        );
    }

    if (!companyMembers) {
        return next(new HttpError('Failed to find company members', 404));
    }

    res.status(200);
    res.json({
        companyMembers: companyMembers.map((member) =>
            member.toObject({ getters: true })
        ),
    });
};

//TODO: VALIDATION CHECK
exports.postMember = async (req, res, next) => {
    if (!req.isAuth) {
        return next(
            new HttpError(
                'You have to be logged in to perform this action',
                401
            )
        );
    }

    let Keri;
    try {
        //There will only be one user
        Keri = await Poweruser.findOne({});
    } catch (err) {
        return next(
            new HttpError(
                'Connection to the DB server has been timed out, please try again.',
                500
            )
        );
    }

    const { name, position } = req.body;
    const newMember = new Member({
        name,
        image: req.file.path,
        position,
        creator: Keri._id,
    });

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await newMember.save({ session: session });

        Keri.members.push(newMember);

        await Keri.save({ session: session });
        await session.commitTransaction();
    } catch (err) {
        console.log(err);
        return next(
            new HttpError(
                'Failed to add a team member, please try again later.',
                500
            )
        );
    }

    res.status(201).json({ member: newMember.toObject({ getters: true }) });
};

//TODO: DELETE PAINTING - test it out
exports.deleteMember = async (req, res, next) => {
    if (!req.isAuth) {
        return next(
            new HttpError(
                'You have to be logged in to perform this action',
                401
            )
        );
    }

    const memberId = req.params.pid;
    let member;
    try {
        member = await Member.findById(memberId).populate('creator');
    } catch (err) {
        return next(
            new HttpError(
                'Connection to the DB server has been timed out, please try again later'
            ),
            500
        );
    }

    if (!member) {
        return next(
            new HttpError('Could not find the place you wish to delete', 404)
        );
    }

    const imagePath = member.image;

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await member.remove({ session: session });
        member.creator.members.pull(memberId);
        await member.creator.save({ session: session });
        await session.commitTransaction();
    } catch (err) {
        console.log(err);
        return next(
            (new HttpError(
                'Connection to the DB server has been timed out, please try again later'
            ),
            500)
        );
    }

    // Delete the image
    fs.unlink(imagePath, (err) => {
        console.log(err);
    });

    res.status(200).json({ message: 'Member deleted.' });
};
