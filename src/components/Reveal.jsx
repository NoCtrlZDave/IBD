import { useEffect, useState, useRef } from 'react';

const DEFAULT_THRESHOLD = 0.15;
const DEFAULT_ROOT_MARGIN = '0px 0px -100px 0px';

function Reveal({
    children,
    className = '',
    once = true,
    threshold = DEFAULT_THRESHOLD,
    rootMargin = DEFAULT_ROOT_MARGIN,
    delay = 0,
}) {
    const ref = useRef(null);
    const [revealed, setRevealed] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setRevealed(true);
                    if (once) observer.disconnect();
                } else if (!once) {
                    setRevealed(false);
                }
            },
            { threshold, rootMargin },
        );

        const el = ref.current;
        if (el) observer.observe(el);
        return () => observer.disconnect();
    }, [threshold, rootMargin, once]);

    const revealClass = revealed ? 'revealed' : 'reveal';
    const delayStyle = delay > 0 ? { transitionDelay: `${delay}s` } : undefined;

    return (
        <div
            ref={ref}
            className={[
                revealClass,
                className,
                delay > 0 ? `reveal-delay-${Math.round(delay * 10)}` : '',
            ]
                .filter(Boolean)
                .join(' ')}
            style={delayStyle}
        >
            {children}
        </div>
    );
}

export default Reveal;
