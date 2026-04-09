/**
 * Model: RefreshToken
 * Lưu trữ refresh token riêng biệt (1 user có thể có nhiều session)
 * 
 * Bảo mật:
 *  - Token được hash trước khi lưu DB (bcryptjs)
 *  - Có thời gian hết hạn (expires_at)
 *  - Xóa khi logout hoặc khi revoke all sessions
 *  - Rotate token mỗi lần refresh (old token bị xóa)
 */
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../core/config/database.js';
import User from '../user/user.model.js';

export interface RefreshTokenAttributes {
    id: number;
    user_id: number;
    token_hash: string;       // SHA-256 hash of the refresh token
    expires_at: Date;
    device_info: string | null; // Browser/device info for session management
    created_at?: Date;
}

export type RefreshTokenCreationAttributes = Optional<RefreshTokenAttributes, 'id' | 'device_info'>;

class RefreshToken extends Model<RefreshTokenAttributes, RefreshTokenCreationAttributes>
    implements RefreshTokenAttributes {
    public id!: number;
    public user_id!: number;
    public token_hash!: string;
    public expires_at!: Date;
    public device_info!: string | null;
    public readonly created_at!: Date;

    public isExpired(): boolean {
        return this.expires_at < new Date();
    }
}

RefreshToken.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        token_hash: {
            type: DataTypes.STRING(64), // SHA-256 produces 64 hex chars
            allowNull: false,
        },
        expires_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        device_info: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: null,
        },
    },
    {
        sequelize,
        tableName: 'refresh_tokens',
        modelName: 'RefreshToken',
        updatedAt: false, // Refresh tokens are immutable once created
        indexes: [
            { fields: ['user_id'] },
            { fields: ['token_hash'] },
            { fields: ['expires_at'] }, // For cleanup queries
        ],
    }
);

// Associations
User.hasMany(RefreshToken, { foreignKey: 'user_id', as: 'refreshTokens', onDelete: 'CASCADE' });
RefreshToken.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

export default RefreshToken;
