# 🚀 Kế Hoạch Triển Khai: Cỗ Máy Kể Chuyện AI (AI Magic Story Machine)

Tính năng "Killer Feature" của KidFit: Khách hàng chụp bức tranh bé vừa tô/vẽ, hệ thống dùng AI để phân tích nét vẽ, tôn tạo bức tranh thành nghệ thuật 3D (Pixar Style), và tự động viết một câu chuyện cổ tích về tác phẩm đó.

---

## 1. Lựa chọn Công nghệ AI

Tôi đã kiểm tra file `package.json` và `.env` của bạn, dự án bạn **ĐÃ CÓ SẴN** các chìa khóa quyền lực nhất. Chúng ta sẽ phối hợp 2 "ông lớn" AI như sau:

| Nhiệm vụ | AI Sử dụng | Lý do chọn |
| :--- | :--- | :--- |
| **Nhìn ảnh & Viết Truyện** | **Google Gemini (Gemini 1.5 Flash/Pro)** | Rất thông minh trong việc nhìn hình nét vẽ tay của trẻ con (Multimodal). Soạn thảo văn học, truyện cổ tích bằng Tiếng Việt rất giàu cảm xúc, có vần điệu. Bạn đã có sẵn `GEMINI_API_KEY`. |
| **Vẽ lại ảnh (Art Generation)** | **OpenAI DALL-E 3** | Cực kỳ xuất sắc trong việc tái tạo nét vẽ thô sơ thành hình ảnh 3D Animation siêu thực (Pixar/Disney format). Dễ dàng gọi qua package `openai` đã cài sẵn. |
| **Đọc Truyện (Audio)** | **Web Speech API** (Free) hoặc **OpenAI TTS** | Để web tự cất giọng kể chuyện. Web Speech API xài luôn trên điện thoại 0đ. Nếu muốn giọng chuyên nghiệp thì dùng OpenAI Text-to-Speech. |

---

## 2. Luồng Hoạt Động (User Flow)

1. **Bước 1 (Frontend):** Phụ huynh vào trang `/magic-story` (Cỗ máy kể chuyện). Bấm nút mở Camera điện thoại để chụp bức tranh của bé.
2. **Bước 2 (Gửi Data):** Hình chụp được gửi lên Backend Node.js (API `POST /api/magic/generate`).
3. **Bước 3 (Gemini Phân tích):** Node.js quăng tấm ảnh sang Gemini kèm câu lệnh: *"Đây là bức tranh trẻ mầm non vẽ. Trong tranh có gì? Dựa vào đó hãy sáng tác 1 truyện ngắn 150 chữ khen ngợi bé và kể về sự xuất hiện của nhân vật trong tranh."*
4. **Bước 4 (DALL-E 3 Vẽ):** Từ chủ đề mà Gemini đoán ra (VD: "Con gà con màu vàng"), Node.js gửi lệnh sang OpenAI: *"Vẽ không gian 3D Pixar, một chú gà con màu vàng chóe, vui nhộn mầm non."*
5. **Bước 5 (Lưu trữ):** Lưu 3 thứ vào Database: Ảnh Gốc (Bé vẽ) + Ảnh 3D (AI vẽ) + Nội dung Truyện (AI viết). Trả về Client `story_id`.
6. **Bước 6 (Hiển thị kết quả):** Web chuyển sang trang chi tiết cuốn sách ảo. Bên trái là 2 bức hình "Gốc & AI" lật qua lật lại, bên phải hiện chữ chạy từ từ lên (kèm tiếng đọc tự động).

---

## 3. Các bước Code Cụ thể

### Phase 1: Xây dựng Backend & DB (Node.js)

1. **Database Model (`src/models/MagicStory.ts`):** Tạo bảng lưu tác phẩm. Cột gồm: `id`, `user_id`, `original_image_url`, `ai_image_url`, `ai_story_text`, `title`.
2. **API Endpoint (`src/routes/magicRoutes.ts`):** POST `/api/magic/create` nhận file upload thông qua `multer`.
3. **AI Service (`src/services/aiService.ts`):** 
   - Hàm `generateStoryFromImage(imageBuffer)`: Dùng `@google/generative-ai` phân tích ảnh lấy truyện và từ khóa tiếng Anh.
   - Hàm `generate3DArt(prompt)`: Dùng thư viện `openai` gửi query tới `dall-e-3`.

### Phase 2: Lập trình Frontend Giao Diện (React)

1. **Trang `CameraCapture.tsx`:** UI có icon cái Camera để click vào mở trình duyệt máy ảnh.
2. **Màn hình Loading ma thuật:** Vì Gemini + DALL-E chạy tốn khoảng 10-15 giây, làm một màn hình loading có hình đồng hồ cát và dòng chữ "Cỗ máy đang nhào nặn...".
3. **Trang `StoryBookResult.tsx`:** Trang kết quả trình bày giống một cuốn sách cổ tích mở ra 2 trang. Màn hình chia ra: Hình (Bên trái) - Chữ (Bên phải).

### Bước 3: Lưu ý Kỹ Thuật
- Quản lý File Upload: Hình gốc sẽ lưu vào thư mục `uploads` trong máy chủ Express hiện tại. Hình sinh ra bằng DALL-E phải được `fetch` tải về máy chủ ngay lập tức chứ không để nguyên link gốc (link DALL-E sẽ hết hạn trong vài tiếng).
- API Rate Limit: Sẽ cần đặt giới hạn để phụ huynh không spam tính năng này vì DALL-E 3 tốn tiền.
