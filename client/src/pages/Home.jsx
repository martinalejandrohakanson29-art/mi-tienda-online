import { useState, useEffect } from 'react';
import Carousel from '../components/Carousel';
import api from '../utils/api';
import { Link } from 'react-router-dom';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get('/products');
                // Just take the first 4 as featured for now
                setFeaturedProducts(res.data.slice(0, 4));
            } catch (err) {
                console.error(err);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div>
            <Carousel />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Products</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuredProducts.map((product) => (
                        <div key={product.id} className="group relative">
                            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
                                <img
                                    src={product.image_url || 'https://via.placeholder.com/300'}
                                    alt={product.title}
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full group-hover:opacity-75"
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <Link to="/catalog">
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            {product.title}
                                        </Link>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                                </div>
                                <p className="text-sm font-medium text-gray-900">${product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link to="/catalog" className="inline-block bg-gray-900 text-white px-8 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors">
                        View All Products
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
