import axios from "axios";
import { parseCookies } from "nookies";

export function getAPIClient(ctx = null) {
    const { 'dashboard.token': token, 'dashboard.refreshToken': refreshToken } = parseCookies(ctx)

    const api = axios.create({
        baseURL: 'http://localhost:3000'
    })

    if(token){
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
    }
    return api;
}