/**
 * Model: DocumentSubmission
 * Bảng quản lý luồng Sổ Trình Ký Giáo Án (Q.DOC-style)
 * 
 * Workflow: Giáo Viên Upload → Trình ký → Tổ Trưởng duyệt / từ chối → Lưu hành
 */
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/sequelize.js';
import User from './User.js';

export interface DocumentSubmissionAttributes {
    id: number;
    title: string;
    description: string | null;
    category: string; // 'giao_an_thang' | 'ke_hoach_bai_day' | 'lich_bao_giang' | 'so_danh_gia' | 'khac'
    frequency: string; // '1 lần/tháng', '1 lần/tuần học'
    file_url: string | null;
    file_name: string | null;
    file_size: number; // bytes
    submitter_id: number;
    reviewer_id: number | null;
    status: 'draft' | 'submitted' | 'approved' | 'rejected';
    reviewer_comment: string | null;
    submitted_at: Date | null;
    reviewed_at: Date | null;
    web_content: string | null;  // New: storing rich text content from online editor
    created_at?: Date;
    updated_at?: Date;
}

export type DocumentSubmissionCreationAttributes = Optional<
    DocumentSubmissionAttributes,
    'id' | 'description' | 'reviewer_id' | 'status' | 'reviewer_comment' | 'submitted_at' | 'reviewed_at'
>;

class DocumentSubmission extends Model<DocumentSubmissionAttributes, DocumentSubmissionCreationAttributes> implements DocumentSubmissionAttributes {
    public id!: number;
    public title!: string;
    public description!: string | null;
    public category!: string;
    public frequency!: string;
    public file_url!: string;
    public file_name!: string;
    public file_size!: number;
    public submitter_id!: number;
    public reviewer_id!: number | null;
    public status!: 'draft' | 'submitted' | 'approved' | 'rejected';
    public reviewer_comment!: string | null;
    public submitted_at!: Date | null;
    public reviewed_at!: Date | null;
    public web_content!: string | null;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

DocumentSubmission.init(
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
        category: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: 'khac',
        },
        frequency: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: '1 lần/tháng',
        },
        file_url: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
        file_name: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        file_size: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        submitter_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'users', key: 'id' },
            onDelete: 'CASCADE',
        },
        reviewer_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { model: 'users', key: 'id' },
            onDelete: 'SET NULL',
        },
        status: {
            type: DataTypes.ENUM('draft', 'submitted', 'approved', 'rejected'),
            allowNull: false,
            defaultValue: 'draft',
        },
        reviewer_comment: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        submitted_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        reviewed_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        web_content: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'document_submissions',
        modelName: 'DocumentSubmission',
        indexes: [
            { fields: ['submitter_id'] },
            { fields: ['reviewer_id'] },
            { fields: ['status'] },
        ],
    }
);

// Associations
DocumentSubmission.belongsTo(User, { as: 'submitter', foreignKey: 'submitter_id' });
DocumentSubmission.belongsTo(User, { as: 'reviewer', foreignKey: 'reviewer_id' });
User.hasMany(DocumentSubmission, { as: 'submissions', foreignKey: 'submitter_id' });
User.hasMany(DocumentSubmission, { as: 'reviews', foreignKey: 'reviewer_id' });

export default DocumentSubmission;
