import * as qs from "qs";
import * as crypto from "crypto";
import { default as axios } from "axios";
import "dotenv/config";
import { TuyaRequestConfig, TuyaRequestHeaders } from "./tuya.types.js";

if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET || !process.env.TUYA_HOST) {
    throw new Error("CLIENT_ID, CLIENT_SECRET, or TUYA_HOST environment variables are undefined.");
}

const config = {
    /* Access Id */
    accessKey: process.env.CLIENT_ID,
    /* Access Secret */
    secretKey: process.env.CLIENT_SECRET,
};

const httpClient = axios.create({
    baseURL: process.env.TUYA_HOST,
    timeout: 5 * 1e3,
});

/**
 * HMAC-SHA256 crypto function
 */
export function encryptStr(str: string, secret: string) {
    return crypto.createHmac("sha256", secret).update(str, "utf8").digest("hex").toUpperCase();
}

/**
 * fetch highway login token
 */
export async function getToken() {
    const method = "GET";
    const timestamp = Date.now().toString();
    const signUrl = "/v1.0/token?grant_type=1";
    const contentHash = crypto.createHash("sha256").update("").digest("hex");
    const stringToSign = [method, contentHash, "", signUrl].join("\n");
    const signStr = config.accessKey + timestamp + stringToSign;

    const headers = {
        t: timestamp,
        sign_method: "HMAC-SHA256",
        client_id: config.accessKey,
        sign: encryptStr(signStr, config.secretKey),
    };

    const { data: login } = await httpClient.get("/v1.0/token?grant_type=1", {
        headers,
    });
    if (!login || !login.success) {
        throw Error(`Authorization Failed: ${login.msg}`);
    }

    return login.result.access_token as string;
}

/**
 * Request signature, which can be passed as headers
 * @param path
 * @param method
 * @param headers
 * @param query
 * @param body
 */
export function getRequestHeaders(token: string, {
    path,
    method,
    query = {},
    headers = {},
    body = {}
}: TuyaRequestConfig): TuyaRequestHeaders {
    const t = Date.now().toString();
    const [uri, pathQuery] = path.split("?");
    const queryMerged = Object.assign(query, qs.parse(pathQuery));
    const sortedQuery: { [k: string]: string } = {};
    Object.keys(queryMerged)
        .sort()
        .forEach((i) => (sortedQuery[i] = query[i]));

    const querystring = decodeURIComponent(qs.stringify(sortedQuery));
    const url = querystring ? `${uri}?${querystring}` : uri;
    const contentHash = crypto.createHash("sha256").update(JSON.stringify(body)).digest("hex");
    const stringToSign = [method, contentHash, "", url].join("\n");
    const signStr = config.accessKey + token + t + stringToSign;
    const signature = encryptStr(signStr, config.secretKey)

    return {
        ...headers,
        t,
        path: url,
        client_id: config.accessKey,
        sign: signature,
        sign_method: "HMAC-SHA256",
        access_token: token,
    };
}

// EXAMPLE FETCH
/**
 * fetch highway business data
 */
export async function getDeviceInfo(deviceId: string) {
    const query = {};
    const method = "GET";
    const path = `/v1.0/devices/${deviceId}`;
    const token = await getToken()
    const reqHeaders = getRequestHeaders(token, {path, method, query, headers: {}});

    const { data } = await httpClient.request({
        method,
        data: {},
        params: {},
        headers: reqHeaders,
        url: reqHeaders.path,
    });

    if (!data || !data.success) {
        throw Error(`Request highway Failed: ${data.msg}`);
    }

    return data;
}
