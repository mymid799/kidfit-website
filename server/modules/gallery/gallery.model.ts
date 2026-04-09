import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../core/config/database.js';
import User from '../user/user.model.js';

export interface GalleryAttributes {
    id: number;
    title: string;
    description: string | null;
    file_path: string;
    module: string | null;
    lesson: string | null;
    target_class: string;
    date: Date | null;
    teacher_id: number;
    has_video: boolean;
    created_at?: Date;
    updated_at?: Date;
}

export type GalleryCreationAttributes = Optional<GalleryAttributes, 'id' | 'description' | 'module' | 'lesson' | 'date' | 'has_video'>;

class Gallery extends Model<GalleryAttributes, GalleryCreationAttributes> implements GalleryAttributes {
    public id!: number;
    public title!: string;
    public description!: string | null;
    public file_path!: string;
    public module!: string | null;
    public lesson!: string | null;
    public target_class!: string;
    public date!: Date | null;
    public teacher_id!: number;
    public has_video!: boolean;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

Gallery.init(
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
        module: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        lesson: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        target_class: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        teacher_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        has_video: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        sequelize,
        tableName: 'galleries',
        modelName: 'Gallery',
        underscored: true,
    }
);

// Associations
Gallery.belongsTo(User, { foreignKey: 'teacher_id', as: 'teacher' });
User.hasMany(Gallery, { foreignKey: 'teacher_id', as: 'galleries' });

export default Gallery;
