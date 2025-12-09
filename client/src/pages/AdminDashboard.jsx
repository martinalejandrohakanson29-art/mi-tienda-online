import { Link } from 'react-router-dom';
import { FaBox, FaCog } from 'react-icons/fa';

const AdminDashboard = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link to="/admin/products" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center">
                    <div className="p-4 bg-blue-100 rounded-full text-blue-600 mr-4">
                        <FaBox size={32} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Manage Products</h2>
                        <p className="text-gray-500">Add, edit, or delete products.</p>
                    </div>
                </Link>

                <Link to="/admin/config" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center">
                    <div className="p-4 bg-green-100 rounded-full text-green-600 mr-4">
                        <FaCog size={32} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Store Configuration</h2>
                        <p className="text-gray-500">Update contact info and links.</p>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default AdminDashboard;
