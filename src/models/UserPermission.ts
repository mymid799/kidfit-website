import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize.js';
import User from './User.js';
import Permission from './Permission.js';

class UserPermission extends Model {
    public user_id!: number;
    public permission_id!: number;
}

UserPermission.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'users',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        permission_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'permissions',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
    },
    {
        sequelize,
        tableName: 'user_permissions',
        modelName: 'UserPermission',
        timestamps: false,
    }
);

// Define associations
User.belongsToMany(Permission, { through: UserPermission, foreignKey: 'user_id' });
Permission.belongsToMany(User, { through: UserPermission, foreignKey: 'permission_id' });

export default UserPermission;
