import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../../core/config/database.js';

interface ToolAttributes {
    id: number;
    name: string;
    qr_code_uid: string;
    total_quantity: number;
    available_quantity: number;
    condition: 'NEW' | 'USED' | 'MAINTENANCE';
    class_id?: number | null; // Cấp phát cho lớp nào (IoT)
    ota_version?: string;     // Phiên bản phần mềm (IoT)
    notes: string;
    created_at?: Date;
    updated_at?: Date;
}

interface ToolCreationAttributes extends Optional<ToolAttributes, 'id' | 'condition' | 'notes' | 'created_at' | 'updated_at'> {}

class TeachingTool extends Model<ToolAttributes, ToolCreationAttributes> implements ToolAttributes {
    public id!: number;
    public name!: string;
    public qr_code_uid!: string;
    public total_quantity!: number;
    public available_quantity!: number;
    public condition!: 'NEW' | 'USED' | 'MAINTENANCE';
    public class_id?: number | null;
    public ota_version?: string;
    public notes!: string;

    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

TeachingTool.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        qr_code_uid: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        total_quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        available_quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        condition: {
            type: DataTypes.ENUM('NEW', 'USED', 'MAINTENANCE'),
            allowNull: false,
            defaultValue: 'NEW',
        },
        class_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { model: 'classes', key: 'id' }
        },
        ota_version: {
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: '1.0.0',
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'TeachingTool',
        tableName: 'teaching_tools',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

export default TeachingTool;
