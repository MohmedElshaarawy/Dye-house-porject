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

    // 3. Dynamic Hero Background Slideshow
   const heroImages = [
    "imgs/bg1.jpeg",
    "imgs/bg2.jpeg",
    "imgs/bg3.jpeg",
    "imgs/bg4.jpeg",
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
        }, 6000);
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

    // 6. Theme Toggle Logic (Clean & Safe)
    const themeToggleBtn = document.getElementById('theme-toggle');
    const darkIcon = document.getElementById('theme-toggle-dark-icon');
    const lightIcon = document.getElementById('theme-toggle-light-icon');

    function updateIcons() {
        if (!darkIcon || !lightIcon) return;
        if (document.documentElement.classList.contains('dark')) {
            lightIcon.classList.remove('hidden');
            darkIcon.classList.add('hidden');
        } else {
            darkIcon.classList.remove('hidden');
            lightIcon.classList.add('hidden');
        }
    }

    if (themeToggleBtn) {
        updateIcons();
        themeToggleBtn.addEventListener('click', function() {
            document.documentElement.classList.toggle('dark');
            if (document.documentElement.classList.contains('dark')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
            updateIcons();
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


// The list containing the changing lines
// Texts to be written and erased sequentially
 const data = [
      {
        title: "Total things completed ",
        subtitle: "2026 505 "
      },
        {
        title: "  Weekly production Record ",
        subtitle: "304,000 Kgs "
      }
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const titleEl = document.getElementById('title-text');
    const subtitleEl = document.getElementById('subtitle-text');

    function typeEffect() {
      const currentTitle = data[textIndex].title;
      const currentSubtitle = data[textIndex].subtitle;

      if (isDeleting) {
        //Delete character
        charIndex--;
      } else {
        //Add character
        charIndex++;
      }

      // Update the text on the page
      titleEl.innerText = currentTitle.substring(0, charIndex);
      
      // Show the subtitle when title typing is complete or update it with the text
      subtitleEl.innerText = currentSubtitle.substring(0, Math.floor((charIndex / currentTitle.length) * currentSubtitle.length));

     // Typing and deleting speed (in milliseconds)     
      let typeSpeed = isDeleting ? 50 : 100;

      if (!isDeleting && charIndex === currentTitle.length) {
        // When sentence typing is complete, wait 2 seconds before starting to delete
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
       // When sentence deletion is finished, move to the next sentence and start typing
        isDeleting = false;
        textIndex = (textIndex + 1) % data.length;
        typeSpeed = 500;
      }

      setTimeout(typeEffect, typeSpeed);
    }

    // Start the effect when the page loads 
    document.addEventListener("DOMContentLoaded", () => {
      setTimeout(typeEffect, 500);
    });