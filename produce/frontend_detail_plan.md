# 🎨 Bản Thảo Chi Tiết Frontend: AI Magic Story Machine

Tài liệu này dành cho **Thành viên 2**, hướng dẫn cách xây dựng giao diện cao cấp, chuyên nghiệp và đầy cảm xúc cho người dùng.

---

## 🏗️ 1. Các Component Chính & State Management

### A. CameraCapture.tsx (Cổng vào thế giới ma thuật)
* **Chức năng:** Truy cập Camera máy điện thoại/laptop.
* **UX Wow:** 
  - Hiển thị khung "Focus" ảo ảnh lấp lánh.
  - Sau khi chụp, hiển thị ảnh preview trong một khung tranh gỗ cổ điển.
* **Nút bấm:** [Chụp Lại] (Màu xám/trắng), [Tiến Lên] (Màu tím/gradient).

### B. MagicLoading.tsx (Giữ chân người dùng)
* **Logic:** Hiển thị trong khoảng 10-15s khi Backend đang gọi Gemini & DALL-E.
* **Visual:** 
  - Một quả cầu pha lê đang tỏa sáng rực rỡ.
  - Chạy các dòng chữ ngẫu nhiên: *"Đang mời các thiên thần vào tranh..."*, *"Đang mài bút lông phép thuật..."*.
* **Âm thanh:** Nhạc nền nhẹ nhàng, huyền bí (chế độ mặc định tắt tiếng).

### C. StoryBookResult.tsx (Nơi phép màu hiện hữu)
* **Giao diện:** Chia làm 2 trang sách (Desktop) hoặc cuộn dọc (Mobile).
* **Bên trái (Art Space):** 
  - Hiệu ứng "Before/After Slider": Kéo thanh trượt để so sánh tranh bé vẽ và tranh AI vẽ.
* **Bên phải (Story Space):**
  - Chữ hiện ra từ từ.
  - Nút [Nghe Đọc] được đặt ở vị trí dễ bấm nhất.
* **Dưới cùng:** [Tải ảnh về máy] và [Làm bức tranh mới].

---

## 💎 2. Các Nút Chức Năng (Interactive Elements)

| Nút | Icon gợi ý | Màu sắc chủ đạo | Hiệu ứng |
| :--- | :--- | :--- | :--- |
| **Bắt đầu** | ✨ | Gradient (Purple to Blue) | Scale-up khi hover |
| **Shutter (Chụp)** | 📸 | Trắng tinh khiết | Pulse animation |
| **Nghe truyện** | 🔊 | Vàng nắng | Sóng âm (Waves) khi đang nói |
| **Lưu kỷ niệm** | 💾 | Xanh lá mint | Bay vào túi đồ (tiền xu) |

---

## 📐 3. Checklist cho một UI đẹp
1. [ ] **Responsive:** Đảm bảo Camera hoạt động tốt cả khi cầm điện thoại đứng và ngang.
2. [ ] **Empty States:** Nếu gặp lỗi API, hiện một nhân vật phù thủy đang buồn và nút [Thử lại nhé].
3. [ ] **Font chữ:** Dùng font không chân, tròn trịa (Vd: Quicksand hoặc Itim).
4. [ ] **Độ trễ:** Thêm hiệu ứng `skeleton` (khung mờ) trước khi ảnh AI được tải xong từ server.
5. [ ] **Accessibility:** Các nút bấm có kích thước ít nhất 44px để trẻ em dễ chạm chính xác.

---
> [!TIP]
> Hãy sử dụng CSS `backdrop-filter: blur(10px)` cho các khung menu để tạo hiệu ứng "mặt kính" (Glassmorphism) cực kỳ sang trọng và hiện đại.
