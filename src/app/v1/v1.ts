import express from 'express'
import deviceRouter from './devices/devices.js'

const v1Router = express.Router()

v1Router.use('/devices', deviceRouter)

export default v1Router