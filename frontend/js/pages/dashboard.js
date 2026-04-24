console.log("dashboard page JS loaded");

async function loadDashboardStats() {
  const res = await fetch("http://localhost:5000/api/dashboard/stats");
  const data = await res.json();

  document.getElementById("statStudents").textContent = data.studentCount;
  document.getElementById("statAttendance").textContent = data.todayAttendance;
  document.getElementById("statWastage").textContent =
    data.todayWastage + " kg";
  document.getElementById("statHostels").textContent = data.activeHostels;

  const loader = document.getElementById("loader");
  if (loader) loader.style.display = "none";
}

loadDashboardStats();
