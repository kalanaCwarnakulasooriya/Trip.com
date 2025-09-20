document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("add-booking-form");
    const chosenPackageSelect = document.getElementById("chosenPackage");

    // 1️⃣ Fetch all packages and populate the select dropdown
    async function loadPackages() {
        try {
            const response = await fetch("http://localhost:8080/api/packages");
            const result = await response.json();
            if (response.ok && result.data) {
                // Clear existing options except the first
                chosenPackageSelect.innerHTML = '<option value="">Select a package</option>';

                result.data.forEach(pkg => {
                    const option = document.createElement("option");
                    option.value = pkg.title; // or pkg.id if you want to store id
                    option.textContent = pkg.title;
                    chosenPackageSelect.appendChild(option);
                });
            } else {
                console.error("Failed to load packages", result.message);
                toastr.error("Failed to load packages", "Error");
            }
        } catch (error) {
            console.error("Error fetching packages:", error);
            toastr.error("Failed to load packages", "Error");
        }
    }

    loadPackages();

    // 2️⃣ Handle booking form submission
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const bookingData = {
            chosenPackage: chosenPackageSelect.value,
            travelDate: document.getElementById("travel-date").value,
            guests: parseInt(document.getElementById("guests").value),
            fullName: document.getElementById("full-name").value,
            email: document.getElementById("email_address").value,
            phone: document.getElementById("phone_number").value
        };

        try {
            const response = await fetch("http://localhost:8080/api/packageBooking", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookingData)
            });

            const result = await response.json();

            if (response.ok) {
                // Redirect or show confirmation
                window.location.href = "pkgPayment.html";
                form.reset();
            } else {
                // alert("Error: " + result.message);
                toastr.error(result.message || "Failed to save booking", "Error");
            }
        } catch (error) {
            console.error("Error saving booking:", error);
            // alert("Something went wrong while saving your booking.");
            toastr.error("Something went wrong while saving your booking.", "Error");
        }
    });

    document.getElementById("cancel-add").addEventListener("click", () => form.reset()
    );

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
    "progressBar": true,
    "positionClass": "toast-top-right",
    "timeOut": "4000"
};