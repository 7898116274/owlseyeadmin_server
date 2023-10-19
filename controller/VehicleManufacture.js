const connection = require('../model/DB');

/////////////Post///////////

const vehicleManufpost = async(req,res)=>{
    const {vehicle_manufacturing_id,vehicle_manufacturing_name,vehicle_type_id,description} = req.body

    const userData = ({
        vehicle_manufacturing_id,
        vehicle_manufacturing_name,
        vehicle_type_id,
        description,
        companyimage:req.file.filename
    })

    sqlQuery = "INSERT INTO tab_admin_vehicle_manufacturing SET ?"

    await connection.query(sqlQuery,userData,function(err,result){
        if(err){
            res.send(err.sqlMessage)
        }else{
            res.status(200).json({message:"success"})
        }
    })
}

//////////////////////////////////////////////

////////GET////////////////////////////////

const vehicleManufget = async(req,res)=>{
    sqlQuery = "SELECT M.vehicle_manufacturing_name,M.description,M.companyimage,T.vehicle_type_name FROM tab_admin_vehicle_manufacturing M INNER JOIN tab_admin_vehicle_type T ON M.vehicle_type_id = T.vehicle_type_id"

    await connection.query(sqlQuery,function(err,result){
        if(err){
            res.send(err.sqlMessage)
        }else{
            res.status(200).json(result)
        }
    })
}




module.exports = {vehicleManufpost,vehicleManufget};