document.addEventListener('DOMContentLoaded', () => {
    // Authentication check
    if (localStorage.getItem('adminToken') !== 'true') {
        window.location.href = 'admin.html';
        return;
    }

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('adminToken');
        window.location.href = 'admin.html';
    });

    // Set today's date as default for date inputs
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('att_date').value = today;
    document.getElementById('waste_date').value = today;

    // Seed Students
    document.getElementById('seedStudentsBtn').addEventListener('click', async (e) => {
        const btn = e.target;
        const msg = document.getElementById('seedMessage');
        
        btn.disabled = true;
        btn.textContent = 'Generating...';
        msg.textContent = '';
        msg.style.color = 'var(--text-secondary)';

        try {
            const response = await fetch('/api/admin/seed-students', { method: 'POST' });
            const data = await response.json();
            
            if (data.success) {
                msg.textContent = data.message;
                msg.style.color = 'var(--success-color)';
            } else {
                msg.textContent = data.message;
                msg.style.color = 'var(--error-color)';
            }
        } catch (error) {
            console.error('Error:', error);
            msg.textContent = 'Server error.';
            msg.style.color = 'var(--error-color)';
        } finally {
            btn.disabled = false;
            btn.textContent = 'Seed 50 Students';
        }
    });

    // Add Attendance
    document.getElementById('attendanceForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const msg = document.getElementById('attMessage');
        const submitBtn = e.target.querySelector('button');
        
        const payload = {
            registration_number: document.getElementById('att_registration_number').value,
            date: document.getElementById('att_date').value,
            status: document.getElementById('att_status').value
        };

        submitBtn.disabled = true;
        
        try {
            const response = await fetch('/api/admin/attendance', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            
            if (data.success) {
                msg.textContent = data.message;
                msg.style.color = 'var(--success-color)';
                // Don't reset date for convenience
                document.getElementById('att_registration_number').value = '';
            } else {
                msg.textContent = data.message;
                msg.style.color = 'var(--error-color)';
            }
        } catch (error) {
            console.error('Error:', error);
            msg.textContent = 'Server error.';
            msg.style.color = 'var(--error-color)';
        } finally {
            submitBtn.disabled = false;
        }
    });

    // Add Wastage
    document.getElementById('wastageForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const msg = document.getElementById('wasteMessage');
        const submitBtn = e.target.querySelector('button');
        
        const payload = {
            meal_id: document.getElementById('waste_meal_id').value,
            waste_kg: document.getElementById('waste_kg').value,
            reason: document.getElementById('waste_reason').value,
            date: document.getElementById('waste_date').value
        };

        submitBtn.disabled = true;
        
        try {
            const response = await fetch('/api/admin/wastage', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            
            if (data.success) {
                msg.textContent = data.message;
                msg.style.color = 'var(--success-color)';
                e.target.reset();
                document.getElementById('waste_date').value = today;
            } else {
                msg.textContent = data.message;
                msg.style.color = 'var(--error-color)';
            }
        } catch (error) {
            console.error('Error:', error);
            msg.textContent = 'Server error.';
            msg.style.color = 'var(--error-color)';
        } finally {
            submitBtn.disabled = false;
        }
    });
});
