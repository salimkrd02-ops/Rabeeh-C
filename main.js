// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", (event) => {
    
    // --- Sticky Navigation ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                // Adjust for sticky header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- Initial Load Animations (Hero) ---
    const tl = gsap.timeline();

    tl.from(".hero-badge", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2
    })
    .from(".hero-title", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.4")
    .from(".hero-subtitle", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.6")
    .from(".hero-cta .btn", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power3.out"
    }, "-=0.4");

    // --- Scroll Animations ---

    // About Section
    gsap.from(".about-image", {
        scrollTrigger: {
            trigger: ".about",
            start: "top 80%",
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    gsap.from(".about-text h2, .about-text p, .stat-item", {
        scrollTrigger: {
            trigger: ".about",
            start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
    });

    // Portfolio Grid
    gsap.from(".portfolio-item", {
        scrollTrigger: {
            trigger: ".portfolio-grid",
            start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
    });

    // Services Grid
    gsap.from(".service-card", {
        scrollTrigger: {
            trigger: ".services-grid",
            start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
    });

    // Process Steps
    gsap.from(".process-step", {
        scrollTrigger: {
            trigger: ".process-grid",
            start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)"
    });

    // Testimonials
    gsap.from(".test-card", {
        scrollTrigger: {
            trigger: ".test-grid",
            start: "top 85%",
        },
        scale: 0.95,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
    });

    // Contact Form
    gsap.from(".contact-container", {
        scrollTrigger: {
            trigger: ".contact",
            start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });
    
    // Contact Form Submission (Prevent Default)
    const contactForm = document.getElementById('contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // In a real scenario, handle form submission here
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'Message Sent!';
            submitBtn.style.backgroundColor = '#25D366';
            submitBtn.style.color = '#fff';
            
            setTimeout(() => {
                contactForm.reset();
                submitBtn.innerText = originalText;
                submitBtn.style.backgroundColor = 'var(--accent-gold)';
                submitBtn.style.color = 'var(--bg-primary)';
            }, 3000);
        });
    }

    // --- Case Study Modal Logic ---
    const modal = document.getElementById('case-study-modal');
    const modalClose = document.getElementById('modal-close');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // Modal Elements
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalCategory = document.getElementById('modal-category');
    const modalGoal = document.getElementById('modal-goal');
    const modalApproach = document.getElementById('modal-approach');
    const modalOutput = document.getElementById('modal-output');

    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            // Populate Data
            modalImg.src = item.getAttribute('data-img');
            modalTitle.innerText = item.getAttribute('data-title');
            modalCategory.innerText = item.getAttribute('data-category');
            modalGoal.innerText = item.getAttribute('data-goal');
            modalApproach.innerText = item.getAttribute('data-approach');
            modalOutput.innerText = item.getAttribute('data-output');

            // Show Modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    // Close Modal Event Listeners
    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});
