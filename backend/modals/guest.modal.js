import db from "../db/index.js";

const createGuestQuery = async () => {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS Guest (
        id SERIAL PRIMARY KEY,
        guest_name varchar(255),
        role_name varchar(255),
        mobile_number varchar(15),
        event_id int
    );
    
    `;

    try {
        const result = await db.promise().query(createTableQuery);
        console.log('Guest table created or already exists.');
    } catch (err) {
        console.error('Error creating images table:', err);
    }
}

export default createGuestQuery;
