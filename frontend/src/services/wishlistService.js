import { wishlistAPI } from './api'

export const getWishlist = async () => {
    try {
        const response = await wishlistAPI.getWishlist()
        return response.data
    } catch (error) {
        console.error('Error fetching wishlist:', error)
        return { items: [] }
    }
}

export const addToWishlist = async (productId) => {
    try {
        const response = await wishlistAPI.addToWishlist(productId)
        return response.data
    } catch (error) {
        console.error('Error adding to wishlist:', error)
        throw error
    }
}

export const removeFromWishlist = async (productId) => {
    try {
        const response = await wishlistAPI.removeFromWishlist(productId)
        return response.data
    } catch (error) {
        console.error('Error removing from wishlist:', error)
        throw error
    }
}