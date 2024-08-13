const express= require('express')
const userController = require('../Controller/userController')
const senserController = require('../Controller/senserController')
const router = new express.Router()

//register
router.post('/user/register',userController.register)

//login
router.post('/user/login',userController.login)

//data
router.post('/data/sensordata',senserController.sensor)
router.get('/data/getsensordata',senserController.getSensorData)
router.get('/data/getsensorreport/:columnname/:timestamp',senserController.getSensorReport)
router.get('/data/getsensorreport')
module.exports= router