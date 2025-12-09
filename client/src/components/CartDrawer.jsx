import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { FaTimes, FaTrash, FaWhatsapp } from 'react-icons/fa';

const CartDrawer = ({ isOpen, onClose, config }) => {
    const { cart, removeFromCart, updateQuantity, getCartTotal } = useContext(CartContext);

    const handleCheckout = () => {
        if (!config?.phone) {
            alert("Store phone number not configured.");
            return;
        }

        const message = `Hola, quiero pedir:\n\n${cart.map(item => `- ${item.title} x${item.quantity} ($${item.price * item.quantity})`).join('\n')}\n\nTotal: $${getCartTotal()}\n\nMis datos son:\nNombre:\nDirección:`;

        const url = `https://wa.me/${config.phone}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <div className={`fixed inset-0 z-50 overflow-hidden ${isOpen ? '' : 'pointer-events-none'}`}>
            <div className={`absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`} onClick={onClose}></div>

            <div className={`fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-xl transform transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="h-full flex flex-col">
                    <div className="px-4 py-6 bg-gray-100 border-b flex justify-between items-center">
                        <h2 className="text-lg font-medium text-gray-900">Shopping Cart</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                            <FaTimes size={24} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4">
                        {cart.length === 0 ? (
                            <p className="text-center text-gray-500 mt-10">Your cart is empty.</p>
                        ) : (
                            <ul className="space-y-4">
                                {cart.map((item) => (
                                    <li key={item.id} className="flex py-2 border-b">
                                        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                            <img src={item.image_url || 'https://via.placeholder.com/150'} alt={item.title} className="h-full w-full object-cover object-center" />
                                        </div>
                                        <div className="ml-4 flex flex-1 flex-col">
                                            <div>
                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                    <h3>{item.title}</h3>
                                                    <p className="ml-4">${item.price * item.quantity}</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                <div className="flex items-center border rounded">
                                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 hover:bg-gray-100">-</button>
                                                    <span className="px-2">{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 hover:bg-gray-100">+</button>
                                                </div>
                                                <button type="button" onClick={() => removeFromCart(item.id)} className="font-medium text-red-600 hover:text-red-500">
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="border-t border-gray-200 p-4">
                        <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                            <p>Subtotal</p>
                            <p>${getCartTotal()}</p>
                        </div>
                        <button
                            onClick={handleCheckout}
                            disabled={cart.length === 0}
                            className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-400"
                        >
                            <FaWhatsapp className="mr-2" size={20} />
                            Confirmar Pedido en WhatsApp
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartDrawer;
