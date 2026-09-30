import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Trash2, Plus, Minus, ArrowLeft } from 'lucide-react'
import { useCart } from '../context/CartContext'

const CartPage = () => {
    const { cartItems, updateQuantity, removeFromCart, subtotal, deliveryCharge, total, itemCount } = useCart()
    const [loading, setLoading] = useState(false)

    const handleUpdateQuantity = async (itemId, newQuantity) => {
        setLoading(true)
        try {
            updateQuantity(itemId, newQuantity)
        } catch (error) {
            console.error('Error updating quantity:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleRemoveItem = async (itemId) => {
        setLoading(true)
        try {
            removeFromCart(itemId)
        } catch (error) {
            console.error('Error removing item:', error)
        } finally {
            setLoading(false)
        }
    }

    if (cartItems.length === 0) {
        return (
            <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShoppingBag className="w-12 h-12 text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                <p className="text-gray-600 mb-8">Start shopping to add products to your cart</p>
                <Link to="/products" className="btn-primary inline-flex items-center">
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Start Shopping
                </Link>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
                <h1 className="text-2xl font-bold mb-6">Shopping Cart ({itemCount} items)</h1>
                
                <div className="space-y-4">
                    {cartItems.map((item) => (
                        <div key={item.id} className="card flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <div className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                                {item.image ? (
                                    <img 
                                        src={item.image} 
                                        alt={item.name} 
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400">
                                        <ShoppingBag className="w-8 h-8" />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-lg">{item.name}</h3>
                                <p className="text-gray-600 mb-2">{item.category}</p>
                                <span className="text-xl font-bold text-blue-600">
                                    ₹{item.price.toLocaleString()}
                                </span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="flex items-center border border-gray-300 rounded-lg">
                                    <button
                                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                        disabled={item.quantity <= 1}
                                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="px-3 font-medium">{item.quantity}</span>
                                    <button
                                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                                <span className="font-semibold">
                                    ₹{(item.price * item.quantity).toLocaleString()}
                                </span>
                                <button
                                    onClick={() => handleRemoveItem(item.id)}
                                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                                    title="Remove item"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
                <div className="card p-6 sticky top-24">
                    <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                    
                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Delivery Charge</span>
                            <span className="font-medium">{deliveryCharge === 0 ? 'Free' : `₹${deliveryCharge.toLocaleString()}`}</span>
                        </div>
                        <div className="border-t pt-3 flex justify-between">
                            <span className="font-bold text-lg">Total</span>
                            <span className="font-bold text-xl text-blue-600">₹{total.toLocaleString()}</span>
                        </div>
                    </div>

                    <Link to="/checkout" className="btn-primary w-full py-4 text-lg font-semibold">
                        Proceed to Checkout
                    </Link>

                    <Link to="/products" className="block text-center mt-4 text-gray-600 hover:text-blue-600 flex items-center justify-center">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CartPage