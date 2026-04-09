import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/sequelize.js';
import User from './User.js';

export interface AccessLogAttributes {
    id: number;
    user_id: number | null;
    action: string;
    ip_address: string | null;
    user_agent: string | null;
    timestamp: Date;
}

export type AccessLogCreationAttributes = Optional<AccessLogAttributes, 'id' | 'timestamp' | 'user_id' | 'ip_address' | 'user_agent'>;

class AccessLog extends Model<AccessLogAttributes, AccessLogCreationAttributes> implements AccessLogAttributes {
    public id!: number;
    public user_id!: number | null;
    public action!: string;
    public ip_address!: string | null;
    public user_agent!: string | null;
    public timestamp!: Date;
}

AccessLog.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true, // Login failures might not have a valid user_id
            references: {
                model: 'users',
                key: 'id',
            },
            onDelete: 'SET NULL',
        },
        action: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        ip_address: {
            type: DataTypes.STRING(45), // Support IPv6
            allowNull: true,
        },
        user_agent: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        timestamp: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: 'access_logs',
        modelName: 'AccessLog',
        updatedAt: false,
        createdAt: 'timestamp',
    }
);

// Define associations
AccessLog.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasMany(AccessLog, { foreignKey: 'user_id', as: 'accessLogs' });

export default AccessLog;
