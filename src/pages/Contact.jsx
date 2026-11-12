import { useState } from 'react';
import { FaEnvelope, FaPhone, FaLocationDot } from 'react-icons/fa6';
import Reveal from '../components/Reveal.jsx';
import HeroCarousel from '../components/HeroCarousel.jsx';

const CONTACT_HERO_SLIDES = [
    {
        src: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&h=1000&fit=crop&q=80',
        alt: 'IBD flagship store interior',
        eyebrow: 'Visit the flagship',
        title: 'Come through.',
        caption:
            'Find us in the heart of the city. Pull up, talk fits, and see the collection in person.',
    },
    {
        src: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=1600&h=1000&fit=crop&q=80',
        alt: 'IBD community street style',
        eyebrow: 'The community',
        title: 'Style starts a conversation.',
        caption:
            'Order questions, styling advice, or just a hello—our inbox is always open.',
    },
    {
        src: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=1600&h=1000&fit=crop&q=80',
        alt: 'Portrait wearing IBD essentials',
        eyebrow: 'Customer care',
        title: 'Real people. Real answers.',
        caption:
            'Sizing help, order updates, or a custom request. We reply within 1-2 business days.',
    },
    {
        src: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=1600&h=1000&fit=crop&q=80',
        alt: 'Streetwear sneakers and accessories',
        eyebrow: 'Collaborations',
        title: "Let's build something.",
        caption:
            'For partnerships and creative projects, reach the team directly.',
    },
];

const CONTACT_INFO = [
    {
        icon: <FaEnvelope />,
        label: 'Email',
        value: 'hello@inspiredbydennis.com',
        href: 'mailto:hello@inspiredbydennis.com',
    },
    {
        icon: <FaPhone />,
        label: 'Phone',
        value: '+1 (555) 010-2030',
        href: 'tel:+15550102030',
    },
    {
        icon: <FaLocationDot />,
        label: 'Visit us',
        value: '123 Culture Street, New York, NY 10001',
    },
];

const INITIAL_FORM = { name: '', email: '', subject: '', message: '' };

function Contact() {
    const [formData, setFormData] = useState(INITIAL_FORM);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Full name is required';
        if (!formData.email) newErrors.email = 'Email address is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
        if (!formData.message.trim()) newErrors.message = 'Message is required';
        else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="page contact-page">
                <section className="page-header">
                    <div className="container">
                        <h1>Contact Us</h1>
                        <p>Get in touch with the IBD team.</p>
                    </div>
                </section>

                <div className="section-carousel">
                    <div className="container">
                        <HeroCarousel
                            slides={CONTACT_HERO_SLIDES}
                            label="Contact IBD highlights"
                        />
                    </div>
                </div>

                <section className="section section-contact">
                    <div className="container">
                        <Reveal className="contact-success" delay={0.2}>
                            <div className="success-icon" aria-hidden="true">✓</div>
                            <h2>Message sent</h2>
                            <p>
                                Thank you for reaching out. We'll get back to you within
                                1-2 business days.
                            </p>
                            <button
                                className="btn btn-outline"
                                onClick={() => {
                                    setFormData(INITIAL_FORM);
                                    setSubmitted(false);
                                }}
                            >
                                Send another message
                            </button>
                        </Reveal>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="page contact-page">
            <section className="page-header">
                <div className="container">
                    <h1>Contact Us</h1>
                    <p>Get in touch with the IBD team.</p>
                </div>
            </section>

            <div className="section-carousel">
                <div className="container">
                    <HeroCarousel
                        slides={CONTACT_HERO_SLIDES}
                        label="Contact IBD highlights"
                        cta={{ label: 'Send a message', href: '#contact-form' }}
                    />
                </div>
            </div>

            <section className="section section-contact">
                <div className="container">
                    <Reveal className="contact-grid" delay={0.2}>
                        <div className="contact-form-wrapper glass" id="contact-form">
                            <form onSubmit={handleSubmit} noValidate className="contact-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="contact-name">Full name</label>
                                        <input
                                            id="contact-name"
                                            name="name"
                                            type="text"
                                            className={`form-input ${errors.name ? 'error' : ''}`}
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            aria-invalid={!!errors.name}
                                            aria-describedby={errors.name ? 'contact-name-error' : undefined}
                                        />
                                        {errors.name && (
                                            <span id="contact-name-error" className="form-error">
                                                {errors.name}
                                            </span>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="contact-email">Email address</label>
                                        <input
                                            id="contact-email"
                                            name="email"
                                            type="email"
                                            className={`form-input ${errors.email ? 'error' : ''}`}
                                            placeholder="you@example.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            aria-invalid={!!errors.email}
                                            aria-describedby={errors.email ? 'contact-email-error' : undefined}
                                        />
                                        {errors.email && (
                                            <span id="contact-email-error" className="form-error">
                                                {errors.email}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="contact-subject">Subject</label>
                                    <input
                                        id="contact-subject"
                                        name="subject"
                                        type="text"
                                        className={`form-input ${errors.subject ? 'error' : ''}`}
                                        placeholder="How can we help?"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        aria-invalid={!!errors.subject}
                                        aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                                    />
                                    {errors.subject && (
                                        <span id="contact-subject-error" className="form-error">
                                            {errors.subject}
                                        </span>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="contact-message">Message</label>
                                    <textarea
                                        id="contact-message"
                                        name="message"
                                        rows="5"
                                        className={`form-input ${errors.message ? 'error' : ''}`}
                                        placeholder="Tell us more..."
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        aria-invalid={!!errors.message}
                                        aria-describedby={errors.message ? 'contact-message-error' : undefined}
                                    />
                                    {errors.message && (
                                        <span id="contact-message-error" className="form-error">
                                            {errors.message}
                                        </span>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg btn-block"
                                >
                                    Send message
                                </button>
                            </form>
                        </div>

                        <div className="contact-info-wrapper">
                            <h3>Get in touch</h3>
                            <p>
                                Have a question about an order, sizing, or a
                                collaboration? Reach out and we'll respond as soon as
                                possible.
                            </p>
                            <div className="info-list">
                                {CONTACT_INFO.map((info) => (
                                    <div key={info.label} className="info-item">
                                        <span className="info-icon" aria-hidden="true">
                                            {info.icon}
                                        </span>
                                        <div className="info-text">
                                            <span className="info-label">{info.label}</span>
                                            {info.href ? (
                                                <a href={info.href} className="info-value">
                                                    {info.value}
                                                </a>
                                            ) : (
                                                <span className="info-value">{info.value}</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>
        </div>
    );
}

export default Contact;
