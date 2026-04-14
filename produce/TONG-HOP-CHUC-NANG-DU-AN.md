# 📋 TỔNG HỢP TOÀN BỘ CHỨC NĂNG — TRẠNG NGUYÊN KIDS 4.0

> **Dự án EXE101** — Đại học FPT Cần Thơ × Trường Mầm Non Sao Mai
> **Phiên bản báo cáo:** v2.0 — Ngày 13/04/2026
> **Nhóm thực hiện:** CreakTech (6 thành viên)

---

## MỤC LỤC

1. [Tổng Quan Hệ Thống](#1-tổng-quan-hệ-thống)
2. [Bản Đồ Routes & Trang Web](#2-bản-đồ-routes--trang-web)
3. [Chi Tiết Chức Năng Theo Vai Trò](#3-chi-tiết-chức-năng-theo-vai-trò)
4. [Tính Năng AI — Điểm Nhấn Gọi Vốn](#4-tính-năng-ai--điểm-nhấn-gọi-vốn)
5. [Hệ Thống Backend & API](#5-hệ-thống-backend--api)
6. [Database Schema & Models](#6-database-schema--models)
7. [Kiến Trúc Kỹ Thuật](#7-kiến-trúc-kỹ-thuật)
8. [Pitch Deck — Điểm Bán Cho Nhà Đầu Tư](#8-pitch-deck--điểm-bán-cho-nhà-đầu-tư)
9. [Thống Kê Quy Mô Dự Án](#9-thống-kê-quy-mô-dự-án)

---

## 1. TỔNG QUAN HỆ THỐNG

### 🎯 Tầm nhìn
**"Hệ Điều Hành Quản Trị Giáo Dục Mầm Non Thế Hệ Mới"** — Nền tảng EdTech Multi-tenant SaaS tích hợp AI sâu, phục vụ 3 nhóm đối tượng: **Nhà trường (B2B)**, **Giáo viên**, và **Phụ huynh + Trẻ em (B2C)**.

### 🏗️ Kiến trúc tổng thể

```
┌──────────────────────────────────────────────────────────────────┐
│                    TRẠNG NGUYÊN KIDS 4.0                         │
│              Hệ Sinh Thái EdTech Toàn Diện                      │
├──────────────┬──────────────┬──────────────┬────────────────────┤
│  🌐 Landing  │  👩‍🏫 Teacher  │  👨‍👩‍👦 Parent  │  🛡️ Admin          │
│    Page      │  Dashboard   │  Community   │  Dashboard         │
├──────────────┴──────────────┴──────────────┴────────────────────┤
│                    🤖 AI ENGINE LAYER                            │
│  ┌──────────┐ ┌───────────────┐ ┌──────────────┐               │
│  │AI Magic  │ │AI Lesson      │ │Drawing       │               │
│  │Story     │ │Planner        │ │Explorer 3D   │               │
│  │(Gemini)  │ │(Gemini)       │ │(Gemini       │               │
│  │          │ │               │ │Vision+Three) │               │
│  └──────────┘ └───────────────┘ └──────────────┘               │
├─────────────────────────────────────────────────────────────────┤
│              🗄️ BACKEND: Node.js + Express + PostgreSQL         │
│              🔐 JWT Auth + RBAC (4 roles)                       │
│              📊 Sequelize ORM + 15 Models                       │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. BẢN ĐỒ ROUTES & TRANG WEB

### 🗺️ Toàn bộ 10 routes đã triển khai:

| # | Route | Trang | Vai Trò | Mức Độ Hoàn Thiện |
|---|---|---|---|---|
| 1 | `/` | Landing Page (Trang chủ) | Public | ✅ 100% |
| 2 | `/login` | Đăng nhập | Public | ✅ 100% |
| 3 | `/register` | Đăng ký tài khoản | Public | ✅ 100% |
| 4 | `/teacher` | Teacher Dashboard | Teacher | ✅ 100% |
| 5 | `/parent` | Parent Community | Parent | ✅ 100% |
| 6 | `/gallery` | Kids Gallery (triển lãm) | Public | ✅ 100% |
| 7 | `/dashboard` | Admin Dashboard | Admin | ✅ 100% |
| 8 | `/teacher/document-editor` | Trình soạn giáo án | Teacher | ✅ 100% |
| 9 | `/teacher/document-editor/:id` | Chỉnh sửa giáo án cụ thể | Teacher | ✅ 100% |
| 10 | `/ai` | Trang giới thiệu AI | Public | ✅ 100% |

---

## 3. CHI TIẾT CHỨC NĂNG THEO VAI TRÒ

---

### 🌐 A. LANDING PAGE (`/`)
**Mục đích:** Trang giới thiệu dự án, thu hút nhà đầu tư & người dùng

| # | Chức năng | Mô tả chi tiết | Công nghệ |
|---|---|---|---|
| A1 | **Hero Section 3D** | Cảnh 3D tương tác với Three.js, hiệu ứng floating shapes, video intro tự động | React Three Fiber, Three.js |
| A2 | **Video giới thiệu** | Video MP4 nhúng trực tiếp, điều khiển âm thanh bằng phím 0/1 | HTML5 Video |
| A3 | **Scroll Animations** | Hiệu ứng xuất hiện khi cuộn: fadeIn, scaleIn, 3D perspective | Custom Hook `useScrollAnimation` |
| A4 | **Hệ Sinh Thái EdTech** (6 cards) | Giới thiệu 6 giải pháp: Quản trị B2B, AI Copilot, Edu-Analytics, Magic Story, Cổng PH, API mở rộng | React Components |
| A5 | **Thống kê ấn tượng** | 3+ Bảng điều khiển, 40+ Tính năng, 6 Thành viên, AI Gemini tích hợp | Animated counters |
| A6 | **Đội ngũ sáng lập** | Profile 6 thành viên với ảnh thật, vai trò, mô tả, hiệu ứng 3D tilt | CSS 3D Transform |
| A7 | **Footer đa cột** | Liên kết, thông tin liên hệ, chính sách, branding | Responsive Grid |
| A8 | **Navigation sticky** | Header blur, link tới các section, nút đăng nhập/CTA | Backdrop-blur |
| A9 | **Link Fanpage Facebook** | Nút "Tìm Hiểu Thêm" dẫn tới trang Facebook chính thức | External Link |
| A10 | **Dark/Light Themes** | Trang AI dùng dark mode, Landing dùng light mode | CSS Variables |

---

### 🤖 B. TRANG AI (`/ai`)
**Mục đích:** Showcase sức mạnh AI cho nhà đầu tư và người dùng

| # | Chức năng | Mô tả chi tiết |
|---|---|---|
| B1 | **AI Magic Story Showcase** | Hero section với demo 3D render, terminal overlay simulation, hiệu ứng neon glow |
| B2 | **AI Lesson Planner Showcase** | Demo giao diện AI soạn giáo án, skeleton UI, terminal animation |
| B3 | **Bento Grid Statistics** | Thống kê ấn tượng: 98% trẻ hào hứng, 10 giây/ý tưởng, 10K+ users |
| B4 | **Dark Mode Premium** | Giao diện tối hoàn toàn, glassmorphism (glass-card), gradient glow |
| B5 | **CTA Buttons** | Nút "Thử ngay miễn phí", "Khám phá thư viện" dẫn tới đăng nhập |

---

### 👩‍🏫 C. TEACHER DASHBOARD (`/teacher`)
**Mục đích:** Workspace toàn diện cho giáo viên mầm non

#### 📊 C1. Tổng Quan Lớp Học (`overview`)
| Chức năng | Mô tả |
|---|---|
| Dashboard Statistics | 5 thẻ thống kê: Tổng trẻ, Có mặt, Nghỉ, Hoạt động hiện tại, Sự kiện |
| Điểm danh nhanh | Bảng điểm danh trực quan: Avatar, tên, trạng thái, giờ check-in |
| Biểu đồ chuyên cần | Bar chart theo dõi tỉ lệ đi học trong tuần |
| Lịch trình hôm nay | Timeline hoạt động: Đón trẻ → Vẽ tư duy → Chơi ngoài → Ăn → Ngủ |
| Chủ đề tuần | Card hiển thị chủ đề đang dạy với tài liệu liên kết |

#### 📋 C2. Điểm Danh (`attendance`)
| Chức năng | Mô tả |
|---|---|
| Điểm danh điện tử | Check-in/out từng trẻ, ghi nhận giờ đến/về |
| Lịch sử điểm danh | Tra cứu theo ngày, tuần, tháng |
| Báo cáo chuyên cần | Thống kê tỷ lệ đi học, cảnh báo nghỉ nhiều |
| Export dữ liệu | Xuất báo cáo điểm danh |

#### 👦 C3. Quản Lý Trẻ (`students`)
| Chức năng | Mô tả |
|---|---|
| Danh sách học sinh | Bảng quản lý toàn bộ trẻ trong lớp |
| Hồ sơ cá nhân | Thông tin chi tiết: Tên, tuổi, phụ huynh, sức khỏe |
| Tìm kiếm & Lọc | Tìm theo tên, lọc theo trạng thái |

#### 📚 C4. Kế Hoạch Bài Giảng — AI Lesson Planner (`lessons-plan`)
| Chức năng | Mô tả |
|---|---|
| **⚡ AI Auto-Generate** | **Nhập chủ đề → AI Gemini sinh giáo án STEAM hoàn chỉnh trong 30 giây** |
| Form thiết kế nhanh | Chủ đề, Độ tuổi (3-4, 4-5, 5-6), Thời lượng (30/45/60 phút), Số hoạt động |
| Tải tài liệu PDF/Ảnh | Upload file đính kèm để AI phân tích và tích hợp |
| Dashboard thống kê | 4 cards: Bài giảng hôm nay, Tuần này, Tổng bài giảng, Chủ đề hiện tại |
| Lịch giảng dạy | Calendar mini hiển thị lịch dạy 2 tuần |
| **Output AI:** | |
| → Mục tiêu bài học | 3 mục tiêu: Kiến thức, Kỹ năng, Thái độ (phân màu) |
| → Hoạt động STEAM | Các bước giảng dạy chi tiết, đánh số thứ tự, có mô tả |
| → Câu chuyện dẫn dắt | Nội dung story AI tạo ra để dẫn dắt bài giảng |
| → Câu hỏi tương tác | Danh sách câu hỏi gợi mở cho trẻ |
| Thư viện bài giảng | Grid 3 cột: Cards bài giảng đã lưu, filter theo chủ đề/tháng |
| Lưu & Download | Lưu giáo trình, tải xuống PDF |

#### 📄 C5. Sổ Trình Ký Giáo Án (`document-repository`)
| Chức năng | Mô tả |
|---|---|
| Repository giáo án | Kho lưu trữ toàn bộ giáo án đã nộp/phê duyệt |
| Upload giáo án | Tải lên file giáo án (Word/PDF) |
| Quy trình phê duyệt | Luồng trình ký: Nộp → Chờ duyệt → Đã duyệt/Từ chối |
| Rich Text Editor | Soạn thảo giáo án trực tuyến (React Quill) |
| Phân loại & Lọc | Lọc theo trạng thái, ngày, chủ đề |

#### 📝 C6. Nhật Ký Hoạt Động (`journal`)
| Chức năng | Mô tả |
|---|---|
| Ghi nhật ký lớp | Ghi chép hoạt động lớp học hàng ngày |
| Timeline view | Xem theo dòng thời gian |
| Đính kèm media | Gắn ảnh/video vào nhật ký |

#### 🖼️ C7. Thư Viện Media (`media`)
| Chức năng | Mô tả |
|---|---|
| Upload media | Tải lên ảnh, video hoạt động |
| Gallery view | Xem grid ảnh/video |
| Phân loại | Sắp xếp theo ngày, sự kiện |

#### 💬 C8. Tin Nhắn (`messages`)
| Chức năng | Mô tả |
|---|---|
| Chat trực tiếp | Nhắn tin với phụ huynh, đồng nghiệp |
| Lịch sử tin nhắn | Tra cứu lịch sử cuộc trò chuyện |
| Thông báo mới | Badge số tin nhắn chưa đọc |

#### 🔔 C9. Thông Báo Phụ Huynh (`notifications`)
| Chức năng | Mô tả |
|---|---|
| Gửi thông báo | Soạn và gửi thông báo tới phụ huynh |
| Template có sẵn | Mẫu thông báo: Nghỉ học, Sự kiện, Học phí |
| Lịch sử gửi | Theo dõi danh sách thông báo đã gửi |

#### 🤖 C10. Cỗ Máy Kể Chuyện AI (`ai-storyboard`)
| Chức năng | Mô tả |
|---|---|
| **⚡ Upload tranh → AI sinh phim** | **Bé vẽ tranh → Upload → AI tạo 5 cảnh phim 3D Pixar** |
| Storyboard Player | Cinematic player: Chuyển cảnh, nút play/pause, indicators |
| AI Narrator tiếng Việt | Text-to-Speech đọc câu chuyện bằng giọng Việt |
| Narrator đa ngữ | Chuyển đổi Tiếng Việt ↔ English |
| Nhạc nền | Background music toggle |
| Demo mode | Xem demo không cần API key |
| Privacy badge | Tranh ẩn danh, xóa sau 24h |
| Cảm hứng sáng tạo | Gallery 4 tác phẩm mẫu từ trẻ khác |

#### 🎨 C11. Drawing Explorer 3D (`ar-explorer`)
| Chức năng | Mô tả |
|---|---|
| **⚡ Vẽ → AI nhận diện → 3D Model** | **Upload bức vẽ → Gemini Vision phân tích → Render mô hình GLB 3D** |
| Gemini Vision AI | AI nhận diện chủ đề bức vẽ (28 chủ đề) |
| Chấm điểm 0-100 | Đánh giá accuracy → hiển thị 1-5 sao |
| Nhận xét tiếng Việt | 4 cards: Giỏi lắm, Thử thách nhỏ, Bạn có biết?, Tưởng tượng nào! |
| 3D Model Viewer | Three.js Canvas: GLB model auto-rotate + bức vẽ của trẻ dạng 3D card |
| Camera capture | Modal chụp ảnh trực tiếp từ camera |
| 28 chủ đề vẽ | Mèo, Chó, Thỏ, Cá, Khủng long, Rồng, Ngựa... (52 GLB models) |
| Fullscreen mode | Xem 3D toàn màn hình |
| OrbitControls | Xoay, zoom, kéo thả mô hình 3D |

#### ⚙️ C12. Các Chức Năng Hệ Thống
| Chức năng | Mô tả |
|---|---|
| Profile cá nhân | Cập nhật thông tin, avatar giáo viên |
| Theme chủ đề tuần | Card hiển thị chủ đề STEAM tuần (ví dụ: "Thế giới nước") |
| Nâng cấp Pro | Card upsell tính năng premium |
| Đăng xuất | Clear token, redirect về trang chủ |
| Responsive Sidebar | Mobile: hamburger menu, desktop: sidebar cố định |
| Tìm kiếm | Thanh search học sinh, tài liệu |

---

### 👨‍👩‍👦 D. PARENT COMMUNITY (`/parent`)
**Mục đích:** Cổng thông tin toàn diện cho phụ huynh

| # | Tab | Chức năng | Mô tả chi tiết |
|---|---|---|---|
| D1 | `overview` | **Tổng quan** | Dashboard tổng hợp: Thông tin bé, lịch hoạt động, thông báo mới nhất |
| D2 | `ecomission` | **Hành Trình Xanh** | Eco Mission gamification: Nhiệm vụ môi trường, thử thách xanh, phần thưởng |
| D3 | `journal` | **Nhật ký hoạt động** | Xem nhật ký hoạt động hàng ngày của bé tại trường |
| D4 | `gallery` | **Ảnh/Video** | Gallery ảnh, video hoạt động của bé tại trường |
| D5 | `attendance` | **Điểm danh** | Xem lịch sử đi học, giờ check-in/out của bé |
| D6 | `menu` | **Thực đơn** | Thực đơn ăn uống hàng ngày/tuần tại trường |
| D7 | `health` | **Sức khỏe** | Theo dõi chiều cao, cân nặng, lịch tiêm chủng, ghi chú y tế |
| D8 | `fees` | **Học phí** | Quản lý công nợ, lịch sử thanh toán, hóa đơn |
| D9 | `messages` | **Tin nhắn** | Chat trực tiếp với giáo viên chủ nhiệm |
| D10 | `notifications` | **Thông báo** | Nhận thông báo từ trường: Sự kiện, nghỉ lễ, học phí |
| D11 | `community` | **Cộng đồng** | Diễn đàn phụ huynh, chia sẻ kinh nghiệm nuôi dạy |
| D12 | `profile` | **Hồ sơ cá nhân** | Cập nhật thông tin phụ huynh, thông tin bé |
| D13 | `library` | **Thư viện Video** | Video bài giảng, hoạt động cho phụ huynh tham khảo |

---

### 🛡️ E. ADMIN DASHBOARD (`/dashboard`)
**Mục đích:** Quản trị toàn diện hệ thống nhà trường

| # | Tab | Chức năng | Mô tả chi tiết |
|---|---|---|---|
| E1 | `overview` | **Tổng quan hệ thống** | 5 KPI cards: Tổng học sinh (1,280), Giáo viên (86), Lớp học (42), Điểm danh (94%), Doanh thu (450M) |
| E2 | `overview` | **Biểu đồ thống kê** | Bar chart: Học sinh đăng ký 6 tháng qua, Số lượng theo lớp |
| E3 | `overview` | **Tổng quan lớp học** | Bảng: Tên lớp, GVCN, Tổng HS, Tỷ lệ đi học |
| E4 | `overview` | **Học sinh mới** | Bảng đăng ký gần đây: Tên, Lớp, Ngày, Trạng thái |
| E5 | `accounts` | **Quản lý người dùng** | CRUD đầy đủ: Tạo/Sửa/Khóa/Xóa tài khoản, filter theo vai trò & trạng thái |
| E6 | `accounts` | **Stats Bento Grid** | 3 cards: Tổng user, Đang hoạt động, Tài khoản bị khóa |
| E7 | `accounts` | **Search & Filter** | Tìm theo tên/email, lọc vai trò (Admin/Teacher/Parent/Student), lọc trạng thái |
| E8 | `accounts` | **Form tạo tài khoản** | Fields: Username, Họ tên, Email, Mật khẩu, SĐT, Vai trò, Nhóm phân quyền |
| E9 | `staff` | **Quản lý nhân sự** | Module quản lý nhân sự: Hồ sơ, vị trí, phòng ban |
| E10 | `groups` | **Quản lý nhóm** | UserGroup Manager: Tạo nhóm phân quyền dữ liệu |
| E11 | `permissions` | **Quản lý quyền** | Permission Manager: Định nghĩa permissions hệ thống |
| E12 | `user-permissions` | **Phân quyền người dùng** | Gán/Gỡ permission cho từng user cụ thể |
| E13 | `access-logs` | **Nhật ký truy cập** | Audit trail: Lịch sử đăng nhập, thao tác hệ thống |
| E14 | `settings` | **Cài đặt hệ thống** | System settings: Cấu hình trường, thông tin liên hệ, tùy chỉnh |

---

### 🔐 F. XÁC THỰC & BẢO MẬT

| # | Chức năng | Mô tả | Route |
|---|---|---|---|
| F1 | **Đăng ký** | Form đăng ký: Username, Email, Password, Chọn vai trò | `/register` |
| F2 | **Đăng nhập** | JWT Authentication, lưu token vào localStorage | `/login` |
| F3 | **Xác thực Email** | Gửi email verification qua Nodemailer, link xác nhận | Backend API |
| F4 | **RBAC 4 vai trò** | Admin, Teacher, Parent, Student — phân quyền API | Middleware |
| F5 | **Rate Limiting** | Giới hạn request/phút để chống abuse | express-rate-limit |
| F6 | **Password Hashing** | bcryptjs với salt 10 rounds | bcryptjs |

---

### 🖼️ G. KIDS GALLERY (`/gallery`)
| Chức năng | Mô tả |
|---|---|
| Triển lãm sáng tạo | Gallery hiển thị tác phẩm nghệ thuật của trẻ |
| Upload artwork | Giáo viên/phụ huynh upload tranh vẽ |
| Like & Share | Tương tác xã hội trên tác phẩm |

---

## 4. TÍNH NĂNG AI — ĐIỂM NHẤN GỌI VỐN

### 🌟 Tổng quan 3 Engine AI đang hoạt động:

```
┌─────────────────────────────────────────────────────────────┐
│                    AI ENGINE LAYER                           │
│                                                             │
│  ┌──────────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  🎬 AI MAGIC     │  │  📚 AI LESSON│  │  🎨 DRAWING  │  │
│  │  STORY MACHINE   │  │  PLANNER     │  │  EXPLORER 3D │  │
│  │                  │  │              │  │              │  │
│  │  Gemini Pro      │  │  Gemini Pro  │  │  Gemini      │  │
│  │  + DALL-E 3      │  │  + Document  │  │  Vision      │  │
│  │  + HuggingFace   │  │  Processing  │  │  + Three.js  │  │
│  │  + Web Speech    │  │  (Mammoth)   │  │  + GLB 3D    │  │
│  │                  │  │              │  │              │  │
│  │  Trẻ vẽ →       │  │  Từ khóa →   │  │  Vẽ →        │  │
│  │  5 cảnh phim    │  │  Giáo án     │  │  Nhận diện → │  │
│  │  3D Pixar       │  │  STEAM đầy đủ│  │  3D Model    │  │
│  └──────────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

### 🎬 AI #1: CỖ MÁY KỂ CHUYỆN AI (Magic Story Machine)

**Điểm bán cho nhà đầu tư:**
> *"Mỗi nét vẽ nguệch ngoạc của trẻ 3 tuổi đều ẩn chứa một câu chuyện — AI giúp bé kể câu chuyện đó bằng phim 3D."*

| Thuộc tính | Chi tiết |
|---|---|
| **Input** | Bức tranh vẽ tay của trẻ (upload ảnh hoặc chụp camera) |
| **Output** | 5 cảnh phim hoạt hình 3D phong cách Pixar + Giọng kể chuyện AI |
| **AI Models** | Google Gemini Pro (story generation) + DALL-E 3/HuggingFace (image) |
| **Thời gian xử lý** | ~30 giây cho 5 cảnh |
| **Ngôn ngữ** | Tiếng Việt & English (chuyển đổi) |
| **Backend Route** | `POST /api/storyboard` (upload file → process → return scenes) |
| **Privacy** | Tranh ẩn danh, xóa khỏi hệ thống sau 24h |
| **Demo Mode** | Có — chạy được không cần API key |

**Luồng xử lý kỹ thuật:**
```
1. Bé vẽ tranh trên giấy
2. Giáo viên/Phụ huynh chụp ảnh → Upload
3. Backend nhận ảnh (Multer) → Gửi tới Gemini Pro
4. Gemini phân tích nội dung bức vẽ
5. AI sinh 5 cảnh phim: title, narrative, visual_prompt
6. DALL-E 3 / HuggingFace tạo ảnh 3D cho mỗi cảnh
7. Frontend render Cinematic Player
8. Web Speech API đọc giọng Việt/English
9. Background music (toggle on/off)
```

**Components liên quan:**
- `src/features/storyboard/` — Hook, Service, UI Components
- `src/components/AIStoryboardTab.tsx` — Dashboard Tab wrapper
- `src/routes/storyboardRoutes.ts` — Backend API (14KB logic)

---

### 📚 AI #2: TRỢ LÝ SOẠN GIÁO ÁN AI (Lesson Planner)

**Điểm bán cho nhà đầu tư:**
> *"Giáo viên mầm non tốn 3-4 giờ/ngày soạn bài. AI cắt xuống còn 30 giây — tiết kiệm 22 giờ/tuần."*

| Thuộc tính | Chi tiết |
|---|---|
| **Input** | Chủ đề + Độ tuổi + Thời lượng + Số hoạt động + Tài liệu đính kèm (optional) |
| **Output** | Giáo án STEAM hoàn chỉnh: Mục tiêu, Hoạt động, Câu chuyện, Câu hỏi |
| **AI Models** | Google Gemini Pro (structured text generation) |
| **Document Processing** | Mammoth.js (đọc .docx), PDF parsing |
| **Thời gian xử lý** | ~10-30 giây |
| **Backend Route** | `POST /api/lessons/generate` |

**Cấu trúc Output AI:**
```json
{
  "title": "Khám phá Đại Dương Xanh",
  "topic_tag": "Thiên nhiên",
  "objectives": {
    "knowledge": "Trẻ biết tên 5 sinh vật biển phổ biến...",
    "skills": "Phát triển kỹ năng quan sát, so sánh...",
    "attitude": "Yêu thích khám phá thế giới tự nhiên..."
  },
  "activities": [
    { "step": 1, "title": "Khám phá rạn san hô", "desc": "..." },
    { "step": 2, "title": "Trò chơi cá heo nhảy", "desc": "..." }
  ],
  "story": "Ngày xửa ngày xưa, dưới đáy đại dương...",
  "questions": [
    "Bạn nào kể cho cô nghe con cá gì bơi nhanh nhất?",
    "Nếu bạn là cá heo, bạn sẽ làm gì?"
  ]
}
```

---

### 🎨 AI #3: DRAWING EXPLORER 3D (Gemini Vision + Three.js)

**Điểm bán cho nhà đầu tư:**
> *"Bức vẽ con mèo của bé không chỉ được AI chấm điểm — mà còn biến thành mô hình 3D xoay 360° ngay lập tức."*

| Thuộc tính | Chi tiết |
|---|---|
| **Input** | Bức vẽ tay + Label gợi ý (optional) |
| **Output** | Nhận diện + Điểm số + Nhận xét VN + 3D GLB Model + Fun facts |
| **AI Models** | Gemini Flash Lite (Vision — phân tích hình ảnh) |
| **3D Engine** | Three.js + React Three Fiber + OrbitControls |
| **3D Models** | 52 GLB models (28 chủ đề chính + synonyms) |
| **Backend Route** | `POST /api/ar/analyze` |
| **Thời gian** | ~5-10 giây |

**Thư viện 28 chủ đề 3D:**
```
🐱 Mèo    🐶 Chó    🐰 Thỏ    🐦 Chim    🐓 Gà    🐤 Gà con
🦆 Vịt    🐟 Cá     🦈 Cá mập  🐬 Cá heo  🐳 Cá voi 🤡 Cá hề
🐸 Ếch    🐍 Rắn    🦕 Khủng long  🐉 Rồng  🐮 Bò   🐴 Ngựa
🐷 Lợn    🐑 Cừu    🦊 Cáo    🐺 Sói     🦌 Nai    🦇 Dơi
🐝 Ong    🌵 Xương rồng  🦓 Ngựa vằn  🦙 Lạc đà con
```

**Đặc biệt:**
- **DrawingCard3D** — Bức vẽ của trẻ hiển thị dạng 3D card bên cạnh model GLB
- **Auto-center & Normalize** — GLB tự căn giữa, chuẩn hóa 2-unit
- **60+ Synonym Map** — "husky", "pug", "shiba" đều map về "dog"
- **4 Feedback Cards:**
  - ✅ *Giỏi lắm* (praise cụ thể) — Green
  - ✏️ *Thử thách nhỏ* (tip tích cực) — Amber
  - 🧠 *Bạn có biết?* (fun facts) — Blue
  - 🚀 *Tưởng tượng nào!* (creative prompt) — Purple

---

## 5. HỆ THỐNG BACKEND & API

### 📡 Toàn bộ 13 Router modules:

| # | Router File | Prefix | Chức năng chính | Size |
|---|---|---|---|---|
| 1 | `authRoutes.ts` | `/api` | Đăng ký, Đăng nhập, Xác thực email, JWT | 29KB |
| 2 | `storyboardRoutes.ts` | `/api` | AI Magic Story: Upload → Process → Return scenes | 14KB |
| 3 | `arRoutes.ts` | `/api` | Drawing Explorer 3D: Gemini Vision + GLB mapping | **57KB** |
| 4 | `videoRoutes.ts` | `/api` | CRUD video học liệu | 6KB |
| 5 | `staffRoutes.ts` | `/api` | Quản lý nhân sự (CRUD) | 5KB |
| 6 | `journalRoutes.ts` | `/api` | Nhật ký hoạt động lớp | 3KB |
| 7 | `achievementRoutes.ts` | `/api` | Thành tích, phần thưởng | 3KB |
| 8 | `profileRoutes.ts` | `/api` | Profile giáo viên & phụ huynh | 5KB |
| 9 | `classRoutes.ts` | `/api` | Quản lý lớp học | 3KB |
| 10 | `lessonRoutes.ts` | `/api` | AI Lesson Planner + CRUD bài giảng | 5KB |
| 11 | `galleryRoutes.ts` | `/api` | Gallery tác phẩm trẻ em | 6KB |
| 12 | `accountRoutes.ts` | `/api` | RBAC: Users, Groups, Permissions | 10KB |
| 13 | `documentRoutes.ts` | `/api` | Sổ trình ký giáo án, phê duyệt | 14KB |

### 🔗 Legacy API Endpoints (trong server.ts):

| Method | Endpoint | Chức năng |
|---|---|---|
| `GET` | `/api/users` | Lấy danh sách users (Admin) |
| `PATCH` | `/api/users/:id/toggle` | Khóa/Mở khóa tài khoản |
| `DELETE` | `/api/users/:id` | Xóa user vĩnh viễn |
| `GET` | `/api/health` | Health check (DB + Sequelize) |

---

## 6. DATABASE SCHEMA & MODELS

### 📊 15 Sequelize Models:

| # | Model | Bảng | Chức năng | Quan hệ |
|---|---|---|---|---|
| 1 | `User` | `users` | Tài khoản người dùng | hasOne Profile, hasMany Groups |
| 2 | `ParentProfile` | `parent_profiles` | Hồ sơ phụ huynh | belongsTo User |
| 3 | `StaffProfile` | `staff_profiles` | Hồ sơ nhân viên/GV | belongsTo User |
| 4 | `Class` | `classes` | Lớp học | hasMany Students |
| 5 | `Gallery` | `galleries` | Tác phẩm nghệ thuật | belongsTo User |
| 6 | `Video` | `videos` | Video học liệu | belongsTo User |
| 7 | `Journal` | `journals` | Nhật ký hoạt động | belongsTo Class |
| 8 | `Achievement` | `achievements` | Thành tích, phần thưởng | belongsTo User |
| 9 | `DocumentSubmission` | `document_submissions` | Giáo án trình ký | belongsTo User |
| 10 | `UserGroup` | `user_groups` | Nhóm phân quyền | hasMany Members |
| 11 | `UserGroupMember` | `user_group_members` | Thành viên nhóm | belongsTo Group, User |
| 12 | `Permission` | `permissions` | Quyền hệ thống | hasMany GroupPermissions |
| 13 | `GroupPermission` | `group_permissions` | Quyền của nhóm | belongsTo Group, Permission |
| 14 | `UserPermission` | `user_permissions` | Quyền riêng user | belongsTo User, Permission |
| 15 | `AccessLog` | `access_logs` | Nhật ký truy cập | belongsTo User |

---

## 7. KIẾN TRÚC KỸ THUẬT

### 🛠️ Technology Stack:

| Layer | Công nghệ | Version |
|---|---|---|
| **Frontend Framework** | React | 19.0.0 |
| **Language** | TypeScript | 5.8.2 |
| **Build Tool** | Vite | 6.2.0 |
| **Styling** | TailwindCSS | 4.1.14 |
| **3D Engine** | Three.js + React Three Fiber + Drei | 0.183.2 |
| **Animation** | Motion (Framer Motion) | 12.23.24 |
| **Routing** | React Router DOM | 7.13.1 |
| **Icons** | Material Symbols + Lucide React | - |
| **Rich Text** | React Quill New | 3.8.3 |
| **Backend** | Node.js + Express | 4.21.2 |
| **Database** | PostgreSQL | - |
| **ORM** | Sequelize | 6.37.8 |
| **Auth** | JWT (jsonwebtoken) + bcryptjs | 9.0.3 |
| **File Upload** | Multer | 2.1.1 |
| **Email** | Nodemailer | 8.0.1 |
| **AI — Google** | @google/genai + @google/generative-ai | 1.29.0 |
| **AI — OpenAI** | openai (DALL-E 3) | 6.27.0 |
| **AI — HuggingFace** | @huggingface/inference | 4.13.15 |
| **Document Parse** | Mammoth (DOCX → HTML) | 1.12.0 |
| **Rate Limit** | express-rate-limit | 8.3.0 |
| **Validation** | express-validator | 7.3.1 |
| **Dev Server** | Concurrently (Frontend + Backend) | 9.2.1 |
| **Containerization** | Docker (docker-compose.yml) | - |

### 📂 Cấu trúc dự án:

```
kidfit-website/
├── src/
│   ├── App.tsx                    # Router chính (10 routes)
│   ├── main.tsx                   # Entry point
│   ├── server.ts                  # Express server (314 dòng)
│   ├── index.css                  # Design tokens & global styles
│   ├── seed.ts                    # Database seeder
│   │
│   ├── pages/                     # 7 trang + 4 thư mục con
│   │   ├── LandingPage.tsx        # Trang chủ (272 dòng)
│   │   ├── AIPage.tsx             # Showcase AI (170 dòng)
│   │   ├── LoginPage.tsx          # Đăng nhập
│   │   ├── RegisterPage.tsx       # Đăng ký
│   │   ├── TeacherDashboard.tsx   # Dashboard GV (327 dòng)
│   │   ├── KidsGallery.tsx        # Triển lãm trẻ
│   │   ├── AdminDashboard.tsx     # Admin (2,075 dòng!)
│   │   ├── TeacherDashboard/      # 8 sub-views
│   │   ├── ParentCommunity/       # 14 sub-views
│   │   ├── AdminDashboard/        # 6 sub-components
│   │   └── MagicStory/            # (reserved)
│   │
│   ├── features/                  # Feature modules
│   │   ├── storyboard/            # AI Magic Story Engine
│   │   ├── ar/                    # Drawing Explorer 3D (Gemini Vision)
│   │   ├── lessons/               # AI Lesson Planner
│   │   ├── gallery/               # Gallery management
│   │   ├── videos/                # Video library
│   │   ├── staff/                 # Staff management
│   │   └── profile/               # User profiles
│   │
│   ├── components/                # Shared components
│   │   ├── AIStoryboardTab.tsx    # AI Story (in dashboard)
│   │   ├── AILessonPlannerTab.tsx # AI Lesson (422 dòng)
│   │   ├── AIARExplorerTab.tsx    # AR Explorer wrapper
│   │   ├── HeroScene3D.tsx        # 3D Three.js hero
│   │   └── DarkModeToggle.tsx     # Theme switcher
│   │
│   ├── routes/                    # 13 API router files
│   ├── models/                    # 15 Sequelize models
│   ├── config/                    # DB, Rate limiter, API config
│   ├── middleware/                # Auth middleware (JWT + RBAC)
│   ├── services/                  # Email, Notification services
│   ├── hooks/                     # Custom React hooks
│   ├── modules/                   # Backend modules
│   └── shared/                    # Shared utilities
│
├── public/
│   └── assets/
│       ├── ar-models/             # 52 GLB 3D models
│       ├── logo/                  # Logo files
│       ├── picture/               # Team photos
│       └── video/                 # Intro video
│
├── server/                        # Server config
├── produce/                       # Project documents
├── docker-compose.yml             # Docker setup
├── vite.config.ts                 # Vite configuration
└── package.json                   # 35 dependencies
```

---

## 8. PITCH DECK — ĐIỂM BÁN CHO NHÀ ĐẦU TƯ

### 💰 Tại sao đầu tư vào Trạng Nguyên Kids 4.0?

#### 1. VẤN ĐỀ LỚN — THỊ TRƯỜNG 3 TỶ USD
```
📊 4.5 triệu trẻ mầm non Việt Nam
📊 EdTech VN dự kiến đạt 3 tỷ USD vào 2030
📊 70% trường mầm non vẫn quản lý bằng Excel
📊 GV tốn 3-4 giờ/ngày cho sổ sách (không dạy học)
```

#### 2. GIẢI PHÁP DUY NHẤT — 3 SẢN PHẨM TRONG 1
```
🏫 B2B: Hệ thống quản trị nhà trường (SaaS)
👩‍🏫 B2B2C: AI Copilot cho giáo viên
👨‍👩‍👦 B2C: AI Magic Story cho trẻ & phụ huynh
```

#### 3. AI LÀ LỢI THẾ CẠNH TRANH BẤT ĐỐI XỨNG
| Tính năng AI | Đối thủ | Trạng Nguyên 4.0 |
|---|---|---|
| Vẽ → Phim 3D tự động | ❌ Chưa ai có | ✅ **AI Magic Story** |
| Soạn giáo án STEAM 30 giây | ❌ Thủ công | ✅ **AI Lesson Planner** |
| Chấm điểm vẽ + 3D Model | ❌ Chưa ai có | ✅ **Drawing Explorer 3D** |
| Cognitive Footprint | ❌ Chỉ điểm số | ✅ **Dữ liệu tư duy ẩn** |
| Dashboard 3-trong-1 | ❌ 1 phân khúc | ✅ **Trường + GV + PH** |

#### 4. SỐ LIỆU SẢN PHẨM HIỆN TẠI
```
✅ 10 trang web hoàn chỉnh
✅ 40+ tính năng đã triển khai
✅ 3 AI Engines hoạt động (Gemini + DALL-E + HuggingFace)
✅ 52 mô hình 3D GLB
✅ 15 database models
✅ 13 API router modules
✅ 4 vai trò phân quyền (Admin/Teacher/Parent/Student)
✅ RBAC hoàn chỉnh (Nhóm + Quyền + Nhật ký truy cập)
✅ Docker-ready deployment
```

#### 5. MÔ HÌNH DOANH THU
```
💰 SaaS Subscription (B2B): 2-5 triệu VNĐ/tháng/trường
💰 Freemium → Premium (B2C): 99,000 VNĐ/tháng/PH
💰 Marketplace Commission: 15-20% hoa hồng học liệu
```

#### 6. LỘ TRÌNH 3 NĂM
```
2026 Q3: AI Magic Story PoC → 1,000 users
2026 Q4: AI Copilot Workspace → 10 trường
2027 Q1: Edu-Analytics Platform → 5,000 hồ sơ
2027 Q2: Mobile Super App → 10,000 MAU
2027 Q4: B2B White-label SaaS → MRR $50K
2028+:   STEAM Marketplace → 1,000 GV tạo & bán
```

---

## 9. THỐNG KÊ QUY MÔ DỰ ÁN

### 📈 Bảng tổng kết:

| Metric | Số liệu |
|---|---|
| **Tổng số trang web** | 10 routes |
| **Tổng chức năng đã triển khai** | **47+ tính năng** |
| **Tính năng AI** | 3 engines (Magic Story, Lesson Planner, Drawing Explorer) |
| **AI APIs tích hợp** | 4 (Gemini Pro, Gemini Vision, DALL-E 3, HuggingFace) |
| **Mô hình 3D (GLB)** | 52 files |
| **Database Models** | 15 models |
| **API Router Modules** | 13 files |
| **Backend Route Size** | ~158KB tổng logic |
| **Frontend Pages** | 7 trang chính + 28 sub-views |
| **Shared Components** | 5 components |
| **Feature Modules** | 7 modules |
| **Custom Hooks** | 2 hooks |
| **Services** | 2 services (Email, Notification) |
| **Dependencies** | 35 packages |
| **Vai trò phân quyền** | 4 (Admin, Teacher, Parent, Student) |
| **Team members** | 6 sinh viên FPT |
| **Tài khoản mẫu** | 3 (admin/teacher/parent — pass: 123456) |

### 📊 Phân bổ chức năng theo vai trò:

| Vai Trò | Số tính năng | % |
|---|---|---|
| 🌐 Landing/Public | 10 | 21% |
| 👩‍🏫 Teacher | 14 | 30% |
| 👨‍👩‍👦 Parent | 13 | 28% |
| 🛡️ Admin | 14 | 30% |
| 🤖 AI Engines | 3 | - |
| 🔐 Auth/Security | 6 | - |

---

## PHỤ LỤC: DANH SÁCH 47+ TÍNH NĂNG (TÓM TẮT)

### PUBLIC (10)
1. Hero Section 3D + Video
2. Scroll Animations
3. Hệ sinh thái EdTech showcase
4. Team profiles
5. Footer multi-column
6. AI Showcase page (dark mode)
7. Kids Gallery
8. Login (JWT)
9. Register (email verification)
10. Facebook integration

### TEACHER (14)
11. Dashboard Overview + Statistics
12. Điểm danh điện tử
13. Quản lý học sinh
14. **🤖 AI Lesson Planner** (auto-generate giáo án)
15. Sổ trình ký giáo án (document workflow)
16. Rich Text Document Editor
17. Nhật ký hoạt động lớp
18. Thư viện Media
19. Tin nhắn (chat với PH)
20. Thông báo phụ huynh
21. **🤖 AI Magic Story** (vẽ → phim 3D)
22. **🤖 Drawing Explorer 3D** (vẽ → nhận diện → 3D)
23. Profile cá nhân
24. Lịch giảng dạy

### PARENT (13)
25. Overview Dashboard
26. Hành Trình Xanh (Eco Mission gamification)
27. Nhật ký hoạt động bé
28. Gallery ảnh/video
29. Điểm danh (xem)
30. Thực đơn hàng ngày
31. Theo dõi sức khỏe
32. Quản lý học phí
33. Tin nhắn (chat với GV)
34. Thông báo
35. Cộng đồng PH tương tác
36. Profile phụ huynh
37. Thư viện video

### ADMIN (14)
38. Overview KPI (5 metrics)
39. Biểu đồ thống kê
40. Tổng quan lớp học
41. Quản lý người dùng (CRUD)
42. Tạo/Sửa tài khoản (form đầy đủ)
43. Quản lý nhân sự
44. Quản lý nhóm (UserGroup)
45. Quản lý quyền (Permission)
46. Phân quyền người dùng
47. Nhật ký truy cập (Audit log)
48. Cài đặt hệ thống
49. Filter & Search nâng cao
50. Stats Bento Grid

---

> **Đối tác thực tế:** Trường Mầm Non Sao Mai — Cần Thơ
> **Môn học:** EXE101 — Khởi nghiệp & Thương mại hóa
> **Đại học:** FPT University Cần Thơ
> **Nhóm:** CreakTech (6 thành viên)

---

*Tài liệu được tổng hợp tự động từ toàn bộ source code dự án.*
*Phiên bản: v2.0 — Ngày: 13/04/2026*
*© 2026 Trạng Nguyên Kids 4.0 — CreakTech Team — FPT University Cần Thơ*
