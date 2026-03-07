import { Pool } from 'pg';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// PostgreSQL Connection Pool Configuration
const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    user: process.env.DB_USER || 'kidfit_user',
    password: process.env.DB_PASSWORD || 'kidfit_password',
    database: process.env.DB_NAME || 'kidfit_db',

    // Connection pooling options
    max: 20, // Max number of connections in the pool
    idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
    connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
});

// Event listener for successful database connection
pool.on('connect', () => {
    console.log('✅ Connected to PostgreSQL Database');
});

// Event listener for connection errors
pool.on('error', (err) => {
    console.error('❌ Unexpected error on idle client', err);
    process.exit(-1);
});

export const query = (text: string, params?: any[]) => {
    return pool.query(text, params);
};

export default pool;
