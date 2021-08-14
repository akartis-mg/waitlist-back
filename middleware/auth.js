const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const Staff = require('../models/Staff');
const ErrorResponse = require('../utils/errorResponse');

module.exports = async function (req, res, next) {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];

    }

    if (!token) {
        return next(new ErrorResponse("Not authorized to access this route", 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);
        let staff;

        if (!user) {
            staff = await Staff.findById(decoded.id);

            if (staff) {
                req.user = staff;
            }
        } else {
            req.user = user;
        }

        if (!user && !staff) {
            return next(new ErrorResponse("No user found with this ID", 404));
        }

        next();
    } catch (error) {
        return next(new ErrorResponse("Not authorized to access this route", 401));
    }
}

