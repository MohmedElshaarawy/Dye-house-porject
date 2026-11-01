/**
 * Jade Textile - Production & Operations Portal
 * Centralized, Optimized & Modular JavaScript Library
 */

// ==========================================================================
// 1. Core Initialization & DOM Ready Setup
// ==========================================================================
document.addEventListener("DOMContentLoaded", function () {

    // 1.1 AOS Animation Library Initialization
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 700,
            once: true,
            offset: 60,
            easing: 'ease-out-cubic'
        });
    }

    // 1.2 Navbar Scroll Elevation Effect
    initNavbarScroll();

    // 1.3 Mobile Navigation Drawer
    initMobileMenu();

    // 1.4 Hero Section Slideshow (Home page only)
    initHeroSlideshow();

    // 1.5 Animated KPI Counters (Home page only)
    initCounters();

    // 1.6 Production Records Typing Effect (Home page only)
    initTypingEffect();

    // 1.7 Contact Form Submission (Home page only)
    initContactForm();

    // 1.8 Dynamic Cards Search & Category Filter (Systems & Training pages)
    initActivePageFilter();

    // 1.9 Global Keyboard Shortcuts (e.g. Esc to close Viewers)
    initGlobalShortcuts();
});


// ==========================================================================
// 2. Navigation & Header Handlers
// ==========================================================================

/**
 * Adds elevation and enhanced backdrop blur to navbar on scroll
 */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const handleScroll = () => {
        if (window.scrollY > 20) {
            navbar.classList.add('shadow-md', 'bg-white/98');
            navbar.classList.remove('shadow-sm', 'bg-white/95');
        } else {
            navbar.classList.remove('shadow-md', 'bg-white/98');
            navbar.classList.add('shadow-sm', 'bg-white/95');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
}

/**
 * Controls mobile hamburger menu toggling and auto-close
 */
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (!mobileMenuBtn || !mobileMenu) return;

    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileMenu.classList.toggle('hidden');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileMenu.classList.add('hidden');
        }
    });
}


// ==========================================================================
// 3. Hero Section Slideshow & Typing (Home Page)
// ==========================================================================

/**
 * Initializes cross-fading, GPU-accelerated background slider
 */
function initHeroSlideshow() {
    const bgContainer = document.getElementById('hero-bg-container');
    if (!bgContainer) return;

    const heroImages = [
        "imgs/bg1.jpeg",
        "imgs/bg2.jpeg",
        "imgs/bg4.jpeg",
        "imgs/bg5.jpg"
    ];

    // Preload images to eliminate lag
    heroImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    heroImages.forEach((imgUrl, index) => {
        const slide = document.createElement('div');
        slide.className = `hero-slide ${index === 0 ? 'active' : ''}`;
        slide.style.backgroundImage = `url('${imgUrl}')`;
        bgContainer.appendChild(slide);
    });

    const slides = bgContainer.querySelectorAll('.hero-slide');
    if (slides.length <= 1) return;

    let currentIndex = 0;
    let slideInterval = null;

    const startSlider = () => {
        if (slideInterval) clearInterval(slideInterval);
        slideInterval = setInterval(() => {
            // Pause transitions if browser tab is not active to save battery & CPU
            if (document.hidden) return;

            slides[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % slides.length;
            slides[currentIndex].classList.add('active');
        }, 6000);
    };

    startSlider();
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden && !slideInterval) startSlider();
    });
}

/**
 * Typewriter effect for latest production milestones
 */
function initTypingEffect() {
    const titleEl = document.getElementById('title-text');
    const subtitleEl = document.getElementById('subtitle-text');
    if (!titleEl || !subtitleEl) return;

    const data = [
        { title: "Total Things Completed ", subtitle: "2026 505 " },
        { title: "Weekly Production Record ", subtitle: "304,000 Kgs " }
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        if (document.hidden) {
            setTimeout(typeEffect, 300);
            return;
        }

        const currentTitle = data[textIndex].title;
        const currentSubtitle = data[textIndex].subtitle;

        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        titleEl.innerText = currentTitle.substring(0, charIndex);
        subtitleEl.innerText = currentSubtitle.substring(0, Math.floor((charIndex / currentTitle.length) * currentSubtitle.length));

        let typeSpeed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentTitle.length) {
            typeSpeed = 2200;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % data.length;
            typeSpeed = 400;
        }

        setTimeout(typeEffect, typeSpeed);
    }

    setTimeout(typeEffect, 500);
}


// ==========================================================================
// 4. Interactive KPIs & Form Logic (Home Page)
// ==========================================================================

/**
 * High-performance smooth counter using requestAnimationFrame
 */
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    if (!counters.length) return;

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const suffix = counter.getAttribute('data-suffix') || '';
        const duration = 1400;
        const startTime = performance.now();

        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic formula
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.floor(easeOutProgress * target);

            counter.innerText = currentVal.toLocaleString() + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                counter.innerText = target.toLocaleString() + suffix;
            }
        };

        requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    counters.forEach(c => observer.observe(c));
}

/**
 * Contact Form Simulation
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('success-message');

    if (!contactForm || !successMessage) return;

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        successMessage.classList.remove('hidden');
        successMessage.classList.add('flex');
    });
}

/**
 * Global Contact Form Reset
 */
window.resetForm = function () {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('success-message');
    if (form) form.reset();
    if (successMessage) {
        successMessage.classList.add('hidden');
        successMessage.classList.remove('flex');
    }
};


// ==========================================================================
// 5. Full-Screen Viewer Engine (Live View & Preview)
// ==========================================================================

const DEFAULT_SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTfRR6S0E_Bk_ZWbPyZwB7L7TCA-liDhxl2KBTKZ6iiOtCJttNpEFoK7t52GPS4dg/pubhtml";
const DEFAULT_FORM_URL = "https://forms.gle/iLnqiHodTaJAYGXv8";

/**
 * Generic Full-Screen Viewer display handler
 */
function displayViewer(cfg) {
    const cardsView = document.getElementById('cards-view');
    const section = document.getElementById(cfg.sectionId);
    const iframe = document.getElementById(cfg.iframeId);
    const titleEl = document.getElementById(cfg.titleId);
    const subtitleEl = document.getElementById(cfg.subtitleId);
    const externalLink = document.getElementById(cfg.externalLinkId);
    const fallbackLink = document.getElementById(cfg.fallbackLinkId);
    const mainFooter = document.getElementById('main-footer');

    const targetUrl = cfg.url || cfg.defaultUrl;

    if (iframe) {
        let embedUrl = targetUrl;
        if (cfg.embedParams && !embedUrl.includes('widget=')) {
            const sep = embedUrl.includes('?') ? '&' : '?';
            embedUrl += sep + cfg.embedParams;
        }
        iframe.src = embedUrl;
    }

    if (externalLink) externalLink.href = targetUrl;
    if (fallbackLink) fallbackLink.href = targetUrl;
    if (cfg.title && titleEl) titleEl.innerText = cfg.title;
    if (cfg.subtitle && subtitleEl) subtitleEl.innerText = cfg.subtitle;

    // Switch views
    if (cardsView) cardsView.classList.add('hidden');
    if (section) {
        section.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (mainFooter) mainFooter.classList.add('hidden');
}

/**
 * Generic Full-Screen Viewer close handler
 */
function dismissViewer(cfg) {
    const cardsView = document.getElementById('cards-view');
    const section = document.getElementById(cfg.sectionId);
    const iframe = document.getElementById(cfg.iframeId);
    const mainFooter = document.getElementById('main-footer');

    if (section) section.classList.add('hidden');
    if (cardsView) {
        cardsView.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (mainFooter) mainFooter.classList.remove('hidden');

    // Free memory immediately by unloading iframe
    if (iframe) {
        iframe.src = 'about:blank';
    }
}

/**
 * Systems Page: Open Live View
 */
window.openLiveView = function (sheetUrl, title, subtitle) {
    displayViewer({
        sectionId: 'live-view-section',
        iframeId: 'live-view-iframe',
        titleId: 'live-view-title',
        subtitleId: 'live-view-subtitle',
        externalLinkId: 'live-view-external-link',
        fallbackLinkId: 'iframe-fallback-link',
        defaultUrl: DEFAULT_SHEET_URL,
        embedParams: 'widget=true&headers=false',
        url: sheetUrl,
        title: title,
        subtitle: subtitle
    });
};

/**
 * Systems Page: Close Live View
 */
window.closeLiveView = function () {
    dismissViewer({
        sectionId: 'live-view-section',
        iframeId: 'live-view-iframe'
    });
};

/**
 * Training Page: Open Preview
 */
window.openPreview = function (formUrl, title, subtitle) {
    displayViewer({
        sectionId: 'preview-section',
        iframeId: 'preview-iframe',
        titleId: 'preview-title',
        subtitleId: 'preview-subtitle',
        externalLinkId: 'preview-external-link',
        fallbackLinkId: 'preview-fallback-link',
        defaultUrl: DEFAULT_FORM_URL,
        url: formUrl,
        title: title,
        subtitle: subtitle
    });
};

/**
 * Training Page: Close Preview
 */
window.closePreview = function () {
    dismissViewer({
        sectionId: 'preview-section',
        iframeId: 'preview-iframe'
    });
};

/**
 * Universal Browser Fullscreen Toggle
 */
window.toggleBrowserFullscreen = function () {
    const liveView = document.getElementById('live-view-section');
    const preview = document.getElementById('preview-section');

    const activeContainer = (liveView && !liveView.classList.contains('hidden')) ? liveView :
                            (preview && !preview.classList.contains('hidden')) ? preview :
                            document.documentElement;

    if (!document.fullscreenElement) {
        if (activeContainer.requestFullscreen) {
            activeContainer.requestFullscreen();
        } else if (activeContainer.webkitRequestFullscreen) {
            activeContainer.webkitRequestFullscreen();
        } else if (activeContainer.msRequestFullscreen) {
            activeContainer.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
};


// ==========================================================================
// 6. Generic Cards Search & Category Filter Engine
// ==========================================================================

/**
 * Detects whether current page is Systems or Training and initializes filtering
 */
function initActivePageFilter() {
    if (document.getElementById('system-search')) {
        setupCardFiltering({
            searchInputId: 'system-search',
            filterContainerId: 'filter-buttons',
            cardSelector: '.system-card',
            badgeId: 'systems-count-badge',
            singularWord: 'نظام',
            pluralWord: 'أنظمة',
            noResultsId: 'no-results-msg'
        });
    } else if (document.getElementById('training-search')) {
        setupCardFiltering({
            searchInputId: 'training-search',
            filterContainerId: 'filter-buttons',
            cardSelector: '.training-card',
            badgeId: 'training-count-badge',
            singularWord: 'برنامج',
            pluralWord: 'برامج',
            noResultsId: 'no-results-msg'
        });
    }
}

/**
 * Reusable, debounced card filtering engine
 */
function setupCardFiltering(config) {
    const searchInput = document.getElementById(config.searchInputId);
    const filterContainer = document.getElementById(config.filterContainerId);
    const cards = document.querySelectorAll(config.cardSelector);
    if (!cards.length) return;

    const noResultsMsg = document.getElementById(config.noResultsId);
    const badgeCount = document.getElementById(config.badgeId);
    const filterBtns = filterContainer ? filterContainer.querySelectorAll('.filter-btn') : [];

    let currentCategory = 'all';
    let currentSearchTerm = '';
    let debounceTimer = null;

    function filterCards() {
        let visibleCount = 0;

        cards.forEach(card => {
            const cardCategory = card.getAttribute('data-category') || '';
            const cardKeywords = (card.getAttribute('data-keywords') || '').toLowerCase();
            const cardText = card.innerText.toLowerCase();

            const matchesCategory = (currentCategory === 'all' || cardCategory === currentCategory);
            const matchesSearch = !currentSearchTerm ||
                                  cardKeywords.includes(currentSearchTerm) ||
                                  cardText.includes(currentSearchTerm);

            if (matchesCategory && matchesSearch) {
                card.classList.remove('hidden');
                visibleCount++;
            } else {
                card.classList.add('hidden');
            }
        });

        if (badgeCount) {
            badgeCount.innerText = `${visibleCount} ${visibleCount === 1 ? config.singularWord : config.pluralWord}`;
        }

        if (noResultsMsg) {
            if (visibleCount === 0) {
                noResultsMsg.classList.remove('hidden');
            } else {
                noResultsMsg.classList.add('hidden');
            }
        }
    }

    // Category button click handling
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            filterBtns.forEach(b => {
                b.classList.remove('bg-secondary', 'text-white', 'shadow-sm');
                b.classList.add('text-gray-600');
            });
            this.classList.add('bg-secondary', 'text-white', 'shadow-sm');
            this.classList.remove('text-gray-600');

            currentCategory = this.getAttribute('data-filter') || 'all';
            filterCards();
        });
    });

    // 120ms Debounced search for smooth typing & zero UI freeze
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                currentSearchTerm = searchInput.value.trim().toLowerCase();
                filterCards();
            }, 120);
        });
    }

    // Global reset function exposed to onclick buttons
    window.resetSearchAndFilter = function () {
        if (searchInput) searchInput.value = '';
        currentSearchTerm = '';
        currentCategory = 'all';

        filterBtns.forEach(b => {
            if (b.getAttribute('data-filter') === 'all') {
                b.classList.add('bg-secondary', 'text-white', 'shadow-sm');
                b.classList.remove('text-gray-600');
            } else {
                b.classList.remove('bg-secondary', 'text-white', 'shadow-sm');
                b.classList.add('text-gray-600');
            }
        });

        filterCards();
    };
}


// ==========================================================================
// 7. Global Keyboard Shortcuts & Accessibility
// ==========================================================================

function initGlobalShortcuts() {
    document.addEventListener('keydown', function (e) {
        // Press Escape to dismiss active full-screen viewers
        if (e.key === 'Escape') {
            const liveView = document.getElementById('live-view-section');
            const preview = document.getElementById('preview-section');

            if (liveView && !liveView.classList.contains('hidden')) {
                window.closeLiveView();
            } else if (preview && !preview.classList.contains('hidden')) {
                window.closePreview();
            }
        }
    });
}



// ==========================================================================
// 7. Global Keyboard Shortcuts & Accessibility
// ==========================================================================

function initGlobalShortcuts() {
    document.addEventListener('keydown', function (e) {
        // Press Escape to dismiss active full-screen viewers
        if (e.key === 'Escape') {
            const liveView = document.getElementById('live-view-section');
            const preview = document.getElementById('preview-section');

            if (liveView && !liveView.classList.contains('hidden')) {
                window.closeLiveView();
            } else if (preview && !preview.classList.contains('hidden')) {
                window.closePreview();
            }
        }
    });
}