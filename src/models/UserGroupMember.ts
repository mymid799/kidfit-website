import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize.js';
import User from './User.js';
import UserGroup from './UserGroup.js';

class UserGroupMember extends Model {
    public user_id!: number;
    public group_id!: number;
}

UserGroupMember.init(
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
        group_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'user_groups',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
    },
    {
        sequelize,
        tableName: 'user_group_members',
        modelName: 'UserGroupMember',
        timestamps: false,
    }
);

// Define associations
User.belongsToMany(UserGroup, { through: UserGroupMember, foreignKey: 'user_id', as: 'groups' });
UserGroup.belongsToMany(User, { through: UserGroupMember, foreignKey: 'group_id', as: 'users' });

export default UserGroupMember;
