import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
    Heart, 
    ShoppingBag, 
    Star, 
    Shield,
    Truck,
    RefreshCw,
    Smartphone,
    Sparkles,
    Camera
} from 'lucide-react'
import { getProductById } from '../services/productService'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

const ProductDetails = () => {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [activeImage, setActiveImage] = useState(0)
    const { addToCart } = useCart()
    
    useEffect(() => {
        fetchProduct()
    }, [id])

    const fetchProduct = async () => {
        try {
            const data = await getProductById(id)
            setProduct(data.product)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching product:', error)
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading product...</p>
                </div>
            </div>
        )
    }

    if (!product) {
        return (
            <div className="text-center py-16">
                <h2 className="text-2xl font-bold mb-4">Product not found</h2>
                <Link to="/products" className="btn-primary">Browse Products</Link>
            </div>
        )
    }

    const handleAddToCart = () => {
        addToCart(product, 1)
    }

    const handleAddToWishlist = async () => {
        // Wishlist logic will be implemented
        alert('Added to wishlist!')
    }

    const handleBuyNow = () => {
        // Navigate to checkout
        window.location.href = '/checkout'
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Images */}
            <div>
                <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-4">
                    {product.image_urls ? (
                        <img 
                            src={product.image_urls[activeImage] || product.image_url} 
                            alt={product.name} 
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <img 
                            src={product.image_url} 
                            alt={product.name} 
                            className="w-full h-full object-cover"
                        />
                    )}
                </div>
                {product.image_urls && product.image_urls.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                        {product.image_urls.map((img, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveImage(index)}
                                className={`aspect-square rounded-lg overflow-hidden ${activeImage === index ? 'ring-2 ring-blue-600' : ''}`}
                            >
                                <img 
                                    src={img} 
                                    alt={`Product view ${index + 1}`} 
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div>
                <div className="mb-4">
                    <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                        {product.category}
                    </span>
                    <div className="flex items-center mt-2">
                        <div className="flex text-yellow-400">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <svg 
                                    key={star} 
                                    className={`w-5 h-5 ${star <= Math.floor(product.rating) ? 'fill-current' : 'text-gray-300 fill-current'}`}
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <span className="ml-2 text-gray-600">
                            {product.rating} ({product.review_count} reviews)
                        </span>
                    </div>
                </div>

                <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

                <div className="text-4xl font-bold text-blue-600 mb-6">
                    ₹{product.price.toLocaleString()}
                    {product.compare_at_price && (
                        <span className="text-xl text-gray-400 line-through ml-2">
                            ₹{product.compare_at_price.toLocaleString()}
                        </span>
                    )}
                    {product.discount_percentage > 0 && (
                        <span className="inline-block bg-green-100 text-green-600 ml-2 px-2 py-1 rounded text-sm font-medium">
                            {product.discount_percentage}% OFF
                        </span>
                    )}
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">
                    {product.description}
                </p>

                {/* Product Details */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="text-sm text-gray-500 mb-1">Material</h4>
                        <p className="font-medium">{product.material || '-'}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="text-sm text-gray-500 mb-1">Color</h4>
                        <p className="font-medium">{product.color || '-'}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="text-sm text-gray-500 mb-1">Dimensions</h4>
                        <p className="font-medium">
                            {product.length} x {product.width} x {product.height} cm
                        </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="text-sm text-gray-500 mb-1">Availability</h4>
                        <p className="font-medium">{product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}</p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <button 
                        onClick={handleAddToCart}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity flex items-center justify-center"
                    >
                        <ShoppingBag className="w-6 h-6 mr-2" />
                        Add to Cart
                    </button>
                    <button 
                        onClick={handleBuyNow}
                        className="flex-1 bg-gradient-to-r from-blue-700 to-purple-700 text-white py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity flex items-center justify-center"
                    >
                        Buy Now
                    </button>
                </div>

                <div className="flex gap-4 mb-6">
                    <button 
                        onClick={handleAddToWishlist}
                        className="flex-1 border-2 border-gray-300 text-gray-600 py-3 rounded-lg font-medium hover:border-red-500 hover:text-red-500 transition-colors flex items-center justify-center"
                    >
                        <Heart className="w-5 h-5 mr-2" />
                        Add to Wishlist
                    </button>
                </div>

                {/* AR Button */}
                {product.ar_compatible && (
                    <Link
                        to="/ar"
                        className="block w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity text-center mb-6"
                    >
                        <Smartphone className="w-5 h-5 mx-auto mb-1" />
                        View in AR
                    </Link>
                )}

                {/* Features */}
                <div className="space-y-3">
                    <div className="flex items-center">
                        <Shield className="w-5 h-5 text-green-600 mr-3" />
                        <span>100% Authentic Products</span>
                    </div>
                    <div className="flex items-center">
                        <Truck className="w-5 h-5 text-blue-600 mr-3" />
                        <span>Free Delivery on orders above ₹5,000</span>
                    </div>
                    <div className="flex items-center">
                        <RefreshCw className="w-5 h-5 text-purple-600 mr-3" />
                        <span>Easy Returns & Exchanges</span>
                    </div>
                    {product.ar_compatible && (
                        <div className="flex items-center">
                            <Smartphone className="w-5 h-5 text-cyan-600 mr-3" />
                            <span>AR-enabled for virtual preview</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProductDetails