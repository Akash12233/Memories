import db from "../db/index.js";

const createUserQuery = async () => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS User (
            id SERIAL PRIMARY KEY,
            firstname VARCHAR(50) NOT NULL,
            lastname VARCHAR(50) NOT NULL,
            premium BOOLEAN DEFAULT FALSE,
            avatar_url VARCHAR(255),
            email VARCHAR(100) UNIQUE NOT NULL,
            mobile_number VARCHAR(15),
            password VARCHAR(255) NOT NULL,
            refresh_token VARCHAR(255)
        );
    `;

    try {
        const result = await db.promise().query(createTableQuery);
        console.log('User table created or already exists.');
    } catch (err) {
        console.error('Error creating User table:', err);
    }
}

export default createUserQuery;
