import { Link } from 'react-router-dom'
import { 
    Sparkles, 
    Package, 
    Camera, 
    ShoppingBag, 
    Shield, 
    Zap,
    Layout,
    Palette,
    Smartphone
} from 'lucide-react'

const LandingPage = () => {
    const features = [
        { icon: <Package className="w-8 h-8" />, title: 'AR Furniture Visualization', description: 'Place furniture in your room using augmented reality before buying.' },
        { icon: <Sparkles className="w-8 h-8" />, title: 'AI Shopping Assistant', description: 'Get personalized furniture recommendations based on your style and space.' },
        { icon: <Camera className="w-8 h-8" />, title: 'Image Search', description: 'Upload a picture of furniture you like and find similar products.' },
        { icon: <Palette className="w-8 h-8" />, title: 'Interior Design', description: 'Upload room photos for AI-powered design recommendations.' },
        { icon: <Shield className="w-8 h-8" />, title: 'Secure Shopping', description: 'Safe transactions and buyer protection on all purchases.' },
        { icon: <Zap className="w-8 h-8" />, title: 'Fast Delivery', description: 'Quick shipping and professional assembly services available.' }
    ]

    return (
        <div className="min-h-screen">
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50 border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg"></div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                ARCart AI
                            </span>
                        </Link>
                        <div className="flex items-center space-x-6">
                            <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium">
                                Login
                            </Link>
                            <Link to="/register" className="btn-primary">
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-24 pb-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                            Shop Smarter. <br />
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Visualize Better.
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                            Visualize furniture in your space before buying. Our AI-powered platform combines computer vision, augmented reality, and smart recommendations for the perfect shopping experience.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/register" className="btn-primary text-lg px-8 py-4">
                                <span className="flex items-center justify-center gap-2">
                                    <ShoppingBag className="w-5 h-5" />
                                    Shop Furniture
                                </span>
                            </Link>
                            <Link to="/ar" className="btn-outline text-lg px-8 py-4">
                                <span className="flex items-center justify-center gap-2">
                                    <Smartphone className="w-5 h-5" />
                                    Try AR
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* AI Shopping Section */}
            <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">AI Shopping Assistant</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Ask our AI assistant for personalized furniture recommendations based on your style, space, and budget.
                        </p>
                        <div className="mt-8">
                            <Link to="/ai-assistant" className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                                <Sparkles className="w-5 h-5 mr-2" />
                                Ask AI Assistant
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* AR Experience Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">AR Experience</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            See how furniture looks in your space before buying.
                        </p>
                    </div>
                    <div className="max-w-2xl mx-auto">
                        <div className="flex flex-col items-center space-y-4">
                            {[
                                { step: '1', title: 'Scan Room', desc: 'Use your phone camera' },
                                { step: '2', title: 'Choose Product', desc: 'Select from our catalog' },
                                { step: '3', title: 'Place in AR', desc: 'Visualize in your space' },
                                { step: '4', title: 'Walk Around', desc: 'View from all angles' },
                                { step: '5', title: 'Purchase', desc: 'Buy with confidence' }
                            ].map((item) => (
                                <div key={item.step} className="flex items-center w-full space-x-4">
                                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                                        {item.step}
                                    </div>
                                    <div className="flex-1 border-t-2 border-gray-200"></div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold">{item.title}</h3>
                                        <p className="text-sm text-gray-500">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="text-center mt-12">
                        <Link to="/ar" className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity">
                            <Layout className="w-6 h-6 mr-2" />
                            Try AR Experience
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Why Choose ARCart AI</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            We're revolutionizing furniture shopping with cutting-edge technology
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="card hover:shadow-lg transition-shadow duration-300">
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                                    <p className="text-gray-600">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Space?</h2>
                        <p className="text-xl mb-8 opacity-90">
                            Join thousands of customers who are shopping smarter with ARCart AI
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/register" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg text-lg transition-colors">
                                Create Free Account
                            </Link>
                            <Link to="/products" className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold py-3 px-8 rounded-lg text-lg transition-colors">
                                Browse Products
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 bg-gray-900 text-gray-300">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded-lg"></div>
                                <span className="text-2xl font-bold text-white">ARCart AI</span>
                            </div>
                            <p className="mt-2 text-gray-400">AI-powered AR furniture shopping</p>
                        </div>
                        <div className="text-center md:text-right">
                            <p className="text-gray-400">© 2024 ARCart AI. All rights reserved.</p>
                            <p className="text-sm text-gray-500 mt-1">Built with React, FastAPI, and AI</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default LandingPage