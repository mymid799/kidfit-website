import pg from 'pg';
const pool = new pg.Pool({
    host: 'localhost',
    port: 5433,
    user: 'kidfit_user',
    password: 'kidfit_password',
    database: 'kidfit_db',
});
pool.query('SELECT * FROM users', (err, res) => {
    if (err) {
        console.error('Error querying users:', err);
    } else {
        console.log('Users:', res.rows);
    }
    pool.end();
});
