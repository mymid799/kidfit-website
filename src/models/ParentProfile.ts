/**
 * Model: ParentProfile
 * Bảng thông tin phụ huynh và trẻ em (tách riêng khỏi Users)
 *
 * Bảo mật dữ liệu trẻ em (theo chuẩn bảo mật thông tin trẻ em VN):
 *  - child_name_anonymous: Lưu tên bé dạng rút gọn, KHÔNG lưu họ tên đầy đủ
 *    Ví dụ: "Bé Minh" thay vì "Nguyễn Văn Minh"
 *  - Không lưu ngày sinh chính xác, chỉ lưu độ tuổi (child_age)
 *  - phone là optional, được validate đúng chuẩn VN
 */
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/sequelize.js';
import User from './User.js';

// ─── Kiểu dữ liệu đầy đủ ────────────────────────────────────────────────────
export interface ParentProfileAttributes {
    id: number;
    user_id: number;              // FK → users.id
    parent_name: string;          // Tên phụ huynh đầy đủ
    child_name_anonymous: string; // Tên bé ẩn danh (chỉ tên riêng)
    child_age: 3 | 4 | 5 | 6;    // Độ tuổi bé: 3, 4, 5, hoặc 6 tuổi
    class_name: string | null;    // Lớp học (e.g., 'Mầm A1')
    phone: string | null;         // Số điện thoại (optional)
    created_at?: Date;
    updated_at?: Date;
}

export type ParentProfileCreationAttributes = Optional<
    ParentProfileAttributes,
    'id' | 'phone' | 'class_name'
>;

class ParentProfile
    extends Model<ParentProfileAttributes, ParentProfileCreationAttributes>
    implements ParentProfileAttributes {
    public id!: number;
    public user_id!: number;
    public parent_name!: string;
    public child_name_anonymous!: string;
    public child_age!: 3 | 4 | 5 | 6;
    public class_name!: string | null;
    public phone!: string | null;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

ParentProfile.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true, // Mỗi user chỉ có 1 profile (1-to-1)
            references: {
                model: 'users',
                key: 'id',
            },
            onDelete: 'CASCADE', // Xoá user → xoá profile theo
        },
        parent_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                len: {
                    args: [2, 100],
                    msg: 'Tên phụ huynh phải từ 2–100 ký tự!',
                },
            },
        },
        child_name_anonymous: {
            type: DataTypes.STRING(50),
            allowNull: false,
            comment: 'Tên bé ẩn danh — chỉ lưu tên gọi, không lưu họ tên đầy đủ',
            validate: {
                len: {
                    args: [1, 50],
                    msg: 'Tên bé phải từ 1–50 ký tự!',
                },
            },
        },
        child_age: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: { args: [3], msg: 'Bé phải từ 3 tuổi trở lên!' },
                max: { args: [6], msg: 'Bé phải từ 6 tuổi trở xuống!' },
            },
        },
        class_name: {
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: null,
        },
        phone: {
            type: DataTypes.STRING(20),
            allowNull: true,
            defaultValue: null,
            validate: {
                /**
                 * Validate số điện thoại VN:
                 * - Bắt đầu bằng 03, 05, 07, 08, 09
                 * - Hoặc dạng quốc tế +84
                 */
                isVietnamPhone(value: string | null) {
                    if (!value) return; // optional → bỏ qua nếu trống
                    const regex = /^(\+84|0)(3[2-9]|5[6-9]|7[0|6-9]|8[0-9]|9[0-9])[0-9]{7}$/;
                    if (!regex.test(value)) {
                        throw new Error('Số điện thoại không đúng định dạng VN!');
                    }
                },
            },
        },
    },
    {
        sequelize,
        tableName: 'parent_profiles',
        modelName: 'ParentProfile',
        indexes: [
            { unique: true, fields: ['user_id'] }, // 1 user → 1 profile
        ],
    }
);

// ─── Thiết lập quan hệ (Association) ─────────────────────────────────────────
// User có một ParentProfile (hasOne)
User.hasOne(ParentProfile, {
    foreignKey: 'user_id',
    as: 'parentProfile',
    onDelete: 'CASCADE',
});

// ParentProfile thuộc về User (belongsTo)
ParentProfile.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user',
});

export default ParentProfile;
