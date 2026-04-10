import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize.js';

class School extends Model {
    public id!: number;
    public tenant_id!: string;
    public name!: string;
}

School.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        tenant_id: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: 'schools',
        timestamps: true,
        underscored: true
    }
);

export default School;
