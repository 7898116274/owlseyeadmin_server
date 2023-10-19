const express = require('express')
const roleRouter = express.Router()

const {roleget,rolepost,resignrole,rolesingle,deleterole,roledefine} = require('../controller/EmployeeRole')


roleRouter.post('/api/admin/role', rolepost);

roleRouter.post('/api/role/define',roledefine)

roleRouter.get('/api/role/details/:id', roleget)

roleRouter.get('/api/employee/rolesingle',rolesingle)

roleRouter.patch('/api/role/asign/:id',resignrole)

roleRouter.delete('/api/role/delete',deleterole)

module.exports = roleRouter;