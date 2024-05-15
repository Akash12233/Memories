import db from "../db/index.js";

const createimageQuery = async () => {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS Images (
        id SERIAL PRIMARY KEY,
        imageurl varchar(255),
        event_id int
    );
    
    `;

    try {
        const result = await db.promise().query(createTableQuery);
        console.log('image table created or already exists.');
    } catch (err) {
        console.error('Error creating images table:', err);
    }
}

export default createimageQuery;
