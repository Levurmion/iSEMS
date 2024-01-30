import axios from "axios";
import "dotenv/config";
import { getRequestHeaders, getToken } from "./tuya-tokens.js";
import { TuyaRequestConfig } from "./tuya.types.js";

if (!process.env.TUYA_DOMAIN) {
    throw new Error("TUYA_DOMAIN environment variable is undefined.");
}

const token = await getToken();

const tuyaAxios = axios.create({
    baseURL: process.env.TUYA_DOMAIN,
    timeout: 5 * 1e3,
});

const fetchTuyaApi = async ({
    path,
    method,
    query = {},
    body = {},
    headers = {},
}: TuyaRequestConfig) => {
    const tuyaRequestHeaders = getRequestHeaders(token, { path, method, query, body, headers });

    const tuyaApiResponse = await tuyaAxios.request({
        url: path,
        method: method,
        params: query,
        data: body,
        headers: tuyaRequestHeaders,
    });
    return tuyaApiResponse;
};

export default fetchTuyaApi;
