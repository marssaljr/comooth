import { createContext, useEffect, useState } from 'react';
import Router  from 'next/router';
import { setCookie, parseCookies } from 'nookies';
import { signInRequest, recoverDashboardInformation, recoverUserInformation } from '../services/auth';
import { getAPIClient } from '../services/http';

// font: https://github.com/rocketseat-content/youtube-next-auth-jwt/blob/main/src/contexts/AuthContext.tsx
// video: https://youtu.be/pvrKHpXGO8E?t=2364
// next: https://www.youtube.com/watch?v=6SZOPKs9SUg

export const AuthContext = createContext({})

export function AuthProvider ({children}) {
    const api = getAPIClient()
    const [user, setUser] = useState(null)
    const [dashboard, setDashboard] = useState(null)

    const isAuthenticated = !!user;

    useEffect(() => {
        const { 'dashboard.token': token, 'dashboard.refreshToken': refreshToken } = parseCookies()
        if (token) {
            recoverDashboardInformation(token).then(response => setDashboard(response))
            recoverUserInformation(token).then(response => setUser(response))
        }
    }, []);

    async function signIn({username, password}) {
        const {token, refreshToken, user} = await signInRequest({
            username,
            password,
        })
        setCookie(undefined, 'dashboard.token', token.bearer, {
            maxAge: token.expiresIn,
        })
        setCookie(undefined, 'dashboard.refreshToken', refreshToken.id, {
            maxAge: refreshToken.expiresIn,
        })
        api.defaults.headers['Authorization'] = `Bearer ${token}`

        setUser(user)

        Router.push('/dashboard')
    }
    return (
        <AuthContext.Provider value={{ user, dashboard, isAuthenticated, signIn }}>
          {children}
        </AuthContext.Provider>
      )
}
