const Company = require('../models/Company');
const Branch  = require('../models/Branch');
const Staff =  require('../models/Staff');


exports.createStaff = async (req, res, next) => {
    
    const bid = req.body.bid;
    const staff = new Staff(req.body);

    try {
        const savedstaff = await staff.save();

         req.body.bid.map( async (bid) => {

            const branch = await Branch.findOne({ _id: bid })
            branch.staffs.push(savedstaff);
            await branch.save();

     });

        

        res.status(200).json(savedstaff);
    } catch (error) {
        next(error);
    }

}


exports.getOneStaff = async (req, res, next) => {

    const sid = req.body.staffId ;

    try {
        const staff = await Staff.findOne({ _id: sid });
        res.status(200).json(staff);
    } catch (error) {
        next(error);
    }

}


exports.getStaff = async (req, res, next) => {

    const type = req.body.type ;

    try {

        if (type === "Manager" ){
            const sid =  req.body.sid;
            const staff = await Staff.findOne({ _id: sid });
            const resultstaff = await Staff.findOne({ bid : staff.bid , _ui : sid });
            res.status(200).json(resultstaff);
        }

        else {

            const staff = await Staff.find({});
            res.status(200).json(staff);

        }

      

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

        bid.map( async (bid) => {

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

