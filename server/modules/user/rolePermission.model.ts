import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../core/config/database.js';

/**
 * Model: Permission
 * Lưu danh sách các quyền cơ bản (CO - Create, RE - Read, UP - Update, DE - Delete)
 * Ví dụ: 'user_management:CO', 'class_management:RE', v.v.
 */
interface PermissionAttributes {
    id: number;
    module_name: string; // Tên module: 'user', 'class', 'iot', 'lesson', 'report'
    action: 'C' | 'R' | 'U' | 'D'; // Create, Read, Update, Delete
    description?: string;
}

interface PermissionCreationAttributes extends Optional<PermissionAttributes, 'id' | 'description'> {}

class Permission extends Model<PermissionAttributes, PermissionCreationAttributes> implements PermissionAttributes {
    public id!: number;
    public module_name!: string;
    public action!: 'C' | 'R' | 'U' | 'D';
    public description?: string;
}

Permission.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    module_name: { type: DataTypes.STRING(50), allowNull: false },
    action: { type: DataTypes.ENUM('C', 'R', 'U', 'D'), allowNull: false },
    description: { type: DataTypes.STRING(255), allowNull: true }
}, {
    sequelize,
    modelName: 'Permission',
    tableName: 'permissions',
    timestamps: false,
    indexes: [{ unique: true, fields: ['module_name', 'action'] }]
});

/**
 * Model: Role
 * Đại diện cho các nhóm vai trò (it_admin, teacher, parent, student, specialist, principal)
 */
interface RoleAttributes {
    id: number;
    name: string; // it_admin, principal, specialist, class_teacher, parent, student
    display_name: string; // Hiệu trưởng, Giáo viên, v.v.
    description?: string;
}

interface RoleCreationAttributes extends Optional<RoleAttributes, 'id' | 'description'> {}

class Role extends Model<RoleAttributes, RoleCreationAttributes> implements RoleAttributes {
    public id!: number;
    public name!: string;
    public display_name!: string;
    public description?: string;
}

Role.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    display_name: { type: DataTypes.STRING(100), allowNull: false },
    description: { type: DataTypes.STRING(255), allowNull: true }
}, {
    sequelize,
    modelName: 'Role',
    tableName: 'roles',
    timestamps: false
});

/**
 * Model: RolePermission (Bảng trung gian n-n)
 */
class RolePermission extends Model {}
RolePermission.init({}, { sequelize, modelName: 'RolePermission', tableName: 'role_permissions', timestamps: false });

// Associations
Role.belongsToMany(Permission, { through: RolePermission, foreignKey: 'role_id', as: 'permissions' });
Permission.belongsToMany(Role, { through: RolePermission, foreignKey: 'permission_id', as: 'roles' });

export { Role, Permission, RolePermission };
