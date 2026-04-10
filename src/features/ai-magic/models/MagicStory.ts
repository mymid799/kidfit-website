import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../config/sequelize.js';
import User from '../../../models/User.js';
import Student from '../../../models/Student.js';
import Journal from '../../../models/Journal.js';

class MagicStory extends Model {
    public id!: number;
    public userId!: number;
    public studentId!: number | null;
    public journalId!: number | null;
    public originalImageUrl!: string;
    public aiImageUrl!: string | null;
    public videoUrl!: string | null;
    public audioUrl!: string | null;
    public aiStoryText!: string | null;
    public title!: string;
    public videoTaskId!: string | null;
    public videoStatus!: 'none' | 'pending' | 'processing' | 'completed' | 'failed';
    public pipelineStep!: string;         // Bước pipeline hiện tại
    public storyMeta!: object | null;     // Từ vựng, bài học, phân loại
    public errorMessage!: string | null;  // Thông báo lỗi (nếu có)
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

MagicStory.init(
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
            references: { model: User, key: 'id' }
        },
        studentId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'student_id',
            references: { model: Student, key: 'id' }
        },
        journalId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'journal_id',
            references: { model: Journal, key: 'id' }
        },
        originalImageUrl: {
            type: DataTypes.STRING(1000),
            allowNull: false,
            field: 'original_image_url'
        },
        aiImageUrl: {
            type: DataTypes.STRING(1000),
            allowNull: true,
            field: 'ai_image_url'
        },
        videoUrl: {
            type: DataTypes.STRING(1000),
            allowNull: true,
            field: 'video_url'
        },
        audioUrl: {
            type: DataTypes.STRING(1000),
            allowNull: true,
            field: 'audio_url'
        },
        aiStoryText: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'ai_story_text'
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        videoTaskId: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'video_task_id'
        },
        videoStatus: {
            type: DataTypes.ENUM('none', 'pending', 'processing', 'completed', 'failed'),
            allowNull: false,
            defaultValue: 'none',
            field: 'video_status'
        },
        pipelineStep: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: 'queued',
            field: 'pipeline_step'
        },
        storyMeta: {
            type: DataTypes.JSONB,
            allowNull: true,
            field: 'story_meta',
            defaultValue: null
        },
        errorMessage: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'error_message'
        }
    },
    {
        sequelize,
        tableName: 'magic_stories',
        timestamps: true,
        underscored: true
    }
);

User.hasMany(MagicStory, { foreignKey: 'userId' });
MagicStory.belongsTo(User, { foreignKey: 'userId' });

Student.hasMany(MagicStory, { foreignKey: 'studentId' });
MagicStory.belongsTo(Student, { foreignKey: 'studentId' });

Journal.hasMany(MagicStory, { foreignKey: 'journalId' });
MagicStory.belongsTo(Journal, { foreignKey: 'journalId' });

export default MagicStory;
