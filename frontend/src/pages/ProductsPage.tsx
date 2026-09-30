import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { 
    Search, 
    Filter, 
    ArrowUpDown,
    X,
    ShoppingBag
} from 'lucide-react'
import { getProducts, getCategories } from '../services/productService'

const ProductsPage = () => {
    const [searchParams] = useSearchParams()
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    
    // Filter states
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '')
    const [priceRange, setPriceRange] = useState('')
    const [sortOrder, setSortOrder] = useState('default')
    const [showFilters, setShowFilters] = useState(false)

    useEffect(() => {
        fetchProducts()
    }, [searchQuery, selectedCategory, priceRange, sortOrder])

    const fetchProducts = async () => {
        try {
            setLoading(true)
            
            // Get categories for filter
            const categoriesData = await getCategories()
            setCategories(categoriesData.categories || [])
            
            // Build filter params
            const params = {}
            if (searchQuery) params.search = searchQuery
            if (selectedCategory) params.category_id = categoriesData.categories?.find(c => c.name === selectedCategory)?.id
            if (priceRange) params.min_price = priceRange === 'low' ? 0 : priceRange === 'medium' ? 15000 : 30000
            
            // Fetch products
            const productsData = await getProducts(params)
            setProducts(productsData.products || [])
        } catch (error) {
            console.error('Error fetching products:', error)
            setProducts([])
        } finally {
            setLoading(false)
        }
    }

    const applyFilters = (e) => {
        e.preventDefault()
        fetchProducts()
    }

    const clearFilters = () => {
        setSearchQuery('')
        setSelectedCategory('')
        setPriceRange('')
        setSortOrder('default')
    }

    if (loading && products.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading products...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Filters */}
            <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                <div className="card p-6 sticky top-24">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold flex items-center">
                            <Filter className="w-5 h-5 mr-2" />
                            Filters
                        </h2>
                        <button onClick={clearFilters} className="text-sm text-blue-600 hover:text-blue-800">
                            Clear all
                        </button>
                    </div>

                    {/* Search */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="input-field"
                            />
                            <Search className="w-4 h-4 text-gray-400 absolute right-3 top-2.5" />
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="input-field"
                        >
                            <option value="">All Categories</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.name}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Price Range */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                        <select
                            value={priceRange}
                            onChange={(e) => setPriceRange(e.target.value)}
                            className="input-field"
                        >
                            <option value="">All Prices</option>
                            <option value="low">Under ₹15,000</option>
                            <option value="medium">₹15,000 - ₹30,000</option>
                            <option value="high">Above ₹30,000</option>
                        </select>
                    </div>

                    {/* Sort By */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="input-field"
                        >
                            <option value="default">Default</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="rating">Rating</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            <div className="lg:col-span-3">
                {/* Header with mobile filter button */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">All Products</h1>
                    <button 
                        className="lg:hidden flex items-center text-blue-600"
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <Filter className="w-5 h-5 mr-2" />
                        Filters
                    </button>
                </div>

                {/* Mobile search */}
                <div className="mb-6 lg:hidden">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input-field pl-10"
                        />
                        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    </div>
                </div>

                {products.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">No products found</h3>
                        <p className="text-gray-600 mb-6">Try changing your filters or search query</p>
                        <button onClick={clearFilters} className="btn-primary">
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
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
                    <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
                    <span className="text-lg font-bold">₹{product.price?.toLocaleString() || '0'}</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-500 text-sm">{product.category || 'Furniture'}</span>
                    <div className="flex items-center">
                        <div className="flex text-yellow-400">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <svg 
                                    key={star} 
                                    className={`w-4 h-4 ${star <= Math.floor(product.rating || 4) ? 'fill-current' : 'text-gray-300 fill-current'}`}
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <span className="ml-1 text-sm text-gray-500">({product.review_count || 0})</span>
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

export default ProductsPage