document.addEventListener("DOMContentLoaded", () => {
    // Load Vehicle
    const VEHICLE_API_URL = "http://localhost:8080/api/vehicles";
    const vehicleGrid = document.querySelector(".featured-vehicles-container");
    const dotsContainer = document.querySelector(".dots");

    async function loadVehicles() {
        if (!vehicleGrid) return;
        try {
            const response = await fetch(VEHICLE_API_URL);
            const data = await response.json();

            if (response.ok && data.data) {
                renderVehicles(data.data);
            } else {
                console.warn("No vehicle found");
                toastr.info("No vehicle found", "Info");
            }
        } catch (error) {
            console.error("Error loading vehicles:", error);
            toastr.error("Error loading vehicles", "Error");
        }
    }

    // ⭐ Generate stars
    function generateStars(rating) {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        let starsHtml = "";

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                starsHtml += `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                    </svg>`;
            } else if (i === fullStars && halfStar) {
                starsHtml += `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-label="Half star"
                                     width="24" height="24">
                                  <defs>
                                    <clipPath id="clip-left-half">
                                      <rect x="0" y="0" width="12" height="24" />
                                    </clipPath>
                                  </defs>
                                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                                           fill="currentColor" clip-path="url(#clip-left-half)" />
                                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                                           fill="none" stroke="currentColor" stroke-width="1" stroke-linejoin="round" />
                                </svg>
                                       `;
            } else {
                starsHtml += `<svg xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 24 24"
                                     width="24" height="24"
                                     role="img" aria-label="Outline star">
                                  <polygon
                                    points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linejoin="round"
                                    stroke-linecap="round"/>
                                </svg>
                                `;
            }
        }
        return starsHtml;
    }

    // ⭐ Render vehicles dynamically
    function renderVehicles(vehicles) {
        vehicleGrid.innerHTML = "";
        dotsContainer.innerHTML = "";

        vehicles.forEach((vehicle, index) => {
            const featuresHtml = (vehicle.features || []).map(f => `
                    <div class="feature">
                        <span>
                            <i class="fa ${f.icon}"></i> ${f.name}
                        </span>
                    </div>
                `).join("");

            const vehicleHtml = `
                    <div class="featured-vehicle" data-id="${vehicle.id}">
                        <div class="vehicle-image">
                            <img src="${vehicle.imageUrl || 'images/default-car.jpg'}" alt="${vehicle.name || 'Vehicle'}">
                            ${vehicle.badge ? `<div class="vehicle-badge">${vehicle.badge}</div>` : ""}
                        </div>
                        <div class="vehicle-details">
                            <div class="vehicle-header">
                                <h3 class="vehicle-name">${vehicle.name || "Unknown Vehicle"}</h3>
                                <div class="vehicle-rating">
                                    <div class="stars">
                                        ${generateStars(vehicle.rating || 0)}
                                    </div>
                                    <span class="rating-count">${vehicle.rating || 0} (${vehicle.reviewCount || 0} reviews)</span>
                                </div>
                            </div>
                            <div class="vehicle-features">
                                ${featuresHtml}
                            </div>
                            <div class="vehicle-price">
                                <div class="price">
                                    <span class="amount">$${vehicle.pricePerDay || 0}</span>
                                    <span class="period">/ ${vehicle.pricePeriod || "day"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            vehicleGrid.insertAdjacentHTML("beforeend", vehicleHtml);

            // Add dot for slider
            dotsContainer.insertAdjacentHTML("beforeend", `
                    <button class="dot ${index === 0 ? "active" : ""}" aria-label="Go to slide ${index + 1}"></button>
                `);
        });
    }

    // ===== Vehicle Categories =====
    const CATEGORY_API_URL = "http://localhost:8080/api/vehicleCategories";
    const categoriesGrid = document.querySelector(".categories-grid");

    async function loadCategories(){
        if(!categoriesGrid) return;
        try{
            const res = await fetch(CATEGORY_API_URL);
            const result = await res.json();
            if(res.ok && result.data){
                renderCategories(result.data);
            } else {
                console.warn("No categories found");
                toastr.info("No categories found", "Info");
            }
        } catch(err){
            console.error("Error loading categories:", err);
            toastr.error("Failed to load categories", "Error");
        }
    }

    function renderCategories(categories){
        categoriesGrid.innerHTML = "";
        categories.forEach(cat=>{
            const html = `
                <div class="category-card ${cat.name.toLowerCase()}">
                    <h3 class="category-name">${cat.name}</h3>
                    <p class="category-description">${cat.description || ''}</p>
                    <div class="category-stats">
                        <div class="stat">
                            <span class="value">$${cat.pricePerDay || 0}+</span>
                            <span class="label">per day</span>
                        </div>
                        <div class="stat">
                            <span class="value">${cat.availableVehicles || 0}</span>
                            <span class="label">vehicles</span>
                        </div>
                    </div>
                    <a href="#" class="btn btn-outline">View All</a>
                </div>
            `;
            categoriesGrid.insertAdjacentHTML("beforeend", html);
        });
    }


    // ===== Vehicle Fleet =====
    const vehiclesGrid = document.querySelector(".vehicles-grid");
    const apiUrl = "http://localhost:8080/api/vehicleFleets";

    // Fetch all fleets
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if(data && data.data) {
                const fleets = data.data;
                vehiclesGrid.innerHTML = "";

                fleets.forEach(fleet => {
                    const vehicleCard = document.createElement("div");
                    vehicleCard.classList.add("vehicle-card");

                    vehicleCard.innerHTML = `
                        <div class="vehicle-image">
                            <img src="${fleet.imageUrl}" alt="${fleet.name}">
                        </div>
                        <div class="vehicle-details">
                            <h3 class="vehicle-name">${fleet.name}</h3>
                            <div class="vehicle-category">${fleet.category}</div>
                            <div class="vehicle-features">
                                <div class="feature"><span>${fleet.seats} Seats</span></div>
                                <div class="feature"><span>${fleet.bags} Bags</span></div>
                                <div class="feature"><span>${fleet.transmission}</span></div>
                            </div>
                            <div class="vehicle-price">
                                <span class="amount">Rs.${fleet.pricePerDay}</span>
                                <span class="period">/ day</span>
                            </div>
                            <a href="pkgBooking.html" class="btn btn-primary btn-sm">Book Now</a>
                        </div>
                    `;
                    vehiclesGrid.appendChild(vehicleCard);
                });
            }
        })
        .catch(error => {
            console.error("Error fetching fleets:", error);
            vehiclesGrid.innerHTML = "<p>Failed to load vehicles. Please try again later.</p>";
            toastr.error("Failed to load vehicles", "Error");
        });


    // ===== Rental Process Steps =====
    const RENTAL_API_URL = "http://localhost:8080/api/rentalProcessSteps";
    const processStepsContainer = document.getElementById("processSteps");

    async function loadRentalSteps() {
        if (!processStepsContainer) return;
        try {
            const res = await fetch(RENTAL_API_URL);
            const result = await res.json();
            if (res.ok && result.data) {
                renderRentalSteps(result.data);
            } else {
                processStepsContainer.innerHTML = "<p>No steps available.</p>";
                toastr.info("No steps available", "Info");
            }
        } catch (err) {
            console.error("Error loading rental steps:", err);
            processStepsContainer.innerHTML = "<p>Failed to load steps.</p>";
            toastr.error("Failed to load rental steps.", "Error");
        }
    }

    function renderRentalSteps(steps) {
        processStepsContainer.innerHTML = "";
        steps.forEach(step => {
            const stepHtml = `
            <div class="process-step">
                <div class="step-number">${step.stepNumber}</div>
                <div class="step-icon">${step.iconSvg}</div>
                <h3 class="step-title">${step.title}</h3>
                <p class="step-description">${step.description}</p>
            </div>
        `;
            processStepsContainer.insertAdjacentHTML("beforeend", stepHtml);
        });
    }



    loadVehicles();
    loadCategories();
    loadRentalSteps();

    // ===== Auth check =====
    const token = getCookie("token");
    if (!token) {
        toastr.warning("You must be logged in.", "Access Denied");
        setTimeout(() => window.location.replace("index.html"), 1500);
    }
});

// ===== Cookie Helpers =====
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