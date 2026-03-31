// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       NAVBAR SCROLL EFFECT
       ========================================= */
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* =========================================
       ACTIVE NAV LINK HIGHLIGHTING
       ========================================= */
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    /* =========================================
       INTERSECTION OBSERVER FOR ANIMATIONS
       ========================================= */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once animated
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    /* =========================================
       CONTACT FORM SUBMISSION MOCK
       ========================================= */
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const btn = contactForm.querySelector('button');
            
            // Loading state
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
            btn.disabled = true;

            // Mock API request
            setTimeout(() => {
                btn.innerHTML = 'Sent Successfully! <i class="fas fa-check"></i>';
                btn.classList.replace('btn-primary', 'btn-secondary');
                contactForm.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.classList.replace('btn-secondary', 'btn-primary');
                    btn.disabled = false;
                }, 3000);
                
            }, 1500);
        });
    }

    /* =========================================
       CURRENT YEAR IN FOOTER
       ========================================= */
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    /* =========================================
       CYBER-KINETIC FEATURES
       ========================================= */

    // 1. Vanilla Tilt Initialization
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".glass-card"), {
            max: 10,
            speed: 400,
            glare: true,
            "max-glare": 0.2
        });
    }

    // 2. Custom Cursor
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        // Only enable custom cursor on non-touch devices
        if (window.matchMedia("(pointer: fine)").matches) {
            document.body.classList.add('custom-cursor');
            cursor.style.display = 'block';

            let mouseX = window.innerWidth / 2;
            let mouseY = window.innerHeight / 2;
            let cursorX = mouseX;
            let cursorY = mouseY;
            
            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
            });

            // Physics follow
            const animateCursor = () => {
                const dx = mouseX - cursorX;
                const dy = mouseY - cursorY;
                cursorX += dx * 0.15; // smooth easing
                cursorY += dy * 0.15;
                // Center the 32x32 border box (-16) or the scaled up one
                cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
                requestAnimationFrame(animateCursor);
            };
            requestAnimationFrame(animateCursor);

            // Magnetic snap to buttons and links
            const interactables = document.querySelectorAll('a, button, .btn');
            interactables.forEach(el => {
                el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
                el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
            });
        }
    }

    // 3. Canvas Neural Net Background
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const particles = [];
        const numParticles = Math.floor((width * height) / 12000); // Responsive particle count
        
        // Colors from CSS gradient
        const accentBlue = '#06b6d4';
        const accentViolet = '#ec4899';

        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 1.5 + 0.5,
                color: Math.random() > 0.5 ? accentBlue : accentViolet
            });
        }

        let mouse = { x: null, y: null };
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });
        window.addEventListener('mouseout', () => {
            mouse.x = null;
            mouse.y = null;
        });
        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const drawParticles = () => {
            ctx.clearRect(0, 0, width, height);

            particles.forEach((p, index) => {
                p.x += p.vx;
                p.y += p.vy;

                // Bounce off edges gently
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();

                // Draw lines between nearby particles
                for (let j = index + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 - (dist/600)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }

                // Draw lines to mouse
                if (mouse.x != null && mouse.y != null) {
                    const dxm = p.x - mouse.x;
                    const dym = p.y - mouse.y;
                    const distm = Math.sqrt(dxm * dxm + dym * dym);
                    if (distm < 150) {
                        ctx.beginPath();
                        ctx.strokeStyle = p.color; 
                        ctx.globalAlpha = 1 - (distm / 150);
                        ctx.lineWidth = 1.2;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                        ctx.globalAlpha = 1;
                    }
                }
            });

            requestAnimationFrame(drawParticles);
        };
        drawParticles();

        /* =========================================
           MAXIMUM OVERDRIVE EASTER EGG: MATRIX
           ========================================= */
        let typedKeystrokes = '';
        const triggerWord = 'hack';
        
        window.addEventListener('keydown', (e) => {
            typedKeystrokes += e.key.toLowerCase();
            // keep string to length of triggerWord
            if (typedKeystrokes.length > triggerWord.length) {
                typedKeystrokes = typedKeystrokes.slice(1);
            }
            if (typedKeystrokes === triggerWord) {
                // Activate Matrix Mode
                document.body.style.setProperty('--accent-blue', '#0f0');
                document.body.style.setProperty('--accent-violet', '#0a0');
                document.body.style.backgroundColor = '#000';
                
                // Override canvas draw function entirely
                const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*".split("");
                const fontSize = 14;
                const columns = canvas.width / fontSize;
                const drops = [];
                for(let x = 0; x < columns; x++) drops[x] = 1;

                const drawMatrix = () => {
                    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.fillStyle = "#0F0"; 
                    ctx.font = fontSize + "px monospace";

                    for(let i = 0; i < drops.length; i++) {
                        const text = characters[Math.floor(Math.random() * characters.length)];
                        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                        if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                            drops[i] = 0;
                        }
                        drops[i]++;
                    }
                    requestAnimationFrame(drawMatrix);
                };
                
                // Stop previous loop by clearing the original function or just overriding requestAnimationFrame implicitly
                // Since drawParticles calls itself, this is a clean break:
                ctx.clearRect(0,0,width,height);
                drawMatrix(); // start matrix loop instead
            }
        });
    }

    /* =========================================
       MAXIMUM OVERDRIVE: BOOTLOADER
       ========================================= */
    const bootloader = document.getElementById('bootloader');
    const termText = document.getElementById('terminal-text');
    
    if (bootloader && termText) {
        // Prevent scrolling while booting
        document.body.style.overflow = 'hidden';
        
        const bootSequence = [
            "Initializing DebjitOS v1.0.0...",
            "Loading Base Architecture..................[OK]",
            "Establishing Secure Connection.............[OK]",
            "Calculating Neural Node Integrity..........[OK]",
            "Bypassing Security Firewalls...............[SUCCESS]",
            "Access Granted. Welcome, User."
        ];
        
        let lineIdx = 0;
        let charIdx = 0;
        let currentLine = "";
        
        const typeTerminal = () => {
            if (lineIdx < bootSequence.length) {
                if (charIdx === 0) {
                    currentLine = bootSequence[lineIdx];
                }
                
                termText.innerHTML += currentLine.charAt(charIdx);
                charIdx++;
                
                if (charIdx < currentLine.length) {
                    setTimeout(typeTerminal, Math.random() * 20 + 10);
                } else {
                    termText.innerHTML += "<br>";
                    lineIdx++;
                    charIdx = 0;
                    setTimeout(typeTerminal, Math.random() * 200 + 100);
                }
            } else {
                // Done booting
                setTimeout(() => {
                    bootloader.classList.add('hidden');
                    document.body.style.overflow = '';
                    setTimeout(() => bootloader.remove(), 1000);
                }, 500);
            }
        };
        // Start after brief pause
        setTimeout(typeTerminal, 500);
    }

    /* =========================================
       MAXIMUM OVERDRIVE: AUDIO SFX
       ========================================= */
    // Audio Context is tricky because of browser Autoplay rules.
    // It must be initialized on first user interaction.
    let audioCtx = null;
    let sfxEnabled = false;
    
    const sfxToggle = document.getElementById('sfx-toggle');
    if (sfxToggle) {
        sfxToggle.addEventListener('click', () => {
            sfxEnabled = !sfxEnabled;
            if (sfxEnabled) {
                if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                if (audioCtx.state === 'suspended') audioCtx.resume();
                sfxToggle.classList.add('sfx-on');
                sfxToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
                playHollowClick(); // feedback sound
            } else {
                sfxToggle.classList.remove('sfx-on');
                sfxToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
            }
        });
    }

    const playSciFiHover = () => {
        if (!sfxEnabled || !audioCtx) return;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.01, audioCtx.currentTime); // Very quiet
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
    };

    const playHollowClick = () => {
        if (!sfxEnabled || !audioCtx) return;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(800, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
    };

    const playCards = document.querySelectorAll('.glass-card, .btn');
    playCards.forEach(card => {
        card.addEventListener('mouseenter', playSciFiHover);
        card.addEventListener('click', playHollowClick);
    });

    /* =========================================
       KINETIC & VERTICAL PARALLAX ENGINE
       ========================================= */
    const kText1 = document.getElementById('k-text-1');
    const kText2 = document.getElementById('k-text-2');
    
    // Deep Parallax Engine Targets
    const parallaxOrbs = document.querySelectorAll('.parallax-orb');
    const heroImage = document.querySelector('.floating-img');
    const glassCards = document.querySelectorAll('.project-card, .skill-category, .edu-card');

    window.addEventListener('scroll', () => {
        window.requestAnimationFrame(() => {
            const scrolled = window.scrollY;
            
            // 1. Horizontal kinetic background text
            if (kText1 && kText2) {
                kText1.style.transform = `translateX(-${scrolled * 0.15}px)`;
                kText2.style.transform = `translateX(${scrolled * 0.15}px)`;
            }

            // 2. Vertical orb parallax — offset each orb based on its data-speed
            parallaxOrbs.forEach(orb => {
                const speed = parseFloat(orb.getAttribute('data-speed')) || 0;
                orb.style.transform = `translateY(${scrolled * speed * 2}px)`;
            });

            // 3. Hero image floats up slower than text (Apple-style depth)
            if (heroImage) {
                heroImage.style.transform = `translateY(${scrolled * -0.25}px)`;
            }

            // 4. Asymmetric card stagger — even cards slide faster, odd cards slower
            glassCards.forEach((card, index) => {
                const speed = (index % 2 === 0) ? -0.12 : -0.04;
                card.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    });

});
