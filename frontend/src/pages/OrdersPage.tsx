import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, ArrowRight, Package } from 'lucide-react'
import { getOrders } from '../services/orderService'

const OrdersPage = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchOrders()
    }, [])

    const fetchOrders = async () => {
        try {
            const data = await getOrders()
            setOrders(data.orders || [])
        } catch (error) {
            console.error('Error fetching orders:', error)
            // Use mock data
            setOrders([
                {
                    id: 1,
                    order_number: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
                    date: new Date().toLocaleDateString(),
                    total: 29999,
                    status: 'confirmed',
                    products: [{ name: 'Modern Fabric 3-Seater Sofa', image: '/products/sofa-01.jpg', quantity: 1 }]
                }
            ])
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

    const statusLabels = {
        pending: 'Pending',
        confirmed: 'Confirmed',
        processing: 'Processing',
        shipped: 'Shipped',
        delivered: 'Delivered',
        cancelled: 'Cancelled'
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading orders...</p>
                </div>
            </div>
        )
    }

    if (orders.length === 0) {
        return (
            <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShoppingBag className="w-12 h-12 text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold mb-4">No orders yet</h2>
                <p className="text-gray-600 mb-8">Start shopping to see your orders here</p>
                <Link to="/products" className="btn-primary inline-flex items-center">
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Start Shopping
                </Link>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">My Orders</h1>

            {orders.map((order) => (
                <div key={order.id} className="card">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                        <div>
                            <h3 className="font-semibold text-lg">Order #{order.order_number || order.id}</h3>
                            <p className="text-gray-500 text-sm">{order.date}</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status] || statusColors.pending}`}>
                            {statusLabels[order.status] || order.status}
                        </div>
                    </div>

                    <div className="space-y-3 mb-4">
                        {order.products && order.products.map((product, index) => (
                            <div key={index} className="flex items-center">
                                <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                                    {product.image ? (
                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <Package className="w-6 h-6 text-gray-400" />
                                    )}
                                </div>
                                <div className="ml-4 flex-1">
                                    <h4 className="font-medium">{product.name}</h4>
                                    <p className="text-sm text-gray-500">Qty: {product.quantity}</p>
                                </div>
                                <span className="font-medium">₹{(product.price * product.quantity).toLocaleString()}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t">
                        <div>
                            <span className="text-gray-500 text-sm">Total: </span>
                            <span className="font-bold text-lg text-blue-600">₹{order.total.toLocaleString()}</span>
                        </div>
                        <Link to={`/orders/${order.id}`} className="btn-secondary inline-flex items-center">
                            View Details
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default OrdersPage