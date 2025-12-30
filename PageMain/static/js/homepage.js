(function() {
    'use strict';

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    // Sync Lenis with ScrollTrigger
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    ScrollTrigger.refresh();

    // Get elements
    const heroWords = document.querySelectorAll('.hero-word');
    const heroLogo = document.querySelector('.hero-logo');
    const motionShowcase = document.getElementById('motionShowcase');
    const motionBlocks = document.querySelectorAll('.motion-block');
    const manifestoLines = document.querySelectorAll('.manifesto-line');
    const navLinks = document.querySelectorAll('.nav-link');
    const topNavbar = document.getElementById('topNavbar');

    // Hero logo animation - animate immediately on page load
    if (heroLogo) {
        // Animate from slightly below
        gsap.fromTo(heroLogo, 
            {
                opacity: 0,
                y: 30
            },
            {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: 'power3.out',
                delay: 0.3
            }
        );
    }

    // Staggered headline animation for intro section
    if (heroWords.length > 0) {
        gsap.to(heroWords, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.intro-section',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    }

    // Pinned scroll effect with horizontal slide-in carousel
    if (motionShowcase && motionBlocks.length > 0) {
        // Create master timeline for pinned scroll
        const masterTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: motionShowcase,
                start: 'top top',
                end: () => `+=${motionBlocks.length * window.innerHeight * 2}`,
                pin: true,
                scrub: 1,
                anticipatePin: 1
            }
        });

        // Set initial states for all blocks
        motionBlocks.forEach((block) => {
            const motionContent = block.querySelector('.motion-content');
            const blockNum = parseInt(block.getAttribute('data-block'));
            const isOdd = blockNum % 2 === 1;
            const startX = isOdd ? -window.innerWidth : window.innerWidth;
            
            gsap.set(block, { opacity: 0, visibility: 'hidden' });
            gsap.set(motionContent, { opacity: 0, x: startX });
        });

        // Animate each block sliding in based on scroll progress
        motionBlocks.forEach((block, index) => {
            const motionContent = block.querySelector('.motion-content');
            const blockNum = parseInt(block.getAttribute('data-block'));
            const isOdd = blockNum % 2 === 1;
            const startX = isOdd ? -window.innerWidth : window.innerWidth;
            
            // Calculate timing - each block gets a portion of the scroll
            const startProgress = index / motionBlocks.length;
            const endProgress = (index + 1) / motionBlocks.length;
            const duration = 1 / motionBlocks.length;

            // Show block
            masterTimeline.set(block, { visibility: 'visible' }, startProgress);
            
            // Fade in block
            masterTimeline.to(block, {
                opacity: 1,
                duration: duration * 0.3,
                ease: 'power1.out'
            }, startProgress);

            // Slide in content from side
            masterTimeline.to(motionContent, {
                opacity: 1,
                x: 0,
                duration: duration * 0.7,
                ease: 'power2.out'
            }, startProgress + duration * 0.1);

            // Fade out block (except last one)
            if (index < motionBlocks.length - 1) {
                masterTimeline.to(block, {
                    opacity: 0,
                    duration: duration * 0.2,
                    ease: 'power1.in'
                }, endProgress - duration * 0.2);
            }
        });
    }

    // Manifesto Section - Arising reveal
    if (manifestoLines.length > 0) {
        manifestoLines.forEach((line, index) => {
            gsap.fromTo(line,
                {
                    opacity: 0,
                    y: 50
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: line,
                        start: 'top 85%',
                        end: 'top 50%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });
    }

    // Update navigation active state based on scroll position
    // Update for intro section
    ScrollTrigger.create({
        trigger: '.intro-section',
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => {
            navLinks.forEach(link => link.classList.remove('active'));
            const heroNav = document.querySelector('[data-section="hero"]');
            if (heroNav) heroNav.classList.add('active');
        },
        onEnterBack: () => {
            navLinks.forEach(link => link.classList.remove('active'));
            const heroNav = document.querySelector('[data-section="hero"]');
            if (heroNav) heroNav.classList.add('active');
        }
    });

    // Update for each motion block - track scroll progress in pinned section
    if (motionShowcase && motionBlocks.length > 0) {
        ScrollTrigger.create({
            trigger: motionShowcase,
            start: 'top top',
            end: () => `+=${motionBlocks.length * window.innerHeight * 2}`,
            onUpdate: (self) => {
                const progress = self.progress;
                const activeBlockIndex = Math.floor(progress * motionBlocks.length);
                const activeBlock = motionBlocks[activeBlockIndex];
                
                if (activeBlock) {
                    const blockNum = activeBlock.getAttribute('data-block');
                    navLinks.forEach(link => link.classList.remove('active'));
                    const navLink = document.querySelector(`[data-block="${blockNum}"]`);
                    if (navLink) navLink.classList.add('active');
                }
            }
        });
    }

    // Update for manifesto section
    ScrollTrigger.create({
        trigger: '.manifesto-section',
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => {
            navLinks.forEach(link => link.classList.remove('active'));
            const contactNav = document.querySelector('[data-section="contact"]');
            if (contactNav) contactNav.classList.add('active');
        },
        onEnterBack: () => {
            navLinks.forEach(link => link.classList.remove('active'));
            const contactNav = document.querySelector('[data-section="contact"]');
            if (contactNav) contactNav.classList.add('active');
        }
    });

    // Navigation link click handlers - smooth scroll with Lenis
    navLinks.forEach((link) => {
        link.addEventListener('click', function(e) {
            // Don't prevent default for external links (dropdown links)
            if (this.classList.contains('dropdown-link')) {
                return;
            }
            
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            const blockNum = this.getAttribute('data-block');
            let targetElement;

            if (targetSection === 'hero') {
                targetElement = document.getElementById('hero');
            } else if (targetSection === 'contact') {
                targetElement = document.querySelector('.manifesto-section');
            } else if (blockNum) {
                // Scroll to specific motion block
                const targetBlock = document.querySelector(`[data-block="${blockNum}"]`);
                if (targetBlock) {
                    lenis.scrollTo(targetBlock, {
                        duration: 2.5,
                        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                    });
                }
            }

            if (targetElement && !blockNum) {
                lenis.scrollTo(targetElement, {
                    duration: 2,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                });
            }
        });
    });

    // Set initial active nav item
    if (navLinks.length > 0) {
        const heroNav = document.querySelector('[data-section="hero"]');
        if (heroNav) heroNav.classList.add('active');
    }

    // Refresh ScrollTrigger on window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            ScrollTrigger.refresh();
            lenis.resize();
        }, 250);
    });

    // Infinite Carousel for Companies
    const companiesCarousel = document.getElementById('companiesCarousel');
    if (companiesCarousel) {
        const cards = companiesCarousel.querySelectorAll('.company-card');
        
        // Duplicate all cards for seamless infinite scroll
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            companiesCarousel.appendChild(clone);
        });
        
        // Add animation class after duplication
        companiesCarousel.classList.add('animate');
        
        // Pause on hover
        companiesCarousel.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        companiesCarousel.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    }

    // Newsletter Form Handler
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('.newsletter-input').value;
            // Placeholder for newsletter signup logic
            console.log('Newsletter signup:', email);
            alert('Thank you for signing up! You will receive updates from Quenchmark.');
            this.reset();
        });
    }

})();
