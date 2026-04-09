# Kế hoạch chia nhỏ chức năng Tài khoản

Dựa trên yêu cầu và hình ảnh cung cấp, tôi sẽ thực hiện chia nhỏ chức năng **Tài khoản** thành 5 phần chính:

1.  **6.1 Khai báo nhóm người dùng**: Quản lý các nhóm (Admin, Giáo viên, Phụ huynh, v.v.)
2.  **6.2 Phân quyền cho nhóm**: Thiết lập các quyền hạn cụ thể cho từng nhóm.
3.  **6.3 Khai báo người dùng**: Chức năng quản lý tài khoản hiện tại.
4.  **6.4 Phân quyền người dùng**: Gán quyền trực tiếp cho từng cá nhân (nếu cần ghi đè quyền của nhóm).
5.  **6.5 Lịch sử truy cập**: Theo dõi nhật ký đăng nhập và các hành động quan trọng trên hệ thống.

## Các bước thực hiện dự kiến:

### Giai đoạn 1: Backend (Cơ sở dữ liệu & API)
- Tạo các bảng (Model) mới: `UserGroup`, `Permission`, `GroupPermission`, `AccessLog`.
- Xây dựng các API CRUD cho Nhóm và Quyền.
- Tích hợp ghi log vào các hành động quan trọng.

### Giai đoạn 2: Frontend (Giao diện Admin)
- Cập nhật Sidebar để hỗ trợ Menu đa cấp (Sub-menu).
- Tạo mới các Component giao diện cho 4 mục mới.
- Kết nối giao diện với các API vừa tạo.

Chi tiết kỹ thuật đã được trình bày trong [implementation_plan.md](file:///C:/Users/mymid/.gemini/antigravity/brain/44eca0da-0ab8-4dd6-8965-88d4d6180664/implementation_plan.md).
