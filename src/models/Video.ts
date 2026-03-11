import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/sequelize.js';
import User from './User.js';

export interface VideoAttributes {
    id: number;
    title: string;
    description: string | null;
    file_path: string;
    thumbnail_path: string | null;
    target_class: string; // 'Mầm', 'Chồi', 'Lá' or specific class names
    teacher_id: number;
    created_at?: Date;
    updated_at?: Date;
}

export type VideoCreationAttributes = Optional<VideoAttributes, 'id' | 'description' | 'thumbnail_path'>;

class Video extends Model<VideoAttributes, VideoCreationAttributes> implements VideoAttributes {
    public id!: number;
    public title!: string;
    public description!: string | null;
    public file_path!: string;
    public thumbnail_path!: string | null;
    public target_class!: string;
    public teacher_id!: number;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

Video.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        file_path: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        thumbnail_path: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        target_class: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        teacher_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        tableName: 'videos',
        modelName: 'Video',
        underscored: true,
    }
);

// Associations
Video.belongsTo(User, { foreignKey: 'teacher_id', as: 'teacher' });
User.hasMany(Video, { foreignKey: 'teacher_id', as: 'videos' });

export default Video;
