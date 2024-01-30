import axios from "axios"

axios.defaults.baseURL = "http://localhost:3000"

describe("/v1/devices Endpoint Testing Suite", () => {

    it("can retrieve details for the Zigbee hub", async () => {
        const res = await axios.get("/v1/devices/hub")
        expect(res.status).toBe(200)
    })

    it("can retrieve details for the temperature sensor", async () => {
        const res = await axios.get("/v1/devices/sensor")
        const sensorStatus = res.data.result.status
        expect(sensorStatus.length).toBe(3)

        for (const status of sensorStatus) {
            // attempt conversion to a number and this should work
            const valueAsInt = Number(status.value)
            expect(typeof valueAsInt).toBe("number")
        }
    })

})