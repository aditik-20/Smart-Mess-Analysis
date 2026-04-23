// Global chart instances
let wastageChartInstance = null;
let costChartInstance = null;

// Chart defaults for aesthetic look
Chart.defaults.color = '#94a3b8';
Chart.defaults.font.family = "'Outfit', sans-serif";

const initWastageChart = (labels, dataValues) => {
    const ctx = document.getElementById('wastageChart').getContext('2d');
    
    if (wastageChartInstance) {
        wastageChartInstance.destroy();
    }

    // Gradient fill
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(239, 68, 68, 0.5)'); // Red accent
    gradient.addColorStop(1, 'rgba(239, 68, 68, 0.0)');

    wastageChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Food Wastage (kg)',
                data: dataValues,
                borderColor: '#ef4444',
                backgroundColor: gradient,
                borderWidth: 3,
                pointBackgroundColor: '#ef4444',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#ef4444',
                pointRadius: 4,
                pointHoverRadius: 6,
                fill: true,
                tension: 0.4 // Smooth curve
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    titleFont: { size: 14 },
                    bodyFont: { size: 14 },
                    padding: 12,
                    cornerRadius: 8,
                    displayColors: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    border: { display: false }
                },
                x: {
                    grid: { display: false },
                    border: { display: false }
                }
            }
        }
    });
};

const initCostChart = (labels, dataValues) => {
    const ctx = document.getElementById('costChart').getContext('2d');
    
    if (costChartInstance) {
        costChartInstance.destroy();
    }

    costChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Total Cost (₹)',
                data: dataValues,
                backgroundColor: '#3b82f6', // Blue accent
                borderRadius: 6,
                borderSkipped: false,
                barThickness: 20
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    cornerRadius: 8
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    border: { display: false }
                },
                x: {
                    grid: { display: false },
                    border: { display: false }
                }
            }
        }
    });
};

window.chartsConfig = {
    initWastageChart,
    initCostChart
};
