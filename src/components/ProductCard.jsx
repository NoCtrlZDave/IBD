import { Link } from 'react-router-dom';
import Reveal from './Reveal.jsx';
import { useCart } from '../context/cart-context.js';

function ProductCard({ product, delay = 0 }) {
    const { addItem } = useCart();
    const defaultSize = product.sizes?.[1] || product.sizes?.[0] || 'M';

    return (
        <Reveal className="product-card" delay={delay}>
            <div className="product-image-wrapper">
                <img
                    src={product.image}
                    alt={product.imageAlt}
                    loading="lazy"
                    className="product-img"
                />
                {product.badge && product.inStock && (
                    <span className="product-badge">{product.badge}</span>
                )}
                {!product.inStock && (
                    <span className="product-badge">Sold out</span>
                )}
                <Link
                    to={`/shop/${product.id}`}
                    className="product-overlay"
                    aria-label={`View ${product.name}`}
                >
                    <span>View details</span>
                </Link>
            </div>
            <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h3>
                    <Link to={`/shop/${product.id}`}>{product.name}</Link>
                </h3>
                <p className="product-description">{product.description}</p>
                <div className="product-footer">
                    <span className="product-price">
                        ${product.price.toFixed(2)}
                    </span>
                    <button
                        className="btn-add-to-cart"
                        disabled={!product.inStock}
                        onClick={() => addItem(product, defaultSize)}
                        aria-label={
                            product.inStock
                                ? `Add ${product.name} to cart`
                                : `${product.name} is sold out`
                        }
                    >
                        {product.inStock ? 'Add to cart' : 'Sold out'}
                    </button>
                </div>
            </div>
        </Reveal>
    );
}

export default ProductCard;
