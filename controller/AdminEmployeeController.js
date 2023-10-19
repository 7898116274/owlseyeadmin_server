const connection = require('../model/DB');
const moment = require('moment');


//////POST////////////////////////////////////

const employeepost = async (req, res) => {
    const { fname, lname, email, mobile, aadhar, address, pincode, city, state, dob, status } = req.body;

    ///check if any required field are missing///

    if (!fname || !lname || !email || !mobile || !aadhar || !address || !pincode || !city || !state || !dob || !status) {
      return res.status(400).json({ error: "all input is required" })
    }

    /////////check if req.file exist and has a filename 
    if (!req.file || !req.file.filename) {
      return res.status(400).json({ error: "File not uploaded" })
    }
    const userData = ({
      fname,
      lname,
      email,
      mobile,
      aadhar,
      address,
      pincode,
      state,
      city,
      dob,
      image: req.file.filename,
      status
    });

    const queryInsertEmployee = `INSERT INTO admin_employee_detail SET ?`
    ;

    await connection.query(queryInsertEmployee, userData, function (err, result) {
      if (err) {
        res.send(err.sqlMessage)
      } else {
        res.status(200).json({ message: 'User successfull register' })
      }

    }); 
}
//////////////////////////////////////////////////////////////


//////////////GET//////////////////////////////

const employeeget = async (req, res) => {
 
  
  let sqlQuery = `select id,fname, lname, email, mobile, aadhar, address, pincode, city, state, dob, image, status from admin_employee_detail`;

  await connection.query(sqlQuery, function (error, result) {
    if (error) {
      res.status(500).json({ error: error.sqlMessage }); // Sending an error response with status 500
      console.log(error)
    } else {

      res.status(200).json(result); // Sending a success response with status 200
     
    }

  });
}




/////////////////////Single user///////////////////


const singleuserget = (req, res) => {
    try {
        let id = req.params.id
        let sqlQuery = "SELECT  id,fname, lname, email, mobile, aadhar, address, pincode, city, state, dob, image, status FROM admin_employee_detail WHERE id = ?";
        connection.query(sqlQuery, id, function (error, result) {
            if (error) {
                console.log("Error:", error.sqlMessage);
                return res.status(500).json({ error: "Internal Server Error" });
            } else {
                res.json(result);
            }
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}




//////////////Update//////////
// const employeeupdate = async (req, res) => {
//   const { id } = req.params.id;
//   const { fname, lname, email, mobile, aadhar, address, pincode, city, state, dob, status } = req.body;
//   const image = req.file ? req.file.filename : null;

//   // Check if any required fields are missing
//   if (!fname && !lname && !email && !mobile && !aadhar && !address && !pincode && !city && !state && !dob && !status) {
//     return res.status(400).json({ error: 'No fields to update' });
//   }

//   // Construct the SQL query for the update
//   const sqlUpdateQuery = 'UPDATE admin_employee_detail SET ? WHERE id = ?';

//   const updatedFields = {
//     fname,
//     lname,
//     email,
//     mobile,
//     aadhar,
//     address,
//     pincode,
//     city,
//     state,
//     image,
//     dob,
//     status,
//   };

//   // Execute the update query
//   await connection.query(sqlUpdateQuery, [updatedFields, id], function (err, result) {
//     if (err) {  
//       console.error('Error:', err.sqlMessage);
//       return res.status(500).json({ error: 'Internal server error' });
//     } else {
//       console.log(result)
//       res.status(200).json({ message: 'Resource updated successfully' });
//     }
//   });

// };

// const employeeupdate = async (req, res) => {

//   let userData = {
//     fname: req.query.fname,
//     lname: req.query.lname,
//     email: req.query.email,
//     mobile: req.query.mobile,
//     aadhar: req.query.aadhar,
//     address: req.query.address,
//     pincode: req.query.pincode,
//     city: req.query.city,
//     state: req.query.state,
//     dob: req.query.dob,
//     status: req.query.status,
//     image: req.file.location
//   }
//   let id = req.query.id

//   const sqlUpdateQuery = 'UPDATE admin_employee_detail SET ? WHERE id = ?';

//   await connection.query(sqlUpdateQuery, [userData, id], function (error, result) {
//     if (error) {
//       console.log("error", error.sqlMessage)
//     }
//     else {
//       res.json(result);
//     }
//   })

// }


const employeeupdate = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      fname,
      lname,
      email,
      mobile,
      aadhar,
      address,
      pincode,
      city,
      state,
      dob,
      status,
    } = req.query;

    let image = null;

    if (req.file && req.file.location) {
      image = req.file.location;
    }

    // Check if any required fields are missing
    if (
      !fname &&
      !lname &&
      !email &&
      !mobile &&
      !aadhar &&
      !address &&
      !pincode &&
      !city &&
      !state &&
      !dob &&
      !status
    ) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    // Construct the SQL query for the update
    const sqlUpdateQuery = 'UPDATE admin_employee_detail SET ? WHERE id = ?';

    const updatedFields = {
      fname,
      lname,
      email,
      mobile,
      aadhar,
      address,
      pincode,
      city,
      state,
      image, // Store the image URL
      dob,
      status,
    };

    // Execute the update query
    await connection.query(sqlUpdateQuery, [updatedFields, id], function (error, result) {
      if (error) {
        console.error('Error:', error.sqlMessage);
        return res.status(500).json({ error: 'Internal server error' });
      } else {
        res.status(200).json({ message: 'Resource updated successfully' });
      }
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};





module.exports = { employeepost, employeeget, employeeupdate,singleuserget }