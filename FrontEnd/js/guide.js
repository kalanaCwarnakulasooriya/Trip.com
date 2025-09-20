document.addEventListener("DOMContentLoaded", () => {
    const GUIDES_API_URL = "http://localhost:8080/api/guides";
    const TIPS_API_URL = "http://localhost:8080/api/travelTips";

    const guidesContainer = document.getElementById("guidesContainer");
    const tipsContainer = document.getElementById("tipsContainer");

    // ===== Load Guides =====
    async function loadGuides() {
        if (!guidesContainer) return;
        try {
            const response = await fetch(GUIDES_API_URL);
            const data = await response.json();

            guidesContainer.innerHTML = ""; // clear old content

            if (response.ok && data.data && data.data.length > 0) {
                data.data.forEach(guide => addGuideCard(guide));
            } else {
                guidesContainer.innerHTML = `<p>No guides found.</p>`;
                toastr.warning("No guides found", "Warning");
            }
        } catch (error) {
            console.error("Error loading guides:", error);
            guidesContainer.innerHTML = `<p style="color:red;">Failed to load guides.</p>`;
            toastr.error("Failed to load guides", "Error");
        }
    }

    // ===== Build Guide Card =====
    function addGuideCard(guide) {
        const card = document.createElement("div");
        card.classList.add("guide-card");
        card.setAttribute("data-aos", "fade-up");

        // Build social links dynamically
        let socialsHtml = "";
        if (guide.socialLinks) {
            for (const [platform, url] of Object.entries(guide.socialLinks)) {
                socialsHtml += `
                    <a href="${url}" target="_blank" class="guide-social-link">
                        <i class="fab fa-${platform.toLowerCase()}"></i>
                    </a>`;
            }
        }

        card.innerHTML = `
            <div class="guide-image">
                <img src="${guide.imagePath || 'images/default-guide.jpg'}" alt="${guide.name}">
                <div class="guide-overlay">
                    ${socialsHtml || "<span>No Social Links</span>"}
                </div>
            </div>
            <div class="guide-content">
                <h3 class="guide-name">${guide.name}</h3>
                <p class="guide-position">${guide.position}</p>
                <div class="guide-info">
                    <div class="guide-info-item">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                        <span>${guide.experienceYears || 0}+ Years Experience</span>
                    </div>
                    <div class="guide-info-item">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <span>${guide.location || "Sri Lanka"}</span>
                    </div>
                    <div class="guide-info-item">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21.5 12H16c-.7 2-2 3-4 3s-3.3-1-4-3H2.5"></path>
                            <path d="M5.5 5.1L2 12v6c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2v-6l-3.4-6.9A2 2 0 0 0 16.8 4H7.2a2 2 0 0 0-1.8 1.1z"></path>
                        </svg>
                        <span>${guide.specialities || "Tours"}</span>
                    </div>
                </div>
                <p class="guide-bio">${guide.bio || ""}</p>
                <a href="#" class="btn btn-outline btn-sm">Book Now</a>
            </div>
        `;

        guidesContainer.appendChild(card);
    }

    // ===== Load Travel Tips =====
    async function loadTips() {
        if (!tipsContainer) return;
        try {
            const response = await fetch(TIPS_API_URL);
            const data = await response.json();

            tipsContainer.innerHTML = "";

            if (response.ok && data.data && data.data.length > 0) {
                data.data.forEach(tip => addTipCard(tip));
            } else {
                tipsContainer.innerHTML = `<p>No travel tips found.</p>`;
                toastr.info("No travel tips found", "Info");
            }
        } catch (error) {
            console.error("Error loading tips:", error);
            tipsContainer.innerHTML = `<p style="color:red;">Failed to load travel tips.</p>`;
            toastr.error("Failed to load travel tips", "Error");
        }
    }

    function addTipCard(tip) {
        const card = document.createElement("div");
        card.classList.add("tip-card");
        card.setAttribute("data-aos", "fade-up");
        card.setAttribute("data-aos-delay", "200");

        card.innerHTML = `
        <div class="tip-image">
            <img src="${tip.imageUrl || 'images/default-tip.jpg'}" alt="${tip.title}">
        </div>
        <div class="tip-content">
            <div class="tip-category">${tip.category}</div>
            <h3 class="tip-title">${tip.title}</h3>
            <p class="tip-excerpt">${tip.excerpt || ""}</p>
            <a href="${tip.link || '#'}" target="_blank" class="tip-link">
                <span>Read More</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                     fill="none" stroke="currentColor" stroke-width="2"
                     stroke-linecap="round" stroke-linejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
            </a>
        </div>
    `;

        tipsContainer.appendChild(card);
    }


    // ===== Run Loader =====
    loadGuides();
    loadTips()


    // ===== Auth check (inside DOMContentLoaded) =====
    const token = getCookie("token");
    if (!token) {
        toastr.warning("You must be logged in to submit feedback.", "Access Denied");
        setTimeout(() => window.location.replace("index.html"), 1500);
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