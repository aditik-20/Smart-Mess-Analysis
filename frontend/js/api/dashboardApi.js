const API_BASE_URL = 'http://localhost:5000/api/dashboard';

const fetchDashboardStats = async (meal = 'all') => {
    try {
        const response = await fetch(`${API_BASE_URL}/stats?meal=${meal}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching stats:", error);
        return null;
    }
};

const fetchWastageTrends = async (meal = 'all') => {
    try {
        const response = await fetch(`${API_BASE_URL}/wastage-trends?meal=${meal}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching wastage trends:", error);
        return [];
    }
};

const fetchCostAnalysis = async (meal = 'all') => {
    try {
        const response = await fetch(`${API_BASE_URL}/costs?meal=${meal}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching cost analysis:", error);
        return [];
    }
};

const fetchAlerts = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/recent-alerts`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching alerts:", error);
        return [];
    }
};

window.api = {
    fetchDashboardStats,
    fetchWastageTrends,
    fetchCostAnalysis,
    fetchAlerts
};
