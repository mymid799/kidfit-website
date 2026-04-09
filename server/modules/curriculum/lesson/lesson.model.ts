import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../../core/config/database.js';

interface LessonAttributes {
    id: number;
    title: string;
    description: string;
    content_type: 'DOCUMENT' | 'VIDEO' | 'PDF' | 'AR';
    file_url: string;
    tags: string[];
    grade_block?: 'MẦM' | 'CHỒI' | 'LÁ' | 'ALL';
    creator_id?: number;
    status: 'DRAFT' | 'SUBMITTED' | 'VERIFIED' | 'APPROVED' | 'REJECTED';
    reviewer_id?: number | null;
    review_note?: string | null;
    digital_signature?: string | null; // Hash of content + secret for digital signing
    signed_at?: Date | null;           // Timestamp of approval signature
    version: number;                   // For tracking revisions
    is_active: boolean;
    created_at?: Date;
    updated_at?: Date;
}

interface LessonCreationAttributes extends Optional<LessonAttributes, 'id' | 'is_active' | 'created_at' | 'updated_at'> {}

class CurriculumLesson extends Model<LessonAttributes, LessonCreationAttributes> implements LessonAttributes {
    public id!: number;
    public title!: string;
    public description!: string;
    public content_type!: 'DOCUMENT' | 'VIDEO' | 'PDF' | 'AR';
    public file_url!: string;
    public tags!: string[];
    public grade_block?: 'MẦM' | 'CHỒI' | 'LÁ' | 'ALL';
    public creator_id?: number;
    public status!: 'DRAFT' | 'SUBMITTED' | 'VERIFIED' | 'APPROVED' | 'REJECTED';
    public reviewer_id?: number | null;
    public review_note?: string | null;
    public digital_signature?: string | null;
    public signed_at?: Date | null;
    public version!: number;
    public is_active!: boolean;

    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

CurriculumLesson.init(
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
        content_type: {
            type: DataTypes.ENUM('DOCUMENT', 'VIDEO', 'PDF', 'AR'),
            allowNull: false,
            defaultValue: 'DOCUMENT',
        },
        file_url: {
            type: DataTypes.STRING(1000),
            allowNull: true,
        },
        tags: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
            defaultValue: [],
        },
        grade_block: {
            type: DataTypes.ENUM('MẦM', 'CHỒI', 'LÁ', 'ALL'),
            allowNull: false,
            defaultValue: 'ALL',
        },
        creator_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { model: 'staff_profiles', key: 'id' }
        },
        status: {
            type: DataTypes.ENUM('DRAFT', 'SUBMITTED', 'VERIFIED', 'APPROVED', 'REJECTED'),
            allowNull: false,
            defaultValue: 'DRAFT',
        },
        reviewer_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { model: 'staff_profiles', key: 'id' }
        },
        review_note: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        digital_signature: {
            type: DataTypes.STRING(1000),
            allowNull: true,
        },
        signed_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        version: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },
    {
        sequelize,
        modelName: 'CurriculumLesson',
        tableName: 'curriculum_lessons',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        indexes: [
            // GIN Index for PostgreSQL Full-Text Search on Title & Description
            {
                name: 'lesson_search_idx',
                fields: ['title', 'description'],
                type: 'FULLTEXT' // Sequelize will map this nicely or fallback if not fully supported, but we will use iLike or native Postgres search
            }
        ]
    }
);

// Associations (Import inside if needed to avoid circular)
import StaffProfile from '../../user/staffProfile.model.js';
CurriculumLesson.belongsTo(StaffProfile, { as: 'creator', foreignKey: 'creator_id' });
CurriculumLesson.belongsTo(StaffProfile, { as: 'reviewer', foreignKey: 'reviewer_id' });

export default CurriculumLesson;
