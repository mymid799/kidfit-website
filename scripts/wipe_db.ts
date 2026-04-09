import pg from 'pg';
const pool = new pg.Pool({
    host: 'localhost',
    port: 5433,
    user: 'kidfit_user',
    password: 'kidfit_password',
    database: 'kidfit_db',
});
async function wipe() {
    try {
        await pool.query('DROP TABLE IF EXISTS "parent_profiles" CASCADE;');
        await pool.query('DROP TABLE IF EXISTS "users" CASCADE;');
        console.log('✅ Tables dropped successfully');
    } catch (err) {
        console.error('Error dropping tables:', err);
    } finally {
        pool.end();
    }
}
wipe();
