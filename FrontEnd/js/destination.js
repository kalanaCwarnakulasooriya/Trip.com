document.addEventListener("DOMContentLoaded", () => {
    const DEST_API_URL = "http://localhost:8080/api/allDestinations";

    const container = document.getElementById("destinations-grid");
    const categoryFilter = document.getElementById("category-filter");
    const priceFilter = document.getElementById("price-filter");
    const searchInput = document.getElementById("destination-search");
    const paginationContainer = document.querySelector(".pagination");

    let allDestinations = [];   // full dataset from API
    let filteredDestinations = []; // after filter/search
    let currentPage = 1;
    const itemsPerPage = 6;

    // ==================== LOAD DATA ====================
    async function loadDestinations() {
        try {
            const res = await fetch(DEST_API_URL);
            const result = await res.json();

            if (res.ok && result.data?.length) {
                allDestinations = result.data;
                applyFiltersAndRender();
            } else {
                container.innerHTML = "<p>No destinations found.</p>";
                toastr.info("No destinations found", "Info");
            }
        } catch (err) {
            console.error(err);
            container.innerHTML = "<p>Failed to load destinations.</p>";
            toastr.error("Failed to load destinations", "Error");
        }
    }

    // ==================== RENDER DESTINATIONS ====================
    function renderDestinations(data) {
        container.innerHTML = "";
        data.forEach(dest => {
            const card = document.createElement("div");
            card.classList.add("destination-card");
            card.dataset.category = dest.category.join(',').toLowerCase();
            card.dataset.priceRange = dest.priceRange.toLowerCase();
            card.dataset.price = dest.price;

            card.innerHTML = `
          <div class="destination-image">
            <img src="${dest.imageUrl}" alt="${dest.title}">
            <div class="destination-overlay">
              <div class="destination-overlay-content">
                <a href="book-now.html" class="book-now">Book Now</a>
              </div>
            </div>
          </div>
          <div class="destination-content">
            <div class="destination-meta">
              <h3 class="destination-title">${dest.title}</h3>
              <span class="destination-rating">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27
                                   17 14.14 18.18 21.02 12 17.77
                                   5.82 21.02 7 14.14 2 9.27
                                   8.91 8.26 12 2"></polygon>
                </svg>
                ${dest.rating ?? "N/A"}
              </span>
            </div>
            <p class="destination-location">${dest.location}, Sri Lanka</p>
            <div class="destination-footer">
              <div class="destination-price">
                From <span>${dest.currency} ${dest.price.toLocaleString()}</span>
              </div>
              <a href="#" class="destination-link">
                <span>Explore</span>
                <svg xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>
          </div>
        `;
            container.appendChild(card);
        });
    }

    // ==================== RENDER PAGINATION ====================
    function renderPagination(totalItems) {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        paginationContainer.innerHTML = "";

        if (totalPages <= 1) return;

        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement("a");
            btn.href = "#";
            btn.classList.add("pagination-item");
            if (i === currentPage) btn.classList.add("active");
            btn.textContent = i;

            btn.addEventListener("click", e => {
                e.preventDefault();
                currentPage = i;
                applyFiltersAndRender();
            });

            paginationContainer.appendChild(btn);
        }
    }

    // ==================== FILTER & SEARCH ====================
    function applyFiltersAndRender() {
        const categoryValue = categoryFilter.value.toLowerCase();
        const priceValue = priceFilter.value.toLowerCase();
        const searchValue = searchInput.value.toLowerCase();

        filteredDestinations = allDestinations.filter(dest => {
            const title = dest.title.toLowerCase();
            const location = dest.location.toLowerCase();
            const category = dest.category.join(',').toLowerCase();
            const priceRange = dest.priceRange.toLowerCase();

            const matchesCategory = categoryValue === "all" || category.includes(categoryValue);
            const matchesPrice = priceValue === "all" || priceRange.includes(priceValue);
            const matchesSearch = title.includes(searchValue) || location.includes(searchValue);

            return matchesCategory && matchesPrice && matchesSearch;
        });

        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedData = filteredDestinations.slice(start, end);

        renderDestinations(paginatedData);
        renderPagination(filteredDestinations.length);
    }

    // ==================== EVENT LISTENERS ====================
    categoryFilter.addEventListener("change", () => {
        currentPage = 1;
        applyFiltersAndRender();
    });
    priceFilter.addEventListener("change", () => {
        currentPage = 1;
        applyFiltersAndRender();
    });
    searchInput.addEventListener("input", () => {
        currentPage = 1;
        applyFiltersAndRender();
    });

    // --- INITIAL RENDER ---
    loadDestinations();
    filterAndSearch();

    // ===== Auth check (inside DOMContentLoaded) =====
    const token = getCookie("token");
    if (!token) {
        toastr.warning("You must be logged in.", "Access Denied");
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


// --- VARIABLES ---
const destinationsGrid = document.querySelector('.destinations-grid');
const destinationCards = Array.from(document.querySelectorAll('.destination-card'));
const categoryFilter = document.getElementById('category-filter');
const priceFilter = document.getElementById('price-filter');
const searchInput = document.getElementById('destination-search');

// --- FILTER & SEARCH FUNCTION ---
function filterAndSearch() {
    const categoryValue = categoryFilter.value.toLowerCase();
    const priceValue = priceFilter.value.toLowerCase();
    const searchValue = searchInput.value.toLowerCase();

    destinationCards.forEach(card => {
        const title = card.querySelector('.destination-title').textContent.toLowerCase();
        const location = card.querySelector('.destination-location').textContent.toLowerCase();

        // Use data attributes for filtering
        const category = card.dataset.category ? card.dataset.category.toLowerCase() : '';
        const price = card.dataset.price ? card.dataset.price.toLowerCase() : '';

        const matchesCategory = categoryValue === 'all' || category.includes(categoryValue);
        const matchesPrice = priceValue === 'all' || price.includes(priceValue);
        const matchesSearch = title.includes(searchValue) || location.includes(searchValue);

        if (matchesCategory && matchesPrice && matchesSearch) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Toastr settings (optional customization)
toastr.options = {
    "closeButton": true,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "timeOut": "4000"
};

// --- EVENT LISTENERS ---
categoryFilter.addEventListener('change', filterAndSearch);
priceFilter.addEventListener('change', filterAndSearch);
searchInput.addEventListener('input', filterAndSearch);