import { useEffect, useState } from 'react';
import {
    LuArrowLeft,
    LuArrowRight,
    LuArrowUpRight,
    LuPause,
    LuPlay,
} from 'react-icons/lu';

function padSlideNumber(value) {
    return String(value).padStart(2, '0');
}

function HeroCarousel({ slides, label, cta, interval = 6000, className = '' }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isPlaying, setIsPlaying] = useState(
        () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    );

    const slideCount = slides.length;
    const supportsHover =
        typeof window !== 'undefined' &&
        window.matchMedia('(hover: hover)').matches;

    useEffect(() => {
        if (!isPlaying || isHovered || slideCount < 2) return undefined;

        const timer = window.setInterval(() => {
            if (document.hidden) return;
            setActiveIndex((index) => (index + 1) % slideCount);
        }, interval);

        return () => window.clearInterval(timer);
    }, [interval, isHovered, isPlaying, slideCount]);

    if (slideCount === 0) return null;

    const currentSlide = slides[activeIndex];

    const goToSlide = (index) => {
        setActiveIndex((index + slideCount) % slideCount);
    };

    const goToNext = () => {
        setActiveIndex((index) => (index + 1) % slideCount);
    };

    const goToPrevious = () => {
        setActiveIndex((index) => (index - 1 + slideCount) % slideCount);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            goToPrevious();
        } else if (event.key === 'ArrowRight') {
            event.preventDefault();
            goToNext();
        }
    };

    return (
        <div
            className={`hero-carousel ${className}`.trim()}
            role="region"
            aria-roledescription="carousel"
            aria-label={label}
            onMouseEnter={() => {
                if (supportsHover) setIsHovered(true);
            }}
            onMouseLeave={() => {
                if (supportsHover) setIsHovered(false);
            }}
            onKeyDown={handleKeyDown}
        >
            {slides.map((slide, index) => (
                <img
                    key={slide.src}
                    src={slide.src}
                    alt={slide.alt}
                    className={`hero-carousel-slide${index === activeIndex ? ' is-active' : ''}`}
                    style={slide.position ? { objectPosition: slide.position } : undefined}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    aria-hidden={index !== activeIndex}
                />
            ))}

            <div className="hero-carousel-overlay">
                <div className="hero-carousel-top">
                    <span className="hero-carousel-eyebrow">
                        {currentSlide.eyebrow}
                    </span>
                    <div className="hero-carousel-meta">
                        <span className="hero-carousel-count">
                            {padSlideNumber(activeIndex + 1)} /{' '}
                            {padSlideNumber(slideCount)}
                        </span>
                        <button
                            type="button"
                            className="hero-carousel-control"
                            onClick={() => setIsPlaying((playing) => !playing)}
                            aria-label={isPlaying ? 'Pause carousel' : 'Play carousel'}
                        >
                            {isPlaying ? (
                                <LuPause aria-hidden="true" />
                            ) : (
                                <LuPlay aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>

                <div className="hero-carousel-bottom">
                    <div className="hero-carousel-copy" key={activeIndex}>
                        <h2>{currentSlide.title}</h2>
                        <p>{currentSlide.caption}</p>
                        {cta ? (
                            <a className="hero-carousel-cta" href={cta.href}>
                                {cta.label}
                                <LuArrowUpRight aria-hidden="true" />
                            </a>
                        ) : null}
                    </div>

                    <div className="hero-carousel-nav">
                        <button
                            type="button"
                            className="hero-carousel-control"
                            onClick={goToPrevious}
                            aria-label="Previous slide"
                        >
                            <LuArrowLeft aria-hidden="true" />
                        </button>

                        <div className="hero-carousel-dots">
                            {slides.map((slide, index) => (
                                <button
                                    key={slide.src}
                                    type="button"
                                    className={`hero-carousel-dot${index === activeIndex ? ' is-active' : ''}`}
                                    onClick={() => goToSlide(index)}
                                    aria-label={`Go to slide ${index + 1}: ${slide.title}`}
                                    aria-current={
                                        index === activeIndex ? 'true' : undefined
                                    }
                                >
                                    <span
                                        className="hero-carousel-dot-line"
                                        aria-hidden="true"
                                    />
                                </button>
                            ))}
                        </div>

                        <button
                            type="button"
                            className="hero-carousel-control"
                            onClick={goToNext}
                            aria-label="Next slide"
                        >
                            <LuArrowRight aria-hidden="true" />
                        </button>
                    </div>
                </div>

                <p
                    className="visually-hidden"
                    aria-live={isPlaying ? 'off' : 'polite'}
                >
                    Slide {activeIndex + 1} of {slideCount}: {currentSlide.title}
                </p>
            </div>
        </div>
    );
}

export default HeroCarousel;
