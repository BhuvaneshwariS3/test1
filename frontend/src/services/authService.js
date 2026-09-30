import { authAPI } from './api'

export const login = async (email, password) => {
    try {
        const response = await authAPI.login(email, password)
        return response.data
    } catch (error) {
        throw error.response?.data?.detail || 'Login failed. Please try again.'
    }
}

export const register = async (userData) => {
    try {
        const response = await authAPI.register(userData)
        return response.data
    } catch (error) {
        throw error.response?.data?.detail || 'Registration failed. Please try again.'
    }
}

export const getProfile = async () => {
    try {
        const response = await authAPI.getProfile()
        return response.data
    } catch (error) {
        throw error
    }
}

export const logout = async () => {
    try {
        await authAPI.logout()
        localStorage.removeItem('access_token')
        localStorage.removeItem('user')
    } catch (error) {
        // Silently handle logout errors
        localStorage.removeItem('access_token')
        localStorage.removeItem('user')
    }
}

export const refreshToken = async () => {
    try {
        const response = await authAPI.refreshToken()
        return response.data
    } catch (error) {
        throw error
    }
}

export const isAuthenticated = () => {
    const token = localStorage.getItem('access_token')
    return !!token
}