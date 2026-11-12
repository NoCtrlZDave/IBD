import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaOpencart } from 'react-icons/fa';
import Reveal from '../components/Reveal.jsx';
import { useCart } from '../context/cart-context.js';

const FREE_SHIPPING_THRESHOLD = 150;

function Cart() {
    const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();
    const [checkedOut, setCheckedOut] = useState(false);

    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 12;
    const total = subtotal + shipping;

    if (checkedOut) {
        return (
            <div className="page cart-page">
                <section className="page-header">
                    <div className="container">
                        <h1>Order confirmed</h1>
                        <p>Thank you for shopping with IBD.</p>
                    </div>
                </section>
                <section className="section">
                    <div className="container">
                        <Reveal className="contact-success" delay={0.2}>
                            <div className="success-icon" aria-hidden="true">✓</div>
                            <h2>Order placed</h2>
                            <p>
                                This is a demo storefront, so no payment was taken. In
                                production you'd receive a confirmation email with your
                                tracking details shortly.
                            </p>
                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    clearCart();
                                    setCheckedOut(false);
                                }}
                            >
                                Continue shopping
                            </button>
                        </Reveal>
                    </div>
                </section>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="page cart-page">
                <section className="page-header">
                    <div className="container">
                        <h1>Your Cart</h1>
                        <p>Your bag is waiting to be filled.</p>
                    </div>
                </section>
                <section className="section">
                    <div className="container">
                        <Reveal className="cart-empty" delay={0.2}>
                            <div className="cart-empty-icon" aria-hidden="true">
                                <FaOpencart />
                            </div>
                            <h2>Your cart is empty</h2>
                            <p>
                                Browse the collection and add your favourite pieces to
                                get started.
                            </p>
                            <Link to="/shop" className="btn btn-primary btn-lg">
                                Shop the collection
                            </Link>
                        </Reveal>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="page cart-page">
            <section className="page-header">
                <div className="container">
                    <h1>Your Cart</h1>
                    <p>
                        {items.length} {items.length === 1 ? 'item' : 'items'} ready to
                        check out.
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="cart-layout">
                        <Reveal className="cart-items" delay={0.2}>
                            {items.map((item) => (
                                <div className="cart-item" key={item.key}>
                                    <Link
                                        to={`/shop/${item.id}`}
                                        className="cart-item-img"
                                        aria-label={`View ${item.name}`}
                                    >
                                        <img src={item.image} alt={item.imageAlt} />
                                    </Link>
                                    <div className="cart-item-info">
                                        <h3>
                                            <Link to={`/shop/${item.id}`}>
                                                {item.name}
                                            </Link>
                                        </h3>
                                        <div className="cart-item-meta">
                                            {item.category}
                                            {item.size ? ` · Size ${item.size}` : ''}
                                        </div>
                                        <div className="cart-item-controls">
                                            <div className="qty-stepper">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.key,
                                                            item.quantity - 1,
                                                        )
                                                    }
                                                    disabled={item.quantity <= 1}
                                                    aria-label={`Decrease quantity of ${item.name}`}
                                                >
                                                    −
                                                </button>
                                                <span className="qty-value">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.key,
                                                            item.quantity + 1,
                                                        )
                                                    }
                                                    disabled={item.quantity >= 10}
                                                    aria-label={`Increase quantity of ${item.name}`}
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <button
                                                type="button"
                                                className="cart-remove-btn"
                                                onClick={() => removeItem(item.key)}
                                                aria-label={`Remove ${item.name} from cart`}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                    <div className="cart-item-price">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </Reveal>

                        <Reveal className="cart-summary" delay={0.3}>
                            <h2>Order summary</h2>
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span className="summary-value">
                                    ${subtotal.toFixed(2)}
                                </span>
                            </div>
                            <div className="summary-row">
                                <span>Shipping</span>
                                <span className="summary-value">
                                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                                </span>
                            </div>
                            <div className="summary-row total">
                                <span>Total</span>
                                <span className="summary-value">
                                    ${total.toFixed(2)}
                                </span>
                            </div>
                            <button
                                className="btn btn-primary btn-block btn-lg"
                                onClick={() => setCheckedOut(true)}
                            >
                                Checkout
                            </button>
                            <p className="cart-summary-note">
                                {subtotal < FREE_SHIPPING_THRESHOLD
                                    ? `Add $${(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)} more for free shipping`
                                    : 'You’ve unlocked free shipping'}
                            </p>
                        </Reveal>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Cart;
