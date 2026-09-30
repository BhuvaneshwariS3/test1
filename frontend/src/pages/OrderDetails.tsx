import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Package, Truck, CreditCard, Shield, ArrowLeft, CheckCircle } from 'lucide-react'
import { getOrderById } from '../services/orderService'

const OrderDetails = () => {
    const { id } = useParams()
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchOrder()
    }, [id])

    const fetchOrder = async () => {
        try {
            const data = await getOrderById(id)
            setOrder(data.order)
        } catch (error) {
            console.error('Error fetching order:', error)
            // Use mock data
            setOrder({
                id: id,
                order_number: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
                date: new Date().toLocaleDateString(),
                customer_name: 'Jane Customer',
                customer_email: 'customer1@arcart.ai',
                customer_phone: '+919876543211',
                address: '123 Main Street, Mumbai, Maharashtra 400001',
                products: [
                    { name: 'Modern Fabric 3-Seater Sofa', image: '/products/sofa-01.jpg', quantity: 1, price: 29999 }
                ],
                subtotal: 29999,
                delivery_charge: 0,
                total: 29999,
                status: 'confirmed'
            })
        } finally {
            setLoading(false)
        }
    }

    const statusColors = {
        pending: 'bg-yellow-100 text-yellow-800',
        confirmed: 'bg-blue-100 text-blue-800',
        processing: 'bg-purple-100 text-purple-800',
        shipped: 'bg-indigo-100 text-indigo-800',
        delivered: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800'
    }

    const statusIcons = {
        pending: '⏳',
        confirmed: '✅',
        processing: '📦',
        shipped: '🚚',
        delivered: '🎉',
        cancelled: '❌'
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading order details...</p>
                </div>
            </div>
        )
    }

    if (!order) {
        return (
            <div className="text-center py-16">
                <h2 className="text-2xl font-bold mb-4">Order not found</h2>
                <Link to="/orders" className="btn-primary">View All Orders</Link>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center">
                <Link to="/orders" className="mr-4">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-2xl font-bold">Order #{order.order_number}</h1>
            </div>

            {/* Order Status */}
            <div className="card p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 text-2xl ${statusColors[order.status]}`}>
                            {statusIcons[order.status]}
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Order Status</h3>
                            <p className="text-gray-600">{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-gray-600">Order Date</p>
                        <p className="font-medium">{order.date}</p>
                    </div>
                </div>
            </div>

            {/* Order Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Products */}
                <div className="lg:col-span-2">
                    <h2 className="text-xl font-bold mb-4">Products</h2>
                    <div className="space-y-4">
                        {order.products.map((product, index) => (
                            <div key={index} className="card flex items-center">
                                <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                    {product.image ? (
                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <Package className="w-8 h-8 text-gray-400" />
                                    )}
                                </div>
                                <div className="ml-4 flex-1">
                                    <h3 className="font-semibold text-lg">{product.name}</h3>
                                    <p className="text-gray-600">Qty: {product.quantity}</p>
                                </div>
                                <span className="font-bold text-xl text-blue-600">
                                    ₹{(product.price * product.quantity).toLocaleString()}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Order Details */}
                <div>
                    <div className="card p-6 sticky top-24">
                        <h2 className="text-xl font-bold mb-4">Order Details</h2>
                        
                        <div className="space-y-3 mb-6">
                            <div className="flex items-start">
                                <Package className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                                <div>
                                    <p className="text-sm text-gray-500">Order Number</p>
                                    <p className="font-medium">{order.order_number}</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <Truck className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                                <div>
                                    <p className="text-sm text-gray-500">Delivery Address</p>
                                    <p className="text-sm">{order.address}</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <CreditCard className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                                <div>
                                    <p className="text-sm text-gray-500">Payment Method</p>
                                    <p className="font-medium">Cash on Delivery</p>
                                </div>
                            </div>
                        </div>

                        <div className="border-t pt-4 space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="font-medium">₹{order.subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Delivery</span>
                                <span className="font-medium">{order.delivery_charge === 0 ? 'Free' : `₹${order.delivery_charge.toLocaleString()}`}</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span className="text-blue-600">₹{order.total.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetails