/**
 * Cấu hình Sequelize kết nối PostgreSQL
 * Sử dụng chung pool với pg để tối ưu tài nguyên
 */
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME || 'kidfit_db',
    process.env.DB_USER || 'kidfit_user',
    process.env.DB_PASSWORD || 'kidfit_password',
    {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5433', 10),
        dialect: 'postgres',
        logging: false, // Tắt log SQL trong production — bật `console.log` nếu cần debug
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        define: {
            // Tự động thêm createdAt / updatedAt cho mọi model
            timestamps: true,
            underscored: true, // camelCase → snake_case trong DB
        },
    }
);

export default sequelize;
