import { useState, useEffect } from 'react';
import api from '../utils/api';

const AdminConfig = () => {
    const [config, setConfig] = useState({
        phone: '',
        instagram_link: '',
        tiktok_link: '',
        address: '',
        location_lat: 0,
        location_lng: 0
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const res = await api.get('/config');
                setConfig(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchConfig();
    }, []);

    const handleChange = (e) => {
        setConfig({ ...config, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put('/config', config);
            setMessage('Configuration updated successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            console.error(err);
            setMessage('Error updating configuration.');
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Store Configuration</h1>

            {message && (
                <div className={`p-4 mb-4 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-2xl">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                        WhatsApp Phone Number (with country code, e.g., 54911...)
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="phone"
                        name="phone"
                        type="text"
                        value={config.phone || ''}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                        Address
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="address"
                        name="address"
                        type="text"
                        value={config.address || ''}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="instagram_link">
                        Instagram Link
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="instagram_link"
                        name="instagram_link"
                        type="text"
                        value={config.instagram_link || ''}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tiktok_link">
                        TikTok Link
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="tiktok_link"
                        name="tiktok_link"
                        type="text"
                        value={config.tiktok_link || ''}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminConfig;
