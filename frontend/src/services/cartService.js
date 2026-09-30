import { cartAPI } from './api'

export const getCart = async () => {
    try {
        const response = await cartAPI.getCart()
        return response.data
    } catch (error) {
        console.error('Error fetching cart:', error)
        return { items: [] }
    }
}

export const addToCart = async (productId, quantity = 1) => {
    try {
        const response = await cartAPI.addToCart(productId, quantity)
        return response.data
    } catch (error) {
        console.error('Error adding to cart:', error)
        throw error
    }
}

export const updateCart = async (itemId, quantity) => {
    try {
        const response = await cartAPI.updateItem(itemId, quantity)
        return response.data
    } catch (error) {
        console.error('Error updating cart:', error)
        throw error
    }
}

export const removeFromCart = async (itemId) => {
    try {
        const response = await cartAPI.deleteItem(itemId)
        return response.data
    } catch (error) {
        console.error('Error removing from cart:', error)
        throw error
    }
}

export const clearCart = async () => {
    try {
        const response = await cartAPI.clearCart()
        return response.data
    } catch (error) {
        console.error('Error clearing cart:', error)
        throw error
    }
}