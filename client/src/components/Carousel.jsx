import { useState, useEffect } from 'react';
import api from '../utils/api';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Carousel = () => {
    const [slides, setSlides] = useState([]);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const fetchSlides = async () => {
            try {
                const res = await api.get('/carousel');
                setSlides(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchSlides();
    }, []);

    const nextSlide = () => {
        setCurrent(current === slides.length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? slides.length - 1 : current - 1);
    };

    if (slides.length === 0) return null;

    return (
        <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${index === current ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <img
                        src={slide.image_url}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                    />
                    {slide.title && (
                        <div className="absolute bottom-10 left-10 bg-black bg-opacity-50 text-white p-4 rounded">
                            <h2 className="text-2xl md:text-4xl font-bold">{slide.title}</h2>
                        </div>
                    )}
                </div>
            ))}

            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
            >
                <FaChevronLeft size={24} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
            >
                <FaChevronRight size={24} />
            </button>
        </div>
    );
};

export default Carousel;
