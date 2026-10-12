document.addEventListener('DOMContentLoaded', function () {
    // 1. Initialize AOS animations
    AOS.init({
        once: true,
        duration: 800,
        offset: 60
    });

    // 2. Toggle Mobile Navigation Menu
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Auto-close menu when clicking on any menu link
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // 3. Navbar shadow on scroll
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                navbar.classList.add('shadow-md');
            } else {
                navbar.classList.remove('shadow-md');
            }
        });
    }

    // 4. Form Submission and Reset Logic
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('success-message');
    const resetBtn = document.getElementById('resetBtn');

    if (contactForm && successMessage) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            successMessage.classList.remove('hidden');
            successMessage.classList.add('flex');
            contactForm.reset();
        });
    }

    if (resetBtn && contactForm && successMessage) {
        resetBtn.addEventListener('click', () => {
            successMessage.classList.add('hidden');
            successMessage.classList.remove('flex');
        });
    }
});

// 5. Counters Animation
    const counters = document.querySelectorAll('.counter');
    const aboutSection = document.getElementById('about');
    let animated = false;

    if (counters.length > 0 && aboutSection) {
        const startCounters = () => {
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const suffix = counter.getAttribute('data-suffix') || '';
                const speed = 150; // سرعة العد (كلما قل الرقم زادت السرعة)
                let count = 0;

                const updateCount = () => {
                    const inc = target / speed;
                    count += inc;

                    if (count < target) {
                        counter.innerText = Math.ceil(count) + suffix;
                        setTimeout(updateCount, 15);
                    } else {
                        counter.innerText = target + suffix;
                    }
                };

                updateCount();
            });
        };

        const observer = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animated) {
                    startCounters();
                    animated = true;
                    observerInstance.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        observer.observe(aboutSection);
    }