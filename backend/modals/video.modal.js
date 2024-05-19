import db from "../db/index.js";

const createVideoQuery = async () => {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS Video (
        id SERIAL PRIMARY KEY,
        videourl varchar(255),
        vide_size int,
        event_id int
    );
    
    `;

    try {
        const result = await db.promise().query(createTableQuery);
        console.log('Video table created or already exists.');
    } catch (err) {
        console.error('Error creating images table:', err);
    }
}

export default createVideoQuery;
