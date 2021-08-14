const Company = require('../models/Company');
const Branch  = require('../models/Branch');
const Staff =  require('../models/Staff');


exports.createBranch = async (req, res, next) => {
    
    const cid = req.body.cid;
    const branch = new Branch(req.body);

    try {
        const savedbranch = await branch.save();

        const company = await Company.findOne({ _id: cid })
        company.branchs.push(savedbranch);
        await company.save();

        res.status(200).json(savedbranch);
    } catch (error) {
        next(error);
    }

}


exports.getOneBranch = async (req, res, next) => {

    const bid = req.body.branchId ;

    try {
        const branch = await Branch.findOne({ _id : bid })
        res.status(200).json(branch);
    } catch (error) {
        next(error);
    }

}


exports.getBranch = async (req, res, next) => {

    const type = req.body.type ;

    try {

         if( type === "Customer" )
         {
             const branch = await Branch.find({  isActive : true  });
             res.status(200).json(branch);
         }

         else if ( type === "Manager" ){

            const sid = req.body.staffId ;

            

          //  const staff = await Staff.find({ _id : sid });
          //  const cid = req.body.cid ;

           // const branch = await Branch.find({ cid : cid });

            const branch = await Branch.find( { staffs: sid , isActive : true  } );
    
            res.status(200).json(branch);
         }

         else{

            const cid = req.body.cid ;
            const branch = await Branch.find({ cid : cid , isActive : true  });

            res.status(200).json(branch);
           
        }


    } catch (error) {
        next(error);
    }
}


// Update a todo
exports.updateBranch = async (req, res, next) => {
    const bid = req.body.branchId;

    try {
        const branch = await Branch.findOne({ _id: bid });

        if (!branch) {
            return next(new ErrorResponse("Branch cannot be updated", 404));
        }

        branch.name = req.body.name;
        branch.average_duration = req.body.average_duration;
        branch.address = req.body.address;
        branch.info = req.body.info;
        branch.spots = req.body.spots; 

        const updatedBranch = await branch.save();

        res.status(200).json(updatedBranch);

    } catch (error) {
        next(error);
    }
}


// Delete a todo
exports.deleteBranch = async (req, res, next) => {
    const bid = req.body.branchId;

    try {
        const branch = await Branch.findOne({ _id: bid });

        if (!branch) {
            return next(new ErrorResponse("Branch cannot be deleted", 404));
        }

        branch.IsActive = false;
        const deletedBranch = await branch.save();

        // const cid = branch.cid;
        // const deletedBranch = await branch.remove();
        // const company = await Company.findOne({ _id: cid });
        // for (let x in company.branchs) {
        //     if (company.branchs[x] == bid) {
        //         company.branchs.pull(company.branchs[x]);
        //         await company.save();
        //     }
        // }

        res.status(202).json(deletedBranch);

    } catch (error) {
        next(error);
    }
}

