import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaTruck, FaRotateLeft, FaShieldHeart } from 'react-icons/fa6';
import Reveal from '../components/Reveal.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { getProductById, PRODUCTS } from '../data/products';
import { useCart } from '../context/cart-context.js';

function ProductDetail() {
    const { id } = useParams();
    const product = useMemo(() => getProductById(id), [id]);
    const { addItem } = useCart();

    const [selectedSize, setSelectedSize] = useState(
        product ? product.sizes?.[1] || product.sizes?.[0] || 'M' : 'M',
    );
    const [quantity, setQuantity] = useState(1);

    if (!product) {
        return (
            <div className="page product-not-found">
                <span className="empty-icon" aria-hidden="true">
                    🔍
                </span>
                <h1>Product not found</h1>
                <p>The piece you're looking for doesn't exist or has moved.</p>
                <Link to="/shop" className="btn btn-primary">
                    Back to shop
                </Link>
            </div>
        );
    }

    const related = PRODUCTS.filter(
        (p) => p.category === product.category && p.id !== product.id,
    ).slice(0, 3);

    const handleAdd = () => {
        addItem(product, selectedSize, quantity);
        setQuantity(1);
    };

    return (
        <div className="page product-page">
            <section className="page-header">
                <div className="container">
                    <p style={{ marginBottom: '0.5rem' }}>
                        <Link to="/shop" className="link">
                            Shop
                        </Link>{' '}
                        <span aria-hidden="true">/</span> {product.category}
                    </p>
                    <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
                        {product.name}
                    </h1>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <Reveal className="product-detail-grid" delay={0.2}>
                        <div className="product-detail-media">
                            <img
                                src={product.image}
                                alt={product.imageAlt}
                                className="product-img"
                            />
                        </div>

                        <div className="product-detail-info">
                            <span className="product-category">
                                {product.category}
                            </span>
                            <h1>{product.name}</h1>
                            <div className="product-detail-price">
                                ${product.price.toFixed(2)}
                            </div>
                            <p className="product-detail-desc">
                                {product.description}
                            </p>

                            {product.sizes && (
                                <div>
                                    <span className="detail-label" id="size-label">
                                        Size
                                    </span>
                                    <div
                                        className="size-options"
                                        role="radiogroup"
                                        aria-labelledby="size-label"
                                    >
                                        {product.sizes.map((size) => (
                                            <button
                                                key={size}
                                                type="button"
                                                role="radio"
                                                aria-checked={selectedSize === size}
                                                className={`size-pill ${
                                                    selectedSize === size ? 'selected' : ''
                                                }`}
                                                onClick={() => setSelectedSize(size)}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="qty-row">
                                <span className="detail-label" style={{ margin: 0 }}>
                                    Quantity
                                </span>
                                <div className="qty-stepper">
                                    <button
                                        type="button"
                                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                        disabled={quantity <= 1}
                                        aria-label="Decrease quantity"
                                    >
                                        −
                                    </button>
                                    <span
                                        className="qty-value"
                                        aria-live="polite"
                                        aria-label={`Quantity ${quantity}`}
                                    >
                                        {quantity}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                                        disabled={quantity >= 10}
                                        aria-label="Increase quantity"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="detail-actions">
                                <button
                                    className="btn btn-primary btn-lg"
                                    disabled={!product.inStock}
                                    onClick={handleAdd}
                                >
                                    {product.inStock
                                        ? 'Add to cart'
                                        : 'Sold out'}
                                </button>
                                <Link to="/cart" className="btn btn-outline btn-lg">
                                    View cart
                                </Link>
                            </div>

                            <div className="detail-meta">
                                <div className="detail-meta-item">
                                    <FaTruck />
                                    Free shipping on orders over $150
                                </div>
                                <div className="detail-meta-item">
                                    <FaRotateLeft />
                                    30-day returns on unworn items
                                </div>
                                <div className="detail-meta-item">
                                    <FaShieldHeart />
                                    Premium materials, built to last
                                </div>
                            </div>
                        </div>
                    </Reveal>

                    {related.length > 0 && (
                        <div style={{ marginTop: 'clamp(4rem, 8vw, 6rem)' }}>
                            <div className="section-header">
                                <div className="section-badge">More like this</div>
                                <h2>You might also like</h2>
                            </div>
                            <div className="products-grid modern-grid">
                                {related.map((p, i) => (
                                    <ProductCard
                                        key={p.id}
                                        product={p}
                                        delay={0.1 + i * 0.08}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default ProductDetail;
