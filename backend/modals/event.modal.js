import db from "../db/index.js";

const createEventQuery = async () => {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS Events (
        id SERIAL PRIMARY KEY,
        event_name VARCHAR(100) NOT NULL,
        event_description TEXT,
        event_type VARCHAR(100),
        banner_url VARCHAR(255),
        user_id INT,
        cohostid INT,
        start_date Date,
        end_date Date
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
