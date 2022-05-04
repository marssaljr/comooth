import { getAPIClient } from './http';
import { parseCookies } from "nookies";

export async function signInRequest({username, password}) {
    const api = getAPIClient()
    const headers = {
        'Content-Type': 'application/json',
    }
    const data = {username: username, password: password }
    const user = await api.post('/login', data, {headers})
    return user.data
}

export async function recoverUserInformation() {
    const api = getAPIClient()
    const { 'dashboard.refreshToken': refreshToken } = parseCookies()
    const user = await api.get(`/user/${refreshToken}`)
    return user.data
}

export async function recoverDashboardInformation() {
    const api = getAPIClient()
    const dashboard = await api.get('/dashboard')
    return dashboard.data
}