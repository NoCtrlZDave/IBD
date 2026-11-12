import Reveal from '../components/Reveal.jsx';
import HeroCarousel from '../components/HeroCarousel.jsx';
import CountUp from '../components/CountUp.jsx';

const ABOUT_HERO_SLIDES = [
    {
        src: '/images/about.jpeg',
        alt: 'The IBD studio and team at work',
        eyebrow: 'Since 2020',
        title: 'From a Brooklyn apartment.',
        caption:
            'A small run of hand-printed tees became a movement built on self-expression, quality, and the streets.',
        position: 'center 38%',
    },
    {
        src: '/images/about-dennis.jpeg',
        alt: 'Dennis, founder and creative director of IBD',
        eyebrow: 'The founder',
        title: 'Inspired by Dennis.',
        caption:
            'A clear vision for streetwear that feels personal, intentional, and built to last.',
        position: 'center 24%',
    },
    {
        src: '/images/about1.jpeg',
        alt: 'Alex, head designer at IBD',
        eyebrow: 'The studio',
        title: 'Designed with intention.',
        caption:
            'Every cut, fabric, and detail is considered before it earns a place in the collection.',
        position: 'center 24%',
    },
    {
        src: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&h=1000&fit=crop&q=80',
        alt: 'IBD flagship store interior',
        eyebrow: 'The community',
        title: 'A culture, not a label.',
        caption:
            'Built with the artists, musicians, and everyday people who wear it.',
    },
];

function About() {
    const values = [
        {
            title: 'Quality Craftsmanship',
            description:
                'Every stitch, fabric, and detail is carefully selected and crafted to ensure our products stand the test of time and wear.',
        },
        {
            title: 'Sustainable Practices',
            description:
                "We're committed to reducing our environmental footprint through sustainable materials and ethical production methods.",
        },
        {
            title: 'Community First',
            description:
                "IBD is more than a brand—it's a community. We collaborate with local artists and give back to the cultures that inspire us.",
        },
    ];

    const stats = [
        { label: 'Founded', end: 2020, start: 2015, duration: 1400 },
        { label: 'Customers', end: 50, suffix: 'K+' },
        { label: 'Products', end: 100, suffix: '+' },
        { label: 'Countries shipped', end: 24, suffix: '+' },
    ];

    const team = [
        {
            name: 'Dennis',
            role: 'Founder & Creative Director',
            description:
                "The visionary behind IBD, Dennis oversees all creative direction and ensures every piece aligns with the brand's core values.",
            image: '/images/about-dennis.jpeg',
        },
        {
            name: 'Alex',
            role: 'Head Designer',
            description:
                'With a background in fashion design and urban art, Alex translates cultural trends into wearable statements for IBD.',
            image: '/images/about1.jpeg',
        },
        {
            name: 'Marcus',
            role: 'Production Manager',
            description:
                'Marcus ensures every IBD product meets our rigorous quality standards while maintaining ethical production practices.',
            image: '/images/about-marcus.jpeg',
        },
    ];

    return (
        <div className="page about-page">
            <section className="page-header">
                <div className="container">
                    <h1>Our Story</h1>
                    <p>Inspired by Dennis. Redefining Street Culture Since 2020.</p>
                </div>
            </section>

            <div className="section-carousel">
                <div className="container">
                    <HeroCarousel
                        slides={ABOUT_HERO_SLIDES}
                        label="IBD brand story highlights"
                        cta={{ label: 'Read our story', href: '#about-story' }}
                    />
                </div>
            </div>

            <Reveal className="section section-about-story" delay={0.2}>
                <div className="container">
                    <div className="section-header">
                        <div className="section-badge">Our beginning</div>
                        <h2>From Vision to Movement</h2>
                        <p className="section-intro">
                            IBD was born from a passion for authentic street culture and
                            contemporary design.
                        </p>
                    </div>
                    <div className="about-story-grid" id="about-story">
                        <Reveal className="about-story-content" delay={0.4}>
                            <p>
                                Founded in 2020 by Dennis, IBD Streetwear emerged from a simple
                                yet powerful idea: streetwear should be more than just
                                clothing—it should be a form of self-expression, a statement of
                                individuality, and a celebration of urban culture.
                            </p>
                            <p>
                                What started as a small collection of hand-printed t-shirts in
                                a Brooklyn apartment has grown into a globally recognized brand,
                                worn by artists, musicians, and style enthusiasts who value
                                authenticity and quality.
                            </p>
                            <p>
                                Dennis' vision was to bridge the gap between high-fashion
                                aesthetics and accessible streetwear, creating pieces that tell
                                stories and inspire confidence. Every IBD garment is designed
                                with intention, crafted for longevity, and infused with the
                                spirit of the streets that inspired it.
                            </p>
                            <p>
                                Today, IBD continues to push boundaries while staying true to
                                its roots—creating collections that honor the past while looking
                                firmly toward the future of street culture.
                            </p>
                        </Reveal>
                        <Reveal className="about-story-image" delay={0.6}>
                            <img
                                src="/images/about.jpeg"
                                alt="The IBD studio and team at work"
                                loading="lazy"
                                className="about-story-img"
                            />
                        </Reveal>
                    </div>
                </div>
            </Reveal>

            <Reveal className="section section-values" delay={0.4}>
                <div className="container">
                    <div className="section-header">
                        <div className="section-badge">Our values</div>
                        <h2>What we stand for</h2>
                    </div>
                    <div className="values-grid">
                        {values.map((value, index) => (
                            <Reveal
                                key={value.title}
                                className="value-card"
                                delay={0.4 + index * 0.1}
                            >
                                <div className="value-icon">
                                    <span aria-hidden="true">
                                        {index === 0 ? '★' : index === 1 ? '✦' : '◆'}
                                    </span>
                                </div>
                                <h3>{value.title}</h3>
                                <p>{value.description}</p>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </Reveal>

            <Reveal className="section section-stats bg-dark" delay={0.4}>
                <div className="container">
                    <Reveal className="stats-grid" delay={0.6}>
                        {stats.map((stat) => (
                            <div key={stat.label} className="stat-card">
                                <h3>
                                    <CountUp
                                        end={stat.end}
                                        start={stat.start}
                                        suffix={stat.suffix}
                                        duration={stat.duration}
                                    />
                                </h3>
                                <p>{stat.label}</p>
                            </div>
                        ))}
                    </Reveal>
                </div>
            </Reveal>

            {/* Team */}
            <Reveal className="section section-team" delay={0.4}>
                <div className="container">
                    <div className="section-header">
                        <div className="section-badge">Our team</div>
                        <h2>The People Behind IBD</h2>
                        <p className="section-intro">
                            A passionate collective of designers, creators, and visionaries.
                        </p>
                    </div>
                    <div className="team-grid">
                        {team.map((member, index) => (
                            <Reveal
                                key={member.name}
                                className="team-member"
                                delay={0.4 + index * 0.1}
                            >
                                <div className="team-member-img">
                                    <img
                                        src={member.image}
                                        alt={`${member.name}, ${member.role} at IBD`}
                                        loading="lazy"
                                    />
                                </div>
                                <h3 className="team-member-name">{member.name}</h3>
                                <p className="team-member-role">{member.role}</p>
                                <p className="team-member-bio">{member.description}</p>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </Reveal>

            {/* Mission */}
            <Reveal className="section section-mission bg-dark" delay={0.4}>
                <div className="container">
                    <div className="section-header">
                        <div className="section-badge">Our mission</div>
                        <h2>Looking Forward</h2>
                    </div>
                    <Reveal className="mission-statement" delay={0.5}>
                        "To redefine street culture by creating authentic, high-quality apparel
                        that empowers self-expression, celebrates individuality, and builds
                        community. We believe that what you wear should tell your story without
                        saying a word. <strong>Inspired by Dennis. Worn by you.</strong>"
                    </Reveal>
                </div>
            </Reveal>
        </div>
    );
}

export default About;
