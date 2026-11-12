import { Link } from 'react-router-dom';
import { FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FaFacebookF } from 'react-icons/fa';
import { FaTiktok } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';

function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-section footer-brand">
                        <Link to="/" className="logo logo-link">
                            <div className="logo-box">IBD</div>
                            <div className="logo-text">
                                INSPIRED BY <strong>DENNIS</strong>
                            </div>
                        </Link>
                        <p>
                            Redefining street culture through contemporary design and
                            authentic style.
                        </p>
                    </div>

                    <div className="footer-section footer-col">
                        <h4>Shop</h4>
                        <ul>
                            <li><Link to="/shop">New Arrivals</Link></li>
                            <li><Link to="/shop?category=Basics">Basics</Link></li>
                            <li><Link to="/shop?category=Outerwear">Outerwear</Link></li>
                            <li><Link to="/shop?category=Accessories">Accessories</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section footer-col">
                        <h4>Support</h4>
                        <ul>
                            <li><Link to="/contact">Contact Us</Link></li>
                            <li><Link to="/contact">Shipping &amp; Returns</Link></li>
                            <li><Link to="/contact">Size Guide</Link></li>
                            <li><Link to="/contact">FAQ</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section footer-col connect">
                        <h4>Connect</h4>
                        <p>
                            Follow us on social media for the latest updates and style
                            inspiration.
                        </p>
                        <div className="social-links">
                            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                                <FaInstagram />
                            </a>
                            <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X (Twitter)">
                                <FaXTwitter />
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                                <FaFacebookF />
                            </a>
                            <a href="https://tiktok.com" target="_blank" rel="noreferrer" aria-label="TikTok">
                                <FaTiktok />
                            </a>
                            <a href="mailto:hello@inspiredbydennis.com" aria-label="Email us">
                                <MdEmail />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© 2026 Inspired by Dennis. All rights reserved.</p>
                    <div className="footer-links">
                        <Link to="/contact">Privacy Policy</Link>
                        <Link to="/contact">Terms of Service</Link>
                        <Link to="/contact">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
