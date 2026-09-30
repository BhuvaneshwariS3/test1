import { useState } from 'react'
import { Plus, Edit, Trash2, Camera, Box, Tag, DollarSign } from 'lucide-react'
import { useCart } from '../context/CartContext'

const SellerDashboard = () => {
    const { addToCart } = useCart()
    const [products, setProducts] = useState([
        { id: 1, name: 'Modern Fabric 3-Seater Sofa', price: 29999, stock: 15, status: 'active' },
        { id: 2, name: 'Oak Coffee Table', price: 22999, stock: 8, status: 'active' },
        { id: 3, name: 'Ergonomic Office Chair', price: 12999, stock: 30, status: 'active' }
    ])
    const [showAddForm, setShowAddForm] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)
    
    const handleAddProduct = (e) => {
        e.preventDefault()
        // Add product logic
        const newProduct = {
            id: products.length + 1,
            name: e.target.productName.value,
            price: parseFloat(e.target.price.value),
            stock: parseInt(e.target.stock.value)
        }
        setProducts([...products, newProduct])
        setShowAddForm(false)
    }

    const handleDelete = (id) => {
        setProducts(products.filter(p => p.id !== id))
    }

    const handleEdit = (product) => {
        setSelectedProduct(product)
        // Edit logic
    }

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Seller Dashboard</h1>
                <button
                    onClick={() => setShowAddForm(true)}
                    className="btn-primary flex items-center"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Product
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="card p-4">
                    <div className="flex items-center">
                        <Box className="w-8 h-8 text-blue-600 mr-3" />
                        <div>
                            <p className="text-sm text-gray-600">Total Products</p>
                            <p className="text-2xl font-bold">{products.length}</p>
                        </div>
                    </div>
                </div>
                <div className="card p-4">
                    <div className="flex items-center">
                        <DollarSign className="w-8 h-8 text-green-600 mr-3" />
                        <div>
                            <p className="text-sm text-gray-600">Total Sales</p>
                            <p className="text-2xl font-bold">₹{products.reduce((sum, p) => sum + (p.price * p.stock), 0).toLocaleString()}</p>
                        </div>
                    </div>
                </div>
                <div className="card p-4">
                    <div className="flex items-center">
                        <Tag className="w-8 h-8 text-purple-600 mr-3" />
                        <div>
                            <p className="text-sm text-gray-600">Active Products</p>
                            <p className="text-2xl font-bold">{products.filter(p => p.status === 'active').length}</p>
                        </div>
                    </div>
                </div>
                <div className="card p-4">
                    <div className="flex items-center">
                        <Camera className="w-8 h-8 text-cyan-600 mr-3" />
                        <div>
                            <p className="text-sm text-gray-600">AR Products</p>
                            <p className="text-2xl font-bold">2</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="card hover:shadow-lg transition-shadow">
                        <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                            {product.image ? (
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="text-gray-400">Product Image</div>
                            )}
                        </div>
                        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-xl font-bold text-blue-600">₹{product.price.toLocaleString()}</span>
                            <span className={`px-2 py-1 rounded text-sm ${product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-800'}`}>
                                {product.status}
                            </span>
                        </div>
                        <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                            <span>Stock: {product.stock}</span>
                        </div>
                        <div className="flex space-x-3">
                            <button
                                onClick={() => handleEdit(product)}
                                className="flex-1 btn-secondary flex items-center justify-center"
                            >
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(product.id)}
                                className="flex-1 bg-red-500 text-white flex items-center justify-center hover:bg-red-600"
                            >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Product Modal */}
            {showAddForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 max-w-md w-full">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold">Add New Product</h2>
                            <button
                                onClick={() => setShowAddForm(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <span className="text-2xl">×</span>
                            </button>
                        </div>
                        <form onSubmit={handleAddProduct} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                                <input name="productName" type="text" required className="input-field" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-3 text-gray-500">₹</span>
                                    <input name="price" type="number" required className="input-field pl-8" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
                                <input name="stock" type="number" required className="input-field" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                <select className="input-field">
                                    <option value="furniture">Furniture</option>
                                    <option value="decor">Home Decor</option>
                                    <option value="office">Office Furniture</option>
                                </select>
                            </div>
                            <div className="flex space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowAddForm(false)}
                                    className="flex-1 btn-secondary"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="flex-1 btn-primary">
                                    Add Product
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SellerDashboard