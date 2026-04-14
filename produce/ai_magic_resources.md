# 🎒 Danh Sách Tài Nguyên: Cỗ Máy Kẻ Chuyện AI

Tài liệu này liệt kê toàn bộ các công nghệ, API và tài nguyên cần thiết để hiện thực hóa tính năng "Killer Feature" của KidFit.

---

## 1. 🤖 Các Dịch Vụ AI (Core Engines)

### A. Google Gemini 1.5 Flash (Vision & Storytelling)
- **Mục đích:** Nhận diện các nét vẽ trong ảnh và sáng tác truyện cổ tích. 
- **Tại sao:** Miễn phí (bản free tier) hoặc rất rẻ, hiểu tiếng Việt cực tốt, tốc độ xử lý "Flash" nhanh nhất hiện nay.
- **Tài nguyên:** `GEMINI_API_KEY` (Lấy tại [Google AI Studio](https://aistudio.google.com/)).

### B. OpenAI DALL-E 3 (Image Generation)
- **Mục đích:** Tạo ra bức tranh 3D Pixar từ mô tả của Gemini.
- **Tại sao:** Khả năng hiểu ngôn ngữ tự nhiên tuyệt vời, chất lượng hình ảnh nghệ thuật cao.
- **Tài nguyên:** `OPENAI_API_KEY`.

### C. Web Speech API (Text-to-Speech)
- **Mục đích:** Đọc truyện cho bé nghe.
- **Tại sao:** Có sẵn trên trình duyệt Chrome/Safari/Edge, hoàn toàn miễn phí, không tốn tài nguyên server.

---

## 2. 💻 Thư Viện Kỹ Thuật (Tech Stack)

### Backend (Express/Node.js)
```bash
npm install @google/generative-ai  # Kết nối Gemini
npm install openai                # Kết nối OpenAI
npm install multer                # Xử lý upload file
npm install axios                 # Tải ảnh từ URL DALL-E về server
```

### Frontend (React)
```bash
npm install framer-motion         # Hiệu ứng chuyển động ma thuật
npm install lucide-react          # Bộ icon hiện đại
npm install canvas-confetti       # Bắn pháo hoa khi xong truyện
```

---

## 🎨 3. Tài Nguyên Đồ Họa & Âm Thanh

### Font Chữ (Google Fonts)
- **Tiêu đề:** [Quicksand](https://fonts.google.com/specimen/Quicksand) (700 Bold) - Tròn trịa, đáng yêu.
- **Nội dung:** [Itim](https://fonts.google.com/specimen/Itim) - Giống chữ viết tay trong truyện cổ tích.

### Âm Thanh (Gợi ý nguồn Pixabay Free SFX)
- **Magic Wand Sound:** Tiếng lấp lánh khi hiện kết quả.
- **Shutter Click:** Tiếng chụp ảnh.
- **Soft Ambient Loop:** Nhạc nền nhẹ nhàng kéo dài 1-2 phút.

### Icon (Lucide React)
- `Camera`: Chụp ảnh.
- `Sparkles`: Hiệu ứng ma thuật.
- `BookOpen`: Đọc truyện.
- `Download`: Lưu ảnh kỷ niệm.
- `RotateCcw`: Làm lại từ đầu.

---

## 📁 4. Quản Lý Dữ Liệu (Storage)
- **Local Storage:** Tạo thư mục `server/uploads/magic` để lưu trữ tạm thời ảnh gốc và ảnh AI.
- **Database (MongoDB/SQL):** Lưu các trường dữ liệu sau:
  - `original_img`: Đường dẫn ảnh bé vẽ.
  - `ai_img`: Đường dẫn ảnh Pixar tạo ra.
  - `story_vn`: Nội dung truyện tiếng Việt.
  - `created_at`: Thời gian tạo kỷ niệm.

---
> [!IMPORTANT]
> Hãy kiểm tra hạn mức API của OpenAI và Gemini trong quá trình phát triển để tránh bị gián đoạn dịch vụ khi đang demo.
