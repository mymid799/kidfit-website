import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/sequelize.js';

export interface PermissionAttributes {
    id: number;
    code: string;
    description: string | null;
    created_at?: Date;
    updated_at?: Date;
}

export type PermissionCreationAttributes = Optional<PermissionAttributes, 'id' | 'description'>;

class Permission extends Model<PermissionAttributes, PermissionCreationAttributes> implements PermissionAttributes {
    public id!: number;
    public code!: string;
    public description!: string | null;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

Permission.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        code: {
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
        tableName: 'permissions',
        modelName: 'Permission',
    }
);

export default Permission;
