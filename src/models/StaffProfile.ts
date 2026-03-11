import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/sequelize.js';
import User from './User.js';

export interface StaffProfileAttributes {
    id: number;
    user_id: number;
    employee_id: string;
    full_name: string;
    avatar_url?: string;
    class_group?: string; // e.g., Mầm Chồi 1
    position: string;     // e.g., Giáo viên chính, Bảo mẫu, Kế toán
    qualification?: string; // e.g., Đại học Sư phạm
    status: 'active' | 'on_leave' | 'suspended'; // Đang làm việc, Nghỉ phép, Đình chỉ
    phone?: string;
    bio?: string;                  // Short introduction
    teaching_classes?: string[];   // e.g., ["Mầm", "Chồi"]
    certificates?: any[];          // JSON array of certificates
    created_at?: Date;
    updated_at?: Date;
}

export type StaffProfileCreationAttributes = Optional<StaffProfileAttributes, 'id' | 'avatar_url' | 'class_group' | 'qualification' | 'phone' | 'bio' | 'teaching_classes' | 'certificates'>;

class StaffProfile extends Model<StaffProfileAttributes, StaffProfileCreationAttributes> implements StaffProfileAttributes {
    public id!: number;
    public user_id!: number;
    public employee_id!: string;
    public full_name!: string;
    public avatar_url?: string;
    public class_group?: string;
    public position!: string;
    public qualification?: string;
    public status!: 'active' | 'on_leave' | 'suspended';
    public phone?: string;
    public bio?: string;
    public teaching_classes?: string[];
    public certificates?: any[];
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

StaffProfile.init(
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
        employee_id: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        },
        full_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        avatar_url: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        class_group: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        position: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        qualification: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM('active', 'on_leave', 'suspended'),
            defaultValue: 'active',
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        bio: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        teaching_classes: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        certificates: {
            type: DataTypes.JSON,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'staff_profiles',
        modelName: 'StaffProfile',
    }
);

// Define associations
User.hasOne(StaffProfile, { foreignKey: 'user_id', as: 'staffProfile' });
StaffProfile.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

export default StaffProfile;
