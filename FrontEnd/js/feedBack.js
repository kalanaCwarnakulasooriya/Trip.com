document.addEventListener("DOMContentLoaded", () => {
    const feedbackForm = document.querySelector(".feedback-form");

    if (feedbackForm) {
        feedbackForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            // Collect input values
            const feedback = {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                trip: document.getElementById("trip").value,
                message: document.getElementById("message").value
            };

            try {
                const response = await fetch("http://localhost:8080/api/feedback", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(feedback)
                });

                const result = await response.json();

                if (response.ok) {
                    toastr.success(result.message || "✅ Feedback submitted successfully!", "Success");
                    feedbackForm.reset();
                } else {
                    toastr.error(result.message || "Failed to submit feedback.", "❌ Error");
                }
            } catch (error) {
                console.error("Error submitting feedback:", error);
                toastr.error("⚠️ Failed to connect to server.", "Network Error");
            }
        });
    }

    // ===== Auth check (inside DOMContentLoaded) =====
    const token = getCookie("token");
    if (!token) {
        toastr.warning("You must be logged in to submit feedback.", "Access Denied");
        setTimeout(() => window.location.replace("index.html"), 1500);
        // return; // stop further execution
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