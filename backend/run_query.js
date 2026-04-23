const pool = require('./config/db');

async function updateSchema() {
    try {
        await pool.query('ALTER TABLE Student ADD COLUMN registration_number VARCHAR(20) UNIQUE AFTER student_id;');
        console.log('Schema updated successfully.');
    } catch (err) {
        if (err.code === 'ER_DUP_FIELDNAME') {
            console.log('Column registration_number already exists.');
        } else {
            console.error('Error updating schema:', err);
        }
    } finally {
        pool.end();
    }
}

updateSchema();
