import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Heart, ShoppingBag, Trash2, ArrowLeft } from 'lucide-react'
import { useCart } from '../context/CartContext'

const WishlistPage = () => {
    const { addToCart } = useCart()
    const [wishlistItems, setWishlistItems] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // In a real app, fetch from API
        const storedWishlist = localStorage.getItem('wishlist')
        if (storedWishlist) {
            setWishlistItems(JSON.parse(storedWishlist))
        }
        setLoading(false)
    }, [])

    const handleRemove = (productId) => {
        const updated = wishlistItems.filter(item => item.id !== productId)
        setWishlistItems(updated)
        localStorage.setItem('wishlist', JSON.stringify(updated))
    }

    const handleAddToCart = (product) => {
        addToCart(product, 1)
        handleRemove(product.id)
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading wishlist...</p>
                </div>
            </div>
        )
    }

    if (wishlistItems.length === 0) {
        return (
            <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart className="w-12 h-12 text-red-400" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
                <p className="text-gray-600 mb-8">Explore products and save your favorites</p>
                <Link to="/products" className="btn-primary inline-flex items-center">
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Explore Products
                </Link>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">My Wishlist ({wishlistItems.length} items)</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {wishlistItems.map((item) => (
                    <div key={item.id} className="card hover:shadow-lg transition-shadow duration-300">
                        <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                            {item.image ? (
                                <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="text-gray-400">Product Image</div>
                            )}
                        </div>
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-lg line-clamp-2">{item.name}</h3>
                            <button
                                onClick={() => handleRemove(item.id)}
                                className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                        <span className="text-xl font-bold text-blue-600 mb-4">
                            ₹{item.price.toLocaleString()}
                        </span>
                        <div className="flex space-x-3">
                            <button 
                                onClick={() => handleAddToCart(item)}
                                className="btn-primary flex-1 text-center"
                            >
                                Add to Cart
                            </button>
                            <Link to={`/products/${item.id}`} className="btn-outline flex-1">
                                View
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WishlistPage