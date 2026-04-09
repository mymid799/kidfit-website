import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize.js';
import UserGroup from './UserGroup.js';
import Permission from './Permission.js';

class GroupPermission extends Model {
    public group_id!: number;
    public permission_id!: number;
}

GroupPermission.init(
    {
        group_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'user_groups',
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
        tableName: 'group_permissions',
        modelName: 'GroupPermission',
        timestamps: false,
    }
);

// Define associations
UserGroup.belongsToMany(Permission, { through: GroupPermission, foreignKey: 'group_id' });
Permission.belongsToMany(UserGroup, { through: GroupPermission, foreignKey: 'permission_id' });

export default GroupPermission;
