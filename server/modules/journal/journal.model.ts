import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../core/config/database.js';
// Note: Student and School models referenced here may need to be created
// For now, these are string references in Sequelize init
import User from '../user/user.model.js';

export interface JournalAttributes {
    id: number;
    tenant_id: string;
    student_id: number;
    teacher_id: number;
    content: string;
    images?: string[]; // Array of image URLs
    mood?: 'vui' | 'bình thường' | 'buồn' | 'hào hứng';
    date: Date;
    created_at?: Date;
    updated_at?: Date;
}

export type JournalCreationAttributes = Optional<JournalAttributes, 'id' | 'images' | 'mood'>;

class Journal extends Model<JournalAttributes, JournalCreationAttributes> implements JournalAttributes {
    public id!: number;
    public tenant_id!: string;
    public student_id!: number;
    public teacher_id!: number;
    public content!: string;
    public images?: string[];
    public mood?: 'vui' | 'bình thường' | 'buồn' | 'hào hứng';
    public date!: Date;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

Journal.init(
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
                model: 'schools',
                key: 'tenant_id',
            }
        },
        student_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'students',
                key: 'id',
            },
        },
        teacher_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        images: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        mood: {
            type: DataTypes.ENUM('vui', 'bình thường', 'buồn', 'hào hứng'),
            allowNull: true,
            defaultValue: 'vui',
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: 'journals',
        modelName: 'Journal',
        indexes: [
            { fields: ['tenant_id'] },
            { fields: ['student_id'] },
            { fields: ['date'] },
        ],
    }
);

// TODO: Re-enable when Student model is created in this module
// Student.hasMany(Journal, { foreignKey: 'student_id', as: 'journals' });
// Journal.belongsTo(Student, { foreignKey: 'student_id', as: 'student' });

User.hasMany(Journal, { foreignKey: 'teacher_id', as: 'journals' });
Journal.belongsTo(User, { foreignKey: 'teacher_id', as: 'teacher' });

export default Journal;
