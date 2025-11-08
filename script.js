const themeToggle = document.getElementById('theme-toggle');
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');
const contactForm = document.getElementById('contactForm');
const skillFills = document.querySelectorAll('.skill-fill');
const scrollToTopBtn = document.getElementById('scrollToTop');
const modal = document.getElementById('project-modal');
const closeModal = document.querySelector('.close');
const viewProjectBtns = document.querySelectorAll('.view-project');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

const projectData = {
    library: {
        title: "Library Management System",
        description: "Developed a comprehensive Library Management System using C# with robust database integration and secure authentication. This desktop application streamlines library operations with intuitive features for book tracking, member management, and automated reporting. Built with clean, maintainable code following object-oriented principles.",
        tech: ["C#", "SQL Server", "WinForms", "Entity Framework", "Crystal Reports"],
        images: ["4.jpg", "5.jpg", "6.jpg"],
        features: [
            "Real-time book inventory tracking and management",
            "Member database with borrowing history and analytics",
            "Issuing books easily"
        ]
    },
    pos: {
        title: "POS Management System",
        description: "Created a complete Point of Sale Management System in VB.NET featuring integrated kiosk and cashier interfaces. This desktop application provides businesses with comprehensive sales tracking, inventory management, and customer relationship tools. Focused on delivering efficient transaction processing and real-time business insights.",
        tech: ["VB.NET", "SQL Server", "Desktop Application", "Crystal Reports", "Windows Forms"],
        images: ["1.jpg", "2.jpg", "3.jpg"],
        features: [
            "Unified kiosk and cashier interface integration",
            "Real-time inventory tracking with automated alerts",
            "Sales analytics and performance reporting",
        ]
    },
    portfolio: {
        title: "Personal Portfolio Website",
        description: "Built a fully responsive personal portfolio website using modern web technologies. This project showcases advanced frontend development skills with interactive UI/UX design, smooth animations, and comprehensive functionality. Focused on creating an engaging user experience while maintaining optimal performance and accessibility standards.",
        tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
        images: ["7.jpg", "8.jpg", "9.jpg"],
        features: [
            "Fully responsive design across all devices and screen sizes",
            "Interactive project showcase with filtering capabilities",
            "Smooth UI/UX animations and transitions",
        ]
    }
};

// Enhanced Scroll Animations
function initScrollAnimations() {
    const sections = document.querySelectorAll('section');
    const educationItems = document.querySelectorAll('.education-item');
    const experienceItems = document.querySelectorAll('.experience-item');
    const skillCards = document.querySelectorAll('.skill-card');
    const projectCards = document.querySelectorAll('.project-card');
    const contactItems = document.querySelectorAll('.contact-item');
    const contactForm = document.querySelector('.contact-form');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate skill bars when they become visible
                if (entry.target.classList.contains('skill-fill')) {
                    const fillWidth = entry.target.getAttribute('data-fill');
                    entry.target.style.setProperty('--fill-width', fillWidth);
                    entry.target.classList.add('animated');
                }
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe sections
    sections.forEach(section => {
        if (section.id !== 'home') {
            sectionObserver.observe(section);
        }
    });

    // Observe individual elements
    educationItems.forEach(item => elementObserver.observe(item));
    experienceItems.forEach(item => elementObserver.observe(item));
    skillCards.forEach(card => elementObserver.observe(card));
    projectCards.forEach(card => elementObserver.observe(card));
    contactItems.forEach(item => elementObserver.observe(item));
    if (contactForm) elementObserver.observe(contactForm);
    
    // Observe skill fills
    skillFills.forEach(fill => elementObserver.observe(fill));
}

// Enhanced image loading with fallback
function loadImagesWithFallback() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        if (!img.hasAttribute('data-src')) {
            img.setAttribute('data-src', img.src);
        }
        
        img.onerror = function() {
            const placeholderText = this.alt || 'Image';
            const placeholderColor = this.dataset.color || '#6366f1';
            
            const placeholder = document.createElement('div');
            placeholder.className = 'image-placeholder';
            placeholder.style.cssText = `
                width: 100%;
                height: 100%;
                background: ${placeholderColor}20;
                display: flex;
                align-items: center;
                justify-content: center;
                color: ${placeholderColor};
                font-weight: bold;
                border-radius: 8px;
            `;
            placeholder.textContent = placeholderText;
            
            this.parentNode.replaceChild(placeholder, this);
        };
        
        if (img.complete && img.naturalHeight === 0) {
            img.onerror();
        }
    });
}

function preloadImages() {
    const imageUrls = [
        'portfolioprofile.jpg',
        '4.jpg', '5.jpg', '6.jpg',
        '1.jpg', '2.jpg', '3.jpg',
        '7.jpg', '8.jpg', '9.jpg'
    ];

    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
        img.onload = function() {
            updateImageSource(url);
        };
        img.onerror = function() {
            useFallbackImage(url);
        };
    });
}

function updateImageSource(url) {
    const images = document.querySelectorAll(`img[src="${url}"]`);
    images.forEach(img => {
        img.style.opacity = '1';
    });
}

function useFallbackImage(originalUrl) {
    const fallbackImages = {
        'portfolioprofile.jpg': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=350&h=350&fit=crop&crop=face',
        '4.jpg': 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&h=300&fit=crop',
        '1.jpg': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
        '7.jpg': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop'
    };

    const fallbackUrl = fallbackImages[originalUrl];
    if (fallbackUrl) {
        const images = document.querySelectorAll(`img[src="${originalUrl}"]`);
        images.forEach(img => {
            img.src = fallbackUrl;
            img.style.opacity = '1';
        });
    }
}

function enhanceContactForm() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('.form-control');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            submitForm(this);
        }
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let message = '';
    
    switch(field.type) {
        case 'email':
            if (!value) {
                message = 'Email is required';
                isValid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                message = 'Please enter a valid email';
                isValid = false;
            }
            break;
        case 'text':
            if (!value) {
                message = 'This field is required';
                isValid = false;
            }
            break;
        case 'textarea':
            if (!value) {
                message = 'Message is required';
                isValid = false;
            } else if (value.length < 10) {
                message = 'Message should be at least 10 characters';
                isValid = false;
            }
            break;
    }
    
    if (!isValid) {
        showFieldError(field, message);
    } else {
        clearFieldError(field);
        showFieldSuccess(field);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    clearFieldError(field);
    field.classList.add('error');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: #ef4444;
        font-size: 0.875rem;
        margin-top: 0.25rem;
    `;
    
    field.parentNode.appendChild(errorElement);
}

function clearFieldError(field) {
    field.classList.remove('error');
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

function showFieldSuccess(field) {
    field.classList.add('success');
}

function submitForm(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    
    setTimeout(() => {
        const name = document.getElementById('name').value;
        alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
        form.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
        
        const inputs = form.querySelectorAll('.form-control');
        inputs.forEach(input => {
            clearFieldError(input);
            input.classList.remove('success');
        });
    }, 2000);
}

function enhanceProjectsFilter() {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            projectCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'perspective(1000px) rotateY(0deg)';
                    }, 50);
                } else {
                    const techData = card.getAttribute('data-tech');
                    if (techData && techData.includes(filter)) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'perspective(1000px) rotateY(0deg)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'perspective(1000px) rotateY(90deg)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
}

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const icon = themeToggle.querySelector('i');
    
    if (document.body.classList.contains('light-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});

// Mobile menu functionality
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    const icon = menuToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Scroll events
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    if (window.scrollY > 500) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

// Scroll to top functionality
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Close mobile menu when clicking links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Tool animations
document.querySelectorAll('.tool-animate').forEach(tool => {
    tool.addEventListener('mouseenter', () => {
        tool.style.animation = 'wiggle 0.5s ease';
    });
    
    tool.addEventListener('animationend', () => {
        tool.style.animation = '';
    });
});

// Project modal functionality
viewProjectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const projectId = btn.getAttribute('data-project');
        openProjectModal(projectId);
    });
});

function openProjectModal(projectId) {
    const project = projectData[projectId];
    if (!project) return;

    document.getElementById('modal-title').textContent = project.title;
    
    let descriptionHTML = `<p>${project.description}</p>`;
    descriptionHTML += `<div class="project-features"><h4>Key Features:</h4><ul>`;
    project.features.forEach(feature => {
        descriptionHTML += `<li>${feature}</li>`;
    });
    descriptionHTML += `</ul></div>`;
    
    document.getElementById('modal-description').innerHTML = descriptionHTML;
    
    const modalTech = document.getElementById('modal-tech');
    modalTech.innerHTML = project.tech.map(tech => 
        `<span class="tech-tag">${tech}</span>`
    ).join('');
    
    const modalImages = document.getElementById('modal-images');
    modalImages.innerHTML = project.images.map(img => 
        `<img src="${img}" alt="${project.title}" loading="lazy" style="opacity: 1;">`
    ).join('');
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Add scrollable functionality to modal content
    const modalBody = document.querySelector('.modal-body');
    modalBody.style.maxHeight = '70vh';
    modalBody.style.overflowY = 'auto';
    modalBody.style.paddingRight = '10px';
    
    // Custom scrollbar styling
    modalBody.style.scrollbarWidth = 'thin';
    modalBody.style.scrollbarColor = 'var(--primary) var(--dark-light)';
    
    document.addEventListener('keydown', handleEscapeKey);
}

function closeProjectModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Reset modal body styles
    const modalBody = document.querySelector('.modal-body');
    modalBody.style.maxHeight = '';
    modalBody.style.overflowY = '';
    modalBody.style.paddingRight = '';
    
    document.removeEventListener('keydown', handleEscapeKey);
}

function handleEscapeKey(event) {
    if (event.key === 'Escape') {
        closeProjectModal();
    }
}

closeModal.addEventListener('click', closeProjectModal);

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeProjectModal();
    }
});

// Initialize everything when page loads
window.addEventListener('load', () => {
    initScrollAnimations();
    loadImagesWithFallback();
    preloadImages();
    enhanceContactForm();
    enhanceProjectsFilter();
    
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Parallax effect for floating shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        shape.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Typing effect for hero title
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-text h1');
    const originalText = heroTitle.textContent;
    
    heroTitle.textContent = '';
    heroTitle.classList.add('typewriter');
    
    let i = 0;
    const typing = setInterval(() => {
        if (i < originalText.length) {
            heroTitle.textContent += originalText.charAt(i);
            i++;
        } else {
            clearInterval(typing);
            setTimeout(() => {
                heroTitle.classList.remove('typewriter');
            }, 1000);
        }
    }, 100);
}

setTimeout(initTypingEffect, 1000);
