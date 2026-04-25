const mysql = require('mysql2/promise');

async function checkPasswords() {
    const passwordsToTry = ['', 'root', 'password', 'admin', '123456', '1234'];
    let found = false;

    for (const pwd of passwordsToTry) {
        try {
            const conn = await mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: pwd,
            });
            console.log(`SUCCESS! The correct password is: "${pwd}"`);
            found = true;
            await conn.end();
            break;
        } catch (err) {
            // ignore
        }
    }
    
    if (!found) {
        console.log("FAILURE! Could not guess the MySQL root password. It's something custom.");
    }
}

checkPasswords();
