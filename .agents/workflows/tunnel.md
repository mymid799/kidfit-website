---
description: Cách chạy tunnel để công khai ứng dụng ra Internet
---

# 🚀 Cách chạy Tunnel (Cloudflare)

Tài liệu này hướng dẫn cách sử dụng `cloudflared` để đưa ứng dụng đang chạy ở máy local (như Port 4001, 4002) ra ngoài Internet.

## 1. Yêu cầu
- Đã cài đặt `cloudflared`. Nếu chưa, chạy lệnh:
  ```powershell
  winget install cloudflare.cloudflared
  ```

## 2. Cách chạy nhanh bằng Script
Tôi đã chuẩn bị sẵn script để bạn chạy nhanh:

**Chạy Frontend (Port 4001):**
// turbo
```powershell
./scripts/run-tunnel.ps1 -port 4001
```

**Chạy Backend (Port 4002):**
// turbo
```powershell
./scripts/run-tunnel.ps1 -port 4002
```

## 3. Cách chạy thủ công
Nếu không muốn dùng script, bạn có thể chạy lệnh trực tiếp:
```powershell
cloudflared tunnel --url http://localhost:4001
```

## 4. Lưu ý quan trọng
- Sau khi chạy, hãy tìm dòng có nội dung `+  https://xxxx-xxxx-xxxx.trycloudflare.com` trong terminal. Đó chính là URL công khai của bạn.
- Khi có URL mới của Backend, hãy cập nhật biến `BACKEND_TUNNEL_URL` trong file `.env`.
