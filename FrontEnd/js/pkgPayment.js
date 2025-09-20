document.addEventListener("DOMContentLoaded", () => {
    const paymentForm = document.getElementById("payment-form");

    // ===== Preloader =====
    window.addEventListener("load", () => {
        const preloader = document.querySelector(".preloader");
        if (preloader) preloader.classList.add("hidden");
    });

    // ===== Auth check =====
    const token = getCookie("token");
    if (!token) {
        toastr.warning("You must be logged in.", "Access Denied");
        setTimeout(() => window.location.replace("index.html"), 1500);
    }

    // ===== Card input masking =====
    const cardInput = paymentForm.querySelector("input[placeholder='Card Number']");
    cardInput.addEventListener("input", () => {
        let value = cardInput.value.replace(/\D/g, '').substring(0, 16);
        cardInput.value = value.replace(/(.{4})/g, '$1 ').trim();
    });

    // ===== Form submission =====
    paymentForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Collect form data
        const cardNumber = paymentForm.querySelector("input[placeholder='Card Number']").value.replace(/\s/g, '');
        const cardholderName = paymentForm.querySelector("input[placeholder='Name on card']").value.trim();
        const expiryDate = paymentForm.querySelector("input[placeholder='MM/YY']").value.trim();
        const cvv = paymentForm.querySelector("input[placeholder='CVV']").value.trim();

        // Validate inputs
        if (!isValidCardNumber(cardNumber)) return alert("Invalid card number.");
        if (!isValidExpiryDate(expiryDate)) return alert("Invalid expiry date. Format: MM/YY");
        if (!isValidCVV(cvv)) return alert("Invalid CVV.");

        const paymentData = { cardNumber, cardholderName, expiryDate, cvv };

        try {
            const response = await fetch("http://localhost:8080/api/payments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(paymentData)
            });

            const result = await response.json();

            if (response.ok) {
                toastr.success("Payment Successful!", "Success");
                console.log("Saved Payment:", result.data);
                window.location.href = "successfull.html";
                paymentForm.reset();
            } else {
                toastr.error(result.message || "Payment failed", "Error");
                console.error(result);
            }

        } catch (error) {
            console.error("Error submitting payment:", error);
            toastr.error("Something went wrong. Please try again.", "Error");
        }
    });
});

// ===== Input Validation Functions =====
function isValidCardNumber(number) {
    return /^\d{16}$/.test(number);
}

function isValidExpiryDate(date) {
    return /^(0[1-9]|1[0-2])\/\d{2}$/.test(date);
}

function isValidCVV(cvv) {
    return /^\d{3,4}$/.test(cvv);
}

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

// ===== Logout =====
function logout() {
    deleteCookie("token");
    deleteCookie("username");
    toastr.info("Logged out successfully.", "Logout");
    setTimeout(() => window.location.replace("index.html"), 1500);
}

// ===== Toastr Settings =====
toastr.options = {
    "closeButton": true,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "timeOut": "4000"
};