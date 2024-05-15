import db from "../db/index.js";

const createEventQuery = async () => {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS Events (
        id SERIAL PRIMARY KEY,
        event_name VARCHAR(100) NOT NULL,
        event_description TEXT,
        banner_url VARCHAR(255),
        user_id INT
    );
    
    `;

    try {
        const result = await db.promise().query(createTableQuery);
        console.log('Event table created or already exists.');
    } catch (err) {
        console.error('Error creating Event table:', err);
    }
}

export default createEventQuery;
