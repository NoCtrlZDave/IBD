import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';
import HeroCarousel from '../components/HeroCarousel.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { PRODUCTS, CATEGORIES } from '../data/products';

const SHOP_HERO_SLIDES = [
    {
        src: '/images/WhatsApp Image 2025-11-11 at 10.56.59_e4b3eb60.jpg',
        alt: 'Model wearing the new IBD streetwear collection',
        eyebrow: 'New collection · 2026',
        title: 'Built for the city.',
        caption:
            'Heavyweight layers and clean silhouettes, designed to move with you from first light to last call.',
        position: 'center 22%',
    },
    {
        src: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=1600&h=1000&fit=crop&q=80',
        alt: 'Street style look from the IBD collection',
        eyebrow: 'The street edit',
        title: 'Worn in the wild.',
        caption:
            'The looks defining the season, styled on the streets that inspired them.',
    },
    {
        src: '/images/photo-1551028719-00167b16eac5.avif',
        alt: 'IBD leather biker jacket',
        eyebrow: 'Outerwear',
        title: 'Layers with intent.',
        caption:
            'Statement jackets and refined outerwear, made to be lived in.',
    },
    {
        src: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=1600&h=1000&fit=crop&q=80',
        alt: 'Streetwear sneakers and accessories',
        eyebrow: 'Finishing touches',
        title: 'Details that define.',
        caption: 'Sneakers, caps and carryalls that complete the fit.',
    },
];

function Shop() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('featured');

    const categoryParam = searchParams.get('category');
    const categoryFilter = CATEGORIES.includes(categoryParam) ? categoryParam : 'All';

    const setCategoryFilter = (category) => {
        if (category === 'All') {
            setSearchParams({});
        } else {
            setSearchParams({ category });
        }
    };

    const filteredProducts = useMemo(() => {
        let result = PRODUCTS.filter((p) => {
            const matchesSearch =
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory =
                categoryFilter === 'All' || p.category === categoryFilter;
            return matchesSearch && matchesCategory;
        });

        if (sortBy === 'price-low') {
            result = [...result].sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
            result = [...result].sort((a, b) => b.price - a.price);
        } else if (sortBy === 'name') {
            result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        }

        return result;
    }, [searchQuery, categoryFilter, sortBy]);

    const clearFilters = () => {
        setSearchQuery('');
        setCategoryFilter('All');
    };

    return (
        <div className="page shop-page">
            <section className="page-header">
                <div className="container">
                    <h1>Shop</h1>
                    <p>Discover the full collection of IBD essentials.</p>
                </div>
            </section>

            <div className="section-carousel">
                <div className="container">
                    <HeroCarousel
                        slides={SHOP_HERO_SLIDES}
                        label="Shop collection highlights"
                        cta={{
                            label: 'Shop the collection',
                            href: '#shop-collection',
                        }}
                    />
                </div>
            </div>

            <section className="section section-shop">
                <div className="container">
                    <Reveal className="shop-toolbar" delay={0.2}>
                        <div className="shop-search">
                            <label htmlFor="shop-search" className="visually-hidden">
                                Search products
                            </label>
                            <input
                                id="shop-search"
                                type="text"
                                className="shop-search-input"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="shop-filters">
                            <label htmlFor="category-filter" className="filter-label">
                                Category
                            </label>
                            <select
                                id="category-filter"
                                className="form-select"
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                            >
                                {CATEGORIES.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="shop-sort">
                            <label htmlFor="sort-by" className="filter-label">
                                Sort by
                            </label>
                            <select
                                id="sort-by"
                                className="form-select"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="featured">Featured</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="name">Name: A to Z</option>
                            </select>
                        </div>

                        <div className="shop-results">
                            {filteredProducts.length}{' '}
                            {filteredProducts.length === 1 ? 'item' : 'items'}
                        </div>
                    </Reveal>

                    <div className="products-grid modern-grid" id="shop-collection">
                        {filteredProducts.length === 0 ? (
                            <div className="empty-state">
                                <span className="empty-icon" aria-hidden="true">
                                    🔍
                                </span>
                                <h3>No products found</h3>
                                <p>
                                    Try adjusting your search or filters to see available
                                    products.
                                </p>
                                <button className="btn btn-outline" onClick={clearFilters}>
                                    Clear filters
                                </button>
                            </div>
                        ) : (
                            filteredProducts.map((product, index) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    delay={0.1 + Math.min(index, 6) * 0.06}
                                />
                            ))
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Shop;
