import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaShieldAlt, FaArrowLeft } from 'react-icons/fa';
import { FaGoogle, FaApple } from 'react-icons/fa6';

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState(null);

    const validate = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = 'Email address is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setStatus(null);
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus(null);
        if (!validate()) return;
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setStatus('success');
            setTimeout(() => navigate('/', { replace: true }), 900);
        }, 1000);
    };

    return (
        <div className="auth-page">
            <Link to="/" className="auth-back-link">
                <FaArrowLeft aria-hidden="true" />
                <span>Back to website</span>
            </Link>

            <div className="login-split">
                {/* Left panel — brand & visual */}
                <aside className="login-visual">
                    <div className="login-visual-inner">
                        <div className="login-visual-brand">
                            <div className="logo-box">IBD</div>
                            <div className="login-visual-brand-text">
                                <span className="brand-name">INSPIRED BY DENNIS</span>
                                <span className="brand-tagline">
                                    Redefining Street Culture
                                </span>
                            </div>
                        </div>

                        <div className="login-visual-copy">
                            <h2>Elevate Your Style</h2>
                            <p>
                                Access exclusive collections, track your orders, and
                                join our community of streetwear enthusiasts.
                            </p>
                        </div>

                        <div className="login-visual-grid" aria-hidden="true">
                            <span /><span /><span />
                            <span /><span /><span />
                        </div>
                    </div>
                    <div className="login-security">
                        <FaShieldAlt aria-hidden="true" />
                        <span>Secure &amp; Encrypted Login</span>
                    </div>
                </aside>

                {/* Right panel — form */}
                <div className="login-main">
                    <div className="login-main-inner">
                        <div className="auth-mobile-brand">
                            <div className="logo-box">IBD</div>
                            <span>Inspired by Dennis</span>
                        </div>
                        <div className="login-header">
                            <h1>Welcome Back</h1>
                            <p>Sign in to your IBD account to continue your style journey.</p>
                        </div>

                        {status === 'success' && (
                            <div className="login-message success" role="status">
                                <span aria-hidden="true">✓</span> Login successful! Redirecting…
                            </div>
                        )}
                        {status === 'error' && (
                            <div className="login-message error" role="alert">
                                <span aria-hidden="true">!</span> Invalid credentials.
                                Please try again.
                            </div>
                        )}

                        <form onSubmit={handleSubmit} noValidate className="login-form">
                            <div className="form-group">
                                <label htmlFor="login-email" className="form-label">
                                    Email Address
                                </label>
                                <div className="input-with-icon">
                                    <FaEnvelope className="input-icon" aria-hidden="true" />
                                    <input
                                        id="login-email"
                                        name="email"
                                        type="email"
                                        className={`form-input ${errors.email ? 'error' : ''}`}
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        autoComplete="email"
                                        required
                                        aria-invalid={!!errors.email}
                                        aria-describedby={errors.email ? 'login-email-error' : undefined}
                                    />
                                </div>
                                {errors.email && (
                                    <span id="login-email-error" className="form-error">
                                        {errors.email}
                                    </span>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="login-password" className="form-label">
                                    Password
                                </label>
                                <div className="input-with-icon">
                                    <FaLock className="input-icon" aria-hidden="true" />
                                    <input
                                        id="login-password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        className={`form-input ${errors.password ? 'error' : ''}`}
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        autoComplete="current-password"
                                        required
                                        aria-invalid={!!errors.password}
                                        aria-describedby={errors.password ? 'login-password-error' : undefined}
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <span id="login-password-error" className="form-error">
                                        {errors.password}
                                    </span>
                                )}
                            </div>

                            <div className="form-row options-row">
                                <label className="remember-me">
                                    <input type="checkbox" autoComplete="remember-me" />
                                    Remember me
                                </label>
                                <Link to="/contact" className="forgot-password">
                                    Forgot password?
                                </Link>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary btn-block btn-lg"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Signing in...' : 'Sign In'}
                            </button>
                        </form>

                        <div className="login-divider">
                            <span>Or continue with</span>
                        </div>

                        <div className="social-login">
                            <button className="social-btn" type="button">
                                <FaGoogle className="social-icon" aria-hidden="true" />
                                Google
                            </button>
                            <button className="social-btn" type="button">
                                <FaApple className="social-icon" aria-hidden="true" />
                                Apple
                            </button>
                        </div>

                        <p className="login-footer">
                            New to IBD Streetwear?{' '}
                            <Link to="/register" className="link">
                                Create an account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
