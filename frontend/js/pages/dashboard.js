document.addEventListener('DOMContentLoaded', () => {
    // Hide loader after initial render attempt
    const hideLoader = () => {
        const loader = document.getElementById('loader');
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 500);
    };

    // Load and render all dashboard data
    const loadDashboard = async () => {
        const meal = document.getElementById('mealFilter').value;
        // 1. Fetch Stats
        const stats = await window.api.fetchDashboardStats(meal);
        if (stats) {
            document.getElementById('statStudents').textContent = stats.studentCount;
            document.getElementById('statAttendance').textContent = stats.todayAttendance;
            document.getElementById('statWastage').textContent = stats.todayWastage + ' kg';
            document.getElementById('statHostels').textContent = stats.activeHostels;
        }

        // 2. Fetch Wastage Trends for Chart
        const wastageData = await window.api.fetchWastageTrends(meal);
        if (wastageData.length > 0) {
            const labels = wastageData.map(d => {
                const date = new Date(d.date);
                return date.toLocaleDateString('en-US', { weekday: 'short' });
            });
            const dataValues = wastageData.map(d => d.total_waste);
            window.chartsConfig.initWastageChart(labels, dataValues);
            
            // Run AI Predictions
            if (stats) window.aiService.generateAIPredictions(wastageData, stats);
        }

        // 3. Fetch Cost Analysis for Chart
        const costData = await window.api.fetchCostAnalysis(meal);
        if (costData.length > 0) {
            const labels = costData.map(d => {
                const date = new Date(d.date);
                return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            });
            const dataValues = costData.map(d => d.total_cost);
            window.chartsConfig.initCostChart(labels, dataValues);
        }

        // 4. Fetch Alerts
        const alerts = await window.api.fetchAlerts();
        const alertsContainer = document.getElementById('alertsList');
        alertsContainer.innerHTML = ''; // clear loading state
        
        if (alerts.length === 0) {
            alertsContainer.innerHTML = '<p style="color: var(--text-secondary);">No active alerts.</p>';
        } else {
            alerts.forEach(alert => {
                let icon = '';
                if(alert.type === 'warning') icon = '<i class="fa-solid fa-triangle-exclamation" style="color:#f59e0b;"></i>';
                if(alert.type === 'info') icon = '<i class="fa-solid fa-circle-info" style="color:var(--accent-blue);"></i>';
                if(alert.type === 'success') icon = '<i class="fa-solid fa-circle-check" style="color:var(--accent-green);"></i>';

                const alertDiv = document.createElement('div');
                alertDiv.className = `alert-item alert-${alert.type}`;
                alertDiv.innerHTML = `
                    <div style="font-size: 1.2rem;">${icon}</div>
                    <div style="flex-grow: 1;">
                        <p style="font-size: 0.95rem;">${alert.message}</p>
                        <small style="color: var(--text-secondary); font-size: 0.8rem;">${alert.time}</small>
                    </div>
                `;
                alertsContainer.appendChild(alertDiv);
            });
        }

        hideLoader();
    };

    // Initial Load
    loadDashboard();

    // Auto Refresh every 30 seconds
    setInterval(() => {
        console.log("Auto-refreshing dashboard data...");
        loadDashboard();
    }, 30000);

    // Setup filter listeners for interactivity
    const filters = document.querySelectorAll('.filter-select');
    filters.forEach(filter => {
        filter.addEventListener('change', (e) => {
            // Show loader briefly
            const loader = document.getElementById('loader');
            loader.style.display = 'flex';
            loader.style.opacity = '1';
            
            // Re-fetch data simulating a filter applied
            setTimeout(() => {
                loadDashboard();
            }, 500); // simulated network delay
        });
    });

    // --- Modal Logic ---
    const attModal = document.getElementById('attendanceModal');
    const wasteModal = document.getElementById('wastageModal');

    document.getElementById('nav-attendance').addEventListener('click', (e) => {
        e.preventDefault();
        attModal.style.display = 'block';
    });

    document.getElementById('nav-wastage').addEventListener('click', (e) => {
        e.preventDefault();
        wasteModal.style.display = 'block';
    });

    document.getElementById('nav-settings').addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm("Are you sure you want to log out?")) {
            localStorage.removeItem('adminToken');
            window.location.href = 'admin.html';
        }
    });

    document.getElementById('closeAttendance').addEventListener('click', () => attModal.style.display = 'none');
    document.getElementById('closeWastage').addEventListener('click', () => wasteModal.style.display = 'none');

    window.addEventListener('click', (e) => {
        if (e.target === attModal) attModal.style.display = 'none';
        if (e.target === wasteModal) wasteModal.style.display = 'none';
    });

    // Form Submissions
    document.getElementById('attendanceFormModal').addEventListener('submit', async (e) => {
        e.preventDefault();
        const msg = document.getElementById('modal_att_msg');
        msg.textContent = 'Submitting...';
        msg.style.color = 'var(--text-light)';

        try {
            const payload = {
                registration_number: document.getElementById('modal_att_reg').value,
                date: document.getElementById('modal_att_date').value,
                status: document.getElementById('modal_att_status').value
            };
            const response = await fetch('/api/admin/attendance', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            msg.textContent = data.message;
            msg.style.color = data.success ? 'var(--accent-green)' : 'var(--accent-red)';
            if (data.success) {
                document.getElementById('modal_att_reg').value = '';
                loadDashboard();
            }
        } catch (err) {
            msg.textContent = 'Server error.';
            msg.style.color = 'var(--accent-red)';
        }
    });

    document.getElementById('wastageFormModal').addEventListener('submit', async (e) => {
        e.preventDefault();
        const msg = document.getElementById('modal_waste_msg');
        msg.textContent = 'Submitting...';
        msg.style.color = 'var(--text-light)';

        try {
            const payload = {
                meal_type: document.getElementById('modal_waste_meal_type').value,
                waste_kg: document.getElementById('modal_waste_kg').value,
                reason: document.getElementById('modal_waste_reason').value,
                date: document.getElementById('modal_waste_date').value
            };
            const response = await fetch('/api/admin/wastage', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            msg.textContent = data.message;
            msg.style.color = data.success ? 'var(--accent-green)' : 'var(--accent-red)';
            if (data.success) {
                document.getElementById('wastageFormModal').reset();
                loadDashboard();
            }
        } catch (err) {
            msg.textContent = 'Server error.';
            msg.style.color = 'var(--accent-red)';
        }
    });
});
