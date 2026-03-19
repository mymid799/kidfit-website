/**
 * Cấu hình Sequelize kết nối PostgreSQL
 * Sử dụng chung pool với pg để tối ưu tài nguyên
 */
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5433', 10),
    dialect: 'postgres' as const,
    logging: false,
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    define: {
        timestamps: true,
        underscored: true,
    },
    dialectOptions: process.env.NODE_ENV === 'production' ? {
        ssl: {
            require: true,
            rejectUnauthorized: false // Railway requires SSL but usually does not provide a CA cert for internal verification
        }
    } : {}
};

// Prioritize the connection string from various possible environment variables
const connectionString = process.env.DATABASE_URL || process.env.DATABASE_PUBLIC_URL || process.env.EXTERNAL_DATABASE_URL;

const sequelize = connectionString
    ? new Sequelize(connectionString, dbConfig)
    : new Sequelize(
        process.env.DB_NAME || 'kidfit_db',
        process.env.DB_USER || 'kidfit_user',
        process.env.DB_PASSWORD || 'kidfit_password',
        dbConfig
    );

export default sequelize;
