import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize.js';
import User from './User.js';

class Student extends Model {
    public id!: number;
    public userId!: number; // Parent's user ID
    public fullName!: string;
    public dob!: Date;
    public gender!: 'male' | 'female' | 'other';
}

Student.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'user_id',
            references: {
                model: User,
                key: 'id'
            }
        },
        fullName: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'full_name'
        },
        dob: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        gender: {
            type: DataTypes.ENUM('male', 'female', 'other'),
            allowNull: true
        }
    },
    {
        sequelize,
        tableName: 'students',
        timestamps: true,
        underscored: true
    }
);

User.hasMany(Student, { foreignKey: 'userId', as: 'children' });
Student.belongsTo(User, { foreignKey: 'userId', as: 'parent' });

export default Student;
