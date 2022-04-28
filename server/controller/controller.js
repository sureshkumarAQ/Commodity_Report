var User = require('../model/user.js');
var Report = require('../model/report.js');


exports.generateReport = async(req,res)=>{
     
    //Validate request
    if(!req.body)
    {
        res.status(400).send({message:"Content can not be empty"});
        return;
    }

    try {
        const commodityID = req.body.commodityID;

        const report = await Report.findOne({cmdtyID:commodityID});

        const cmdtyPrice = req.body.price/req.body.convFctr;
        if(!report)
        {
            const pUnit = "KG";
            const newReport = await new Report({
                cmdtyName:req.body.commodityName,
                cmdtyID:req.body.commodityID,
                marketID:req.body.marketID,
                marketName:req.body.marketName,
                price:cmdtyPrice,
                users:req.body.userID,
                priceUnit:pUnit
            });

            await newReport.save(newReport).then(data=>{
                res.status(201).send({"ReportID" : newReport._id})
            })
            .catch(err=>{
                res.status(500).send({
                    message:err.message||"Some error occurred while creating a a new report"
                });
            });
        }
         else
        {
            var isUserExist = false;
            for (let i = 0; i < report.users.length; i++) {
                if(report.users[i]===req.body.userID)
                {
                    isUserExist = true;
                    break;
                }
            }

            if(!isUserExist)
            {
                const oldPrice = report.price;

                const newPrice = (oldPrice*report.users.length + cmdtyPrice)/(report.users.length +1);

                await Report.findOneAndUpdate(
                    {
                        cmdtyID:commodityID
                    }, 
                    { $push: { users: req.body.userID },price:newPrice },
                    { upsert: true },
                    
                ).exec();

                res.status(200).send({"ReportID" : report._id});
            }

            else
            res.status(201).send("This User already reported")

        }

    } catch (err) {
        res.status(500).send({
            message:err.message||"Some error occurred while creating a create operation"
        }) 
    }
} 

exports.getReport = async(req,res)=>{
    try {
        const ReportID = req.query.reportID
    
        const report = await Report.findOne({_id:ReportID});

        if(!report)
        {
            res.status(400).send({message:"Not exist report with this id"});
            return;
        }
    res.status(200).send(report)
    } catch (err) {
        res.status(500).send({
            message:err.message||"Some error occurred while creating a create operation"
        })
    }
    
}
