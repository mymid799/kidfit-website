import pool from './src/config/db.js';

async function test() {
    try {
        const res = await pool.query('SELECT count(*) FROM users');
        console.log('✅ Users table exists. Count:', res.rows[0].count);
        process.exit(0);
    } catch (err) {
        console.error('❌ Table check failed:', err.message);
        process.exit(1);
    }
}

test();
