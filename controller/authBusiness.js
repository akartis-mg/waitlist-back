const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse');
const Staff = require('../models/Staff');
const sendEmail = require('../utils/sendEmail');
const { validationResult } = require('express-validator');

// @route    POST api/auth
// @desc     Register user & get token
// @access   Public
exports.register = async (req, res, next) => {
    const { firstname, lastname, email, phone, password, type, bid } = req.body;

    console.log("FN: ", firstname, " LN: ", lastname, " EMAIL: ", email, " phone: ", phone, " PWD: ", password, " BID: ", bid);

    try {
        const existingUser = await Staff.findOne({ email });

        if (existingUser) {
            return next(new ErrorResponse("User already exists, please login", 404));
        }

        const user = new Staff({
            firstname,
            lastname,
            phone,
            email,
            password,
            type,
            bid
        })

        await user.save();

        // Create a link to reset the password and a message to send to the client by email
        const loginUrl = `${process.env.SERVER_URL}/login-business`;
        const message = `
            <h1>Account successfully created</h1>
            <p>Please go to the following link sign in</p>
            <a href=${loginUrl} clicktracking=off>${loginUrl}</a>
            <p>Email: ${email}</p>
            <p>Password: ${password}</p>
            <p>Feel free to change your password inside your profile</p>
        `

        // Send email to the client
        try {
            await sendEmail({
                to: email,
                subject: "Account created",
                text: message
            });

            res.status(200).json({
                success: true,
                date: "Email sent"
            })
        } catch (error) {
            return next(new ErrorResponse("Email could not be sent", 500));
        }

        res.status(201).json({
            success: true,
        });

    } catch (error) {
        next(error);
    }
}

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
exports.login = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new ErrorResponse(errors.array(), 401));
    }

    const { email, password } = req.body;

    try {
        let user = await Staff.findOne({ email }).select("+password");
        if (!user) {
            return next(new ErrorResponse("Invalid credentials", 401));
        }

        const isMatch = await user.matchPasswords(password);
        if (!isMatch) {
            return next(new ErrorResponse("Invalid credentials", 401));
        }

        const token = user.getSignedToken();
        await user.save();

        // If email and password matches the DB, respond with a token for the user to log in
        res.status(200).json({
            success: true,
            token,
            user
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send(err);
    }
}

// @route    POST api/auth
// @desc     Fortget password & send email with reset password link
// @access   Public
exports.forgotpassword = async (req, res, next) => {
    const { email } = req.body;

    try {
        const user = await Staff.findOne({ email });

        if (!user) {
            return next(new ErrorResponse("Email could not be sent", 404));
        }

        const resetToken = await user.getResetPasswordToken();

        await user.save();

        // Create a link to reset the password and a message to send to the client by email
        const resetUrl = `${process.env.SERVER_URL}/resetpassword/${resetToken}`;
        const message = `
            <h1>You have requested a password reset</h1>
            <p>Please go to that link to reset your password</p>
            <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `

        // Send email to the client
        try {
            await sendEmail({
                to: user.email,
                subject: "Password Reset Request",
                text: message
            });

            res.status(200).json({
                success: true,
                date: "Email sent"
            })
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save();

            return next(new ErrorResponse("Email could not be sent", 500));
        }
    } catch (error) {
        next(error);
    }
}

// @route    POST api/auth
// @desc     Reset password
// @access   Public
exports.resetpassword = async (req, res, next) => {
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.resetToken)
        .digest("hex");

    try {
        const user = await Staff.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        })

        if (!user) {
            return next(new ErrorResponse("Invalid Reset Token", 400));
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(201).json({
            success: true,
            data: "Password Reset Success"
        })

    } catch (error) {
        next(error);
    }
}