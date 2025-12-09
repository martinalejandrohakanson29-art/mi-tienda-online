import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import api from '../utils/api';

const Layout = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [config, setConfig] = useState(null);

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

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar setIsCartOpen={setIsCartOpen} />
            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} config={config} />
            <main className="flex-grow pt-16">
                {children}
            </main>
            <Footer config={config} />
        </div>
    );
};

export default Layout;
