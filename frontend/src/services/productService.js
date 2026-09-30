import { productsAPI, categoriesAPI } from './api'

export const getProducts = async (params = {}) => {
    try {
        const response = await productsAPI.getAll(params)
        return response.data
    } catch (error) {
        console.error('Error fetching products:', error)
        throw error
    }
}

export const getProductById = async (id) => {
    try {
        const response = await productsAPI.getById(id)
        return response.data
    } catch (error) {
        console.error('Error fetching product:', error)
        throw error
    }
}

export const getFeaturedProducts = async () => {
    try {
        const response = await productsAPI.getFeatured()
        return response.data
    } catch (error) {
        console.error('Error fetching featured products:', error)
        return { products: [] }
    }
}

export const getBestsellerProducts = async () => {
    try {
        const response = await productsAPI.getBestsellers()
        return response.data
    } catch (error) {
        console.error('Error fetching bestseller products:', error)
        return { products: [] }
    }
}

export const getARCompatibleProducts = async () => {
    try {
        const response = await productsAPI.getARCompatible()
        return response.data
    } catch (error) {
        console.error('Error fetching AR-compatible products:', error)
        return { products: [] }
    }
}

export const searchProducts = async (query) => {
    try {
        const response = await productsAPI.search(query)
        return response.data
    } catch (error) {
        console.error('Error searching products:', error)
        return { suggestions: [] }
    }
}

export const getCategories = async () => {
    try {
        const response = await categoriesAPI.getAll()
        return response.data
    } catch (error) {
        console.error('Error fetching categories:', error)
        return { categories: [] }
    }
}

export const getCategoryById = async (id) => {
    try {
        const response = await categoriesAPI.getById(id)
        return response.data
    } catch (error) {
        console.error('Error fetching category:', error)
        throw error
    }
}

export const getCategoryBySlug = async (slug) => {
    try {
        const response = await categoriesAPI.getBySlug(slug)
        return response.data
    } catch (error) {
        console.error('Error fetching category:', error)
        throw error
    }
}