document.addEventListener('DOMContentLoaded', function() {
    // Password Toggle
    const toggleButtons = document.querySelectorAll('.toggle-password');

    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');

            const input = this.previousElementSibling;
            if (input.type === 'password') {
                input.type = 'text';
                this.querySelector('.eye-icon').style.display = 'none';
                this.querySelector('.eye-off-icon').style.display = 'block';
            } else {
                input.type = 'password';
                this.querySelector('.eye-icon').style.display = 'block';
                this.querySelector('.eye-off-icon').style.display = 'none';
            }
        });
    });

    // Theme Toggle
    const themeToggle = document.getElementById("theme-toggle");
    const htmlElement = document.documentElement;

    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
        htmlElement.classList.add("dark-mode");
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            htmlElement.classList.toggle("dark-mode");
            localStorage.setItem("theme", htmlElement.classList.contains("dark-mode") ? "dark" : "light");
        });
    }

    const signupForm = document.getElementById('signupForm');
    if (!signupForm) {
        console.error("Signup form not found in the DOM.");
        toastr.error("Signup form not found in the DOM.", "Error");
        return;
    }

    // ===== FORM VALIDATION & SUBMIT =====
    const form = document.getElementById('signupForm');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Inputs
        const username = document.getElementById('username');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');
        const terms = document.getElementById('termsAgree');

        // Error elements
        const usernameError = document.getElementById('usernameError');
        const emailError = document.getElementById('emailError');
        const phoneError = document.getElementById('phoneError');
        const passwordError = document.getElementById('passwordError');
        const confirmPasswordError = document.getElementById('confirmPasswordError');
        const termsError = document.getElementById('termsError');

        // Clear previous errors
        [usernameError, emailError, phoneError, passwordError, confirmPasswordError, termsError]
            .forEach(el => el.textContent = '');

        let valid = true;

        // Validation
        if (!username.value.trim()) {
            usernameError.textContent = "Username is required";
            toastr.error("Username is required", "Error");
            valid = false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            emailError.textContent = "Email is required";
            toastr.error("Email is required", "Error");
            valid = false;
        } else if (!emailPattern.test(email.value.trim())) {
            emailError.textContent = "Invalid email format";
            toastr.error("Invalid email format", "Error");
            valid = false;
        }

        const mobilePattern = /^[0-9]{10}$/;
        if (!phone.value.trim()) {
            phoneError.textContent = "Mobile number is required";
            toastr.error("Mobile number is required", "Error");
            valid = false;
        } else if (!mobilePattern.test(phone.value.trim())) {
            phoneError.textContent = "Invalid mobile format (must be 10 digits)";
            toastr.error("Invalid mobile format (must be 10 digits)", "Error");
            valid = false;
        }

        if (!password.value) {
            passwordError.textContent = "Password is required";
            valid = false;
        } else if (password.value.length < 8) {
            passwordError.textContent = "Password must be at least 8 characters";
            toastr.error("Password must be at least 8 characters", "Error");
            valid = false;
        }

        if (password.value !== confirmPassword.value) {
            confirmPasswordError.textContent = "Passwords do not match";
            toastr.error("Passwords do not match", "Error");
            valid = false;
        }

        if (!terms.checked) {
            termsError.textContent = "You must agree to the terms";
            toastr.error("You must agree to the terms", "Error");
            valid = false;
        }

        if (!valid) return;

        const submitBtn = form.querySelector('.btn-submit');
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');

        try {
            const response = await fetch('http://localhost:8080/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username.value.trim(),
                    email: email.value.trim(),
                    phone: phone.value.trim(),
                    password: password.value,
                    role: "USER"
                })
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.errors) {
                    Object.keys(data.errors).forEach(key => {
                        const el = document.getElementById(`${key}Error`);
                        if (el) el.textContent = data.errors[key];
                    });
                } else {
                    // alert(data.message || `Error ${response.status}`);
                    toastr.error(data.message || `Error ${response.status}`, 'Error');
                }
                return;
            }

            // Success → go to login
            window.location.href = 'login.html';

        } catch (err) {
            console.error('Signup failed', err);
            // alert('Signup failed. Please try again.');
            toastr.error('Signup failed. Please try again.', 'Error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
        }
    });
});


// Toastr settings (optional customization)
toastr.options = {
    "closeButton": true,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "timeOut": "4000"
};