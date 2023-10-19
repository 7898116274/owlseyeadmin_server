const express = require('express')
const VehicleManufactureRouter= express.Router()

const {vehicleManufpost,vehicleManufget} = require("../controller/VehicleManufacture")


const upload = require('../storage/multer')

VehicleManufactureRouter.post('/api/admin/manufpost',upload.single("companyimage"),vehicleManufpost)

VehicleManufactureRouter.get('/api/admin/manufget',vehicleManufget)


module.exports = VehicleManufactureRouter;