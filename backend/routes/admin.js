document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("adminLoginForm");
  const errorMessage = document.getElementById("errorMessage");

  // Check if already logged in
  if (localStorage.getItem("adminToken") === "true") {
    window.location.href = "admin-dashboard.html";
  }

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const submitBtn = loginForm.querySelector("button");

    submitBtn.disabled = true;
    submitBtn.textContent = "Logging in...";
    errorMessage.textContent = "";

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Simple token for demonstration
        localStorage.setItem("adminToken", "true");
        window.location.href = "admin-dashboard.html";
      } else {
        errorMessage.textContent = data.message || "Invalid credentials";
      }
    } catch (error) {
      console.error("Login error:", error);
      errorMessage.textContent = "Server error. Please try again later.";
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Login";
    }
  });
});
