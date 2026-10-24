document.addEventListener("DOMContentLoaded", function() {
            // 1. Initialize AOS Library
            AOS.init({
                duration: 800,
                once: true,
                offset: 80,
                easing: 'ease-in-out'
            });

            // 2. Mobile Menu Toggle Logic
            const mobileMenuBtn = document.getElementById('mobile-menu-btn');
            const mobileMenu = document.getElementById('mobile-menu');
            const mobileLinks = document.querySelectorAll('.mobile-link');

            if (mobileMenuBtn && mobileMenu) {
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

            // 3. Dynamic Hero Background Slideshow (Managed via JS Array)
            const heroImages = [
            "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80", // ماكينات المصنع والتشغيل
            "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1920&q=80", // لفات أقمشة صباغة
            "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=1920&q=80", // تدرجات أقمشة وخيوط
            "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1920&q=80"  // صورة المنتجات الكاجوال[cite: 1]
            ];
            const bgContainer = document.getElementById('hero-bg-container');
            
            if (bgContainer && heroImages.length > 0) {
                heroImages.forEach((imgUrl, index) => {
                    const slide = document.createElement('div');
                    slide.className = `hero-slide ${index === 0 ? 'active' : ''}`;
                    slide.style.backgroundImage = `url('${imgUrl}')`;
                    bgContainer.appendChild(slide);
                });

                const slides = document.querySelectorAll('.hero-slide');
                let currentIndex = 0;

                setInterval(() => {
                    slides[currentIndex].classList.remove('active');
                    currentIndex = (currentIndex + 1) % slides.length;
                    slides[currentIndex].classList.add('active');
                }, 5000);
            }

            // 4. Counter Animation via IntersectionObserver
            const counters = document.querySelectorAll('.counter');
            
            const runCounter = (counter) => {
                const target = +counter.getAttribute('data-target');
                const suffix = counter.getAttribute('data-suffix') || '';
                let count = 0;
                
                const duration = 1500;
                const steps = 50;
                const increment = target / steps;
                const stepTime = duration / steps;

                const updateCounter = () => {
                    count += increment;
                    if (count < target) {
                        counter.innerText = Math.floor(count) + suffix;
                        setTimeout(updateCounter, stepTime);
                    } else {
                        counter.innerText = target + suffix;
                    }
                };

                updateCounter();
            };

            const observerOptions = {
                root: null,
                threshold: 0.3
            };

            const observer = new IntersectionObserver((entries, observerInstance) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        runCounter(entry.target);
                        observerInstance.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            counters.forEach(counter => {
                observer.observe(counter);
            });

            // 5. Contact Form Submission Simulation
            const contactForm = document.getElementById('contactForm');
            const successMessage = document.getElementById('success-message');

            if (contactForm && successMessage) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    successMessage.style.display = 'flex';
                });
            }
        });

        // Global Reset Form Function
        function resetForm() {
            const form = document.getElementById('contactForm');
            const successMessage = document.getElementById('success-message');
            if (form) form.reset();
            if (successMessage) successMessage.style.display = 'none';
        }