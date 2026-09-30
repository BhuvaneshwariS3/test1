import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([])
    const [loading, setLoading] = useState(true)

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('cart')
        if (savedCart) {
            setCartItems(JSON.parse(savedCart))
        }
        setLoading(false)
    }, [])

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        if (!loading) {
            localStorage.setItem('cart', JSON.stringify(cartItems))
        }
    }, [cartItems, loading])

    const addToCart = (product, quantity = 1) => {
        const existingItem = cartItems.find(item => item.id === product.id)
        
        if (existingItem) {
            setCartItems(cartItems.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            ))
        } else {
            setCartItems([...cartItems, {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image_url,
                quantity: quantity,
                category: product.category || 'Uncategorized'
            }])
        }
    }

    const removeFromCart = (productId) => {
        setCartItems(cartItems.filter(item => item.id !== productId))
    }

    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId)
            return
        }
        
        setCartItems(cartItems.map(item =>
            item.id === productId ? { ...item, quantity } : item
        ))
    }

    const clearCart = () => {
        setCartItems([])
    }

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const deliveryCharge = subtotal > 5000 ? 0 : 299
    const total = subtotal + deliveryCharge
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        deliveryCharge,
        total,
        itemCount,
        loading
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export default CartContext