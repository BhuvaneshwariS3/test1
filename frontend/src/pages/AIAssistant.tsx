import { useState, useRef, useEffect } from 'react'
import { Sparkles, Send, X } from 'lucide-react'
import { useCart } from '../context/CartContext'

const AIAssistant = () => {
    const { addToCart } = useCart()
    const [messages, setMessages] = useState([
        { role: 'assistant', text: "Hello! I'm your AI shopping assistant. I can help you find the perfect furniture for your space. What are you looking for?" }
    ])
    const [inputMessage, setInputMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return

        const userMessage = { role: 'user', text: inputMessage }
        setMessages(prev => [...prev, userMessage])
        setInputMessage('')
        setLoading(true)

        try {
            // In production, call actual AI API
            await new Promise(resolve => setTimeout(resolve, 1500))

            const responseMessage = await processUserRequest(inputMessage)
            setMessages(prev => [...prev, responseMessage])
        } catch (error) {
            setMessages(prev => [...prev, { role: 'assistant', text: "I'm having trouble processing your request. Please try again." }])
        } finally {
            setLoading(false)
        }
    }

    const processUserRequest = async (message) => {
        // Simple rule-based AI response
        const lowerMessage = message.toLowerCase()

        if (lowerMessage.includes('sofa') || lowerMessage.includes('couch')) {
            return {
                role: 'assistant',
                text: "I found some great sofas for you! Based on your request, here are some recommendations:",
                products: [
                    { id: 1, name: 'Modern Fabric 3-Seater Sofa', price: 29999, image: '/products/sofa-01.jpg' },
                    { id: 2, name: 'Luxury Leather Corner Sofa', price: 64999, image: '/products/sofa-02.jpg' }
                ]
            }
        }

        if (lowerMessage.includes('chair')) {
            return {
                role: 'assistant',
                text: "I found some excellent chairs! Here are my recommendations:",
                products: [
                    { id: 3, name: 'Ergonomic Office Chair', price: 12999, image: '/products/chair-01.jpg' },
                    { id: 4, name: 'Mid-Century Modern Chair', price: 15999, image: '/products/chair-02.jpg' }
                ]
            }
        }

        if (lowerMessage.includes('bed') || lowerMessage.includes('table')) {
            return {
                role: 'assistant',
                text: "I found some nice furniture for you!",
                products: [
                    { id: 5, name: 'Oak Coffee Table', price: 22999, image: '/products/table-01.jpg' },
                    { id: 6, name: 'Platform Bed Frame Queen', price: 34999, image: '/products/bed-01.jpg' }
                ]
            }
        }

        return {
            role: 'assistant',
            text: "I can help you find furniture, chairs, tables, beds, and more! Tell me what you're looking for.",
            products: [
                { id: 1, name: 'Modern Fabric 3-Seater Sofa', price: 29999, image: '/products/sofa-01.jpg' },
                { id: 3, name: 'Ergonomic Office Chair', price: 12999, image: '/products/chair-01.jpg' }
            ]
        }
    }

    const handleAddToCart = (product) => {
        addToCart(product, 1)
        setMessages(prev => [...prev, { role: 'assistant', text: `Added ${product.name} to your cart!` }])
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-120px)]">
            {/* Chat Area */}
            <div className="lg:col-span-2 flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Sparkles className="w-6 h-6 text-white mr-2" />
                            <h2 className="text-xl font-bold text-white">AI Shopping Assistant</h2>
                        </div>
                        <button className="text-white opacity-70 hover:opacity-100">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {messages.map((message, index) => (
                        <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                                message.role === 'user' 
                                    ? 'bg-blue-600 text-white rounded-br-none' 
                                    : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                            }`}>
                                {message.text}
                            </div>
                        </div>
                    ))}

                    {loading && (
                        <div className="flex justify-start">
                            <div className="bg-white rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                                <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t">
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSendMessage()
                            }}
                            placeholder="Ask me for furniture recommendations..."
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button
                            onClick={handleSendMessage}
                            disabled={loading || !inputMessage.trim()}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Product Recommendations */}
            <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-lg p-4 h-full overflow-y-auto">
                    <h3 className="text-lg font-bold mb-4 flex items-center">
                        <Sparkles className="w-5 h-5 text-blue-600 mr-2" />
                        Recommended for You
                    </h3>

                    {products.length > 0 ? (
                        <div className="space-y-4">
                            {products.map((product) => (
                                <div key={product.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                                        {product.image ? (
                                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-gray-400">
                                                <ShoppingBag className="w-6 h-6" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-sm truncate">{product.name}</h4>
                                        <p className="text-blue-600 font-medium">₹{product.price.toLocaleString()}</p>
                                    </div>
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                                    >
                                        Add
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500">Ask me what you're looking for!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AIAssistant