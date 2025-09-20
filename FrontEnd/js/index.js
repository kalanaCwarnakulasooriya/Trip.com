
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', function() {
        preloader.classList.add('hidden');
        setTimeout(() => {
            preloader.style.display = 'none';

            // Initialize AOS
            initAOS();

            // Initialize split text animation
            initSplitText();

            // Start counter animation
            initCounters();
        }, 500);
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');

        if (menuToggle.classList.contains('active')) {
            menuToggle.querySelector('span:first-child').style.transform = 'translateY(9px) rotate(45deg)';
            menuToggle.querySelector('span:nth-child(2)').style.opacity = '0';
            menuToggle.querySelector('span:last-child').style.transform = 'translateY(-9px) rotate(-45deg)';
        } else {
            menuToggle.querySelector('span:first-child').style.transform = 'none';
            menuToggle.querySelector('span:nth-child(2)').style.opacity = '1';
            menuToggle.querySelector('span:last-child').style.transform = 'none';
        }
    });

    // Close mobile menu when clicking on a link
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            menuToggle.querySelector('span:first-child').style.transform = 'none';
            menuToggle.querySelector('span:nth-child(2)').style.opacity = '1';
            menuToggle.querySelector('span:last-child').style.transform = 'none';
        });
    });

    // Search tabs
    const searchTabs = document.querySelectorAll('.search-tab');
    const searchContents = document.querySelectorAll('.search-content');

    searchTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const target = this.getAttribute('data-tab');

            // Remove active class from all tabs and contents
            searchTabs.forEach(tab => tab.classList.remove('active'));
            searchContents.forEach(content => content.classList.remove('active'));

            // Add active class to current tab and content
            this.classList.add('active');
            document.getElementById(`${target}-tab`).classList.add('active');
        });
    });

    /*// Testimonial slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelectorAll('.dot');
    const testimonialPrev = document.querySelector('.testimonial-prev');
    const testimonialNext = document.querySelector('.testimonial-next');

    let currentSlide = 0;

    function showSlide(index) {
        // Remove active class from all slides and dots
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        testimonialDots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current slide and dot
        testimonialSlides[index].classList.add('active');
        testimonialDots[index].classList.add('active');

        currentSlide = index;
    }

    testimonialNext.addEventListener('click', function() {
        currentSlide = (currentSlide + 1) % testimonialSlides.length;
        showSlide(currentSlide);
    });

    testimonialPrev.addEventListener('click', function() {
        currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
        showSlide(currentSlide);
    });

    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
        });
    });

    // Auto slide testimonials
    let testimonialInterval = setInterval(function() {
        currentSlide = (currentSlide + 1) % testimonialSlides.length;
        showSlide(currentSlide);
    }, 5000);

    // Pause auto slide on hover
    const testimonialSlider = document.querySelector('.testimonials-slider');
    testimonialSlider.addEventListener('mouseenter', function() {
        clearInterval(testimonialInterval);
    });

    testimonialSlider.addEventListener('mouseleave', function() {
        testimonialInterval = setInterval(function() {
            currentSlide = (currentSlide + 1) % testimonialSlides.length;
            showSlide(currentSlide);
        }, 5000);
    });*/

    // Back to top button
    const backToTop = document.querySelector('.back-to-top');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Simple validation
            let valid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');

            if (!name.value.trim()) {
                valid = false;
                name.style.borderColor = 'red';
            } else {
                name.style.borderColor = 'var(--border-color)';
            }

            if (!email.value.trim() || !isValidEmail(email.value)) {
                valid = false;
                email.style.borderColor = 'red';
            } else {
                email.style.borderColor = 'var(--border-color)';
            }

            if (!message.value.trim()) {
                valid = false;
                message.style.borderColor = 'red';
            } else {
                message.style.borderColor = 'var(--border-color)';
            }

            if (valid) {
                // Simulate form submission
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;

                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';

                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.textContent = 'Message Sent!';

                    setTimeout(() => {
                        submitBtn.disabled = false;
                        submitBtn.textContent = originalText;
                    }, 2000);
                }, 1500);
            }
        });
    }

    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Initialize AOS (Animate on Scroll)
    function initAOS() {
        const animatedElements = document.querySelectorAll('[data-aos]');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                } else {
                    // Uncomment to enable re-animation when scrolling back up
                    // entry.target.classList.remove('aos-animate');
                }
            });
        }, {
            threshold: 0.1
        });

        animatedElements.forEach(element => {
            observer.observe(element);

            // Add delay if specified
            const delay = element.getAttribute('data-aos-delay');
            if (delay) {
                element.style.transitionDelay = `${delay}ms`;
            }
        });
    }

    // Split text animation
    function initSplitText() {
        const splitTextElements = document.querySelectorAll('.split-text');

        splitTextElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';

            for (let i = 0; i < text.length; i++) {
                const char = document.createElement('span');
                char.className = 'char';
                char.style.transitionDelay = `${i * 30}ms`;
                char.textContent = text[i] === ' ' ? '\u00A0' : text[i];
                element.appendChild(char);
            }

            // Trigger animation after a short delay
            setTimeout(() => {
                const chars = element.querySelectorAll('.char');
                chars.forEach(char => {
                    char.style.opacity = 1;
                    char.style.transform = 'translateY(0)';
                });
            }, 500);
        });
    }

    // Counter animation
    function initCounters() {
        const counters = document.querySelectorAll('.stat-number');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const countTo = parseInt(target.getAttribute('data-count'));
                    let count = 0;
                    const speed = 2000 / countTo;

                    const updateCount = () => {
                        count++;
                        target.textContent = count;

                        if (count < countTo) {
                            setTimeout(updateCount, speed);
                        }
                    };

                    updateCount();
                    observer.unobserve(target);
                }
            });
        }, {
            threshold: 0.5
        });

        counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    // Gallery lightbox
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').getAttribute('src');

            // Create lightbox elements
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';

            const lightboxContent = document.createElement('div');
            lightboxContent.className = 'lightbox-content';

            const lightboxImg = document.createElement('img');
            lightboxImg.src = imgSrc;

            const closeBtn = document.createElement('button');
            closeBtn.className = 'lightbox-close';
            closeBtn.innerHTML = '&times;';

            // Append elements
            lightboxContent.appendChild(lightboxImg);
            lightboxContent.appendChild(closeBtn);
            lightbox.appendChild(lightboxContent);
            document.body.appendChild(lightbox);

            // Prevent scrolling
            document.body.style.overflow = 'hidden';

            // Add animation
            setTimeout(() => {
                lightbox.style.opacity = 1;
                lightboxContent.style.transform = 'scale(1)';
            }, 10);

            // Close lightbox
            closeBtn.addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    closeLightbox();
                }
            });

            function closeLightbox() {
                lightbox.style.opacity = 0;
                lightboxContent.style.transform = 'scale(0.9)';

                setTimeout(() => {
                    document.body.removeChild(lightbox);
                    document.body.style.overflow = '';
                }, 300);
            }
        });
    });

    // Add lightbox styles
    const style = document.createElement('style');
    style.textContent = `
      .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
        transform: scale(0.9);
        transition: transform 0.3s ease;
      }

      .lightbox-content img {
        max-width: 100%;
        max-height: 90vh;
        display: block;
        border: 5px solid white;
        box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);
      }

      .lightbox-close {
        position: absolute;
        top: -40px;
        right: 0;
        width: 30px;
        height: 30px;
        background: transparent;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
      }
    `;
    document.head.appendChild(style);
});


// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !subject || !message) {
            // alert("Please fill all fields before submitting.");
            toastr.error("Please fill all fields before submitting.", "Error");
            return;
        }

        const contactData = { name, email, subject, message };

        try {
            const res = await fetch("http://localhost:8080/api/contacts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(contactData)
            });

            if (res.ok) {
                const result = await res.json();
                // alert(result.message || "Message sent successfully!");
                toastr.success(result.message || "Message sent successfully!", "Success");
                contactForm.reset();
            } else {
                // alert("Failed to send message. Try again.");
                toastr.error("Failed to send message. Try again.", "Error");
            }
        } catch (err) {
            console.error("Error submitting contact:", err);
            // alert("Something went wrong. Please try again later.");
            toastr.error("Something went wrong. Please try again later.", "Error");
        }
    });
}

// ===== TESTIMONIALS =====
async function loadTestimonials() {
    const FEEDBACK_API_URL = "http://localhost:8080/api/feedback";
    const slider = document.getElementById("testimonialsSlider");
    const dotsContainer = document.querySelector(".testimonial-dots");

    if (!slider || !dotsContainer) return;

    try {
        const res = await fetch(FEEDBACK_API_URL);
        const data = await res.json();

        if (res.ok && data.data?.length) {
            slider.innerHTML = "";
            dotsContainer.innerHTML = "";

            data.data.forEach((fb, i) => {
                const slide = document.createElement("div");
                slide.classList.add("testimonial-slide");
                if (i === 0) slide.classList.add("active");

                slide.innerHTML = `
                    <div class="testimonial-card">
                        <div class="testimonial-rating">
                            ${renderStars(fb.rating || 5)}
                        </div>
                        <p class="testimonial-text">"${fb.message}"</p>
                        <div class="testimonial-author">
                            <div class="author-info">
                                <h4 class="author-name">${fb.name}</h4>
                                <p class="author-trip">${fb.trip || ""}</p>
                            </div>
                        </div>
                    </div>
                `;
                slider.appendChild(slide);

                const dot = document.createElement("span");
                dot.classList.add("dot");
                if (i === 0) dot.classList.add("active");
                dotsContainer.appendChild(dot);
            });

            initTestimonialSlider();
        }
    } catch (err) {
        console.error("Error loading testimonials:", err);
        toastr.error("Failed to load testimonials", "Error");
    }
}

function renderStars(rating) {
    let html = "";
    for (let i = 0; i < 5; i++) {
        html += i < rating ? `<span class="star filled"></span>` : `<span class="star"></span>`;
    }
    return html;
}

function initTestimonialSlider() {
    const slides = document.querySelectorAll(".testimonial-slide");
    const dots = document.querySelectorAll(".testimonial-dots .dot");
    if (!slides.length || !dots.length) return;

    let currentIndex = 0;

    const prevBtn = document.querySelector(".testimonial-prev");
    const nextBtn = document.querySelector(".testimonial-next");

    function showSlide(idx) {
        if (!slides[idx] || !dots[idx]) return;
        slides.forEach((s, i) => s.classList.toggle("active", i === idx));
        dots.forEach((d, i) => d.classList.toggle("active", i === idx));
        currentIndex = idx;
    }

    prevBtn?.addEventListener("click", () => showSlide((currentIndex - 1 + slides.length) % slides.length));
    nextBtn?.addEventListener("click", () => showSlide((currentIndex + 1) % slides.length));
    dots.forEach((dot, i) => dot.addEventListener("click", () => showSlide(i)));

    showSlide(0);
}

// ===== GALLERY =====
async function loadGallery() {
    const GALLERY_API_URL = "http://localhost:8080/api/galleries";
    const galleryGrid = document.querySelector(".gallery-grid");

    if (!galleryGrid) return;

    try {
        const res = await fetch(GALLERY_API_URL);
        const result = await res.json();

        if (res.ok && result.data?.length) {
            galleryGrid.innerHTML = ""; // clear old static content

            result.data.forEach((gallery, i) => {
                const item = document.createElement("div");
                item.classList.add("gallery-item");
                item.setAttribute("data-aos", "zoom-in");
                item.setAttribute("data-aos-delay", i * 100);

                item.innerHTML = `
                    <img src="${gallery.imageUrl}" alt="Gallery Image ${i+1}">
                    <div class="gallery-overlay">
                        <div class="gallery-icon" data-img="${gallery.imageUrl}">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 24 24" fill="none"
                                 stroke="currentColor" stroke-width="2"
                                 stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="8" x2="12" y2="16"></line>
                                <line x1="8" y1="12" x2="16" y2="12"></line>
                            </svg>
                        </div>
                    </div>
                `;
                galleryGrid.appendChild(item);
            });

            // Re-initialize AOS animation after adding new items
            if (window.AOS) {
                AOS.refresh();
            }

            // Add click event for zoom
            document.querySelectorAll(".gallery-icon").forEach(icon => {
                icon.addEventListener("click", (e) => {
                    const imgUrl = e.currentTarget.getAttribute("data-img");
                    openLightbox(imgUrl);
                });
            });

        } else {
            galleryGrid.innerHTML = "<p>No gallery images found.</p>";
            toastr.info("No gallery images found", "Info");
        }
    } catch (err) {
        console.error("Error loading gallery:", err);
        galleryGrid.innerHTML = "<p>Failed to load gallery.</p>";
        toastr.error("Failed to load gallery", "Error");
    }
}

// ===== LIGHTBOX MODAL =====
function openLightbox(imgUrl) {
    // If modal already exists, remove it
    const existingModal = document.getElementById("lightboxModal");
    if (existingModal) existingModal.remove();

    // Create modal container
    const modal = document.createElement("div");
    modal.id = "lightboxModal";
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.background = "rgba(0,0,0,0.8)";
    modal.style.display = "flex";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";
    modal.style.zIndex = "1000";

    // Inner content
    modal.innerHTML = `
        <div style="position:relative; max-width:38%; max-height:90%;">
            <img src="${imgUrl}" style="width:100%; height:auto; border-radius:10px;">
            <span id="closeModal"
                  style="position:absolute; top:-10px; right:-10px;
                         background:#fff; border-radius:50%;
                         width:35px; height:35px; line-height:35px;
                         text-align:center; cursor:pointer; font-weight:bold;">
                ✕
            </span>
        </div>
    `;

    document.body.appendChild(modal);

    // Close when click on close button or outside
    modal.querySelector("#closeModal").addEventListener("click", () => modal.remove());
    modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.remove();
    });
}

document.addEventListener("DOMContentLoaded", () => {
    loadTestimonials();
    loadGallery();
});

// Toastr settings (optional customization)
toastr.options = {
    "closeButton": true,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "timeOut": "4000"
};