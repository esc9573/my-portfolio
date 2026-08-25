import { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({ children }) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true); // السكشن يظهر أول ما يوصل له السكرول
                }
            },
            { threshold: 0.15 } // نسبة ظهور السكشن على الشاشة عشان يبدأ الأنيميشن
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 ease-out transform ${isVisible
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-16 scale-95'
                }`}
        >
            {children}
        </div>
    );
}