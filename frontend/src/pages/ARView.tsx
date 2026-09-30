import { useState, useEffect } from 'react'
import { Camera, RotateCw, Plus, Minus, ShoppingBag, Check } from 'lucide-react'
import { useCart } from '../context/CartContext'

const ARView = () => {
    const { addToCart } = useCart()
    const [products, setProducts] = useState([])
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [arMode, setArMode] = useState(false)
    const [productPosition, setProductPosition] = useState({ x: 0, y: 0, z: 0 })
    const [productRotation, setProductRotation] = useState(0)
    const [productScale, setProductScale] = useState(1)
    const [loading, setLoading] = useState(true)
    const [supported, setSupported] = useState(true)

    useEffect(() => {
        // Check for WebXR support
        setSupported('xr' in navigator || 'AR' in window)
        
        // Load AR-compatible products
        setProducts([
            { id: 1, name: 'Modern Fabric 3-Seater Sofa', price: 29999, image: '/products/sofa-01.jpg', has3D: true },
            { id: 2, name: 'Oak Coffee Table', price: 22999, image: '/products/table-01.jpg', has3D: true },
            { id: 3, name: 'Platform Bed Frame Queen', price: 34999, image: '/products/bed-01.jpg', has3D: true },
            { id: 4, name: 'Mid-Century Modern Chair', price: 15999, image: '/products/chair-02.jpg', has3D: true }
        ])
        setLoading(false)
    }, [])

    const handleProductSelect = (product) => {
        setSelectedProduct(product)
        setProductPosition({ x: 0, y: 0, z: 0 })
        setProductRotation(0)
        setProductScale(1)
    }

    const handleAddToCart = () => {
        if (selectedProduct) {
            addToCart(selectedProduct, 1)
            setSelectedProduct(null)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading AR products...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Product Selection */}
            <div className="lg:col-span-1">
                <h2 className="text-xl font-bold mb-4">Choose Product</h2>
                <div className="space-y-3">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            onClick={() => handleProductSelect(product)}
                            className={`p-4 rounded-lg cursor-pointer transition-all ${
                                selectedProduct?.id === product.id
                                    ? 'bg-blue-50 border-2 border-blue-600'
                                    : 'border border-gray-200 hover:border-blue-300'
                            }`}
                        >
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-sm">{product.name}</h3>
                                    <p className="text-blue-600 text-sm">₹{product.price.toLocaleString()}</p>
                                    {product.has3D && (
                                        <span className="text-xs text-cyan-600 flex items-center">
                                            <Check className="w-3 h-3 mr-1" /> AR Ready
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {arMode && selectedProduct && (
                    <div className="mt-6 card p-4">
                        <h3 className="font-semibold mb-3">Product Controls</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Scale</span>
                                <div className="flex space-x-2">
                                    <button onClick={() => setProductScale(Math.max(0.5, productScale - 0.1))} className="w-8 h-8 rounded bg-gray-200">
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="w-12 text-center text-sm">{(productScale * 100).toFixed(0)}%</span>
                                    <button onClick={() => setProductScale(productScale + 0.1)} className="w-8 h-8 rounded bg-gray-200">
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Rotation</span>
                                <div className="flex space-x-2">
                                    <button onClick={() => setProductRotation(productRotation - 15)} className="w-8 h-8 rounded bg-gray-200">
                                        <RotateCw className="w-4 h-4" />
                                    </button>
                                    <span className="w-12 text-center text-sm">{productRotation}°</span>
                                    <button onClick={() => setProductRotation(productRotation + 15)} className="w-8 h-8 rounded bg-gray-200">
                                        <RotateCw className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                className="w-full btn-primary"
                            >
                                <ShoppingBag className="w-4 h-4 mr-2" />
                                Add to Cart
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* AR View */}
            <div className="lg:col-span-3">
                <div className="bg-gray-900 rounded-2xl overflow-hidden h-[600px] relative flex flex-col">
                    <div className="absolute top-4 left-4 z-10 flex items-center space-x-2">
                        <Camera className="w-5 h-5 text-white" />
                        <span className="text-white font-semibold">AR Room View</span>
                        <button
                            onClick={() => setArMode(!arMode)}
                            className={`px-3 py-1 rounded-full text-sm font-medium ${arMode ? 'bg-cyan-600' : 'bg-gray-700'}`}
                        >
                            {arMode ? 'AR Active' : 'Simulated AR'}
                        </button>
                    </div>

                    <div className="flex-1 flex items-center justify-center relative">
                        {selectedProduct ? (
                            <div
                                className="transition-all duration-300"
                                style={{
                                    transform: `translate(${productPosition.x}px, ${productPosition.y}px) scale(${productScale}) rotate(${productRotation}deg)`
                                }}
                            >
                                <div className="w-64 h-64 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-2xl">
                                    <span className="text-4xl font-bold">AR View</span>
                                </div>
                                <div className="mt-2 text-center">
                                    <h3 className="font-semibold">{selectedProduct.name}</h3>
                                    <p className="text-blue-400">₹{selectedProduct.price.toLocaleString()}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center">
                                <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Camera className="w-10 h-10 text-gray-600" />
                                </div>
                                <p className="text-gray-400">Select a product to place in AR</p>
                            </div>
                        )}
                    </div>

                    {!supported && (
                        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-20">
                            <div className="text-center p-6">
                                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">⚠️</span>
                                </div>
                                <h3 className="text-xl font-bold mb-2">AR Not Supported</h3>
                                <p className="text-gray-300 mb-4">Your device/browser doesn't support AR</p>
                                <button
                                    onClick={() => setArMode(false)}
                                    className="btn-primary"
                                >
                                    Try 3D Preview Instead
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* AR Instructions */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="card text-center p-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-2">
                            1
                        </div>
                        <h4 className="font-semibold">Scan Room</h4>
                        <p className="text-sm text-gray-600">Point camera at your room floor</p>
                    </div>
                    <div className="card text-center p-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mx-auto mb-2">
                            2
                        </div>
                        <h4 className="font-semibold">Choose Product</h4>
                        <p className="text-sm text-gray-600">Select from our catalog</p>
                    </div>
                    <div className="card text-center p-4">
                        <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600 mx-auto mb-2">
                            3
                        </div>
                        <h4 className="font-semibold">Place & Enjoy</h4>
                        <p className="text-sm text-gray-600">Walk around and view from all angles</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ARView