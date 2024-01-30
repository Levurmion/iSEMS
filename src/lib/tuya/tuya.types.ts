import { RawAxiosRequestHeaders } from "axios";

export type HttpMethods = "GET" | "POST" | "PUT" | "DELETE" | "OPTIONS" | "PATCH"

export interface TuyaRequestConfig {
    path: string;
    method: HttpMethods;
    headers?: RawAxiosRequestHeaders;
    query?: { [k: string]: any };
    body?: { [k: string]: any };
}

export interface TuyaRequestHeaders extends RawAxiosRequestHeaders {
    t: string;
    path: string;
    client_id: string;
    sign: string;
    sign_method: "HMAC-SHA256";
    access_token: string;
}
