const express = require("express");
const app = express();
const cors = require("cors")
const employeeRouter = require('./routes/AdminUserrouter')
const VehicleCategoryRouter = require('./routes/VehicleCategoryrouter')
const VehicleManufactureRouter = require('./routes/VehicleManufacturerouter')
const VehicleModelRouter =  require('./routes/VechileModelrouter')
const roleRouter  = require('./routes/EmployeeRolerouter')


app.use(cors());
app.use(express.json());
app.use(employeeRouter)
app.use(VehicleCategoryRouter)
app.use(VehicleManufactureRouter)
app.use(VehicleModelRouter)
app.use(roleRouter)
app.use('/upload',express.static('./upload'))

app.listen(9000,()=>{
    console.log("Server start")
})