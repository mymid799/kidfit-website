import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/sequelize.js';

export interface UserGroupAttributes {
    id: number;
    name: string;
    description: string | null;
    created_at?: Date;
    updated_at?: Date;
}

export type UserGroupCreationAttributes = Optional<UserGroupAttributes, 'id' | 'description'>;

class UserGroup extends Model<UserGroupAttributes, UserGroupCreationAttributes> implements UserGroupAttributes {
    public id!: number;
    public name!: string;
    public description!: string | null;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

UserGroup.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
            },
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'user_groups',
        modelName: 'UserGroup',
    }
);

export default UserGroup;
