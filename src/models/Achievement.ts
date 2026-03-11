import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/sequelize.js';
import Student from './Student.js';
import School from './School.js';

export interface AchievementAttributes {
    id: number;
    tenant_id: string;
    student_id: number;
    title: string;
    description?: string;
    type: 'học tập' | 'rèn luyện' | 'sáng tạo' | 'thể chất';
    badge_icon?: string;
    earned_date: Date;
    created_at?: Date;
    updated_at?: Date;
}

export type AchievementCreationAttributes = Optional<AchievementAttributes, 'id' | 'description' | 'badge_icon'>;

class Achievement extends Model<AchievementAttributes, AchievementCreationAttributes> implements AchievementAttributes {
    public id!: number;
    public tenant_id!: string;
    public student_id!: number;
    public title!: string;
    public description?: string;
    public type!: 'học tập' | 'rèn luyện' | 'sáng tạo' | 'thể chất';
    public badge_icon?: string;
    public earned_date!: Date;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

Achievement.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        tenant_id: {
            type: DataTypes.STRING(50),
            allowNull: false,
            references: {
                model: School,
                key: 'tenant_id',
            }
        },
        student_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Student,
                key: 'id',
            },
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        type: {
            type: DataTypes.ENUM('học tập', 'rèn luyện', 'sáng tạo', 'thể chất'),
            allowNull: false,
            defaultValue: 'học tập',
        },
        badge_icon: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        earned_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: 'achievements',
        modelName: 'Achievement',
        indexes: [
            { fields: ['tenant_id'] },
            { fields: ['student_id'] },
            { fields: ['type'] },
        ],
    }
);

Student.hasMany(Achievement, { foreignKey: 'student_id', as: 'achievements' });
Achievement.belongsTo(Student, { foreignKey: 'student_id', as: 'student' });

export default Achievement;
