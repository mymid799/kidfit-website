# 👥 Phân Chia Nhiệm Vụ: Cỗ Máy Kể Chuyện AI

Tài liệu này hướng dẫn cách chia công việc cho **2 thành viên** để triển khai tính năng "AI Magic Story Machine" một cách hiệu quả nhất.

---

## 🛠️ Thành viên 1: Backend & AI Integration (System Engineer)
**Trọng tâm:** Logic hệ thống, Kết nối API AI, Quản lý Dữ liệu.

### 📝 Chi tiết nhiệm vụ:
- [ ] **Thiết lập Database Model:** Tạo Schema `MagicStory` (Lưu ID, UserID, Ảnh gốc, Ảnh AI, Nội dung truyện).
- [ ] **AI Service (Gemini 1.5):** Viết hàm nhận file ảnh -> Gửi Gemini -> Nhận về văn bản truyện & Prompt mô tả cho DALL-E.
- [ ] **AI Service (DALL-E 3):** Viết hàm nhận Prompt -> Gửi OpenAI -> Nhận về ảnh 3D Pixar.
- [ ] **API Workflow:** Xây dựng luồng `POST /api/magic/create` kết nối tất cả các bước trên.
- [ ] **Lưu trữ Image:** Xử lý việc tải ảnh từ OpenAI về lưu nội bộ tại server.
- [ ] **Bảo mật:** Cài đặt giới hạn (Rate limit) để kiểm soát chi phí API.

---

## 🎨 Thành viên 2: Frontend & UX/UI (UX Designer)
**Trọng tâm:** Trải nghiệm người dùng, Giao diện chụp ảnh, Hiển thị kết quả.

### 📝 Chi tiết nhiệm vụ:
- [ ] **Giao diện Camera:** Phát triển component `CameraCapture.tsx` hỗ trợ chụp và xem trước ảnh trên điện thoại.
- [ ] **Màn hình Loading ma thuật:** Thiết kế UI chờ đợi sống động (10-15s) để giữ chân người dùng.
- [ ] **Giao diện Sách Cổ Tích:** Xây dựng `StoryBookResult.tsx` hiển thị ảnh (trái) và chữ (phải) theo phong cách lật sách.
- [ ] **Tính năng Audio:** Tích hợp `Web Speech API` để web tự động đọc truyện cho bé nghe.
- [ ] **Kết nối Frontend-Backend:** Gọi API từ Backend và xử lý các trạng thái lỗi/thành công.

---

## 🚀 Quy trình Phối hợp
1. **Thống nhất (Giai đoạn đầu):** Hai bên ngồi lại chốt cấu trúc dữ liệu JSON để khớp Input/Output.
2. **Triển khai Độc lập:** Member 1 code Backend, Member 2 dựng UI với dữ liệu giả (Mock data).
3. **Ghép nối (Integration):** Kết nối UI thật với API thật.
4. **Kiểm thử trên mobile:** Sử dụng công cụ [Tunnel](file:///d:/kidfit-website/.agents/workflows/tunnel.md) để mở trang web lên điện thoại thật và test Camera.

---
> [!IMPORTANT]
> Hãy đảm bảo cả hai đều có quyền truy cập vào file `.env` chứa các API Key cần thiết trước khi bắt đầu.
