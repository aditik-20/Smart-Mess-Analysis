console.log("dashboard page JS loaded");

const API_BASE = "http://localhost:5000";

document.addEventListener("DOMContentLoaded", () => {
  const hideLoader = () => {
    const loader = document.getElementById("loader");
    if (!loader) return;

    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  };

  const showLoader = () => {
    const loader = document.getElementById("loader");
    if (!loader) return;

    loader.style.display = "flex";
    loader.style.opacity = "1";
  };

  const loadDashboard = async () => {
    try {
      const meal = document.getElementById("mealFilter").value;
      const time = document.getElementById("timeFilter").value;
      const hostel = document.getElementById("hostelFilter").value;

      const statsRes = await fetch(
        `${API_BASE}/api/dashboard/stats?meal=${meal}&time=${time}&hostel=${hostel}`,
      );

      const stats = await statsRes.json();

      document.getElementById("statStudents").textContent =
        stats.studentCount ?? 0;

      document.getElementById("statAttendance").textContent =
        stats.todayAttendance ?? 0;

      document.getElementById("statWastage").textContent =
        `${stats.todayWastage ?? 0} kg`;

      document.getElementById("statHostels").textContent =
        stats.activeHostels ?? 0;
      hideLoader();
    } catch (err) {
      console.error("Dashboard loading error:", err);
      hideLoader();
    }
  };
  loadDashboard();

  setInterval(loadDashboard, 30000);

  document.querySelectorAll(".filter-select").forEach((filter) => {
    filter.addEventListener("change", () => {
      showLoader();
      loadDashboard();
    });
  });

  const attModal = document.getElementById("attendanceModal");
  const wasteModal = document.getElementById("wastageModal");

  document.getElementById("nav-attendance").addEventListener("click", (e) => {
    e.preventDefault();
    attModal.style.display = "block";
  });

  document.getElementById("nav-wastage").addEventListener("click", (e) => {
    e.preventDefault();
    wasteModal.style.display = "block";
  });

  document.getElementById("nav-settings").addEventListener("click", (e) => {
    e.preventDefault();
    if (confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("adminToken");
      window.location.href = "admin.html";
    }
  });

  document.getElementById("closeAttendance").addEventListener("click", () => {
    attModal.style.display = "none";
  });

  document.getElementById("closeWastage").addEventListener("click", () => {
    wasteModal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === attModal) attModal.style.display = "none";
    if (e.target === wasteModal) wasteModal.style.display = "none";
  });

  document
    .getElementById("attendanceFormModal")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      const msg = document.getElementById("modal_att_msg");
      msg.textContent = "Submitting...";

      try {
        const payload = {
          registration_number: document.getElementById("modal_att_reg").value,
          date: document.getElementById("modal_att_date").value,
          status: document.getElementById("modal_att_status").value,
        };

        const response = await fetch(`${API_BASE}/api/admin/attendance`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await response.json();
        msg.textContent = data.message;

        if (data.success) {
          document.getElementById("attendanceFormModal").reset();
          loadDashboard();
        }
      } catch (err) {
        msg.textContent = "Server error.";
      }
    });

  document
    .getElementById("wastageFormModal")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      const msg = document.getElementById("modal_waste_msg");
      msg.textContent = "Submitting...";

      try {
        const payload = {
          meal_type: document.getElementById("modal_waste_meal_type").value,
          waste_kg: document.getElementById("modal_waste_kg").value,
          reason: document.getElementById("modal_waste_reason").value,
          date: document.getElementById("modal_waste_date").value,
        };

        const response = await fetch(`${API_BASE}/api/admin/wastage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await response.json();
        msg.textContent = data.message;

        if (data.success) {
          document.getElementById("wastageFormModal").reset();
          loadDashboard();
        }
      } catch (err) {
        msg.textContent = "Server error.";
      }
    });
});
