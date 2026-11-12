import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaShieldAlt,
    FaArrowLeft,
} from 'react-icons/fa';
import { FaGoogle, FaApple } from 'react-icons/fa6';

const INITIAL_FORM = { name: '', email: '', password: '', confirm: '' };

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(INITIAL_FORM);
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState(null);

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Full name is required';
        if (!formData.email) newErrors.email = 'Email address is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }
        if (!formData.confirm) newErrors.confirm = 'Please confirm your password';
        else if (formData.confirm !== formData.password) {
            newErrors.confirm = 'Passwords do not match';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setStatus(null);
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
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

    const fields = [
        {
            id: 'reg-fullname',
            name: 'name',
            label: 'Full Name',
            type: 'text',
            placeholder: 'John Doe',
            autoComplete: 'name',
            icon: <FaUser className="input-icon" aria-hidden="true" />,
        },
        {
            id: 'reg-email',
            name: 'email',
            label: 'Email Address',
            type: 'email',
            placeholder: 'you@example.com',
            autoComplete: 'email',
            icon: <FaEnvelope className="input-icon" aria-hidden="true" />,
        },
        {
            id: 'reg-password',
            name: 'password',
            label: 'Password',
            type: showPassword ? 'text' : 'password',
            placeholder: 'Create a password',
            autoComplete: 'new-password',
            icon: <FaLock className="input-icon" aria-hidden="true" />,
            toggle: () => setShowPassword((prev) => !prev),
            shown: showPassword,
        },
        {
            id: 'reg-confirm',
            name: 'confirm',
            label: 'Confirm Password',
            type: showConfirm ? 'text' : 'password',
            placeholder: 'Re-enter your password',
            autoComplete: 'new-password',
            icon: <FaLock className="input-icon" aria-hidden="true" />,
            toggle: () => setShowConfirm((prev) => !prev),
            shown: showConfirm,
        },
    ];

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
                            <h2>Join the Movement</h2>
                            <p>
                                Create your account to unlock exclusive drops, track your
                                orders, and become part of the IBD community.
                            </p>
                        </div>

                        <div className="login-visual-grid" aria-hidden="true">
                            <span /><span /><span />
                            <span /><span /><span />
                        </div>
                    </div>
                    <div className="login-security">
                        <FaShieldAlt aria-hidden="true" />
                        <span>Secure &amp; Encrypted Sign-Up</span>
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
                            <h1>Create Account</h1>
                            <p>Join the Inspired by Dennis community and start your style journey.</p>
                        </div>

                        {status === 'success' && (
                            <div className="login-message success" role="status">
                                <span aria-hidden="true">✓</span> Account created! Redirecting…
                            </div>
                        )}

                        <form onSubmit={handleSubmit} noValidate className="login-form">
                            {fields.map((field) => (
                                <div className="form-group" key={field.id}>
                                    <label htmlFor={field.id} className="form-label">
                                        {field.label}
                                    </label>
                                    <div className="input-with-icon">
                                        {field.icon}
                                        <input
                                            id={field.id}
                                            name={field.name}
                                            type={field.type}
                                            className={`form-input ${errors[field.name] ? 'error' : ''}`}
                                            placeholder={field.placeholder}
                                            autoComplete={field.autoComplete}
                                            value={formData[field.name]}
                                            onChange={handleChange}
                                            required
                                            aria-invalid={!!errors[field.name]}
                                            aria-describedby={
                                                errors[field.name] ? `${field.id}-error` : undefined
                                            }
                                        />
                                        {field.toggle && (
                                            <button
                                                type="button"
                                                className="password-toggle"
                                                onClick={field.toggle}
                                                aria-label={field.shown ? 'Hide password' : 'Show password'}
                                            >
                                                {field.shown ? <FaEyeSlash /> : <FaEye />}
                                            </button>
                                        )}
                                    </div>
                                    {errors[field.name] && (
                                        <span id={`${field.id}-error`} className="form-error">
                                            {errors[field.name]}
                                        </span>
                                    )}
                                </div>
                            ))}

                            <button
                                type="submit"
                                className="btn btn-primary btn-block btn-lg"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Creating account...' : 'Create Account'}
                            </button>
                        </form>

                        <div className="login-divider">
                            <span>Or sign up with</span>
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
                            Already have an account?{' '}
                            <Link to="/login" className="link">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
