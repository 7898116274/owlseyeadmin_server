const express = require('express')
const employeeRouter = express.Router()

const {employeepost,employeeget,employeeupdate,singleuserget} = require('../controller/AdminEmployeeController')

const upload = require('../storage/multer')

employeeRouter.post('/admin/employee/register',upload.single('image'),employeepost)

employeeRouter.get('/admin/employee/details', employeeget)

employeeRouter.get('/admin/employee/detailsingle/:id',singleuserget)

employeeRouter.patch('/admin/employee/employeeupdate/:id',upload.single('image'),employeeupdate )

module.exports = employeeRouter;