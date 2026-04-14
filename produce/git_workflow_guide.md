# 🛠️ Hướng dẫn Quy trình Git cho Đội ngũ 2 người

Để kiểm soát dự án chặt chẽ và tránh mất code, hãy tuân thủ quy trình dưới đây.

---

## 1. Cấu trúc Nhánh (Branching Strategy)

Chúng ta sẽ sử dụng 3 loại nhánh chính:

- **`main`**: Nhánh ổn định nhất. Chỉ chứa code đã sẵn sàng để triển khai.
- **`dev`**: Nhánh phát triển chính. Mọi tính năng mới sẽ được gộp vào đây trước.
- **`feature/name-task`**: Nhánh con để mỗi người làm một nhiệm vụ riêng.

---

## 2. Quy trình làm một tính năng mới

Giả sử bạn bắt đầu làm phần **Camera Capture**:

1. **Cập nhật code mới nhất:**
   ```bash
   git checkout dev
   git pull origin dev
   ```

2. **Tạo nhánh tính năng:**
   ```bash
   git checkout -b feature/camera-capture
   ```

3. **Làm việc & Commit liên tục:**
   Mỗi khi xong một phần nhỏ, hãy commit lại. Lưu ý sử dụng `feat:` hoặc `fix:`:
   ```bash
   git add .
   git commit -m "feat: thêm giao diện camera cơ bản"
   ```

4. **Đẩy code lên & tạo Pull Request (PR):**
   ```bash
   git push origin feature/camera-capture
   ```
   Sau đó, lên giao diện GitHub/GitLab bấm **Create Pull Request**.

5. **Nhờ đồng đội Review:**
   Người còn lại sẽ xem code, nếu ổn thì bấm **Approve** và **Merge** vào `dev`.

---

## 3. Cách xử lý khi bị Xung đột (Conflict)

Xung đột xảy ra khi hai người cùng sửa một dòng code trong một file.

**Cách xử lý:**
1. Git sẽ báo lỗi khi bạn thực hiện `git merge` hoặc `git pull`.
2. Mở file bị lỗi (thường có các ký hiệu `<<<<<<< HEAD`).
3. Chọn giữ code của mình, của bạn mình, hoặc cả hai.
4. Lưu file lại, sau đó:
   ```bash
   git add <tên_file_lỗi>
   git commit -m "chore: giải quyết xung đột code"
   git push
   ```

---

## 4. Nguyên tắc "Không phá hoại"

- **KHÔNG** dùng lệnh `git push --force` (trừ khi cực kỳ hiểu mình đang làm gì).
- **KHÔNG** để file `.env` (chứa API Key) lên Git (nó đã nằm trong `.gitignore`).
- **LUÔN LUÔN** chạy thử ứng dụng ở máy mình sau khi `pull` code để đảm bảo code của bạn mình không làm hỏng máy mình.

---
> [!TIP]
> Các bạn nên cài đặt extension **"GitLens"** hoặc **"Git Graph"** trên VS Code để nhìn luồng đi của các nhánh một cách trực quan nhất.
