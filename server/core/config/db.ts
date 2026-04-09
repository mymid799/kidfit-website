import { Pool } from 'pg';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// PostgreSQL Connection Pool Configuration
const poolConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    user: process.env.DB_USER || 'kidfit_user',
    password: process.env.DB_PASSWORD || 'kidfit_password',
    database: process.env.DB_NAME || 'kidfit_db',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    ssl: process.env.NODE_ENV === 'production' ? {
        rejectUnauthorized: false
    } : false
};

// Use connection string if available, prioritize public one if specified
const connectionString = process.env.DATABASE_URL || process.env.DATABASE_PUBLIC_URL || process.env.EXTERNAL_DATABASE_URL;

const pool = connectionString
    ? new Pool({ 
        connectionString,
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
      })
    : new Pool(poolConfig);

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
