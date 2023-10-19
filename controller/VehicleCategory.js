const connection = require('../model/DB');


//////////Post/////////
const vehicleCategorypost = async(req,res)=>{
    const {vehicle_type_id ,vehicle_type_name} = req.body;
    
    const userData = ({
        vehicle_type_id,
        vehicle_type_name,
        vehicle_type_image: req.file.filename
    })

    sqlQuery = "INSERT INTO tab_admin_vehicle_type SET ?"
    
    await connection.query(sqlQuery,userData,function(err, result) {
        if (err) {
            res.send(err.sqlMessage)
          } else {
            res.status(200).json({ message: 'Success' })
          }
    })
}
////////////////////////////////////////////////////////////

////////////////Get////////////////

const vehicleCategoryget = async (req, res) => {

  let sqlQuery = `select vehicle_type_id ,vehicle_type_name,vehicle_type_image from tab_admin_vehicle_type `;

  await connection.query(sqlQuery, function (error, result) {
    if (error) {
      res.status(500).json({ error: error.sqlMessage }); // Sending an error response with status 500
      console.log(error)
    } else {
      res.status(200).json(result); // Sending a success response with status 200
    }

  });
}



//////////////

module.exports = {vehicleCategorypost,vehicleCategoryget}