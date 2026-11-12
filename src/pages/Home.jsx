import { useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';
import CountUp from '../components/CountUp.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { PRODUCTS } from '../data/products';

const MARQUEE_WORDS = [
    'Inspired by Dennis',
    'New Collection 2026',
    'Free shipping over $150',
    'New drop live',
    'Designed for the culture',
];

function Marquee() {
    const track = [...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS];
    return (
        <div className="marquee" aria-hidden="true">
            <div className="marquee-track">
                {track.map((word, i) => (
                    <span className="marquee-item" key={`${word}-${i}`}>
                        {word} <span className="star">✦</span>
                    </span>
                ))}
            </div>
        </div>
    );
}

function Home() {
    return (
        <div className="page home-page">
            {/* Hero */}
            <Reveal className="hero" delay={0.1}>
                <img
                    src="/images/WhatsApp Image 2025-11-11 at 10.56.59_e4b3eb60.jpg"
                    alt="IBD streetwear model wearing the new collection"
                    className="hero-bg"
                />
                <div className="hero-overlay" aria-hidden="true" />
                <div className="hero-content">
                    <Reveal className="section-badge" delay={0.4}>
                        <span aria-hidden="true">✦</span> New Collection 2026
                    </Reveal>
                    <Reveal delay={0.6}>
                        <h1>
                            Redefining <strong>Street Culture</strong>
                        </h1>
                    </Reveal>
                    <Reveal className="hero-description" delay={0.8}>
                        <p>
                            Redefining street culture through contemporary design and
                            authentic style. Premium essentials crafted for those who
                            lead, never follow.
                        </p>
                    </Reveal>
                    <Reveal className="hero-actions" delay={1.0}>
                        <Link to="/shop" className="btn btn-primary btn-lg">
                            Shop Now
                        </Link>
                        <Link to="/shop" className="btn btn-outline btn-lg">
                            View Collection
                        </Link>
                    </Reveal>
                </div>
                <Marquee />
            </Reveal>

            {/* Featured Products */}
            <Reveal className="section section-products" delay={0.2}>
                <div className="container">
                    <div className="section-header">
                        <div className="section-badge">Featured</div>
                        <h2>This Season's Favourites</h2>
                        <p className="section-intro">
                            Handpicked pieces that define the collection. New arrivals
                            landing weekly.
                        </p>
                    </div>
                    <div className="products-grid modern-grid">
                        {PRODUCTS.slice(0, 6).map((product, index) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                delay={0.1 + index * 0.08}
                            />
                        ))}
                    </div>
                    <div className="view-all">
                        <Link to="/shop" className="btn btn-outline">
                            View full collection
                        </Link>
                    </div>
                </div>
            </Reveal>

            {/* Lookbook */}
            <Reveal className="section section-lookbook bg-dark" delay={0.2}>
                <div className="container">
                    <div className="section-header">
                        <div className="section-badge">Lookbook</div>
                        <h2>Worn in the wild</h2>
                        <p className="section-intro">
                            Real fits, real streets. Tag @inspiredbydennis to be featured.
                        </p>
                    </div>
                    <Reveal className="bento-grid" delay={0.3}>
                        <div className="bento-item large">
                            <img
                                src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=1200&h=1200&fit=crop&q=80"
                                alt="Street style look from the IBD collection"
                                loading="lazy"
                                className="bento-img"
                            />
                            <div className="bento-content">
                                <h3>The Street Edit</h3>
                                <p>Layered essentials built for the city.</p>
                                <Link to="/shop?category=Outerwear" className="btn btn-sm btn-outline">
                                    Shop Outerwear
                                </Link>
                            </div>
                        </div>
                        <div className="bento-item tall">
                            <img
                                src="https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=800&h=1200&fit=crop&q=80"
                                alt="Portrait wearing IBD essentials"
                                loading="lazy"
                                className="bento-img"
                            />
                            <div className="bento-content">
                                <h3>Daily Basics</h3>
                                <Link to="/shop?category=Basics" className="btn btn-sm btn-outline">
                                    Shop Basics
                                </Link>
                            </div>
                        </div>
                        <div className="bento-item">
                            <img
                                src="https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&h=800&fit=crop&q=80"
                                alt="IBD sneakers and accessories"
                                loading="lazy"
                                className="bento-img"
                            />
                            <div className="bento-content">
                                <h3>Accessories</h3>
                                <Link to="/shop?category=Accessories" className="btn btn-sm btn-outline">
                                    Shop Now
                                </Link>
                            </div>
                        </div>
                        <div className="bento-item">
                            <img
                                src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=800&fit=crop&q=80"
                                alt="IBD flagship store interior"
                                loading="lazy"
                                className="bento-img"
                            />
                            <div className="bento-content">
                                <h3>New Drop</h3>
                                <Link to="/shop" className="btn btn-sm btn-outline">
                                    Explore
                                </Link>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </Reveal>

            {/* Our Story */}
            <Reveal className="section section-about-preview" delay={0.2}>
                <div className="container">
                    <div className="section-header">
                        <div className="section-badge">Our beginning</div>
                        <h2>From Vision to Movement</h2>
                        <p className="section-intro">
                            IBD was born from a passion for authentic street culture and
                            contemporary design.
                        </p>
                    </div>
                    <div className="about-preview-grid">
                        <Reveal className="about-preview-content" delay={0.3}>
                            <p>
                                Founded in 2020 by Dennis, IBD Streetwear emerged from a simple
                                yet powerful idea: streetwear should be more than just
                                clothing—it should be a form of self-expression, a statement of
                                individuality, and a celebration of urban culture.
                            </p>
                            <p>
                                What started as a small collection of hand-printed t-shirts has
                                grown into a globally recognized brand, worn by artists,
                                musicians, and style enthusiasts who value authenticity and
                                quality. Dennis' vision was to bridge the gap between
                                high-fashion aesthetics and accessible streetwear, creating
                                pieces that tell stories and inspire confidence.
                            </p>
                            <Link to="/about" className="btn btn-outline">
                                Read our story
                            </Link>
                        </Reveal>
                        <Reveal className="about-preview-image" delay={0.4}>
                            <img
                                src="/images/about.jpeg"
                                alt="The IBD studio and team at work"
                                loading="lazy"
                                className="about-preview-img"
                            />
                        </Reveal>
                    </div>
                    <Reveal className="stats-grid" delay={0.5}>
                        <div className="stat-card">
                            <h3>
                                <CountUp end={2020} start={2015} duration={1400} />
                            </h3>
                            <p>Founded</p>
                        </div>
                        <div className="stat-card">
                            <h3>
                                <CountUp end={50} suffix="K+" />
                            </h3>
                            <p>Customers</p>
                        </div>
                        <div className="stat-card">
                            <h3>
                                <CountUp end={100} suffix="+" />
                            </h3>
                            <p>Products</p>
                        </div>
                    </Reveal>
                </div>
            </Reveal>

            {/* Newsletter */}
            <Reveal className="section newsletter-section" delay={0.2}>
                <div className="container">
                    <NewsletterForm />
                </div>
            </Reveal>
        </div>
    );
}

function NewsletterForm() {
    const [subscribed, setSubscribed] = useState(false);
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
        setSubscribed(true);
    };

    if (subscribed) {
        return (
            <div className="newsletter-content">
                <h2>Join the community</h2>
                <div className="newsletter-success" role="status">
                    <span aria-hidden="true">✓</span> You're on the list. Watch your
                    inbox for the next drop.
                </div>
            </div>
        );
    }

    return (
        <div className="newsletter-content">
            <h2>Join the community</h2>
            <p>
                Subscribe for early access to new drops, exclusive offers, and style
                inspiration.
            </p>
            <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
                <input
                    type="email"
                    placeholder="Enter your email"
                    required
                    aria-label="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">
                    Subscribe
                </button>
            </form>
            <p className="form-note">No spam. Unsubscribe anytime.</p>
        </div>
    );
}

export default Home;
