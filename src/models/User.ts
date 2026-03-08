/**
 * Model: User
 * Bảng chính lưu thông tin xác thực (authentication)
 * Tách riêng với ParentProfile để giữ tính "separation of concerns"
 *
 * Bảo mật:
 *  - password_hash: KHÔNG bao giờ lưu plain text
 *  - username / email: ràng buộc UNIQUE ở cả ORM lẫn DB level
 *  - email_verified: chặn login nếu chưa xác thực email (optional, tuỳ flow)
 *  - login_attempts / locked_until: brute-force protection ở DB level
 */
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/sequelize.js';

// ─── Kiểu dữ liệu đầy đủ của 1 User record ───────────────────────────────────
export interface UserAttributes {
    id: number;
    username: string;
    email: string;
    password_hash: string;
    role: 'parent' | 'teacher' | 'admin' | 'student';
    email_verified: boolean;
    email_verify_token: string | null;
    login_attempts: number;
    locked_until: Date | null;
    is_active: boolean;
    created_at?: Date;
    updated_at?: Date;
}

// Khi CREATE: id là auto-increment nên không bắt buộc truyền vào
export type UserCreationAttributes = Optional<
    UserAttributes,
    'id' | 'email_verified' | 'email_verify_token' | 'login_attempts' | 'locked_until' | 'is_active'
>;

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public username!: string;
    public email!: string;
    public password_hash!: string;
    public role!: 'parent' | 'teacher' | 'admin' | 'student';
    public email_verified!: boolean;
    public email_verify_token!: string | null;
    public login_attempts!: number;
    public locked_until!: Date | null;
    public is_active!: boolean;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;

    /**
     * Kiểm tra tài khoản có bị khoá do brute-force không
     */
    public isLocked(): boolean {
        if (!this.locked_until) return false;
        return this.locked_until > new Date();
    }

    /**
     * Xoá thông tin nhạy cảm trước khi trả về client (response JSON)
     */
    public toSafeJSON() {
        const values = this.toJSON() as any;
        delete values.password_hash;
        delete values.email_verify_token;
        delete values.login_attempts;
        delete values.locked_until;
        return values;
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: {
                name: 'users_username_unique',
                msg: 'Username này đã được sử dụng!',
            },
            validate: {
                len: {
                    args: [3, 50],
                    msg: 'Username phải từ 3–50 ký tự!',
                },
                is: {
                    args: /^[a-zA-Z0-9_]+$/,
                    msg: 'Username chỉ được chứa chữ, số và dấu gạch dưới!',
                },
            },
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: {
                name: 'users_email_unique',
                msg: 'Email này đã được đăng ký!',
            },
            validate: {
                isEmail: {
                    msg: 'Email không đúng định dạng!',
                },
            },
        },
        password_hash: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('parent', 'teacher', 'admin', 'student'),
            allowNull: false,
            defaultValue: 'parent',
        },
        email_verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        email_verify_token: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: null,
        },
        login_attempts: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        locked_until: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        sequelize,
        tableName: 'users',
        modelName: 'User',
        indexes: [
            { unique: true, fields: ['username'] },
            { unique: true, fields: ['email'] },
            { fields: ['role'] },
        ],
    }
);

export default User;
