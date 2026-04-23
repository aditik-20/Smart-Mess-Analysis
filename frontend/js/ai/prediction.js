const generateAIPredictions = (wastageData, stats) => {
    if (!wastageData || wastageData.length === 0) return;

    // Calculate average wastage
    const totalWastage = wastageData.reduce((sum, item) => sum + parseFloat(item.total_waste), 0);
    const avgWastage = totalWastage / wastageData.length;
    
    // Check trend (last 2 days vs average)
    const recentWastage = parseFloat(wastageData[wastageData.length - 1].total_waste);
    
    const container = document.getElementById('aiPrediction');
    
    let predictionHtml = '';

    if (recentWastage > avgWastage * 1.2) {
        // High wastage trend
        predictionHtml = `
            <p style="margin-bottom: 8px;">Based on the recent spike, expected food wastage for tomorrow is <span class="ai-highlight" style="color: #ef4444;">HIGH (~${(recentWastage * 1.05).toFixed(1)} kg)</span>.</p>
            <p style="font-size: 0.9rem; color: rgba(255,255,255,0.8);">💡 Recommendation: Reduce quantity of lunch prep by 10%.</p>
        `;
    } else if (recentWastage < avgWastage * 0.8) {
        // Low wastage trend
        predictionHtml = `
            <p style="margin-bottom: 8px;">Wastage is tracking <span class="ai-highlight" style="color: #10b981;">LOW</span>. Expected consumption will be high tomorrow.</p>
            <p style="font-size: 0.9rem; color: rgba(255,255,255,0.8);">💡 Recommendation: Prepare for ~${Math.floor(stats.studentCount * 0.9)} students attending dinner.</p>
        `;
    } else {
        // Normal trend
        predictionHtml = `
            <p style="margin-bottom: 8px;">Consumption is <span class="ai-highlight">STABLE</span>. Expected wastage: ~${avgWastage.toFixed(1)} kg.</p>
            <p style="font-size: 0.9rem; color: rgba(255,255,255,0.8);">💡 Suggested food quantity: Standard menu portions.</p>
        `;
    }

    container.innerHTML = predictionHtml;
};

window.aiService = {
    generateAIPredictions
};
