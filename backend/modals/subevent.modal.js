import db from "../db/index.js";

const createsubEventQuery = async () => {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS subEvents (
        id SERIAL PRIMARY KEY,
        event_name VARCHAR(100) NOT NULL,
        event_description TEXT,
        location VARCHAR(100),
        start_date TIMESTAMP,
        event_id int
    );
    
    `;

    try {
        const result = await db.promise().query(createTableQuery);
        console.log('subEvent table created or already exists.');
    } catch (err) {
        console.error('Error creating subevent table:', err);
    }
}

export default createsubEventQuery;
