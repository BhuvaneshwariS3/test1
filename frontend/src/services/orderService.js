import { ordersAPI } from './api'

export const getOrders = async () => {
    try {
        const response = await ordersAPI.getOrders()
        return response.data
    } catch (error) {
        console.error('Error fetching orders:', error)
        throw error
    }
}

export const getOrderById = async (id) => {
    try {
        const response = await ordersAPI.getOrderById(id)
        return response.data
    } catch (error) {
        console.error('Error fetching order:', error)
        throw error
    }
}

export const createOrder = async (orderData) => {
    try {
        const response = await ordersAPI.createOrder(orderData)
        return response.data
    } catch (error) {
        console.error('Error creating order:', error)
        throw error
    }
}

export const cancelOrder = async (orderId) => {
    try {
        const response = await ordersAPI.cancelOrder(orderId)
        return response.data
    } catch (error) {
        console.error('Error cancelling order:', error)
        throw error
    }
}