import express from 'express'
import fetchTuyaApi from '../../../lib/tuya/tuya-axios.js'

const deviceRouter = express.Router()

deviceRouter.get("/hub", async (req, res) => {
    const hubInfo = await fetchTuyaApi({
        path: "/v1.0/devices/bf034e9c20f9bb91f1yemb",
        method: "GET"
    })
    return res.json(hubInfo.data)
})

deviceRouter.get("/sensor", async (req, res) => {
    const sensorInfo = await fetchTuyaApi({
        path: "/v1.0/devices/bfad651b8a01af1a9casyx",
        method: "GET"
    })
    return res.json(sensorInfo.data)
})

export default deviceRouter