document.addEventListener("DOMContentLoaded", function() {
    // ===== Theme Toggle (optional) =====
    const themeToggle = document.getElementById("theme-toggle");
    const htmlElement = document.documentElement;
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) htmlElement.classList.add("dark-mode");
    if (themeToggle) themeToggle.addEventListener("click", () => {
        htmlElement.classList.toggle("dark-mode");
        localStorage.setItem("theme", htmlElement.classList.contains("dark-mode") ? "dark" : "light");
    });

    // ===== Password Toggle =====
    document.querySelectorAll('.toggle-password').forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            this.classList.toggle('active');
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

    // ===== Remember Me: Autofill =====
    const savedUsername = getCookie("username");
    if (savedUsername) {
        document.getElementById("username").value = savedUsername;
        document.getElementById("userRememberMe").checked = true;
    }

    // ===== Username/Password Login =====
    const form = document.getElementById("userLoginForm");
    if (form) {
        form.addEventListener("submit", async function(e) {
            e.preventDefault();
            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();
            const rememberMe = document.getElementById("userRememberMe").checked;
            let valid = true;

            document.getElementById("usernameError").textContent = "";
            document.getElementById("passwordError").textContent = "";

            if (!username) { valid = false; toastr.error("Username is required"); }
            if (!password) { valid = false; toastr.error("Password is required"); }
            if (!valid) return;

            const btnSubmit = form.querySelector(".btn-submit");
            btnSubmit.classList.add("loading");

            try {
                const res = await fetch("http://localhost:8080/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password })
                });
                const result = await res.json();
                if (res.ok) {
                    const expiry = rememberMe ? 24*60*60*1000 : 60*60*1000;
                    setCookie("token", result.data.accessToken, expiry);
                    setCookie("username", username, expiry);

                    toastr.success("Login successfully", "Success");
                    setTimeout(() => {
                        if (result.data.role === "ADMIN") window.location.href = "adminDashboard.html";
                        else if (result.data.role === "USER") window.location.href = "home.html";
                        else toastr.error("Unknown role! Cannot redirect.");
                    }, 1000);
                } else {
                    toastr.error(result.message || "Invalid username or password");
                }
            } catch (err) {
                toastr.error(err.message || "Login failed");
            } finally {
                btnSubmit.classList.remove("loading");
            }
        });
    }

    // ===== Google OAuth2 Login =====
    const googleBtn = document.getElementById("googleLoginBtn");
    if (googleBtn) {
        googleBtn.addEventListener("click", () => {
            window.location.href = "http://localhost:8080/oauth2/authorization/google";
        });
    }

    // Capture JWT from Google login redirect
    const params = new URLSearchParams(window.location.search);
    const googleToken = params.get("token");
    const googleRole = params.get("role");
    // Redirect based on role
    if (googleToken && googleRole) {
        const expiry = 24*60*60*1000;
        setCookie("token", googleToken, expiry);

        // Redirect based on role
        if (googleRole === "ADMIN") window.location.href = "adminDashboard.html";
        else if (googleRole === "USER") window.location.href = "home.html";
        else toastr.error("Unknown role! Cannot redirect.");
    }

    // ===== Cookie Functions =====
    function setCookie(name, value, durationMs) {
        const d = new Date();
        d.setTime(d.getTime() + durationMs);
        document.cookie = `${name}=${value}; expires=${d.toUTCString()}; path=/; SameSite=Strict`;
    }
    function getCookie(name) {
        const ca = document.cookie.split(';');
        for (let c of ca) {
            c = c.trim();
            if (c.startsWith(name + "=")) return c.substring(name.length+1);
        }
        return null;
    }

    // ===== Toastr Settings =====
    toastr.options = {
        "closeButton": true,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "timeOut": "3000",
        "extendedTimeOut": "1000",
        "newestOnTop": true,
        "preventDuplicates": true,
        "showDuration": "200",
        "hideDuration": "200"
    };
});