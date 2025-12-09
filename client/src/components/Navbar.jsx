import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';

const Navbar = ({ setIsCartOpen }) => {
    const { cart } = useContext(CartContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <nav className="bg-white shadow-md fixed w-full z-10 top-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-bold text-gray-800">
                            MyStore
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
                        <Link to="/catalog" className="text-gray-600 hover:text-gray-900">Catalog</Link>
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative p-2 text-gray-600 hover:text-gray-900"
                        >
                            <FaShoppingCart size={24} />
                            {totalItems > 0 && (
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                                    {totalItems}
                                </span>
                            )}
                        </button>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative p-2 mr-4 text-gray-600 hover:text-gray-900"
                        >
                            <FaShoppingCart size={24} />
                            {totalItems > 0 && (
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                                    {totalItems}
                                </span>
                            )}
                        </button>
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600">
                            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" className="block px-3 py-2 text-gray-600 hover:text-gray-900" onClick={() => setIsMenuOpen(false)}>Home</Link>
                        <Link to="/catalog" className="block px-3 py-2 text-gray-600 hover:text-gray-900" onClick={() => setIsMenuOpen(false)}>Catalog</Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
