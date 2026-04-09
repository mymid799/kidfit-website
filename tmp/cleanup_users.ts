import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
dotenv.config();

async function cleanup() {
    const dbName = process.env.DB_NAME || 'kidfit_db';
    const dbUser = process.env.DB_USER || 'kidfit_user';
    const dbPass = process.env.DB_PASSWORD || 'kidfit_password';
    const dbHost = process.env.DB_HOST || 'localhost';
    const dbPort = process.env.DB_PORT || '5433';

    const sequelize = new Sequelize(dbName, dbUser, dbPass, {
        host: dbHost,
        port: parseInt(dbPort),
        dialect: 'postgres',
        logging: console.log
    });

    try {
        await sequelize.authenticate();
        console.log('Connected to DB');
        
        // Use the exact role names found in user.model.ts
        const [results] = await sequelize.query("DELETE FROM users WHERE role NOT IN ('admin', 'it_admin') AND username NOT IN ('admin', 'it_admin')");
        console.log('Cleanup result:', results);
    } catch (error) {
        console.error('Error during cleanup:', error);
    } finally {
        await sequelize.close();
    }
}

cleanup();
