import { useState, useEffect, useContext } from 'react';
import api from '../utils/api';
import { CartContext } from '../context/CartContext';

const Catalog = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get('/products');
                setProducts(res.data);
                setFilteredProducts(res.data);

                // Extract unique categories
                const uniqueCategories = ['All', ...new Set(res.data.map(p => p.category).filter(Boolean))];
                setCategories(uniqueCategories);
            } catch (err) {
                console.error(err);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        if (selectedCategory === 'All') {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products.filter(p => p.category === selectedCategory));
        }
    }, [selectedCategory, products]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Catalog</h1>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-8">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category
                                ? 'bg-gray-900 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                        <div className="h-64 w-full bg-gray-200">
                            <img
                                src={product.image_url || 'https://via.placeholder.com/300'}
                                alt={product.title}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                        <div className="p-4 flex-1 flex flex-col">
                            <h3 className="text-lg font-medium text-gray-900 mb-1">{product.title}</h3>
                            <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                            <p className="text-gray-600 text-sm mb-4 flex-1">{product.description}</p>
                            <div className="flex items-center justify-between mt-auto">
                                <span className="text-xl font-bold text-gray-900">${product.price}</span>
                                <button
                                    onClick={() => addToCart(product)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <p className="text-center text-gray-500 mt-10">No products found in this category.</p>
            )}
        </div>
    );
};

export default Catalog;
