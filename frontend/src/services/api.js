import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
})

// Request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('access_token')
            localStorage.removeItem('user')
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)

export const authAPI = {
    login: (email, password) => api.post('/api/auth/login', { email, password }),
    register: (userData) => api.post('/api/auth/register', userData),
    getProfile: () => api.get('/api/auth/me'),
    logout: () => api.post('/api/auth/logout'),
    refreshToken: () => api.post('/api/auth/refresh'),
}

export const productsAPI = {
    getAll: (params = {}) => api.get('/api/products/', { params }),
    getById: (id) => api.get(`/api/products/${id}`),
    getFeatured: () => api.get('/api/products/featured'),
    getBestsellers: () => api.get('/api/products/bestsellers'),
    getARCompatible: () => api.get('/api/products/ar-compatible'),
    search: (query, params = {}) => api.get('/api/products/search/suggestions', { params: { ...params, q: query } }),
}

export const categoriesAPI = {
    getAll: (params = {}) => api.get('/api/categories/', { params }),
    getById: (id) => api.get(`/api/categories/${id}`),
    getBySlug: (slug) => api.get(`/api/categories/slug/${slug}`),
}

export const cartAPI = {
    getCart: () => api.get('/api/cart'),
    addToCart: (itemId, quantity) => api.post('/api/cart/items', { product_id: itemId, quantity }),
    updateItem: (itemId, quantity) => api.put(`/api/cart/items/${itemId}`, { quantity }),
    deleteItem: (itemId) => api.delete(`/api/cart/items/${itemId}`),
    clearCart: () => api.delete('/api/cart'),
}

export const wishlistAPI = {
    getWishlist: () => api.get('/api/wishlist'),
    addToWishlist: (productId) => api.post('/api/wishlist', { product_id: productId }),
    removeFromWishlist: (productId) => api.delete(`/api/wishlist/${productId}`),
}

export const ordersAPI = {
    getOrders: () => api.get('/api/orders'),
    getOrderById: (id) => api.get(`/api/orders/${id}`),
    createOrder: (orderData) => api.post('/api/orders', orderData),
}

export const recommendationsAPI = {
    getRecommendations: (params = {}) => api.get('/api/recommendations', { params }),
}

export const aiAPI = {
    chat: (message) => api.post('/api/ai/assistant', { message }),
    getRecommendations: (params = {}) => api.get('/api/recommendations', { params }),
}

export const imageSearchAPI = {
    search: (formData) => api.post('/api/image-search', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    }),
}

export const interiorDesignAPI = {
    analyze: (formData) => api.post('/api/interior-design', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    }),
}

export default api