# 🎨 Vẽ Tư Duy STEAM - KidsFit Web Application

[![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20Node.js%20%7C%20PostgreSQL-blue)](https://github.com/mymid799/kidfit-website)
[![Database](https://img.shields.io/badge/Database-PostgreSQL%20(Docker)-elephant)](https://www.postgresql.org/)

Hệ thống quản lý giáo dục và học tập trực tuyến dành cho trẻ em từ 3-6 tuổi, tập trung vào phát triển tư duy sáng tạo thông qua phương pháp STEAM và Vẽ tư duy (Mind Mapping).

---

## 🚀 Tính Năng Chính

- **Hệ thống Authentication Bảo mật**: Đăng ký, Đăng nhập với JWT, mã hóa mật khẩu bcrypt, chống Brute-force.
- **Quản lý Người dùng (Admin)**: 
  - Quản lý danh sách tài khoản đồng bộ trực tiếp với PostgreSQL.
  - Cấp quyền (Role): Admin, Giáo viên, Phụ huynh, Học sinh.
  - Tạo tài khoản giáo viên nhanh chóng.
  - Khoá/Mở khoá tài khoản trực tiếp trên giao diện Admin.
- **Dữ liệu Trẻ em**: Bảo mật thông tin trẻ em theo chuẩn ẩn danh, chỉ lưu trữ độ tuổi phục vụ giáo dục.
- **Giao diện STEAM**: Thiết kế hiện đại, nhiều hiệu ứng micro-animation, thân thiện với trẻ em và phụ huynh.

---

## 🛠️ Yêu Cầu Hệ Thống (Prerequisites)

Để cài đặt và chạy dự án này dưới máy local, bạn cần:
- **Node.js** (v18.x trở lên)
- **Docker Desktop** (Để chạy PostgreSQL & pgAdmin)
- **npm** hoặc **yarn**

---

## 📦 Hướng Dẫn Cài Đặt (Installation)

1. **Clone dự án**:
   ```bash
   git clone https://github.com/mymid799/kidfit-website.git
   cd kidfit-website
   ```

2. **Cài đặt thư viện**:
   ```bash
   npm install
   ```

3. **Cấu hình môi trường (`.env`)**:
   Tạo file `.env` tại thư mục gốc và sao chép nội dung sau:
   ```env
   # Database (Docker)
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=kidfit_user
   DB_PASSWORD=kidfit_password
   DB_NAME=kidfit_db

   # Server
   API_PORT=3001
   JWT_SECRET=your_strong_secret_key
   JWT_EXPIRE=7d

   # App
   NODE_ENV=development
   ```

---

## 🗄️ Thiết Lập Database (Docker)

Dự án sử dụng Docker để quản lý Database nhằm đảm bảo tính đồng nhất giữa các máy của dev.

1. **Khởi động Container**:
   ```bash
   docker-compose up -d
   ```
   *Lệnh này sẽ tạo:*
   - **PostgreSQL**: Cổng `5432` (Lưu trữ dữ liệu).
   - **pgAdmin 4**: Cổng `5051` (Giao diện quản lý DB).

2. **Quản lý dữ liệu qua Trình duyệt**:
   - Truy cập: [http://localhost:5051](http://localhost:5051)
   - Đăng nhập pgAdmin: Email `admin@kidfit.com` | Pass `admin`
   - Tạo kết nối tới Server: Host `kidfit_postgres` | User `kidfit_user` | Pass `kidfit_password`.

---

## ▶️ Chạy Ứng Dụng

Sau khi DB đã Online, chạy lệnh sau để khởi động đồng thời cả Frontend và Backend:

```bash
npm run dev:all
```

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:3001](http://localhost:3001)

---

## 🔒 Hướng Dẫn Cấp Quyền Admin (Cho Dev)

Mặc định khi bạn đăng ký qua trang web, tài khoản sẽ có role là `parent`. Để truy cập được vào **Admin Dashboard**, bạn cần đổi role sang `admin` trong Database:

1. Mở Terminal và truy cập vào PostgreSQL container:
   ```bash
   docker exec -it kidfit_postgres psql -U kidfit_user -d kidfit_db
   ```
2. Chạy lệnh SQL để cập quyền:
   ```sql
   UPDATE users SET role = 'admin' WHERE username = 'tên_của_bạn';
   ```

---

## 🤝 Đóng Góp (Contributing)

1. Tạo nhánh mới (`git checkout -b feature/NewFeature`)
2. Commit thay đổi (`git commit -m 'Add some NewFeature'`)
3. Push lên nhánh (`git push origin feature/NewFeature`)
4. Tạo Pull Request.

---

© 2024 **KidsFit Education**. Tất cả quyền được bảo lưu.
