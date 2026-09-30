import { useState, useRef } from 'react'
import { Camera, Upload, X, Search } from 'lucide-react'
import { useCart } from '../context/CartContext'

const ImageSearch = () => {
    const { addToCart } = useCart()
    const [selectedImage, setSelectedImage] = useState(null)
    const [previewUrl, setPreviewUrl] = useState(null)
    const [searching, setSearching] = useState(false)
    const [results, setResults] = useState([])
    const fileInputRef = useRef(null)

    const handleImageSelect = (e) => {
        const file = e.target.files[0]
        if (file) {
            setSelectedImage(file)
            setPreviewUrl(URL.createObjectURL(file))
            setResults([])
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
            setResults([])
        }
    }

    const handleSearch = async () => {
        if (!selectedImage) return
        
        setSearching(true)
        
        // Simulate image search
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        setResults([
            { id: 1, name: 'Similar Sofa', price: 29999, similarity: '92%', image: '/products/sofa-01.jpg' },
            { id: 2, name: 'Modern Coffee Table', price: 22999, similarity: '85%', image: '/products/table-01.jpg' },
            { id: 3, name: 'Wooden Chair', price: 15999, similarity: '78%', image: '/products/chair-02.jpg' }
        ])
        
        setSearching(false)
    }

    const handleClear = () => {
        setSelectedImage(null)
        setPreviewUrl(null)
        setResults([])
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    const handleAddToCart = (product) => {
        addToCart(product, 1)
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Image Search</h1>
                <p className="text-gray-600">Upload a furniture image and we'll find similar products for you</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
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
                            <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600 mb-4">Drag and drop an image here, or click to browse</p>
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
                                Choose Image
                            </button>
                        </div>
                    ) : (
                        <div className="relative">
                            <img 
                                src={previewUrl} 
                                alt="Selected" 
                                className="max-h-64 mx-auto rounded-lg"
                            />
                            <button
                                onClick={handleClear}
                                className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-2 shadow-lg hover:bg-red-600"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Search Button */}
                {previewUrl && (
                    <div className="mt-6 text-center">
                        <button
                            onClick={handleSearch}
                            disabled={searching}
                            className="btn-primary px-8 py-3 text-lg font-semibold"
                        >
                            {searching ? (
                                <span className="flex items-center justify-center">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    Searching...
                                </span>
                            ) : (
                                <span className="flex items-center justify-center">
                                    <Search className="w-5 h-5 mr-2" />
                                    Find Similar Products
                                </span>
                            )}
                        </button>
                    </div>
                )}

                {/* Results */}
                {results.length > 0 && (
                    <div className="mt-8">
                        <h2 className="text-xl font-bold mb-4">Similar Products Found</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {results.map((product) => (
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
                                                <Search className="w-8 h-8" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-semibold">{product.name}</h3>
                                        <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                                            {product.similarity} Match
                                        </span>
                                    </div>
                                    <p className="text-blue-600 font-bold text-lg">₹{product.price.toLocaleString()}</p>
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

export default ImageSearch