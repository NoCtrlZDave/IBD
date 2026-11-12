import { Link } from 'react-router-dom';
import { useCart } from '../context/cart-context.js';

function CartToast() {
    const { toast, dismissToast } = useCart();

    if (!toast) return null;

    return (
        <div className="cart-toast" role="status" aria-live="polite">
            <span className="cart-toast-icon" aria-hidden="true">✓</span>
            <span className="cart-toast-text">
                <strong>Added to cart</strong>
                <span>
                    {toast.name}
                    {toast.size ? ` · ${toast.size}` : ''}
                </span>
            </span>
            <Link
                to="/cart"
                className="cart-toast-link"
                onClick={dismissToast}
            >
                View cart
            </Link>
        </div>
    );
}

export default CartToast;
