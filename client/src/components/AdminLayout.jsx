import { useContext } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaBox, FaCog, FaImages, FaSignOutAlt, FaHome } from 'react-icons/fa';

const AdminLayout = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 text-white flex flex-col">
                <div className="p-4 text-2xl font-bold border-b border-gray-700">
                    Admin Panel
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <Link to="/admin" className="flex items-center p-2 hover:bg-gray-700 rounded">
                        <FaHome className="mr-3" /> Dashboard
                    </Link>
                    <Link to="/admin/products" className="flex items-center p-2 hover:bg-gray-700 rounded">
                        <FaBox className="mr-3" /> Products
                    </Link>
                    <Link to="/admin/config" className="flex items-center p-2 hover:bg-gray-700 rounded">
                        <FaCog className="mr-3" /> Configuration
                    </Link>
                    {/* Add Carousel management link if needed separately, or put in Config */}
                </nav>
                <div className="p-4 border-t border-gray-700">
                    <button onClick={handleLogout} className="flex items-center w-full p-2 hover:bg-red-600 rounded text-red-100">
                        <FaSignOutAlt className="mr-3" /> Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-8">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;
