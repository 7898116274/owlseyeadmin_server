const express = require('express')
const VehicleCategoryRouter = express.Router()

const {vehicleCategorypost,vehicleCategoryget} = require('../controller/VehicleCategory')

const upload = require('../storage/multer')

VehicleCategoryRouter.post('/admin/vehicler/categorypost',upload.single('vehicle_type_image'),vehicleCategorypost)

VehicleCategoryRouter.get('/admin/vehicler/categoryget',vehicleCategoryget)

module.exports = VehicleCategoryRouter;