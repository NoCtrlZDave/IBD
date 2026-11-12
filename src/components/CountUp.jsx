import { useEffect, useRef, useState } from 'react';

const DURATION = 1800;
const DEFAULT_THRESHOLD = 0.4;

function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function CountUp({
    end,
    start = 0,
    suffix = '',
    prefix = '',
    duration = DURATION,
    className = '',
}) {
    const ref = useRef(null);
    const prefersReduced =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const [value, setValue] = useState(prefersReduced ? end : start);

    useEffect(() => {
        const el = ref.current;
        if (!el || prefersReduced) return undefined;

        let frame = 0;
        let startTime = 0;
        const range = end - start;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                observer.disconnect();

                const step = (timestamp) => {
                    if (!startTime) startTime = timestamp;
                    const progress = Math.min((timestamp - startTime) / duration, 1);
                    setValue(Math.round(start + easeOutExpo(progress) * range));
                    if (progress < 1) {
                        frame = requestAnimationFrame(step);
                    }
                };
                frame = requestAnimationFrame(step);
            },
            { threshold: DEFAULT_THRESHOLD },
        );

        observer.observe(el);
        return () => {
            observer.disconnect();
            cancelAnimationFrame(frame);
        };
    }, [end, start, duration, prefersReduced]);

    return (
        <span ref={ref} className={className}>
            {prefix}
            {value.toLocaleString()}
            {suffix}
        </span>
    );
}

export default CountUp;
