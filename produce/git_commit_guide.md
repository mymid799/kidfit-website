# 📘 Hướng Dẫn Commit Code & Đặt Tên Chuẩn (Git Guide)

Bản hướng dẫn này giúp bạn thực hiện lưu trữ mã nguồn (Commit) một cách chuyên nghiệp trên nhánh **`feature/ai-magic-story`**.

---

## 1. Quy trình Commit 3 bước tiêu chuẩn

Mỗi khi bạn muốn lưu lại công việc đã làm, hãy thực hiện các lệnh sau trong terminal:

### Bước 1: Kiểm tra các file đã thay đổi
```bash
git status
```
*Lệnh này giúp bạn thấy danh sách các file bạn đã tạo mới (Untracked) hoặc đã chỉnh sửa (Modified).*

### Bước 2: Đưa các file vào "vùng chờ" (Staging Area)
- Để thêm **tất cả** thay đổi:
  ```bash
  git add .
  ```
- Để thêm **từng file** cụ thể (khuyên dùng để kiểm soát tốt hơn):
  ```bash
  git add src/features/ai-magic/
  ```

### Bước 3: Thực hiện Commit với thông điệp chuẩn
```bash
git commit -m "loại(phạm-vi): mô tả ngắn gọn"
```
*(Chi tiết cách đặt tên xem ở mục 2 bên dưới)*

### Bước 4: Đẩy code lên Server (GitHub/GitLab)
```bash
git push origin feature/ai-magic-story
```

---

## 2. Cách đặt tên Commit chuẩn (Conventional Commits)

Để dự án chuyên nghiệp và dễ theo dõi lịch sử, chúng ta sử dụng cấu trúc:
`type(scope): description`

### Các loại (Type) phổ biến:
- **`feat`**: Tính năng mới (Ví dụ: `feat(ai): triển khai cỗ máy kể chuyện 2.0`)
- **`fix`**: Sửa lỗi (Ví dụ: `fix(api): sửa lỗi module student không tìm thấy`)
- **`refactor`**: Thay đổi cấu trúc code nhưng không đổi tính năng (Ví dụ: `refactor(isolation): đóng gói code vào thư mục features/ai-magic`)
- **`docs`**: Chỉ thay đổi tài liệu (Ví dụ: `docs(produce): cập nhật hướng dẫn commit`)
- **`style`**: Thay đổi giao diện, định dạng code (CSS, khoảng trắng...)

### Ví dụ thực tế cho công việc chúng ta vừa làm:

1. **Sau khi di chuyển file để cô lập:**
   ```bash
   git commit -m "refactor(isolation): move ai-magic logic to dedicated features folder"
   ```

2. **Sau khi fix lỗi import:**
   ```bash
   git commit -m "fix(models): restore core Student and School models to src/models"
   ```

3. **Sau khi thêm tính năng Video:**
   ```bash
   git commit -m "feat(ai): integrate OpenAI TTS for story audio generation"
   ```

---

## 🛡️ Lưu ý quan trọng cho tính năng AI Magic

Vì chúng ta đang tuân thủ quy tắc **"Cô lập tuyệt đối"**, khi commit bạn nên:
- Commit riêng phần thay đổi ở `server.ts` và `App.tsx` (nhãn `refactor(wiring)`).
- Commit riêng phần code trong thư mục `src/features/ai-magic/` (nhãn `feat(ai)`).

Việc tách nhỏ commit giúp team Refactor dễ dàng chọn lọc (Pick) code của bạn mà không làm hỏng hệ thống của họ.

---
**Trạng thái nhánh hiện tại:** `feature/ai-magic-story`
**Người hướng dẫn:** Antigravity AI Assistant.
