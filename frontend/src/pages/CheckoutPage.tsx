import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Shield, Truck, RefreshCw, ArrowLeft } from 'lucide-react'
import { useCart } from '../context/CartContext'

const CheckoutPage = () => {
    const { cartItems, subtotal, deliveryCharge, total, clearCart } = useCart()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: ''
    })
    const [paymentMethod, setPaymentMethod] = useState('cod')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            // Simulate order creation
            await new Promise(resolve => setTimeout(resolve, 2000))
            
            // Clear cart
            clearCart()
            localStorage.removeItem('cart')
            
            setSuccess(true)
        } catch (error) {
            console.error('Error creating order:', error)
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
                <Link to="/products" className="btn-primary inline-flex items-center">
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Continue Shopping
                </Link>
            </div>
        )
    }

    if (success) {
        return (
            <div className="text-center py-16">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Shield className="w-12 h-12 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Order Placed Successfully!</h2>
                <p className="text-gray-600 mb-8">Your order has been placed and is being processed.</p>
                <div className="bg-gray-50 p-6 rounded-lg max-w-md mx-auto mb-8">
                    <p className="font-semibold mb-2">Order Number: <span className="font-normal">#{Math.random().toString(36).substr(2, 9).toUpperCase()}</span></p>
                    <p className="text-sm text-gray-500">We'll send you a confirmation email shortly.</p>
                </div>
                <Link to="/orders" className="btn-primary inline-flex items-center mr-4">
                    View Orders
                </Link>
                <Link to="/products" className="btn-secondary inline-flex items-center">
                    Continue Shopping
                </Link>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-1">
                <div className="card p-6 sticky top-24">
                    <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                    
                    <div className="space-y-3 mb-6">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex justify-between text-sm">
                                <span>{item.name} x {item.quantity}</span>
                                <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                            </div>
                        ))}
                    </div>

                    <div className="border-t pt-4 space-y-3 mb-6">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Delivery</span>
                            <span className="font-medium">{deliveryCharge === 0 ? 'Free' : `₹${deliveryCharge.toLocaleString()}`}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold">
                            <span>Total</span>
                            <span className="text-blue-600">₹{total.toLocaleString()}</span>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-2">
                        <div className="flex items-center text-sm">
                            <Shield className="w-4 h-4 text-green-600 mr-2" />
                            <span>Secure Payment</span>
                        </div>
                        <div className="flex items-center text-sm">
                            <Truck className="w-4 h-4 text-blue-600 mr-2" />
                            <span>Free Delivery above ₹5,000</span>
                        </div>
                        <div className="flex items-center text-sm">
                            <RefreshCw className="w-4 h-4 text-purple-600 mr-2" />
                            <span>Easy Returns</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Checkout Form */}
            <div className="lg:col-span-2">
                <h1 className="text-2xl font-bold mb-6">Checkout</h1>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Customer Information */}
                    <div className="card p-6">
                        <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="input-field"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="input-field"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="input-field"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Delivery Address */}
                    <div className="card p-6">
                        <h2 className="text-lg font-semibold mb-4">Delivery Address</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 1 *</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="input-field"
                                    placeholder="House/Building/Street"
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="input-field"
                                    placeholder="City"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        className="input-field"
                                        placeholder="State"
                                        required
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        name="pincode"
                                        value={formData.pincode}
                                        onChange={handleChange}
                                        className="input-field"
                                        placeholder="PIN Code"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="card p-6">
                        <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
                        <div className="space-y-3">
                            <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer ${paymentMethod === 'cod' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'}`}>
                                <input
                                    type="radio"
                                    name="payment"
                                    value="cod"
                                    checked={paymentMethod === 'cod'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="hidden"
                                />
                                <div className="flex-1">
                                    <div className="font-medium">Cash on Delivery</div>
                                    <div className="text-sm text-gray-600">Pay when you receive your order</div>
                                </div>
                            </label>
                            <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer ${paymentMethod === 'online' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'}`}>
                                <input
                                    type="radio"
                                    name="payment"
                                    value="online"
                                    checked={paymentMethod === 'online'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="hidden"
                                />
                                <div className="flex-1">
                                    <div className="font-medium">Online Payment</div>
                                    <div className="text-sm text-gray-600">Payment gateway (Coming Soon)</div>
                                </div>
                                <span className="text-xs bg-gray-200 px-2 py-1 rounded">Soon</span>
                            </label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-center justify-between pt-6">
                        <Link to="/cart" className="btn-secondary flex items-center">
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Back to Cart
                        </Link>
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary py-3 px-8 text-lg font-semibold"
                        >
                            {loading ? (
                                <span className="flex items-center">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    Processing...
                                </span>
                            ) : (
                                `Pay ₹${total.toLocaleString()}`
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CheckoutPage