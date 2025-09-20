document.addEventListener("DOMContentLoaded", () => {
    // ===== DESTINATIONS =====
    const DEST_API_URL = "http://localhost:8080/api/destinations";
    const destGrid = document.querySelector(".destinations-grid");

    async function loadDestinations() {
        if (!destGrid) return;
        try {
            const response = await fetch(DEST_API_URL);
            const data = await response.json();
            if (response.ok && data.data) {
                data.data.forEach(dest => addDestinationCard(dest));
            } else {
                console.warn("No destinations found");
                toastr.info("No destinations found", "Info");
            }
        } catch (error) {
            console.error("Error loading destinations:", error);
            toastr.error("Failed to load destinations", "Error");
        }
    }

    function addDestinationCard(dest) {
        if (!destGrid) return;

        const card = document.createElement("div");
        card.classList.add("destination-card");
        card.setAttribute("data-aos", "fade-up");

        let fullStars = Math.floor(dest.rating || 0);
        let halfStar = (dest.rating || 0) % 1 >= 0.5 ? 1 : 0;
        let starsHtml = "";
        for (let i = 0; i < fullStars; i++) starsHtml += `<span class="star filled"></span>`;
        if (halfStar) starsHtml += `<span class="star half-filled"></span>`;

        card.innerHTML = `
                <div class="destination-image">
                    <img src="${dest.imageUrl}" alt="${dest.title}">
                    <div class="destination-overlay">
                        <div class="destination-content">
                            <h3 class="destination-title">${dest.title}</h3>
                            <p class="destination-location">${dest.location}</p>
                        </div>
                        <div class="destination-price">${dest.currency || "Rs."} ${dest.price?.toLocaleString()}</div>
                    </div>
                </div>
                <div class="destination-info">
                    <div class="destination-rating">
                        <div class="stars">${starsHtml}</div>
                        <span class="rating-text">${dest.rating || "0.0"} (${dest.reviews || 0} reviews)</span>
                    </div>
                    <div class="destination-duration">${dest.duration || "-"}</div>
                </div>
            `;
        destGrid.appendChild(card);
    }

    // ===== PACKAGES =====
    const PACKAGES_API_URL = "http://localhost:8080/api/packages";
    const packagesContainer = document.getElementById("packagesContainer");

    async function loadPackages() {
        if (!packagesContainer) return;
        try {
            const response = await fetch(PACKAGES_API_URL);
            const data = await response.json();
            if (response.ok && data.data) {
                data.data.forEach(pkg => addPackageCard(pkg));
            } else {
                console.warn("No packages found");
                toastr.error("No packages found", "Error");
            }
        } catch (error) {
            console.error("Error loading packages:", error);
            toastr.error("Failed to load packages", "Error");
        }
    }

    function addPackageCard(pkg) {
        if (!packagesContainer) return;
        const card = document.createElement("div");
        card.classList.add("package-card", "featured");
        card.setAttribute("data-aos", "fade-up");

        let featuresHtml = "";
        if (pkg.features && pkg.features.length) {
            featuresHtml = pkg.features.map(f => `<li>${f}</li>`).join("");
        }

        card.innerHTML = `
                <div class="package-tag">${pkg.tag || "New"}</div>
                <h3 class="package-title">${pkg.title}</h3>
                <p class="package-description">${pkg.description}</p>
                <ul class="package-features">${featuresHtml}</ul>
                <div class="package-price">
                    <span class="price">$${pkg.price?.toLocaleString() || "0"}</span>
                    <span class="unit">/ ${pkg.unit || "per person"}</span>
                </div>
                <button class="btn btn-primary" onclick="window.location.href='pkgBooking.html'">
                    Book This Package
                </button>
            `;
        packagesContainer.appendChild(card);
    }

    // ===== CONTACT FORM =====
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", async e => {
            e.preventDefault();
            const name = document.getElementById("name")?.value.trim() || "";
            const email = document.getElementById("email")?.value.trim() || "";
            const subject = document.getElementById("subject")?.value.trim() || "";
            const message = document.getElementById("message")?.value.trim() || "";

            if (!name || !email || !subject || !message) {
                // alert("Please fill all fields before submitting.");
                toastr.error("Please fill all fields before submitting.", "Error");
                return;
            }

            const contactData = { name, email, subject, message };

            try {
                const response = await fetch("http://localhost:8080/api/contacts", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(contactData)
                });
                if (response.ok) {
                    const result = await response.json();
                    // alert(result.message || "Message sent successfully!");
                    toastr.success(result.message || "Message sent successfully!", "Success");
                    contactForm.reset();
                } else {
                    // alert("Failed to send message. Try again.");
                    toastr.error("Failed to send message. Try again.", "Error");
                }
            } catch (error) {
                console.error("Error submitting contact:", error);
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
            const response = await fetch(FEEDBACK_API_URL);
            const result = await response.json();

            if (response.ok && result.data) {
                slider.innerHTML = "";
                dotsContainer.innerHTML = "";

                result.data.forEach((fb, index) => {
                    const slide = document.createElement("div");
                    slide.classList.add("testimonial-slide");
                    if (index === 0) slide.classList.add("active");

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
                    if (index === 0) dot.classList.add("active");
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
        let fullStars = Math.floor(rating);
        let halfStar = rating % 1 >= 0.5 ? 1 : 0;
        let html = "";
        for (let i = 0; i < fullStars; i++) html += `<span class="star filled"></span>`;
        if (halfStar) html += `<span class="star half-filled"></span>`;
        while (html.split("star").length - 1 < 5) html += `<span class="star"></span>`;
        return html;
    }

    function initTestimonialSlider() {
        const slides = document.querySelectorAll(".testimonial-slide");
        const dots = document.querySelectorAll(".testimonial-dots .dot");
        if (!slides.length || !dots.length) return;

        let currentIndex = 0;

        function showSlide(index) {
            if (!slides[index] || !dots[index]) return;
            slides.forEach((s, i) => s.classList.toggle("active", i === index));
            dots.forEach((d, i) => d.classList.toggle("active", i === index));
            currentIndex = index;
        }

        document.querySelector(".testimonial-prev")?.addEventListener("click", () => {
            showSlide((currentIndex - 1 + slides.length) % slides.length);
        });
        document.querySelector(".testimonial-next")?.addEventListener("click", () => {
            showSlide((currentIndex + 1) % slides.length);
        });

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
                galleryGrid.innerHTML = "";

                result.data.forEach((gallery, i) => {
                    const item = document.createElement("div");
                    item.classList.add("gallery-item");
                    item.setAttribute("data-aos", "zoom-in");
                    item.setAttribute("data-aos-delay", i * 100);

                    item.innerHTML = `
                            <img src="${gallery.imageUrl}" alt="Gallery Image ${i + 1}">
                            <div class="gallery-overlay">
                                <div class="gallery-icon" data-img="${gallery.imageUrl}">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                         fill="none" stroke="currentColor" stroke-width="2"
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

                if (window.AOS) AOS.refresh();

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

    function openLightbox(imgUrl) {
        const existingModal = document.getElementById("lightboxModal");
        if (existingModal) existingModal.remove();

        const modal = document.createElement("div");
        modal.id = "lightboxModal";
        modal.style.cssText = `
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.8); display: flex; justify-content: center;
                align-items: center; z-index: 1000;
            `;

        modal.innerHTML = `
                <div style="position:relative; max-width:38%; max-height:90%;">
                    <img src="${imgUrl}" style="width:100%; height:auto; border-radius:10px;">
                    <span id="closeModal"
                          style="position:absolute; top:-10px; right:-10px; background:#fff;
                                 border-radius:50%; width:35px; height:35px; line-height:35px;
                                 text-align:center; cursor:pointer; font-weight:bold;">✕</span>
                </div>
            `;

        document.body.appendChild(modal);
        modal.querySelector("#closeModal").addEventListener("click", () => modal.remove());
        modal.addEventListener("click", (e) => { if (e.target === modal) modal.remove(); });
    }

    // ===== Load everything =====
    loadDestinations();
    loadPackages();
    loadTestimonials();
    loadGallery();

    // ===== Auth check (inside DOMContentLoaded) =====
    const token = getCookie("token");
    if (!token) {
        toastr.warning("You must be logged in.", "Access Denied");
        setTimeout(() => window.location.replace("login.html"), 1500);
    }
});

// ===== Cookie Helpers (GLOBAL scope) =====
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax;";
}

// ===== Logout (GLOBAL so button onclick works) =====
function logout() {
    deleteCookie("token");
    deleteCookie("username");
    toastr.info("Logged out successfully.", "Logout");
    setTimeout(() => window.location.replace("index.html"), 1500);
}

// Toastr settings (optional customization)
toastr.options = {
    "closeButton": true,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "timeOut": "4000"
};