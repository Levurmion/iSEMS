import express from "express"
import 'dotenv/config'
import fetchTuyaApi from "../lib/tuya/tuya-axios.js";
import { getDeviceInfo } from "../lib/tuya/tuya-tokens.js";
import v1Router from "./v1/v1.js";

const app = express()

if (!process.env.PORT) {
    throw new Error("PORT environment variable is undefined")
}

// MIDDLEWARES
app.use(express.json())

// ROUTERS
app.use('/v1', v1Router)

// ALLOW PING FOR STATUS CHECK
app.get("/", (req, res) => {
    res.sendStatus(200)
})

app.listen(process.env.PORT, () => {
    console.log(`listening on PORT: ${process.env.PORT}`)
})