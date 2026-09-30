import { useState, useRef } from 'react'
import { Palette, Upload, Sparkles, X } from 'lucide-react'
import { useCart } from '../context/CartContext'

const InteriorDesigner = () => {
    const { addToCart } = useCart()
    const [selectedImage, setSelectedImage] = useState(null)
    const [previewUrl, setPreviewUrl] = useState(null)
    const [roomType, setRoomType] = useState('')
    const [analyzing, setAnalyzing] = useState(false)
    const [recommendations, setRecommendations] = useState([])
    const fileInputRef = useRef(null)

    const handleImageSelect = (e) => {
        const file = e.target.files[0]
        if (file) {
            setSelectedImage(file)
            setPreviewUrl(URL.createObjectURL(file))
            setRecommendations([])
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault()
    }

    const handleDrop = (e) => {
        e.preventDefault()
        const file = e.dataTransfer.files[0]
        if (file && file.type.startsWith('image/')) {
            setSelectedImage(file)
            setPreviewUrl(URL.createObjectURL(file))
            setRecommendations([])
        }
    }

    const analyzeRoom = async () => {
        if (!selectedImage || !roomType) return
        
        setAnalyzing(true)
        
        // Simulate room analysis
        await new Promise(resolve => setTimeout(resolve, 2500))
        
        setRecommendations([
            { id: 1, name: 'Modern Sectional Sofa', price: 54999, image: '/products/sofa-04.jpg', reason: 'Perfect for large living rooms' },
            { id: 2, name: 'Oak Coffee Table', price: 22999, image: '/products/table-01.jpg', reason: 'Complements your space' },
            { id: 3, name: 'Floor Lamp', price: 5999, image: '/products/lamp-01.jpg', reason: 'Adds ambient lighting' }
        ])
        
        setAnalyzing(false)
    }

    const handleAddToCart = (product) => {
        addToCart(product, 1)
    }

    const roomTypes = [
        { id: 'living', name: 'Living Room', icon: '🛋️' },
        { id: 'bedroom', name: 'Bedroom', icon: '🛏️' },
        { id: 'kitchen', name: 'Kitchen', icon: '🍳' },
        { id: 'office', name: 'Office', icon: '💼' },
        { id: 'dining', name: 'Dining Room', icon: '🍽️' }
    ]

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4">
                    <Palette className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold mb-2">AI Interior Designer</h1>
                <p className="text-gray-600">Upload your room photo and get furniture recommendations</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
                {/* Room Type Selector */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Room Type</label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        {roomTypes.map((room) => (
                            <button
                                key={room.id}
                                onClick={() => setRoomType(room.name)}
                                className={`p-3 rounded-lg border-2 flex flex-col items-center transition-all ${
                                    roomType === room.name 
                                        ? 'border-blue-600 bg-blue-50 text-blue-600' 
                                        : 'border-gray-200 hover:border-blue-300'
                                }`}
                            >
                                <span className="text-2xl mb-1">{room.icon}</span>
                                <span className="text-sm font-medium">{room.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Upload Area */}
                <div 
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                        previewUrl ? 'border-blue-600 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                    }`}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    {!previewUrl ? (
                        <div>
                            <Palette className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600 mb-4">Drag and drop your room image here</p>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageSelect}
                                className="hidden"
                            />
                            <button
                                onClick={() => fileInputRef.current.click()}
                                className="btn-primary"
                            >
                                <Upload className="w-5 h-5 mr-2" />
                                Choose Room Image
                            </button>
                        </div>
                    ) : (
                        <div className="relative">
                            <img 
                                src={previewUrl} 
                                alt="Room" 
                                className="max-h-64 mx-auto rounded-lg"
                            />
                            <button
                                onClick={() => {
                                    setSelectedImage(null)
                                    setPreviewUrl(null)
                                    setRecommendations([])
                                    if (fileInputRef.current) fileInputRef.current.value = ''
                                }}
                                className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-2 shadow-lg hover:bg-red-600"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Analyze Button */}
                {previewUrl && roomType && (
                    <div className="mt-6 text-center">
                        <button
                            onClick={analyzeRoom}
                            disabled={analyzing}
                            className="btn-primary px-8 py-3 text-lg font-semibold"
                        >
                            {analyzing ? (
                                <span className="flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
                                    Analyzing Room...
                                </span>
                            ) : (
                                <span className="flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 mr-2" />
                                    Get Recommendations
                                </span>
                            )}
                        </button>
                    </div>
                )}

                {/* Results */}
                {recommendations.length > 0 && (
                    <div className="mt-8">
                        <div className="flex items-center mb-4">
                            <Sparkles className="w-6 h-6 text-blue-600 mr-2" />
                            <h2 className="text-xl font-bold">Recommended for Your {roomType}</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {recommendations.map((product) => (
                                <div key={product.id} className="card hover:shadow-lg transition-shadow">
                                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                                        {product.image ? (
                                            <img 
                                                src={product.image} 
                                                alt={product.name} 
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-gray-400">
                                                <Palette className="w-8 h-8" />
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                                    <p className="text-sm text-gray-600 mb-3">
                                        <span className="text-green-600 font-medium">✓</span> {product.reason}
                                    </p>
                                    <p className="text-blue-600 font-bold text-xl">₹{product.price.toLocaleString()}</p>
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        className="mt-3 btn-primary w-full"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default InteriorDesigner