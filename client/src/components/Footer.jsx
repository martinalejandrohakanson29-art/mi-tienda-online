import { FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa';

const Footer = ({ config }) => {
    return (
        <footer className="bg-gray-900 text-white pt-10 pb-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">Contact Us</h3>
                        <p className="mb-2">{config?.address || '123 Store Street, City'}</p>
                        <p className="mb-2">{config?.phone || '+1 234 567 890'}</p>
                        <div className="flex space-x-4 mt-4">
                            {config?.instagram_link && (
                                <a href={config.instagram_link} target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
                                    <FaInstagram size={24} />
                                </a>
                            )}
                            {config?.tiktok_link && (
                                <a href={config.tiktok_link} target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                                    <FaTiktok size={24} />
                                </a>
                            )}
                            {config?.phone && (
                                <a href={`https://wa.me/${config.phone}`} target="_blank" rel="noopener noreferrer" className="hover:text-green-500">
                                    <FaWhatsapp size={24} />
                                </a>
                            )}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="/" className="hover:text-gray-300">Home</a></li>
                            <li><a href="/catalog" className="hover:text-gray-300">Catalog</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-4">Location</h3>
                        <div className="bg-gray-700 h-48 w-full flex items-center justify-center rounded">
                            {/* Embed Google Maps here using config.location_lat/lng or address */}
                            <p className="text-gray-400">Google Maps Embed</p>
                        </div>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-700 pt-6 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} MyStore. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
