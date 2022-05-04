import axios from "axios";
import { parseCookies } from "nookies";

export function getAPIClient(ctx = null) {
    let token;
    if(ctx) {
        const {'dashboard.token': dashboardToken} = parseCookies(ctx)
        token = dashboardToken
        // const { 'dashboard.token': token, 'dashboard.refreshToken': refreshToken } = parseCookies(ctx)
    } else {
        const {'dashboard.token': dashboardToken} = parseCookies()
        token = dashboardToken
        // const { 'dashboard.token': token, 'dashboard.refreshToken': refreshToken } = parseCookies()
    }

    const api = axios.create({
        baseURL: 'http://192.168.1.2:3000'
    })

    if(token){
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return api;
}