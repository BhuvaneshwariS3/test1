import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { 
    Home, 
    Search, 
    ShoppingBag, 
    Heart, 
    User, 
    LogOut, 
    Menu, 
    X,
    Layout,
    Sparkles,
    Camera,
    Palette
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

const Navbar = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { user, logout } = useAuth()
    const { itemCount } = useCart()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery)}`)
        }
    }

    const navigationItems = [
        { path: '/home', label: 'Home', icon: <Home className="w-5 h-5" /> },
        { path: '/products', label: 'Shop', icon: <ShoppingBag className="w-5 h-5" /> },
        { path: '/ai-assistant', label: 'AI Assistant', icon: <Sparkles className="w-5 h-5" /> },
        { path: '/image-search', label: 'Image Search', icon: <Camera className="w-5 h-5" /> },
        { path: '/interior-designer', label: 'Interior Design', icon: <Palette className="w-5 h-5" /> },
        { path: '/ar', label: 'AR View', icon: <Layout className="w-5 h-5" /> },
    ]

    return (
        <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg"></div>
                            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                ARCart AI
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navigationItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                                    location.pathname === item.path
                                        ? 'bg-blue-50 text-blue-600'
                                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                                }`}
                            >
                                {item.icon}
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                        </div>
                    </form>

                    {/* Right Side Icons */}
                    <div className="flex items-center space-x-2">
                        {/* Wishlist */}
                        <Link 
                            to="/wishlist" 
                            className="relative p-2 text-gray-600 hover:text-red-500 transition-colors"
                        >
                            <Heart className="w-6 h-6" />
                        </Link>

                        {/* Cart with count */}
                        <Link 
                            to="/cart" 
                            className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
                        >
                            <ShoppingBag className="w-6 h-6" />
                            {itemCount > 0 && (
                                <span className="absolute top-0 right-0 w-5 h-5 bg-blue-600 text-white text-xs font-bold flex items-center justify-center rounded-full">
                                    {itemCount}
                                </span>
                            )}
                        </Link>

                        {/* Auth State */}
                        {user ? (
                            <div className="flex items-center space-x-2">
                                <Link 
                                    to="/profile" 
                                    className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100"
                                >
                                    <User className="w-5 h-5" />
                                    <span className="hidden md:block font-medium">{user.full_name}</span>
                                </Link>
                                <button
                                    onClick={logout}
                                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Logout"
                                >
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                            >
                                Login
                            </Link>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden text-gray-600"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t py-4 space-y-2">
                        {navigationItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {item.icon}
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        ))}
                        
                        <div className="border-t pt-4 space-y-2">
                            <Link
                                to="/cart"
                                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50"
                            >
                                <ShoppingBag className="w-5 h-5" />
                                <span className="font-medium">Cart ({itemCount})</span>
                            </Link>
                            
                            {user ? (
                                <button
                                    onClick={() => {
                                        logout()
                                        setIsMobileMenuOpen(false)
                                    }}
                                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50"
                                >
                                    <LogOut className="w-5 h-5" />
                                    <span className="font-medium">Logout</span>
                                </button>
                            ) : (
                                <Link
                                    to="/login"
                                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-blue-600 hover:bg-blue-50"
                                >
                                    <User className="w-5 h-5" />
                                    <span className="font-medium">Login / Register</span>
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar