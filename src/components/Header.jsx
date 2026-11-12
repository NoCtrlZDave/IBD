import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    LuArrowRight,
    LuArrowUpRight,
    LuMenu,
    LuShoppingBag,
    LuUserRound,
    LuX,
} from 'react-icons/lu';
import { useCart } from '../context/cart-context.js';

const NAV_LINKS = [
    { to: '/', label: 'Home', end: true },
    { to: '/shop', label: 'Shop' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
];

const FOCUSABLE = 'a[href], button:not([disabled])';

function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { count } = useCart();
    const headerRef = useRef(null);
    const toggleRef = useRef(null);
    const firstLinkRef = useRef(null);
    const wasOpenRef = useRef(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        const onPopState = () => {
            wasOpenRef.current = false;
            setIsOpen(false);
        };
        window.addEventListener('popstate', onPopState);
        return () => window.removeEventListener('popstate', onPopState);
    }, []);

    useEffect(() => {
        const desktop = window.matchMedia('(min-width: 861px)');
        const onChange = (event) => {
            if (event.matches) {
                wasOpenRef.current = false;
                setIsOpen(false);
            }
        };
        desktop.addEventListener('change', onChange);
        return () => desktop.removeEventListener('change', onChange);
    }, []);

    useEffect(() => {
        if (!isOpen) return;

        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        const previousOverflow = document.body.style.overflow;
        const previousPadding = document.body.style.paddingRight;

        document.body.style.overflow = 'hidden';
        if (scrollbarWidth > 0) {
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        }

        return () => {
            document.body.style.overflow = previousOverflow;
            document.body.style.paddingRight = previousPadding;
        };
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) {
            if (wasOpenRef.current) {
                wasOpenRef.current = false;
                toggleRef.current?.focus({ preventScroll: true });
            }
            return;
        }

        wasOpenRef.current = true;
        const focusTimer = window.setTimeout(() => {
            firstLinkRef.current?.focus({ preventScroll: true });
        }, 160);

        const onKeyDown = (event) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
                return;
            }
            if (event.key !== 'Tab') return;

            const focusable = Array.from(
                headerRef.current?.querySelectorAll(FOCUSABLE) ?? []
            ).filter((element) => element.offsetParent !== null);
            if (!focusable.length) return;

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };

        document.addEventListener('keydown', onKeyDown);

        return () => {
            window.clearTimeout(focusTimer);
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen]);

    const closeMenu = () => {
        wasOpenRef.current = false;
        setIsOpen(false);
    };

    const toggleMenu = () => setIsOpen((open) => !open);

    const closeFromBackdrop = () => {
        wasOpenRef.current = false;
        setIsOpen(false);
        toggleRef.current?.focus({ preventScroll: true });
    };

    return (
        <header
            ref={headerRef}
            className={`navbar${scrolled ? ' is-scrolled' : ''}${isOpen ? ' is-open' : ''}`}
        >
            <div className="navbar-inner">
                <NavLink
                    to="/"
                    className="brand"
                    end
                    onClick={closeMenu}
                    aria-label="IBD, Inspired by Dennis — home"
                >
                    <span className="brand-mark" aria-hidden="true">IBD</span>
                    <span className="brand-word">
                        <span className="brand-word-top">Inspired by</span>
                        <span className="brand-word-bottom">Dennis</span>
                    </span>
                </NavLink>

                <nav className="primary-nav" aria-label="Primary">
                    <ul id="primary-menu" className={`nav-links${isOpen ? ' is-open' : ''}`}>
                        <li className="nav-drawer-meta" aria-hidden="true">Menu</li>
                        {NAV_LINKS.map((link, index) => (
                            <li key={link.to} style={{ '--i': index }}>
                                <NavLink
                                    ref={index === 0 ? firstLinkRef : undefined}
                                    to={link.to}
                                    end={link.end}
                                    onClick={closeMenu}
                                    className={({ isActive }) =>
                                        `nav-link${isActive ? ' is-active' : ''}`
                                    }
                                >
                                    <span className="nav-link-index" aria-hidden="true">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    <span>{link.label}</span>
                                    <LuArrowUpRight
                                        className="nav-link-arrow"
                                        aria-hidden="true"
                                    />
                                </NavLink>
                            </li>
                        ))}
                        <li className="nav-drawer-footer">
                            <span className="drawer-eyebrow">Spring / Summer 2026</span>
                            <NavLink to="/shop" className="drawer-cta" onClick={closeMenu}>
                                <span>Shop the collection</span>
                                <LuArrowRight aria-hidden="true" />
                            </NavLink>
                            <NavLink to="/login" className="drawer-account" onClick={closeMenu}>
                                <LuUserRound aria-hidden="true" />
                                <span>Sign in to your account</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>

                <div className="nav-actions">
                    <NavLink
                        to="/cart"
                        className="icon-btn"
                        aria-label={`View shopping cart (${count} ${count === 1 ? 'item' : 'items'})`}
                    >
                        <LuShoppingBag aria-hidden="true" />
                        {count > 0 && (
                            <span className="cart-count" aria-hidden="true">
                                {count > 99 ? '99+' : count}
                            </span>
                        )}
                    </NavLink>
                    <NavLink to="/login" className="signin-btn">
                        <LuUserRound aria-hidden="true" />
                        <span>Sign in</span>
                    </NavLink>
                    <button
                        ref={toggleRef}
                        type="button"
                        className="nav-toggle"
                        onClick={toggleMenu}
                        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
                        aria-expanded={isOpen}
                        aria-controls="primary-menu"
                    >
                        <LuMenu className="nav-toggle-icon is-menu" aria-hidden="true" />
                        <LuX className="nav-toggle-icon is-close" aria-hidden="true" />
                    </button>
                </div>
            </div>
            <div
                className={`nav-backdrop${isOpen ? ' is-visible' : ''}`}
                onClick={closeFromBackdrop}
                aria-hidden="true"
            />
        </header>
    );
}

export default Header;
