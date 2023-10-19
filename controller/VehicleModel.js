const connection = require('../model/DB');

///////////post api////////////////

const vehicleModelpost = async(req,res)=>{
 const {vehicle_model_id,vehicle_model_name,vehicle_manufacturing_id,vehicle_type_id,description}=req.body;

 const userModel = ({
    vehicle_model_id,
    vehicle_model_name,
    vehicle_manufacturing_id,
    vehicle_type_id,
    description,
    modelimage:req.file.filename
 })

 sqlQuery = "INSERT INTO tab_admin_vehicle_model SET ?"

 await connection.query(sqlQuery,userModel,function(err,result){
    if(err){
        res.send(err.sqlMessage)
    }else{
        res.status(200).json({message:"success"})
    }
 })
}

////////////////Get///////////

const vechileModelget = async(req,res)=>{
    sqlQuery = "SELECT  vm.vehicle_model_id,vm.vehicle_model_name,vm.description AS description_model,vm.modelimage,vmm.vehicle_manufacturing_name, vt.vehicle_type_name FROM tab_admin_vehicle_model AS vm JOIN tab_admin_vehicle_manufacturing AS vmm ON vm.vehicle_manufacturing_id = vmm.vehicle_manufacturing_id JOIN tab_admin_vehicle_type AS vt ON vm.vehicle_type_id = vt.vehicle_type_id"

    await connection.query(sqlQuery,function(err,result){
        if(err){
            res.send(err.sqlMessage)
        }else{
            res.status(200).json(result)
        }
    })

}

module.exports = {vehicleModelpost,vechileModelget};