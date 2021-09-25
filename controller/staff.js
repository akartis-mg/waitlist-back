const Company = require('../models/Company');
const Branch = require('../models/Branch');
const Staff = require('../models/Staff');
const sendEmail = require('../utils/sendEmail');

exports.createStaff = async (req, res, next) => {

    const bid = [req.body.bid];
    const staff = new Staff(req.body.manager);

    try {
        const savedstaff = await staff.save();

        bid.map(async (bid) => {

            const branch = await Branch.findOne({ _id: bid })
            branch.staffs.push(savedstaff);
            await branch.save();

        });


        // Create a link to reset the password and a message to send to the client by email
        const welcomeUrl = `${process.env.SERVER_URL}/login-business`;
        const message = `
            <h1>You have requested a creation account</h1>
            <p>Please go to that link to create your account</p>
            <a href=${welcomeUrl} clicktracking=off>${welcomeUrl}</a>
        `

        // Send email to the client
        try {
            await sendEmail({
                to: savedstaff.email,
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
    } catch (error) {
        next(error);
    }

}


exports.getOneStaff = async (req, res, next) => {

    const sid = req.body.staffId;

    try {
        const staff = await Staff.findOne({ _id: sid });
        res.status(200).json(staff);
    } catch (error) {
        next(error);
    }

}


exports.getStaffManager = async (req, res, next) => {

    const bid = req.params.bid;
  //  const type = req.params.type;

    try {

          
            const resultstaff = await Staff.find( { type : "Manager"  }  ,  { arrayFilters: [{ 'bid': bid }]    } , (err, res) => {
                // check if res was found
                if (res) {
                    res.status(200).json(res);
                   
                } else {
                    console.log('updated existing locale')
                }
            } )
            
           // const resultstaff = await Staff.findOne({ bid: staff.bid, _ui: sid });
           console.log(resultstaff);
            
       

    } catch (error) {
        next(error);
    }
}


// Update a todo
exports.updateStaff = async (req, res, next) => {
    const sid = req.body.staffId;

    try {
        const staff = await Staff.findOne({ _id: sid });

        if (!staff) {
            return next(new ErrorResponse("Staff cannot be updated", 404));
        }

        staff.name = req.body.name;
        staff.email = req.body.email;
        staff.password = req.body.password;
        staff.type = req.body.type;

        const updateStaff = await staff.save();

        res.status(200).json(updateStaff);

         // Create a link to reset the password and a message to send to the client by email
         const welcomeUrl = `${process.env.SERVER_URL}/login-business`;
         const message = `
             <h1>You have requested a update account</h1>
             <p>Please go to that link to update your account</p>
             <a href=${welcomeUrl} clicktracking=off>${welcomeUrl}</a>
         `
 
         // Send email to the client
         try {
             await sendEmail({
                 to: savedstaff.email,
                 subject: "Account updated",
                 text: message
             });
 
             res.status(200).json({
                 success: true,
                 date: "Email sent"
             })
         } catch (error) {
             return next(new ErrorResponse("Email could not be sent", 500));
         }

    } catch (error) {
        next(error);
    }
}


// Delete a todo
exports.deleteStaff = async (req, res, next) => {
    const sid = req.body.staffId;

    try {
        const staff = await Staff.findOne({ _id: sid });

        if (!staff) {
            return next(new ErrorResponse("Staff cannot be deleted", 404));
        }

        const bid = staff.bid;

        const deletedStaff = await staff.remove();

        bid.map(async (bid) => {

            const branch = await Branch.findOne({ _id: bid });
            for (let x in branch.staffs) {
                if (branch.staffs[x] == sid) {
                    branch.staffs.pull(branch.staffs[x]);
                    await branch.save();
                }
            }

        });



        res.status(202).json(deletedStaff);

    } catch (error) {
        next(error);
    }
}

