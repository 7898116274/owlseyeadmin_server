const connection = require('../model/DB');

////////////post//
const rolepost = async (req, res) => {
  const {id,role_id} = req.body;
 
  if (!id || !role_id) {
    return res.status(400).json({ error: 'Missing required fields in the request body' });
  }

  const userData = {
    id,
    role_id,
  };
  
  const sqlQuery = 'INSERT INTO admin_assign_roles SET ?';

  await connection.query(sqlQuery, userData, function (err, result) {
    if (err) {
      res.status(500).json({ error: err.sqlMessage });
    } else {
      res.status(200).json({ message: 'Role added' });  
    }
  });
};

////////////Get roleonly///////////from table role_assign
const rolesingle = async (req, response) => {
  let sqlQuery = "SELECT role_id, rolename FROM role_assign";

  await connection.query(sqlQuery, function (err, result) {
    if (err) {
      response.status(500).json({ error: err.sqlMessage });
    } else {
      response.status(200).json(result);
    }
  });
};



/////////////Get////////////

const roleget = async(req,res)=>{
  const roleId = req.params.id;
    let sqlQuery = 'SELECT aed.id,ra.role_id,ra.rolename, aed.fname, aed.lname FROM admin_assign_roles AS aar ' + 'JOIN role_assign AS ra ON aar.role_id = ra.role_id '+'JOIN admin_employee_detail AS aed ON aar.id = aed.id ' +'WHERE aar.id = ? '

    await connection.query(sqlQuery,roleId, function (error, result) {
        if (error) {
          res.status(500).json({ error: error.sqlMessage }); // Sending an error response with status 500
          console.log(error)
        } else {
          res.status(200).json(result); // Sending a success response with status 200
        }
    
      });
}

///////update resign///////

const resignrole = (req, res) => {
    const roleId = req.params.id;
  
    // Perform a database update operation to mark the role as resigned
    const updateSql = 'UPDATE admin_assign_roles SET role_id = ? WHERE id = ?';
    const updatedRoleName = 'Resigned';
  
    connection.query(updateSql, [updatedRoleName, roleId], (err, result) => {
      if (err) {
        console.error('Error updating role:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json({ message: `Role with ID ${roleId} has been resigned.` });
      }
    });
}


///////////////////////delete/////////////////
const deleterole = async (req, res) => {
  const id = req.body.id
  const role_id = req.body.role_id
  // Construct the SQL query
  console.log(role_id,id)
  const sql = `DELETE FROM admin_assign_roles WHERE id = "${id}" and role_id = ${role_id}`;

  // Execute the query with the provided 'id'
  connection.query(sql,  (err, result) => {
    if (err) {
      console.error('Error deleting record:', err);
      res.status(500).json({ error: 'Error deleting record' });
    } else {
      console.log('Record deleted successfully');
      res.status(200).json({ message: 'Record deleted successfully' });
    }
  });
};



////////////////role define////////////////
const roledefine = async (req, res) => {
  const {role_id,rolename} = req.body;
 
  if (!role_id || !rolename ) {
    return res.status(400).json({ error: 'Missing required fields in the request body' });
  }

  const userData = {
    role_id,
    rolename,
   
  };
  
  const sqlQuery = 'INSERT INTO role_assign SET ?';

  await connection.query(sqlQuery, userData, function (err, result) {
    if (err) {
      res.status(500).json({ error: err.sqlMessage });
    } else {
      res.status(200).json({ message: 'Role added' });  
    }
  });
};




module.exports = {rolepost,roleget,resignrole,rolesingle,deleterole,roledefine}