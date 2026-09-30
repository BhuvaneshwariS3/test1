import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
    Search, 
    Sparkles, 
    Camera, 
    Layout, 
    TrendingUp,
    Star,
    ShoppingBag,
    ArrowRight
} from 'lucide-react'
import api from '../services/api'

const HomePage = () => {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            setLoading(true)
            
            // Fetch products from API
            const productsResponse = await api.get('/api/products/')
            setProducts(productsResponse.data.products || [])
            
            // Fetch categories from API
            const categoriesResponse = await api.get('/api/categories/')
            setCategories(categoriesResponse.data.categories || [])
        } catch (error) {
            console.error('Error fetching data:', error)
            // Use mock data if API fails
            setProducts([
                { id: 1, name: 'Modern Fabric 3-Seater Sofa', price: 29999, category: 'Sofas', image_url: '/products/sofa-02.jpg', rating: 4.5 },
                { id: 4, name: 'Ergonomic Office Chair', price: 12999, category: 'Chairs', image_url: '/products/chair-01.jpg', rating: 4.7 },
                { id: 6, name: 'Oak Coffee Table', price: 22999, category: 'Tables', image_url: '/products/table-01.jpg', rating: 4.5 },
                { id: 7, name: 'Platform Bed Frame Queen', price: 34999, category: 'Beds', image_url: '/products/bed-01.jpg', rating: 4.6 },
            ])
            setCategories([
                { id: 1, name: 'Sofas', product_count: 8 },
                { id: 2, name: 'Chairs', product_count: 10 },
                { id: 3, name: 'Tables', product_count: 7 },
                { id: 4, name: 'Beds', product_count: 6 },
                { id: 5, name: 'Office Furniture', product_count: 8 },
                { id: 6, name: 'Lamps', product_count: 6 },
                { id: 7, name: 'Home Decor', product_count: 10 },
            ])
        } finally {
            setLoading(false)
        }
    }

    const aiFeatures = [
        { icon: <Sparkles className="w-6 h-6" />, title: 'AI Assistant', description: 'Get personalized furniture recommendations', link: '/ai-assistant', color: 'from-blue-500 to-cyan-500' },
        { icon: <Camera className="w-6 h-6" />, title: 'Image Search', description: 'Upload images to find similar products', link: '/image-search', color: 'from-purple-500 to-pink-500' },
        { icon: <Layout className="w-6 h-6" />, title: 'Interior Design', description: 'Get room design suggestions', link: '/interior-designer', color: 'from-green-500 to-emerald-500' },
        { icon: <TrendingUp className="w-6 h-6" />, title: 'Recommendations', description: 'Smart product suggestions', link: '/recommendations', color: 'from-orange-500 to-red-500' }
    ]

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading ARCart AI...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                <div className="max-w-2xl">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        Welcome to ARCart AI
                    </h1>
                    <p className="text-xl opacity-90 mb-6">
                        Your AI-powered furniture shopping assistant is ready to help you find the perfect pieces for your space.
                    </p>
                    
                    <div className="bg-white rounded-lg p-2 flex items-center">
                        <Search className="w-5 h-5 text-gray-400 ml-3" />
                        <input
                            type="text"
                            placeholder="Search for furniture, decor, or ask AI..."
                            className="flex-1 px-4 py-3 outline-none text-gray-800"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && searchQuery.trim()) {
                                    window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`
                                }
                            }}
                        />
                        <button 
                            onClick={() => {
                                if (searchQuery.trim()) {
                                    window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`
                                }
                            }}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>

            {/* AI Features Grid */}
            <section>
                <h2 className="text-2xl font-bold mb-6">AI-Powered Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {aiFeatures.map((feature, index) => (
                        <Link
                            key={index}
                            to={feature.link}
                            className="card hover:shadow-lg transition-shadow duration-300 group"
                        >
                            <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-4`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                            <p className="text-gray-600 mb-4">{feature.description}</p>
                            <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-1 transition-transform">
                                <span>Try now</span>
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Categories */}
            <section>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Shop by Category</h2>
                    <Link to="/products" className="text-blue-600 hover:text-blue-700 font-medium">
                        View all
                    </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            to={`/products?category=${category.name.toLowerCase()}`}
                            className="card text-center hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-3">
                                <ShoppingBag className="w-8 h-8" />
                            </div>
                            <h3 className="font-semibold mb-1">{category.name}</h3>
                            <p className="text-sm text-gray-500">{category.product_count || 0} products</p>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Featured Products */}
            <section>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Featured Products</h2>
                    <Link to="/products" className="text-blue-600 hover:text-blue-700 font-medium">
                        View all products
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>

            {/* AR Experience CTA */}
            <section className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4">Try AR Furniture Visualization</h2>
                    <p className="text-gray-600 mb-6">
                        See how furniture looks in your space before buying. Use your camera to place products virtually.
                    </p>
                    <Link
                        to="/ar"
                        className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity"
                    >
                        <span className="mr-2">Start AR Experience</span>
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>
        </div>
    )
}

// Product Card Component
const ProductCard = ({ product }) => {
    return (
        <div className="card hover:shadow-lg transition-shadow duration-300">
            <Link to={`/products/${product.id}`} className="block">
                <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                    <img 
                        src={product.image_url || '/products/sofa-02.jpg'} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = '/products/sofa-02.jpg'
                        }}
                    />
                </div>
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <span className="text-lg font-bold">₹{product.price?.toLocaleString() || '0'}</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-500 text-sm">{product.category || 'Furniture'}</span>
                    <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm">{product.rating || '4.5'}</span>
                    </div>
                </div>
                <div className="flex space-x-3">
                    <Link to={`/products/${product.id}`} className="btn-primary flex-1 text-center">
                        View Details
                    </Link>
                    <Link to={`/products/${product.id}`} className="btn-outline">
                        <ShoppingBag className="w-4 h-4" />
                    </Link>
                </div>
            </Link>
        </div>
    )
}

export default HomePage