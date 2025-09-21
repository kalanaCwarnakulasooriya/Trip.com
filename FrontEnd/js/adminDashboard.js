// Sidebar navigation
const navItems = document.querySelectorAll("nav li");
const sections = document.querySelectorAll(".view-section");
navItems.forEach(item=>{
    item.addEventListener("click",()=>{
        navItems.forEach(i=>i.classList.remove("active"));
        item.classList.add("active");
        const view=item.getAttribute("data-view");
        sections.forEach(sec=>{
            sec.style.display=(sec.id===view)?"block":"none";
        });
    });
});

// ================== GLOBAL SEARCH ==================
const searchInput = document.getElementById("global-search");
searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();

    // function to filter a table by search query
    const filterTable = (tableId) => {
        const table = document.getElementById(tableId);
        const rows = table.querySelectorAll("tbody tr");
        rows.forEach(row => {
            const text = row.innerText.toLowerCase();
            row.style.display = text.includes(query) ? "" : "none";
        });
    };

    // Apply search to all tables
    filterTable("popular-destination-table");
    filterTable("package-table");
    filterTable("destinations-table");
    filterTable("gallery-table");
    filterTable("contact-table");
    filterTable("guides-table");
    filterTable("tips-table");
    filterTable("vehicles-table");
    filterTable("vehicleCategory-table");
    filterTable("vehicleFleet-table");
    filterTable("rentalSteps-table");
});


// ================== LOAD OVER VIEW ==================
async function loadOverview() {
    try {
        // Packages
        const packagesRes = await fetch("http://localhost:8080/api/packages");
        const packagesJson = await packagesRes.json();
        const packagesCount = Array.isArray(packagesJson.data) ? packagesJson.data.length : 0;

        // Vehicles
        const vehiclesRes = await fetch("http://localhost:8080/api/vehicles");
        const vehiclesJson = await vehiclesRes.json();
        const vehiclesCount = Array.isArray(vehiclesJson.data) ? vehiclesJson.data.length : 0;

        // Guides
        const guidesRes = await fetch("http://localhost:8080/api/guides");
        const guidesJson = await guidesRes.json();
        const guidesCount = Array.isArray(guidesJson.data) ? guidesJson.data.length : 0;

        //Destinations
        const destinationsRes = await fetch("http://localhost:8080/api/destinations");
        const destinationsJson = await destinationsRes.json();
        const destinationsCount = Array.isArray(destinationsJson.data) ? destinationsJson.data.length : 0;

        //Gallery
        const galleryRes = await fetch("http://localhost:8080/api/galleries");
        const galleryJson = await galleryRes.json();
        const galleryCount = Array.isArray(galleryJson.data) ? galleryJson.data.length : 0;

        //Tips
        const tipsRes = await fetch("http://localhost:8080/api/travelTips");
        const tipsJson = await tipsRes.json();
        const tipsCount = Array.isArray(tipsJson.data) ? tipsJson.data.length : 0;

        //Rental Steps
        const rentalStepsRes = await fetch("http://localhost:8080/api/rentalProcessSteps");
        const rentalStepsJson = await rentalStepsRes.json();
        const rentalStepsCount = Array.isArray(rentalStepsJson.data) ? rentalStepsJson.data.length : 0;

        //Vehicle Categories
        const vehicleCategoriesRes = await fetch("http://localhost:8080/api/vehicleCategories");
        const vehicleCategoriesJson = await vehicleCategoriesRes.json();
        const vehicleCategoriesCount = Array.isArray(vehicleCategoriesJson.data) ? vehicleCategoriesJson.data.length : 0;

        //Users
        const usersRes = await fetch("http://localhost:8080/auth/users");
        const usersJson = await usersRes.json();
        const usersCount = Array.isArray(usersJson.data) ? usersJson.data.length : 0;

        //Payments
        const paymentsRes = await fetch("http://localhost:8080/api/payments");
        const paymentsJson = await paymentsRes.json();
        const paymentsCount = Array.isArray(paymentsJson.data) ? paymentsJson.data.length : 0;

        // Revenue (example: sum of all package bookings * price)
        const bookingsRes = await fetch("http://localhost:8080/api/packageBooking");
        const bookingsJson = await bookingsRes.json();
        let revenue = 0;
        if (Array.isArray(bookingsJson.data)) {
            for (const booking of bookingsJson.data) {
                // find selected package price
                const pkg = packagesJson.data.find(p => p.title === booking.chosenPackage);
                if (pkg) {
                    revenue += pkg.price * booking.guests;
                }
            }
        }


        // Update UI
        document.getElementById("overview-packages").innerText = packagesCount;
        document.getElementById("overview-vehicles").innerText = vehiclesCount;
        document.getElementById("overview-guides").innerText = guidesCount;
        document.getElementById("overview-destinations").innerText = destinationsCount;
        document.getElementById("overview-gallery").innerText = galleryCount;
        document.getElementById("overview-travel-tips").innerText = tipsCount;
        document.getElementById("overview-rental-steps").innerText = rentalStepsCount;
        document.getElementById("overview-categories").innerText = vehicleCategoriesCount;
        document.getElementById("overview-users").innerText = usersCount;
        document.getElementById("overview-payments").innerText = paymentsCount;
        document.getElementById("overview-revenue").innerText = "$" + revenue.toLocaleString();
    } catch (e) {
        console.error("Error loading overview:", e);
    }
}


// ================== LOAD POPULAR DESTINATIONS ==================
async function loadDestinations() {
    try {
        const res = await fetch("http://localhost:8080/api/destinations");
        const json = await res.json();

        const destinations = json.data;
        if (!Array.isArray(destinations)) {
            console.error("Expected an array but got:", destinations);
            return;
        }

        const tableBody = document.querySelector("#popular-destination-table tbody");
        tableBody.innerHTML = "";
        destinations.forEach(dest => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${dest.id}</td>
                <td>${dest.title}</td>
                <td>${dest.location}</td>
                <td><img src="${dest.imageUrl}" width="80"></td>
                <td>${dest.duration}</td>
                <td>${dest.currency}</td>
                <td>${dest.price}</td>
                <td>${dest.rating}</td>
                <td>${dest.reviews}</td>
                <td>
                    <button class="update-popDest btn-primary" data-id="${dest.id}">
                        <i class="fa fa-pencil-alt"></i>
                    </button>
                    <button class="delete-popDest btn-danger" data-id="${dest.id}">
                        <i class="fa fa-trash"></i>
                    </button>
                </td>
            `;
            tableBody.appendChild(tr);
        });

        // Delete Popular Destination
        document.querySelectorAll(".delete-popDest").forEach(btn => {
            btn.addEventListener("click", async () => {
                const id = btn.getAttribute("data-id");
                if (!confirm("Are you sure you want to delete this?")) return;

                try {
                    const res = await fetch(`http://localhost:8080/api/destinations/${id}`, {
                        method: "DELETE"
                    });
                    if (res.ok) {
                        loadDestinations();
                        // alert("Deleted successfully!");
                        toastr.success("Deleted successfully!", "Success");
                    } else {
                        // alert("Failed to delete!");
                        toastr.error("Failed to delete!", "Error");
                    }
                } catch (err) {
                    console.error("Delete error:", err);
                    toastr.error("Failed to delete!", "Error");
                }
            });
        });

        let selectedPdId = null;

        // When user clicks table "Update" button
        document.addEventListener("click", (e) => {
            if (e.target.classList.contains("update-popDest")) {
                const row = e.target.closest("tr");
                selectedPdId = e.target.getAttribute("data-id"); // save the id

                document.getElementById("pd-title").value = row.children[1].innerText;
                document.getElementById("pd-location").value = row.children[2].innerText;
                document.getElementById("pd-image").value = row.children[3].querySelector("img")?.src || "";
                document.getElementById("pd-duration").value = row.children[4].innerText;
                document.getElementById("pd-currency").value = row.children[5].innerText;
                document.getElementById("pd-price").value = row.children[6].innerText;
                document.getElementById("pd-rating").value = row.children[7].innerText;
                document.getElementById("pd-reviews").value = row.children[8].innerText;
            }
        });

        // Update button click
        document.getElementById("update-pd").addEventListener("click", async () => {
            if (!selectedPdId) {
                // alert("Please select a row to update first!");
                // toastr.error("Please select a row to update first!", "Error");
                return;
            }

            const dto = {
                title: document.getElementById("pd-title").value,
                location: document.getElementById("pd-location").value,
                imageUrl: document.getElementById("pd-image").value,
                duration: document.getElementById("pd-duration").value,
                currency: document.getElementById("pd-currency").value,
                price: parseFloat(document.getElementById("pd-price").value),
                rating: parseFloat(document.getElementById("pd-rating").value),
                reviews: parseInt(document.getElementById("pd-reviews").value)
            };

            try {
                const res = await fetch(`http://localhost:8080/api/destinations/${selectedPdId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(dto)
                });

                if (res.ok) {
                    // alert("Updated successfully!");
                    toastr.success("Updated successfully!", "Success");
                    loadDestinations();
                    selectedPdId = null;
                    document.querySelectorAll("#popular-destination input").forEach(i => i.value = "");
                } else {
                    // alert("Failed to update!");
                    // toastr.error("Failed to update!", "Error");
                }
            } catch (err) {
                console.error("Update error:", err);
                // toastr.error("Failed to update!", "Error");
            }
        });
    } catch (err) {
        console.error(err);
        toastr.error("Failed to update!", "Error");
    }
    document.querySelectorAll("#popular-destination input").forEach(i => i.value = "");
}

document.getElementById("refresh-pd").addEventListener("click", () => {
    document.querySelectorAll("#popular-destination input").forEach(i => i.value = "");
});

// ================== LOAD PACKAGES ==================
async function loadPackages() {
    try {
        const res = await fetch("http://localhost:8080/api/packages");
        const json = await res.json();

        const packages = json.data;
        if (!Array.isArray(packages)) {
            console.error("Expected an array but got:", packages);
            return;
        }

        const tableBody = document.querySelector("#package-table tbody");
        tableBody.innerHTML = "";
        packages.forEach(pkg => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${pkg.id}</td>
                <td>${pkg.title}</td>
                <td>${pkg.tag}</td>
                <td>${pkg.unit}</td>
                <td>${pkg.description}</td>
                <td>${Array.isArray(pkg.features) ? pkg.features.join(", ") : pkg.features}</td>
                <td>${pkg.price}</td>
                <td>
                    <button class="update-pkg btn-primary" data-id="${pkg.id}">
                        <i class="fa fa-pencil-alt"></i>
                    </button>
                    <button class="delete-pkg btn-danger" data-id="${pkg.id}">
                        <i class="fa fa-trash"></i>
                    </button>
                </td>
            `;
            tableBody.appendChild(tr);
        });

        // Delete Packages
        document.querySelectorAll(".delete-pkg").forEach(btn => {
            btn.addEventListener("click", async () => {
                const id = btn.getAttribute("data-id");
                if (!confirm("Are you sure you want to delete this?")) return;

                try {
                    const res = await fetch(`http://localhost:8080/api/packages/${id}`, {
                        method: "DELETE"
                    });
                    if (res.ok) {
                        loadPackages();
                        // alert("Deleted successfully!");
                        toastr.success("Deleted successfully!", "Success");
                    } else {
                        // alert("Failed to delete!");
                        toastr.error("Failed to delete!", "Error");
                    }
                } catch (err) {
                    console.error("Delete error:", err);
                    toastr.error("Failed to delete!", "Error");
                }
            });
        });

        let selectedPkgId = null;

        // Handle Update click
        document.addEventListener("click", (e) => {
            const btn = e.target.closest(".update-pkg");
            if (btn) {
                const row = btn.closest("tr");
                selectedPkgId = btn.getAttribute("data-id");

                document.getElementById("pkg-title").value = row.children[1].innerText;
                document.getElementById("pkg-tag").value = row.children[2].innerText;
                document.getElementById("pkg-unit").value = row.children[3].innerText;
                document.getElementById("pkg-description").value = row.children[4].innerText;
                document.getElementById("pkg-features").value = row.children[5].innerText;
                document.getElementById("pkg-price").value = row.children[6].innerText;
            }
        });

        // Update button click
        document.getElementById("update-package").addEventListener("click", async () => {
            if (!selectedPkgId) {
                // alert("Please select a row to update first!");
                // toastr.error("Please select a row to update first!", "Error");
                return;
            }

            const dto = {
                title: document.getElementById("pkg-title").value,
                tag: document.getElementById("pkg-tag").value,
                features: document.getElementById("pkg-features").value
                    .split(",")
                    .map(f => f.trim()),
                unit: document.getElementById("pkg-unit").value,
                price: parseFloat(document.getElementById("pkg-price").value) || 0,
                description: document.getElementById("pkg-description").value
            };

            try {
                const res = await fetch(`http://localhost:8080/api/packages/${selectedPkgId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(dto)
                });

                if (res.ok) {
                    loadPackages();
                    selectedPkgId = null;
                    document.querySelectorAll("#packages input, #packages textarea")
                        .forEach(el => el.value = "");
                } else {
                    // alert("Failed to update!");
                    // toastr.error("Failed to update!", "Error");
                }
            } catch (err) {
                console.error("Update error:", err);
                // toastr.error("Failed to update!", "Error");
            }
        });
    } catch (err) {
        console.error("Error loading packages:", err);
        toastr.error("Error loading packages!", "Error");
    }
    document.querySelectorAll("#packages input, #packages textarea")
        .forEach(el => el.value = "");
}

document.getElementById("refresh-package").addEventListener("click", () => {
    document.querySelectorAll("#packages input, #packages textarea").forEach(i => i.value = "");
});

// ================== LOAD ALL DESTINATIONS ==================
async function loadAllDestinations() {
    try {
        const res = await fetch("http://localhost:8080/api/allDestinations");
        const json = await res.json();

        const destinations = json.data;
        if (!Array.isArray(destinations)) {
            console.error("Expected an array but got:", destinations);
            return;
        }

        const tableBody = document.querySelector("#destinations-table tbody");
        tableBody.innerHTML = "";
        destinations.forEach(dest => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${dest.id}</td>
                <td>${dest.title}</td>
                <td>${dest.location}</td>
                <td><img src="${dest.imageUrl}" width="80"></td>
                <td>${dest.currency || ''}</td>
                <td>${dest.price || ''}</td>
                <td>${dest.priceRange || ''}</td>
                <td>${(dest.category || []).join(", ")}</td>
                <td>${dest.rating || ''}</td>
                <td>
                    <button class="update-allDest btn-primary" data-id="${dest.id}">
                        <i class="fa fa-pencil-alt"></i>
                    </button>
                    <button class="delete-allDest btn-danger" data-id="${dest.id}">
                        <i class="fa fa-trash"></i>
                    </button>
                </td>
            `;
            tableBody.appendChild(tr);
        });

        // Delete All Destinations
        document.querySelectorAll(".delete-allDest").forEach(btn => {
            btn.addEventListener("click", async () => {
                const id = btn.getAttribute("data-id");
                if (!confirm("Are you sure you want to delete this?")) return;

                try {
                    const res = await fetch(`http://localhost:8080/api/allDestinations/${id}`, {
                        method: "DELETE"
                    });
                    if (res.ok) {
                        loadAllDestinations();
                        // alert("Deleted successfully!");
                        toastr.success("Deleted successfully!", "Success");
                    } else {
                        // alert("Failed to delete!");
                        toastr.error("Failed to delete!", "Error");
                    }
                } catch (err) {
                    console.error("Delete error:", err);
                    toastr.error("Failed to delete!", "Error");
                }
            });
        });

        let selectedADId = null;

        // When user clicks table "Update" button
        document.addEventListener("click", (e) => {
            if (e.target.classList.contains("update-allDest")) {
                const row = e.target.closest("tr");
                selectedADId = e.target.getAttribute("data-id");

                document.getElementById("dest-title").value = row.children[1].innerText;
                document.getElementById("dest-location").value = row.children[2].innerText;
                document.getElementById("dest-image").value = row.children[3].querySelector("img")?.src || "";
                document.getElementById("dest-currency").value = row.children[4].innerText;
                document.getElementById("dest-price").value = row.children[5].innerText;
                document.getElementById("dest-priceRange").value = row.children[6].innerText;
                document.getElementById("dest-category").value = row.children[7].innerText;
                document.getElementById("dest-rating").value = row.children[8].innerText;
            }
        });

        // Update button click
        document.getElementById("update-destinations").addEventListener("click", async () => {
            if (!selectedADId) {
                // alert("Please select a row to update first!");
                // toastr.error("Please select a row to update first!", "Error");
                return;
            }

            const dto = {
                title: document.getElementById("dest-title").value,
                location: document.getElementById("dest-location").value,
                imageUrl: document.getElementById("dest-image").value,
                currency: document.getElementById("dest-currency").value,
                price: parseFloat(document.getElementById("dest-price").value) || 0,
                priceRange: document.getElementById("dest-priceRange").value,
                category: document.getElementById("dest-category").value.split(",").map(c => c.trim()),
                rating: parseFloat(document.getElementById("dest-rating").value) || 0
            };

            try {
                const res = await fetch(`http://localhost:8080/api/allDestinations/${selectedADId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(dto)
                });

                if (res.ok) {
                    // alert("Updated successfully!");
                    toastr.success("Updated successfully!", "Success");
                    loadAllDestinations();
                    selectedADId = null;
                    document.querySelectorAll("#destinations input").forEach(i => i.value = "");
                } else {
                    // alert("Failed to update!");
                    // toastr.error("Failed to update!", "Error");
                }
            } catch (err) {
                console.error("Update error:", err);
                // toastr.error("Failed to update!", "Error");
            }
        });
    } catch (err) {
        console.error(err);
        toastr.error("Failed to update!", "Error");
    }
    document.querySelectorAll("#destinations input").forEach(i => i.value = "");
}

document.getElementById("refresh-destinations").addEventListener("click", () => {
    document.querySelectorAll("#destinations input").forEach(i => i.value = "");
});

// ================== LOAD GALLERY ==================
async function loadGallery() {
    try {
        const res = await fetch("http://localhost:8080/api/galleries");
        const json = await res.json();

        // Ensure json.data is an array
        const galleries = json.data;
        if (!Array.isArray(galleries)) {
            console.error("Expected an array but got:", galleries);
            return;
        }

        const tableBody = document.querySelector("#gallery-table tbody");
        tableBody.innerHTML = "";

        galleries.forEach(gallery => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                    <td>${gallery.id || ''}</td>
                    <td><img src="${gallery.imageUrl || ''}" width="80"></td>
                    <td>
                    <button class="update-gallery btn-primary" data-id="${gallery.id}">
                        <i class="fa fa-pencil-alt"></i>
                    </button>
                    <button class="delete-gallery btn-danger" data-id="${gallery.id}">
                        <i class="fa fa-trash"></i>
                    </button>
                </td>
                `;
            tableBody.appendChild(tr);
        });

        // Delete Gallery
        document.querySelectorAll(".delete-gallery").forEach(btn => {
            btn.addEventListener("click", async () => {
                const id = btn.getAttribute("data-id");
                if (!confirm("Are you sure you want to delete this?")) return;

                try {
                    const res = await fetch(`http://localhost:8080/api/galleries/${id}`, {
                        method: "DELETE"
                    });
                    if (res.ok) {
                        loadGallery();
                        // alert("Deleted successfully!");
                        toastr.success("Deleted successfully!", "Success");
                    } else {
                        // alert("Failed to delete!");
                        toastr.error("Failed to delete!", "Error");
                    }
                } catch (err) {
                    console.error("Delete error:", err);
                    toastr.error("Failed to delete!", "Error");
                }
            });
        });

        let selectedGalleryId = null;

        // When user clicks table "Update" button
        document.addEventListener("click", (e) => {
            if (e.target.classList.contains("update-gallery")) {
                const row = e.target.closest("tr");
                selectedGalleryId = e.target.getAttribute("data-id");

                document.getElementById("gallery-image").value = row.children[1].querySelector("img")?.src || "";
            }
        });

        // Update button click
        document.getElementById("update-gallery").addEventListener("click", async () => {
            if (!selectedGalleryId) {
                // alert("Please select a row to update first!");
                // toastr.error("Please select a row to update first!", "Error");
                return;
            }

            const dto = {
                imageUrl: document.getElementById("gallery-image").value
            };

            try {
                const res = await fetch(`http://localhost:8080/api/galleries/${selectedGalleryId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(dto)
                });

                if (res.ok) {
                    // alert("Updated successfully!");
                    toastr.success("Updated successfully!", "Success");
                    loadGallery();
                    selectedGalleryId = null;
                    document.querySelectorAll("#gallery input").forEach(i => i.value = "");
                } else {
                    // alert("Failed to update!");
                    // toastr.error("Failed to update!", "Error");
                }
            } catch (err) {
                console.error("Update error:", err);
                // toastr.error("Failed to update!", "Error");
            }
        });
    } catch (err) {
        console.error("Error loading gallery:", err);
        toastr.error("Error loading gallery!", "Error");
    }
    document.querySelectorAll("#gallery input").forEach(i => i.value = "");
}

document.getElementById("refresh-gallery").addEventListener("click", () => {
    document.querySelectorAll("#gallery input").forEach(i => i.value = "");
});

// ================== LOAD CONTACT ==================
async function loadContact() {
    try {
        const res = await fetch("http://localhost:8080/api/contacts");
        const json = await res.json();

        const contacts = json.data;
        if (!Array.isArray(contacts)) {
            console.error("Expected an array but got:", contacts);
            return;
        }

        const tableBody = document.querySelector("#contact-table tbody");
        tableBody.innerHTML = "";

        contacts.forEach(contact => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${contact.id || ''}</td>
                <td>${contact.name || ''}</td>
                <td>${contact.email || ''}</td>
                <td>${contact.subject || ''}</td>
                <td>${contact.message || ''}</td>
                <td>
                    <button class="delete-contact btn-danger" data-id="${contact.id}">
                        <i class="fa fa-trash"></i>
                    </button>
                </td>
            `;
            tableBody.appendChild(tr);
        });

        // Delete Contact
        document.querySelectorAll(".delete-contact").forEach(btn => {
            btn.addEventListener("click", async () => {
                const id = btn.getAttribute("data-id");
                if (!confirm("Are you sure you want to delete this?")) return;

                try {
                    const res = await fetch(`http://localhost:8080/api/contacts/${id}`, {
                        method: "DELETE"
                    });
                    if (res.ok) {
                        loadContact();
                        // alert("Deleted successfully!");
                        toastr.success("Deleted successfully!", "Success");
                    } else {
                        // alert("Failed to delete!");
                        toastr.error("Failed to delete!", "Error");
                    }
                } catch (err) {
                    console.error("Delete error:", err);
                    toastr.error("Failed to delete!", "Error");
                }
            });
        });
    } catch (err) {
        console.error("Error loading contacts:", err);
        toastr.error("Error loading contacts!", "Error");
    }
}

// ================== LOAD GUIDE ==================
async function loadGuide() {
    try {
        const res = await fetch("http://localhost:8080/api/guides");
        const json = await res.json();

        // Ensure json.data is an array
        const guides = json.data;
        if (!Array.isArray(guides)) {
            console.error("Expected an array but got:", guides);
            return;
        }

        const tableBody = document.querySelector("#guides-table tbody");
        tableBody.innerHTML = "";

        guides.forEach(guide => {
            // Convert socialLinks map -> HTML links
            let socialLinksHtml = "";
            if (guide.socialLinks) {
                socialLinksHtml = Object.entries(guide.socialLinks)
                    .map(([platform, url]) => {
                        return `<a href="${url}" target="_blank">${platform}</a>`;
                    })
                    .join(" | ");
            }

            const tr = document.createElement("tr");
            tr.innerHTML = `
                    <td>${guide.id || ''}</td>
                    <td>${guide.name || ''}</td>
                    <td>${guide.position || ''}</td>
                    <td>${guide.experienceYears || ''}</td>
                    <td>${guide.location || ''}</td>
                    <td>${guide.specialities || ''}</td>
                    <td>${guide.bio || ''}</td>
                    <td><img src="${guide.imagePath || ''}" width="80"></td>
                    <td>${socialLinksHtml}</td>
                    <td>
                        <button class="update-guides btn-primary" data-id="${guide.id}">
                            <i class="fa fa-pencil-alt"></i>
                        </button>
                        <button class="delete-guides btn-danger" data-id="${guide.id}">
                            <i class="fa fa-trash"></i>
                        </button>
                    </td>
                `;
            tableBody.appendChild(tr);
        });

        // Delete Guides
        document.querySelectorAll(".delete-guides").forEach(btn => {
            btn.addEventListener("click", async () => {
                const id = btn.getAttribute("data-id");
                if (!confirm("Are you sure you want to delete this?")) return;

                try {
                    const res = await fetch(`http://localhost:8080/api/guides/${id}`, {
                        method: "DELETE"
                    });
                    if (res.ok) {
                        loadGuide();
                        // alert("Deleted successfully!");
                        toastr.success("Deleted successfully!", "Success");
                    } else {
                        // alert("Failed to delete!");
                        toastr.error("Failed to delete!", "Error");
                    }
                } catch (err) {
                    console.error("Delete error:", err);
                    toastr.error("Failed to delete!", "Error");
                }
            });
        });

        let selectedGuidesId = null;

        // ================== Handle Update Click ==================
        document.addEventListener("click", (e) => {
            const btn = e.target.closest(".update-guides");
            if (!btn) return;

            const row = btn.closest("tr");
            selectedGuidesId = btn.getAttribute("data-id");

            document.getElementById("guide-name").value = row.children[1].innerText.trim();
            document.getElementById("guide-position").value = row.children[2].innerText.trim();
            document.getElementById("guide-experience").value = row.children[3].innerText.trim();
            document.getElementById("guide-location").value = row.children[4].innerText.trim();
            document.getElementById("guide-specialities").value = row.children[5].innerText.trim();
            document.getElementById("guide-bio").value = row.children[6].innerText.trim();

            // set image preview if needed
            const imgEl = row.children[7].querySelector("img");
            if (imgEl) {
                document.getElementById("guide-image-file").src = imgEl.src;
            }

            // Extract social links from row
            const socialLinks = {};
            row.children[8].querySelectorAll("a").forEach(a => {
                const platform = a.innerText.toLowerCase();
                socialLinks[platform] = a.href;
            });

            document.getElementById("guide-facebook").value = socialLinks.facebook || "";
            document.getElementById("guide-instagram").value = socialLinks.instagram || "";
            document.getElementById("guide-linkedin").value = socialLinks.linkedin || "";
        });

        // ================== Update Button Click ==================
        document.getElementById("update-guide").addEventListener("click", async () => {
            if (!selectedGuidesId) {
                // alert("⚠️ Please select a row to update first!");
                // toastr.error("Please select a row to update first!", "Error");
                return;
            }

            const formData = new FormData();

            // prepare DTO
            const dto = {
                name: document.getElementById("guide-name").value.trim(),
                position: document.getElementById("guide-position").value.trim(),
                experienceYears: parseInt(document.getElementById("guide-experience").value.trim()),
                location: document.getElementById("guide-location").value.trim(),
                specialities: document.getElementById("guide-specialities").value.trim(),
                bio: document.getElementById("guide-bio").value.trim(),
                socialLinks: {
                    facebook: document.getElementById("guide-facebook").value.trim(),
                    instagram: document.getElementById("guide-instagram").value.trim(),
                    linkedin: document.getElementById("guide-linkedin").value.trim()
                }
            };

            // append JSON DTO as blob
            formData.append("guide", new Blob([JSON.stringify(dto)], { type: "application/json" }));

            // append file if selected
            const fileInput = document.getElementById("guide-image-file");
            if (fileInput.files.length > 0) {
                formData.append("image", fileInput.files[0]);
            }

            try {
                // SEND FORM DATA WITHOUT 'Content-Type'
                const res = await fetch(`http://localhost:8080/api/guides/${selectedGuidesId}`, {
                    method: "PUT",
                    body: formData
                });

                if (res.ok) {
                    await loadGuide(); // reload guides table
                    selectedGuidesId = null;

                    // clear inputs
                    document.querySelectorAll("#guides input, #guides textarea").forEach(el => el.value = "");
                    document.getElementById("guide-image-preview").src = ""; // clear preview
                    // alert("✅ Guide updated successfully!");
                    toastr.success("Guide updated successfully!", "Success");
                } else {
                    const errText = await res.text();
                    console.error("Server response:", errText);
                    // alert("❌ Failed to update guide!");
                    // toastr.error("Failed to update guide!", "Error");
                }
            } catch (err) {
                console.error("Update error:", err);
                // alert("⚠️ An error occurred while updating!");
                // toastr.error("An error occurred while updating!", "Error");
            }
        });
    } catch (err) {
        // console.error("Error loading gallery:", err);
        toastr.error("Error loading gallery!", "Error");
    }
    document.querySelectorAll("#guides input").forEach(i => i.value = "");
}

document.getElementById("refresh-guide").addEventListener("click", () => {
    document.querySelectorAll("#guides input").forEach(i => i.value = "");
    loadGuide();
});


// ================== LOAD TRAVEL TIPS ==================
async function loadTips() {
    try {
        const res = await fetch("http://localhost:8080/api/travelTips");
        const json = await res.json();

        const travelTips = json.data;
        if (!Array.isArray(travelTips)) {
            console.error("Expected an array but got:", travelTips);
            return;
        }

        const tableBody = document.querySelector("#tips-table tbody");
        tableBody.innerHTML = "";
        travelTips.forEach(tip => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${tip.id}</td>
                <td>${tip.title}</td>
                <td>${tip.category}</td>
                <td>${tip.excerpt}</td>
                <td><img src="${tip.imageUrl}" width="80"></td>
                <td>${tip.link}</td>
                <td>
                    <button class="update-tip btn-primary" data-id="${tip.id}">
                        <i class="fa fa-pencil-alt"></i>
                    </button>
                    <button class="delete-tip btn-danger" data-id="${tip.id}">
                        <i class="fa fa-trash"></i>
                    </button>
                </td>
            `;
            tableBody.appendChild(tr);
        });

        // Delete Travel Tips
        document.querySelectorAll(".delete-tip").forEach(btn => {
            btn.addEventListener("click", async () => {
                const id = btn.getAttribute("data-id");
                if (!confirm("Are you sure you want to delete this?")) return;

                try {
                    const res = await fetch(`http://localhost:8080/api/travelTips/${id}`, {
                        method: "DELETE"
                    });
                    if (res.ok) {
                        loadTips();
                        // alert("Deleted successfully!");
                        toastr.success("Deleted successfully!", "Success");
                    } else {
                        // alert("Failed to delete!");
                        toastr.error("Failed to delete!", "Error");
                    }
                } catch (err) {
                    console.error("Delete error:", err);
                    toastr.error("Failed to delete!", "Error");
                }
            });
        });

        let selectedTipId = null;

        // When user clicks table "Update" button
        document.addEventListener("click", (e) => {
            if (e.target.classList.contains("update-tip")) {
                const row = e.target.closest("tr");
                selectedTipId = e.target.getAttribute("data-id");

                document.getElementById("tip-title").value = row.children[1].innerText;
                document.getElementById("tip-category").value = row.children[2].innerText;
                document.getElementById("tip-excerpt").value = row.children[3].innerText;
                document.getElementById("tip-imageUrl").value = row.children[4].querySelector("img")?.src || "";
                document.getElementById("tip-link").value = row.children[5].innerText;
            }
        });

        // Update button click
        document.getElementById("update-tips").addEventListener("click", async () => {
            if (!selectedTipId) {
                // alert("Please select a row to update first!");
                // toastr.error("Please select a row to update first!", "Error");
                return;
            }

            const dto = {
                title: document.getElementById("tip-title").value,
                category: document.getElementById("tip-category").value,
                excerpt: document.getElementById("tip-excerpt").value,
                imageUrl: document.getElementById("tip-imageUrl").value,
                link: document.getElementById("tip-link").value
            };

            try {
                const res = await fetch(`http://localhost:8080/api/travelTips/${selectedTipId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(dto)
                });

                if (res.ok) {
                    // alert("Updated successfully!");
                    // toastr.success("Updated successfully!", "Success");
                    loadTips();
                    selectedTipId = null;
                    document.querySelectorAll("#travelTips input").forEach(i => i.value = "");
                } else {
                    // alert("Failed to update!");
                    // toastr.error("Failed to update!", "Error");
                }
            } catch (err) {
                console.error("Update error:", err);
                toastr.error("Update error!", "Error");
            }
        });
    } catch (err) {
        console.error(err);
        toastr.error("Error loading travel tips!", "Error");
    }
    document.querySelectorAll("#travelTips input").forEach(i => i.value = "");
}

document.getElementById("refresh-tips").addEventListener("click", () => {
    document.querySelectorAll("#travelTips input").forEach(i => i.value = "");
});

// ================== LOAD VEHICLES ==================
async function loadVehicle() {
    try {
        const res = await fetch("http://localhost:8080/api/vehicles");
        const json = await res.json();

        const vehicles = json.data;
        if (!Array.isArray(vehicles)) {
            console.error("Expected an array but got:", vehicles);
            return;
        }

        const tableBody = document.querySelector("#vehicles-table tbody");
        tableBody.innerHTML = "";
        vehicles.forEach(vehicle => {
            const tr = document.createElement("tr");

            // Features HTML build karanna
            let featuresHtml = "";
            if (Array.isArray(vehicle.features)) {
                featuresHtml = vehicle.features.map(f =>
                    `<span class="feature-item">
                <i class="fa ${f.icon}"></i> ${f.name}
             </span>`
                ).join(" | ");
            }
            tr.innerHTML = `
                <td>${vehicle.id}</td>
                <td>${vehicle.name}</td>
                <td>${vehicle.badge}</td>
                <td>${vehicle.reviewCount}</td>
                <td><img src="${vehicle.imageUrl}" width="80"></td>
                <td>${vehicle.rating}</td>
                <td>${vehicle.pricePerDay}</td>
                <td>${vehicle.pricePeriod}</td>
                <td>${featuresHtml}</td>
                <td>
                    <button class="update-vehicle btn-primary" data-id="${vehicle.id}">
                        <i class="fa fa-pencil-alt"></i>
                    </button>
                    <button class="delete-vehicle btn-danger" data-id="${vehicle.id}">
                        <i class="fa fa-trash"></i>
                    </button>
                </td>
            `;
            tableBody.appendChild(tr);
        });

        // Delete Travel Tips
        document.querySelectorAll(".delete-vehicle").forEach(btn => {
            btn.addEventListener("click", async () => {
                const id = btn.getAttribute("data-id");
                if (!confirm("Are you sure you want to delete this?")) return;

                try {
                    const res = await fetch(`http://localhost:8080/api/vehicles/${id}`, {
                        method: "DELETE"
                    });
                    if (res.ok) {
                        loadVehicle();
                        // alert("Deleted successfully!");
                        toastr.success("Deleted successfully!", "Success");
                    } else {
                        // alert("Failed to delete!");
                        toastr.error("Failed to delete!", "Error");
                    }
                } catch (err) {
                    console.error("Delete error:", err);
                    toastr.error("Failed to delete!", "Error");
                }
            });
        });

        let selectedVehicleId = null;

        // When user clicks table "Update" button
        document.addEventListener("click", (e) => {
            if (e.target.classList.contains("update-vehicle")) {
                const row = e.target.closest("tr");
                selectedVehicleId = e.target.getAttribute("data-id");

                document.getElementById("vehicle-name").value = row.children[1].innerText;
                document.getElementById("vehicle-badge").value = row.children[2].innerText;
                document.getElementById("vehicle-reviewCount").value = row.children[3].innerText;
                document.getElementById("vehicle-imageUrl").value = row.children[4].querySelector("img")?.src || "";
                document.getElementById("vehicle-rating").value = row.children[5].innerText;
                document.getElementById("vehicle-pricePerDay").value = row.children[6].innerText;
                document.getElementById("vehicle-pricePeriod").value = row.children[7].innerText;
                document.getElementById("vehicle-features").value = row.children[8].innerText;
            }
        });

        // Update button click
        document.getElementById("update-vehicles").addEventListener("click", async () => {
            if (!selectedVehicleId) {
                // alert("Please select a row to update first!");
                // toastr.error("Please select a row to update first!", "Error");
                return;
            }

            const dto = {
                name: document.getElementById("vehicle-name").value.trim(),
                badge: document.getElementById("vehicle-badge").value.trim(),
                reviewCount: parseInt(document.getElementById("vehicle-reviewCount").value.trim()) || 0,
                imageUrl: document.getElementById("vehicle-imageUrl").value.trim(),
                rating: parseFloat(document.getElementById("vehicle-rating").value.trim()) || 0,
                pricePerDay: parseFloat(document.getElementById("vehicle-pricePerDay").value.trim()) || 0,
                pricePeriod: document.getElementById("vehicle-pricePeriod").value.trim(),
                features: document.getElementById("vehicle-features").value.split("|").map(f => {
                    const [name, icon] = f.split(":").map(s => s.trim());
                    return { name, icon };
                })
            };

            try {
                const res = await fetch(`http://localhost:8080/api/vehicles/${selectedVehicleId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(dto)
                });

                if (res.ok) {
                    // alert("Updated successfully!");
                    toastr.success("Updated successfully!", "Success");
                    loadVehicle();
                    selectedVehicleId = null;
                    document.querySelectorAll("#vehicles input").forEach(i => i.value = "");
                } else {
                    // alert("Failed to update!");
                    // toastr.error("Failed to update!", "Error");
                }
            } catch (err) {
                console.error("Update error:", err);
                // toastr.error("Update error!", "Error");
            }
        });
    } catch (err) {
        console.error("Error loading vehicles:", err);
        toastr.error("Error loading vehicles!", "Error");
    }
    document.querySelectorAll("#vehicles input")
        .forEach(el => el.value = "");
}

document.getElementById("refresh-vehicles").addEventListener("click", () => {
    document.querySelectorAll("#vehicles input").forEach(i => i.value = "");
});


// ================== LOAD VEHICLES CATEGORY ==================
async function loadVehicleCategory() {
    try {
        const res = await fetch("http://localhost:8080/api/vehicleCategories");
        const json = await res.json();

        const vehicles = json.data;
        if (!Array.isArray(vehicles)) {
            console.error("Expected an array but got:", vehicles);
            return;
        }

        const tableBody = document.querySelector("#vehicleCategory-table tbody");
        tableBody.innerHTML = "";
        vehicles.forEach(vehicle => {
            const tr = document.createElement("tr");

            // Features HTML build karanna
            let featuresHtml = "";
            tr.innerHTML = `
                <td>${vehicle.id}</td>
                <td>${vehicle.name}</td>
                <td>${vehicle.availableVehicles}</td>
                <td>${vehicle.pricePerDay}</td>
                <td>${vehicle.buttonLink}</td>
                <td>${vehicle.description}</td>
                <td>
                    <button class="update-vehicleCategory btn-primary" data-id="${vehicle.id}">
                        <i class="fa fa-pencil-alt"></i>
                    </button>
                    <button class="delete-vehicleCategory btn-danger" data-id="${vehicle.id}">
                        <i class="fa fa-trash"></i>
                    </button>
                </td>
            `;
            tableBody.appendChild(tr);
        });

        // Delete Travel Tips
        document.querySelectorAll(".delete-vehicleCategory").forEach(btn => {
            btn.addEventListener("click", async () => {
                const id = btn.getAttribute("data-id");
                if (!confirm("Are you sure you want to delete this?")) return;

                try {
                    const res = await fetch(`http://localhost:8080/api/vehicleCategories/${id}`, {
                        method: "DELETE"
                    });
                    if (res.ok) {
                        loadVehicleCategory();
                        // alert("Deleted successfully!");
                        toastr.success("Deleted successfully!", "Success");
                    } else {
                        // alert("Failed to delete!");
                        toastr.error("Failed to delete!", "Error");
                    }
                } catch (err) {
                    console.error("Delete error:", err);
                    toastr.error("Failed to delete!", "Error");
                }
            });
        });

        let selectedVehicleId = null;

        // When user clicks table "Update" button
        document.addEventListener("click", (e) => {
            if (e.target.classList.contains("update-vehicleCategory")) {
                const row = e.target.closest("tr");
                selectedVehicleId = e.target.getAttribute("data-id");

                document.getElementById("vehicleCategory-name").value = row.children[1].innerText;
                document.getElementById("vehicleCategory-available").value = row.children[2].innerText;
                document.getElementById("vehicleCategory-pricePerDay").value = row.children[3].innerText;
                document.getElementById("vehicleCategory-buttonLink").value = row.children[4].innerText;
                document.getElementById("vehicleCategory-description").value = row.children[5].innerText;
            }
        });

        // Update button click
        document.getElementById("update-vehicleCategory").addEventListener("click", async () => {
            if (!selectedVehicleId) {
                // alert("Please select a row to update first!");
                // toastr.error("Please select a row to update first!", "Error");
                return;
            }

            const dto = {
                name: document.getElementById("vehicleCategory-name").value.trim(),
                availableVehicles: document.getElementById("vehicleCategory-available").value.trim(),
                pricePerDay: parseFloat(document.getElementById("vehicleCategory-pricePerDay").value.trim()) || 0,
                buttonLink: document.getElementById("vehicleCategory-buttonLink").value.trim(),
                description: document.getElementById("vehicleCategory-description").value.trim()
            };

            try {
                const res = await fetch(`http://localhost:8080/api/vehicleCategories/${selectedVehicleId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(dto)
                });

                if (res.ok) {
                    // alert("Updated successfully!");
                    toastr.success("Updated successfully!", "Success");
                    loadVehicleCategory();
                    selectedVehicleId = null;
                    document.querySelectorAll("#vehicleCategory input").forEach(i => i.value = "");
                } else {
                    // alert("Failed to update!");
                    // toastr.error("Failed to update!", "Error");
                }
            } catch (err) {
                console.error("Update error:", err);
                // toastr.error("Failed to update!", "Error");
            }
        });
    } catch (err) {
        console.error("Error loading vehicles:", err);
        toastr.error("Failed to load vehicles!", "Error");
    }
    document.querySelectorAll("#vehicleCategory input")
        .forEach(el => el.value = "");
}

document.getElementById("refresh-vehicleCategory").addEventListener("click", () => {
    document.querySelectorAll("#vehicleCategory input").forEach(i => i.value = "");
});


// ================== LOAD VEHICLES FLEET ==================
async function loadVehicleFleet() {
    try {
        const res = await fetch("http://localhost:8080/api/vehicleFleets");
        const json = await res.json();

        const vehicles = json.data;
        if (!Array.isArray(vehicles)) {
            console.error("Expected an array but got:", vehicles);
            return;
        }

        const tableBody = document.querySelector("#vehicleFleet-table tbody");
        tableBody.innerHTML = "";
        vehicles.forEach(vehicle => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${vehicle.id}</td>
                <td>${vehicle.name}</td>
                <td>${vehicle.category}</td>
                <td>${vehicle.seats}</td>
                <td>${vehicle.bags}</td>
                <td>${vehicle.transmission}</td>
                <td>${vehicle.pricePerDay}</td>
                <td><img src="${vehicle.imageUrl}" width="80"></td>
                <td>
                    <button class="update-vehicleFleet btn-primary" data-id="${vehicle.id}">
                        <i class="fa fa-pencil-alt"></i>
                    </button>
                    <button class="delete-vehicleFleet btn-danger" data-id="${vehicle.id}">
                        <i class="fa fa-trash"></i>
                    </button>
                </td>
            `;
            tableBody.appendChild(tr);
        });

        // ================== DELETE ==================
        document.querySelectorAll(".delete-vehicleFleet").forEach(btn => {
            btn.addEventListener("click", async () => {
                const id = btn.getAttribute("data-id");
                if (!confirm("Are you sure you want to delete this fleet vehicle?")) return;

                try {
                    const res = await fetch(`http://localhost:8080/api/vehicleFleets/${id}`, {
                        method: "DELETE"
                    });
                    if (res.ok) {
                        // alert("Deleted successfully!");
                        toastr.success("Deleted successfully!", "Success");
                        loadVehicleFleet();
                    } else {
                        // alert("Failed to delete!");
                        toastr.error("Failed to delete!", "Error");
                    }
                } catch (err) {
                    console.error("Delete error:", err);
                    toastr.error("Failed to delete!", "Error");
                }
            });
        });

        // ================== UPDATE ==================
        let selectedFleetId = null;
        document.querySelectorAll(".update-vehicleFleet").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const row = e.target.closest("tr");
                selectedFleetId = btn.getAttribute("data-id");

                document.getElementById("vehicleFleet-name").value = row.children[1].innerText;
                document.getElementById("vehicleFleet-category").value = row.children[2].innerText;
                document.getElementById("vehicleFleet-seats").value = row.children[3].innerText;
                document.getElementById("vehicleFleet-bags").value = row.children[4].innerText;
                document.getElementById("vehicleFleet-transmission").value = row.children[5].innerText;
                document.getElementById("vehicleFleet-pricePerDay").value = row.children[6].innerText;
                document.getElementById("vehicleFleet-imageUrl").value = row.children[7].querySelector("img")?.src || "";
            });
        });

        // Update button click
        document.getElementById("update-vehicleFleet").addEventListener("click", async () => {
            if (!selectedFleetId) {
                // alert("Please select a row to update first!");
                toastr.error("Please select a row to update first!", "Error");
                return;
            }

            const dto = {
                name: document.getElementById("vehicleFleet-name").value.trim(),
                category: document.getElementById("vehicleFleet-category").value.trim(),
                seats: parseInt(document.getElementById("vehicleFleet-seats").value.trim()) || 0,
                bags: parseInt(document.getElementById("vehicleFleet-bags").value.trim()) || 0,
                transmission: document.getElementById("vehicleFleet-transmission").value.trim(),
                pricePerDay: parseFloat(document.getElementById("vehicleFleet-pricePerDay").value.trim()) || 0,
                imageUrl: document.getElementById("vehicleFleet-imageUrl").value.trim()
            };

            try {
                const res = await fetch(`http://localhost:8080/api/vehicleFleets/${selectedFleetId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(dto)
                });

                if (res.ok) {
                    // alert("Updated successfully!");
                    toastr.success("Updated successfully!", "Success");
                    loadVehicleFleet();
                    selectedFleetId = null;
                    document.querySelectorAll("#vehicleFleet input").forEach(i => i.value = "");
                } else {
                    // alert("Failed to update!");
                    // toastr.error("Failed to update!", "Error");
                }
            } catch (err) {
                console.error("Update error:", err);
                // toastr.error("Failed to update!", "Error");
            }
        });
    } catch (err) {
        console.error("Error loading vehicles fleet:", err);
        toastr.error("Failed to load vehicles fleet!", "Error");
    }
    document.querySelectorAll("#vehicleFleet input")
        .forEach(el => el.value = "");
}
// Refresh button
document.getElementById("refresh-vehicleFleet").addEventListener("click", () => {
    document.querySelectorAll("#vehicleFleet input").forEach(i => i.value = "");
});


// ================== LOAD RENTAL STEPS ==================
async function loadVRentalSteps() {
    try {
        const res = await fetch("http://localhost:8080/api/rentalProcessSteps");
        const json = await res.json();

        const steps = json.data;
        if (!Array.isArray(steps)) {
            console.error("Expected an array but got:", steps);
            return;
        }

        const tableBody = document.querySelector("#rentalSteps-table tbody");
        tableBody.innerHTML = "";
        steps.forEach(steps => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${steps.id}</td>
                <td>${steps.title}</td>
                <td>${steps.stepNumber}</td>
                <td>${steps.iconSvg}</td>
                <td>${steps.description}</td>
                <td>
                    <button class="update-rentalSteps btn-primary" data-id="${steps.id}">
                        <i class="fa fa-pencil-alt"></i>
                    </button>
                    <button class="delete-rentalSteps btn-danger" data-id="${steps.id}">
                        <i class="fa fa-trash"></i>
                    </button>
                </td>
            `;
            tableBody.appendChild(tr);
        });

        // ================== DELETE ==================
        document.querySelectorAll(".delete-rentalSteps").forEach(btn => {
            btn.addEventListener("click", async () => {
                const id = btn.getAttribute("data-id");
                if (!confirm("Are you sure you want to delete this rental step?")) return;

                try {
                    const res = await fetch(`http://localhost:8080/api/rentalProcessSteps/${id}`, {
                        method: "DELETE"
                    });
                    if (res.ok) {
                        // alert("Deleted successfully!");
                        toastr.success("Deleted successfully!", "Success");
                        loadVRentalSteps();
                    } else {
                        // alert("Failed to delete!");
                        toastr.error("Failed to delete!", "Error");
                    }
                } catch (err) {
                    console.error("Delete error:", err);
                    toastr.error("Failed to delete!", "Error");
                }
            });
        });

        // ================== UPDATE ==================
        let selectedStepsId = null;
        document.querySelectorAll(".update-rentalSteps").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const row = e.target.closest("tr");
                selectedStepsId = btn.getAttribute("data-id");

                document.getElementById("rentalSteps-title").value = row.children[1].innerText;
                document.getElementById("rentalSteps-stepNumber").value = row.children[2].innerText;
                document.getElementById("rentalSteps-iconSvg").value = row.children[3].innerHTML.trim();
                document.getElementById("rentalSteps-description").value = row.children[4].innerText;
            });
        });

        // Update button click
        document.getElementById("update-rentalSteps").addEventListener("click", async () => {
            if (!selectedStepsId) {
                // alert("Please select a row to update first!");
                // toastr.error("Please select a row to update first!", "Error");
                return;
            }

            const dto = {
                title: document.getElementById("rentalSteps-title").value.trim(),
                stepNumber: parseInt(document.getElementById("rentalSteps-stepNumber").value.trim()) || 0,
                iconSvg: document.getElementById("rentalSteps-iconSvg").value.trim(),
                description: document.getElementById("rentalSteps-description").value.trim()
            };

            try {
                const res = await fetch(`http://localhost:8080/api/rentalProcessSteps/${selectedStepsId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(dto)
                });

                if (res.ok) {
                    // alert("Updated successfully!");
                    toastr.success("Updated successfully!", "Success");
                    loadVRentalSteps();
                    selectedStepsId = null;
                    document.querySelectorAll("#rentalSteps input").forEach(i => i.value = "");
                } else {
                    // alert("Failed to update!");
                    // toastr.error("Failed to update!", "Error");
                }
            } catch (err) {
                console.error("Update error:", err);
                // toastr.error("Update error", "Error");
            }
        });
    } catch (err) {
        console.error("Error loading rental steps:", err);
        toastr.error("Error loading rental steps", "Error");
    }
    document.querySelectorAll("#rentalSteps input")
        .forEach(el => el.value = "");
}
// Refresh button
document.getElementById("refresh-rentalSteps").addEventListener("click", () => {
    document.querySelectorAll("#rentalSteps input").forEach(i => i.value = "");
});



// ----------------------Data Saving----------------------
// ================== POPULAR DESTINATIONS ==================
document.getElementById("add-pd").addEventListener("click", async () => {
    const dto = {
        title: document.getElementById("pd-title").value,
        location: document.getElementById("pd-location").value,
        imageUrl: document.getElementById("pd-image").value,
        duration: document.getElementById("pd-duration").value,
        currency: document.getElementById("pd-currency").value,
        price: parseFloat(document.getElementById("pd-price").value),
        rating: parseFloat(document.getElementById("pd-rating").value),
        reviews: parseInt(document.getElementById("pd-reviews").value)
    };

    try {
        const res = await fetch("http://localhost:8080/api/destinations", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dto)
        });

        if (res.ok) {
            // alert("Popular Destination save is successful!");
            toastr.success("Popular Destination save is successful", "Success");
            loadDestinations();
        } else {
            // alert("Popular Destination save is failed!");
            toastr.error("Popular Destination save is failed", "Error");
        }
    } catch (err) {
        console.error(err);
        toastr.error("Popular Destination save is failed", "Error");
    }

    //input clear
    document.querySelectorAll("#popular-destination input").forEach(i => i.value = "");
});

// ================== PACKAGES ==================
document.getElementById("add-package").addEventListener("click", async () => {
    const dto = {
        title: document.getElementById("pkg-title").value,
        tag: document.getElementById("pkg-tag").value,
        features: document.getElementById("pkg-features").value
            .split(",")
            .map(f => f.trim()),  // comma separated features
        unit: document.getElementById("pkg-unit").value,
        price: parseFloat(document.getElementById("pkg-price").value) || 0,
        description: document.getElementById("pkg-description").value
    };

    try {
        const res = await fetch("http://localhost:8080/api/packages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dto)
        });

        if (res.ok) {
            // alert("Package save is successful!");
            toastr.success("Package save is successful", "Success");
            loadPackages();
        } else {
            // alert("Package save is failed!");
            toastr.error("Package save is failed", "Error");
        }
    } catch (err) {
        console.error("Error saving package:", err);
        toastr.error("Package save is failed", "Error");
    }

    // input clear
    document.querySelectorAll("#packages input").forEach(i => i.value = "");
});

// ================== ADD ALL DESTINATIONS ==================
document.getElementById("add-destinations").addEventListener("click", async () => {
    const dto = {
        title: document.getElementById("dest-title").value,
        location: document.getElementById("dest-location").value,
        imageUrl: document.getElementById("dest-image").value,
        currency: document.getElementById("dest-currency").value,
        price: parseFloat(document.getElementById("dest-price").value) || 0,
        priceRange: document.getElementById("dest-priceRange").value,
        category: document.getElementById("dest-category").value.split(",").map(c => c.trim()),
        rating: parseFloat(document.getElementById("dest-rating").value) || 0
    };

    try {
        const res = await fetch("http://localhost:8080/api/allDestinations", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dto)
        });

        if (res.ok) {
            // alert("Destination save is successful!");
            toastr.success("Destination save is successful", "Success");
            loadAllDestinations();
        } else {
            // alert("Destination save is failed!");
            toastr.error("Destination save is failed", "Error");
        }
    } catch (err) {
        console.error(err);
        toastr.error("Destination save is failed", "Error");
    }

    //input clear
    document.querySelectorAll("#destinations input").forEach(i => i.value = "");
});

// ================== ADD GALLERY IMAGE ==================
document.getElementById("add-gallery").addEventListener("click", async () => {
    const dto = {
        imageUrl: document.getElementById("gallery-image").value
    };

    try {
        const res = await fetch("http://localhost:8080/api/galleries", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dto)
        });

        if (res.ok) {
            // alert("Gallery image added successfully!");
            toastr.success("Gallery image added successfully", "Success");
            loadGallery();
        } else {
            // alert("Failed to add gallery image!");
            toastr.error("Failed to add gallery image", "Error");
        }
    } catch (err) {
        console.error("Error saving gallery image:", err);
        toastr.error("Failed to add gallery image", "Error");
    }

    // Clear input
    document.getElementById("gallery-image").value = "";
});

// ================== GUIDES ==================
document.getElementById("add-guide").addEventListener("click", async () => {
    const formData = new FormData();

    const dto = {
        name: document.getElementById("guide-name").value.trim(),
        position: document.getElementById("guide-position").value.trim(),
        experienceYears: parseInt(document.getElementById("guide-experience").value.trim()),
        location: document.getElementById("guide-location").value.trim(),
        specialities: document.getElementById("guide-specialities").value.trim(),
        bio: document.getElementById("guide-bio").value.trim(),
        socialLinks: {
            facebook: document.getElementById("guide-facebook").value.trim(),
            instagram: document.getElementById("guide-instagram").value.trim(),
            linkedin: document.getElementById("guide-linkedin").value.trim()
        }
    };

    // append JSON dto as blob
    formData.append("guide", new Blob([JSON.stringify(dto)], { type: "application/json" }));

    // append file (if selected)
    const file = document.getElementById("guide-image-file").files[0];
    if (file) {
        formData.append("image", file);
    }

    try {
        const res = await fetch("http://localhost:8080/api/guides", {
            method: "POST",
            body: formData
        });

        if (res.ok) {
            // alert("Guide saved successfully!");
            toastr.success("Guide saved successfully", "Success");
            loadGuide();
            document.querySelectorAll("#guides input").forEach(i => i.value = "");
        } else {
            // alert("Guide save failed!");
            toastr.error("Guide save failed", "Error");
        }
    } catch (err) {
        console.error("Error saving guide:", err);
        toastr.error("Guide save failed", "Error");
    }

    // clear inputs
    document.querySelectorAll("#guides input").forEach(i => i.value = "");
});

// ================== ADD TRAVEL TIPS ==================
document.getElementById("add-tips").addEventListener("click", async () => {
    const dto = {
        title: document.getElementById("tip-title").value,
        category: document.getElementById("tip-category").value,
        excerpt: document.getElementById("tip-excerpt").value,
        imageUrl: document.getElementById("tip-imageUrl").value,
        link: document.getElementById("tip-link").value
    };

    try {
        const res = await fetch("http://localhost:8080/api/travelTips", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dto)
        });

        if (res.ok) {
            // alert("Data added successfully!");
            toastr.success("Data added successfully", "Success");
            loadTips();
        } else {
            // alert("Failed to add data!");
            toastr.error("Failed to add data", "Error");
        }
    } catch (err) {
        console.error("Error saving data:", err);
        toastr.error("Failed to add data", "Error");
    }

    // Clear input
    document.querySelectorAll("#travelTips input").forEach(i => i.value = "");
});

// ================== ADD VEHICLE ==================
document.getElementById("add-vehicles").addEventListener("click", async () => {
    const dto = {
        name: document.getElementById("vehicle-name").value.trim(),
        badge: document.getElementById("vehicle-badge").value.trim(),
        reviewCount: parseInt(document.getElementById("vehicle-reviewCount").value.trim()) || 0,
        imageUrl: document.getElementById("vehicle-imageUrl").value.trim(),
        rating: parseFloat(document.getElementById("vehicle-rating").value.trim()) || 0,
        pricePerDay: parseFloat(document.getElementById("vehicle-pricePerDay").value.trim()) || 0,
        pricePeriod: document.getElementById("vehicle-pricePeriod").value.trim(),
        features: document.getElementById("vehicle-features").value.split("|").map(f => {
            const [name, icon] = f.split(":").map(s => s.trim());
            return { name, icon };
        })
    };

    try {
        const res = await fetch("http://localhost:8080/api/vehicles", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dto)
        });

        if (res.ok) {
            // alert("Data added successfully!");
            toastr.success("Data added successfully", "Success");
            loadVehicle();
        } else {
            alert("Failed to add data!");
        }
    } catch (err) {
        // console.error("Error saving data:", err);
        toastr.error("Failed to add data", "Error");
    }

    // Clear input
    document.querySelectorAll("#vehicles input").forEach(i => i.value = "");
});

// ================== ADD VEHICLE CATEGORY ==================
document.getElementById("add-vehicleCategory").addEventListener("click", async () => {
    const dto = {
        name: document.getElementById("vehicleCategory-name").value.trim(),
        availableVehicles: document.getElementById("vehicleCategory-available").value.trim(),
        pricePerDay: parseFloat(document.getElementById("vehicleCategory-pricePerDay").value.trim()) || 0,
        buttonLink: document.getElementById("vehicleCategory-buttonLink").value.trim(),
        description: document.getElementById("vehicleCategory-description").value.trim()
    };

    try {
        const res = await fetch("http://localhost:8080/api/vehicleCategories", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dto)
        });

        if (res.ok) {
            // alert("Data added successfully!");
            toastr.success("Data added successfully", "Success");
            loadVehicleCategory();
        } else {
            // alert("Failed to add data!");
            toastr.error("Failed to add data", "Error");
        }
    } catch (err) {
        // console.error("Error saving data:", err);
        toastr.error("Failed to add data", "Error");
    }

    // Clear input
    document.querySelectorAll("#vehicleCategory input").forEach(i => i.value = "");
});


// ================== ADD VEHICLE FLEET ==================
document.getElementById("add-vehicleFleet").addEventListener("click", async () => {
    const dto = {
        name: document.getElementById("vehicleFleet-name").value.trim(),
        category: document.getElementById("vehicleFleet-category").value.trim(),
        seats: parseInt(document.getElementById("vehicleFleet-seats").value.trim()) || 0,
        bags: parseInt(document.getElementById("vehicleFleet-bags").value.trim()) || 0,
        transmission: document.getElementById("vehicleFleet-transmission").value.trim(),
        pricePerDay: parseFloat(document.getElementById("vehicleFleet-pricePerDay").value.trim()) || 0,
        imageUrl: document.getElementById("vehicleFleet-imageUrl").value.trim()
    };

    try {
        const res = await fetch("http://localhost:8080/api/vehicleFleets", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dto)
        });

        if (res.ok) {
            // alert("Data added successfully!");
            toastr.success("Data added successfully", "Success");
            loadVehicleFleet();
        } else {
            // alert("Failed to add data!");
            toastr.error("Failed to add data", "Error");
        }
    } catch (err) {
        console.error("Error saving data:", err);
        toastr.error("Failed to add data", "Error");
    }

    // Clear input
    document.querySelectorAll("#vehicleFleet input").forEach(i => i.value = "");
});


// ================== ADD RENTAL STEPS ==================
document.getElementById("add-rentalSteps").addEventListener("click", async () => {
    const dto = {
        title: document.getElementById("rentalSteps-title").value.trim(),
        stepNumber: parseInt(document.getElementById("rentalSteps-stepNumber").value.trim()) || 0,
        iconSvg: document.getElementById("rentalSteps-iconSvg").value.trim(),
        description: document.getElementById("rentalSteps-description").value.trim()
    };

    try {
        const res = await fetch("http://localhost:8080/api/rentalProcessSteps", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dto)
        });

        if (res.ok) {
            // alert("Data added successfully!");
            toastr.success("Data added successfully", "Success");
            loadVRentalSteps();
        } else {
            // alert("Failed to add data!");
            toastr.error("Failed to add data", "Error");
        }
    } catch (err) {
        console.error("Error saving data:", err);
        toastr.error("Failed to save data", "Error");
    }

    // Clear input
    document.querySelectorAll("#rentalSteps input").forEach(i => i.value = "");
});

// ================== INITIAL LOAD ==================
window.addEventListener("DOMContentLoaded", () => {
    loadOverview();
    loadDestinations();
    loadPackages();
    loadAllDestinations();
    loadGallery();
    loadContact();
    loadGuide();
    loadTips();
    loadVehicle();
    loadVehicleCategory();
    loadVehicleFleet();
    loadVRentalSteps();

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

// Toastr settings (optional customization)
toastr.options = {
    "closeButton": true,
    // "progressBar": true,
    "positionClass": "toast-top-right",
    "timeOut": "4000"
};