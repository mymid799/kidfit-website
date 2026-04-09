import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(
        process.env.DB_NAME || 'kidfit_db',
        process.env.DB_USER || 'kidfit_user',
        process.env.DB_PASSWORD || 'kidfit_password',
        {
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT || '5433'),
            dialect: 'postgres',
        }
);

async function run() {
    try {
        console.log("Connecting...");
        await sequelize.authenticate();
        await sequelize.query('DROP TABLE IF EXISTS "user_permissions" CASCADE;');
        await sequelize.query('DROP TABLE IF EXISTS "group_permissions" CASCADE;');
        await sequelize.query('DROP TABLE IF EXISTS "permissions" CASCADE;');
        console.log("Tables dropped.");
        process.exit(0);
    } catch(e) {
        console.error(e);
        process.exit(1);
    }
}
run();
