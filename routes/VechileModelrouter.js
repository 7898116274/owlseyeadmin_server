const express = require('express')
const VehicleModelRouter = express.Router()

const {vehicleModelpost,vechileModelget} = require("../controller/VehicleModel")

const upload = require('../storage/multer')

VehicleModelRouter.post('/api/admin/modelpost',upload.single('modelimage'),vehicleModelpost)


VehicleModelRouter.get('/api/admin/modelget', vechileModelget)


module.exports =VehicleModelRouter