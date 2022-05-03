import { api } from './api';
import { parseCookies } from "nookies";

export async function signInRequest({username, password}) {
    const headers = {
        'Content-Type': 'application/json',
    }
    const data = {username: username, password: password }
    const user = await api.post('/login', data, {headers})
    return user.data
}

export async function recoverUserInformation() {
    const { 'dashboard.refreshToken': refreshToken } = parseCookies()
    const user = await api.get(`/user/${refreshToken}`)
    return user.data
}

export async function recoverDashboardInformation() {
    const dashboard = await api.get('/dashboard')
    return dashboard.data
}