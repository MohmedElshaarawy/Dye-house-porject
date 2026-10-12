   tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                    },
                    colors: {
                        primary: '#1E3A8A', // Deep Industrial Blue
                        secondary: '#2563EB', // Vibrant Blue
                        accent: '#F59E0B', // Golden Amber
                        dark: '#0F172A',
                        light: '#F8FAFC'
                    }
                }
            }
        }
 // Initialize AOS animations
        AOS.init({
            once: true,
            duration: 800,
            offset: 100
        });

    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenu.classList.toggle('hidden');
        });

        // إغلاق القائمة عند الضغط على أي رابط بداخلها
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });

        // إغلاق القائمة عند الضغط في أي مكان خارجها
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !mobileBtn.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }


        // Navbar shadow on scroll
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                navbar.classList.add('shadow-md');
            } else {
                navbar.classList.remove('shadow-md');
            }
        });

        // Form submission handler
        const contactForm = document.getElementById('contactForm');
        const successMessage = document.getElementById('success-message');

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            successMessage.classList.add('show');
            contactForm.reset();
        });

        function resetForm() {
            successMessage.classList.remove('show');
        }

        document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.counter');
    let animated = false; // عشان الأنيميشن يشتغل مرة واحدة بس أول ما السكشن يظهر

    const startCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const suffix = counter.getAttribute('data-suffix') || '';
            const speed = 300; // سرعة العد (كل ما قل الرقم كل ما زادت السرعة)
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

    // إعداد الـ Intersection Observer
    const observerOptions = {
        root: null, // استخدام الشاشة كإطار
        threshold: 0.2 // يبدأ الأنيميشن لما 20% من السكشن يظهر قدام المستخدم
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                startCounters();
                animated = true; // منع إكرار الأنيميشن لو المستخدم طلع ونزل تاني
                observer.unobserve(entry.target); // إيقاف المراقبة بعد التشغيل
            }
        });
    }, observerOptions);

    // بنراقب السكشن كله (أو الـ grid اللي جامع الكروت)
    const statsSection = document.querySelector('.grid');
    if (statsSection) {
        observer.observe(statsSection);
    }
});