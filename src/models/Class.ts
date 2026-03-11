import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/sequelize.js';
import StaffProfile from './StaffProfile.js';

export interface ClassAttributes {
    id: number;
    name: string;
    code: string;
    room: string;
    teacher_id?: number | null;
    capacity: number;
    status: 'upcoming' | 'active' | 'finished';
    icon: string;
    color: string;
    grad: string;
    created_at?: Date;
    updated_at?: Date;
}

export type ClassCreationAttributes = Optional<
    ClassAttributes,
    'id' | 'teacher_id' | 'status' | 'icon' | 'color' | 'grad' | 'capacity'
>;

class Class extends Model<ClassAttributes, ClassCreationAttributes> implements ClassAttributes {
    public id!: number;
    public name!: string;
    public code!: string;
    public room!: string;
    public teacher_id?: number | null;
    public capacity!: number;
    public status!: 'upcoming' | 'active' | 'finished';
    public icon!: string;
    public color!: string;
    public grad!: string;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

Class.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        code: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        room: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        teacher_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: StaffProfile,
                key: 'id',
            },
            onDelete: 'SET NULL',
        },
        capacity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 20,
        },
        status: {
            type: DataTypes.ENUM('upcoming', 'active', 'finished'),
            defaultValue: 'active',
            allowNull: false,
        },
        icon: {
            type: DataTypes.STRING(50),
            defaultValue: 'child_care',
        },
        color: {
            type: DataTypes.STRING(50),
            defaultValue: 'bg-primary/20 text-primary',
        },
        grad: {
            type: DataTypes.STRING(100),
            defaultValue: 'from-primary/10 to-primary/30',
        },
    },
    {
        sequelize,
        tableName: 'classes',
        modelName: 'Class',
        timestamps: true,
        underscored: true,
    }
);

// Define associations
StaffProfile.hasMany(Class, { foreignKey: 'teacher_id', as: 'classes' });
Class.belongsTo(StaffProfile, { foreignKey: 'teacher_id', as: 'teacher' });

export default Class;
