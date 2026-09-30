import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

// Context
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'

// Layouts
import MainLayout from './layouts/MainLayout'

// Pages
import LandingPage from './pages/LandingPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProductsPage from './pages/ProductsPage'
import ProductDetails from './pages/ProductDetails'
import WishlistPage from './pages/WishlistPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import OrdersPage from './pages/OrdersPage'
import OrderDetails from './pages/OrderDetails'
import AIAssistant from './pages/AIAssistant'
import ImageSearch from './pages/ImageSearch'
import InteriorDesigner from './pages/InteriorDesigner'
import ARView from './pages/ARView'
import SellerDashboard from './pages/SellerDashboard'

// Services
import api from './services/api'

function App() {
    const [healthStatus, setHealthStatus] = useState('Checking backend...')

    useEffect(() => {
        const checkBackendHealth = async () => {
            try {
                const response = await api.get('/health')
                setHealthStatus(`Backend connected: ${response.data.status}`)
            } catch (error) {
                console.error('Backend connection error:', error)
                setHealthStatus('Backend not running. Please start the backend server.')
            }
        }
        checkBackendHealth()
    }, [])

    return (
        <Router>
            <AuthProvider>
                <CartProvider>
                    <div className="min-h-screen bg-gray-50">
                        {/* Backend Connection Status */}
                        <div className="fixed bottom-4 right-4 bg-white p-3 rounded-lg shadow-lg border text-sm z-50">
                            <div className={`font-medium ${healthStatus.includes('connected') ? 'text-green-600' : 'text-red-600'}`}>
                                {healthStatus}
                            </div>
                        </div>

                        <Routes>
                            <Route path="/" element={<LandingPage />} />
                            <Route path="/home" element={<MainLayout><HomePage /></MainLayout>} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/products" element={<MainLayout><ProductsPage /></MainLayout>} />
                            <Route path="/products/:id" element={<MainLayout><ProductDetails /></MainLayout>} />
                            <Route path="/wishlist" element={<MainLayout><WishlistPage /></MainLayout>} />
                            <Route path="/cart" element={<MainLayout><CartPage /></MainLayout>} />
                            <Route path="/checkout" element={<MainLayout><CheckoutPage /></MainLayout>} />
                            <Route path="/orders" element={<MainLayout><OrdersPage /></MainLayout>} />
                            <Route path="/orders/:id" element={<MainLayout><OrderDetails /></MainLayout>} />
                            <Route path="/ai-assistant" element={<MainLayout><AIAssistant /></MainLayout>} />
                            <Route path="/image-search" element={<MainLayout><ImageSearch /></MainLayout>} />
                            <Route path="/interior-designer" element={<MainLayout><InteriorDesigner /></MainLayout>} />
                            <Route path="/ar" element={<MainLayout><ARView /></MainLayout>} />
                            <Route path="/seller" element={<MainLayout><SellerDashboard /></MainLayout>} />
                            
                            <Route path="*" element={
                                <div className="min-h-screen flex items-center justify-center">
                                    <div className="text-center">
                                        <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
                                        <p className="text-gray-600">Page not found</p>
                                        <Link to="/home" className="text-blue-600 hover:underline mt-4 inline-block">
                                            Go Home
                                        </Link>
                                    </div>
                                </div>
                            } />
                        </Routes>
                    </div>
                </CartProvider>
            </AuthProvider>
        </Router>
    )
}

export default App