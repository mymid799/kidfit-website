# ✋ KẾ HOẠCH TRIỂN KHAI: Vẽ Bằng Cử Chỉ Tay (AI Hand Vision)

> **Dự án:** KidFit Creative Ecosystem — EXE101 @ FPT University  
> **Ngày tạo:** 2026-04-12  
> **Branch:** `feature/ai-magic`  
> **Trạng thái:** 📋 Chờ duyệt

---

## 1. Tổng Quan

### Mục tiêu

Bổ sung tính năng **vẽ bằng cử chỉ tay qua camera (Computer Vision)** vào đầu pipeline "Cỗ Máy Kể Chuyện AI" hiện có. Thay vì chỉ upload ảnh vẽ tay, bé có thể **giơ ngón tay trước camera để vẽ trực tiếp trên màn hình** → AI nhận diện hình vẽ → đẩy vào pipeline tạo truyện cổ tích đã có sẵn.

### Tại sao tính năng này quan trọng?

| Yếu tố | Giải thích |
|:---|:---|
| **WOW factor cho EXE101** | Demo trực tiếp vẽ bằng tay trước camera → BGK ấn tượng ngay lập tức |
| **Blue ocean VN** | Chưa có app giáo dục nào tại VN dùng hand tracking cho trẻ vẽ |
| **Chi phí = 0đ** | MediaPipe chạy 100% trong browser, không tốn API |
| **Reuse pipeline** | Output là ảnh PNG → đẩy thẳng vào pipeline cũ, không cần sửa server |
| **Inclusive** | Trẻ không cần giấy, bút, hay scanner — chỉ cần camera |

### Flow hoạt động

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                   │
│  ✋ PHẦN MỚI (BỔ SUNG)                                          │
│  ════════════════════                                             │
│                                                                   │
│  📹 Camera mở (webcam / camera trước mobile)                    │
│       ↓                                                           │
│  🧠 MediaPipe Hands → Detect 21 keypoints trên bàn tay          │
│       ↓                                                           │
│  ☝️ Ngón trỏ giơ lên = CHẾ ĐỘ VẼ                               │
│  🖐️ Xòe bàn tay 5 ngón = NGỪNG VẼ (di chuyển tự do)           │
│       ↓                                                           │
│  🎨 Nét vẽ hiện trên Canvas overlay (nhiều màu, undo, xóa)     │
│       ↓                                                           │
│  ✅ Bé nhấn "Xong! Tạo Truyện ✨"                               │
│       ↓                                                           │
│  📸 Canvas → export → File PNG                                   │
│       ↓                                                           │
│                                                                   │
│  🔮 PHẦN CŨ (ĐÃ CÓ SẴN)                                       │
│  ═════════════════════                                            │
│       ↓                                                           │
│  📤 Upload ảnh lên /api/storyboard                               │
│       ↓                                                           │
│  🤖 Gemini Vision phân tích: "Bé vẽ con mèo, chủ đề động vật"  │
│       ↓                                                           │
│  ✍️ Gemini Text sáng tác truyện cổ tích 5 scenes                │
│       ↓                                                           │
│  🎨 DALL-E 3 tạo ảnh 3D Pixar cho mỗi scene                    │
│       ↓                                                           │
│  🔊 TTS đọc truyện + 🎵 nhạc nền                                │
│       ↓                                                           │
│  📺 StoryboardPlayer phát truyện cho bé xem                     │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

---

## 2. Công Nghệ Sử Dụng

| Component | Technology | Chi phí | Lý do chọn |
|:---|:---|:---|:---|
| **Hand Tracking** | MediaPipe Hands (Google) | 🆓 FREE | 21 keypoints, chạy 100% browser, không cần server |
| **JS Runtime** | `@mediapipe/tasks-vision` (npm) | 🆓 FREE | Tích hợp tốt với React, TypeScript support |
| **Drawing** | HTML5 Canvas API | 🆓 FREE | Native browser, performance cao |
| **AI Analysis** | Gemini 2.5 Flash Vision | 💸 Rất thấp | Đã có sẵn trong pipeline |
| **Image Gen** | DALL-E 3 (OpenAI) | 💸 Đã có | Pipeline hiện tại |
| **Export** | `canvas.toBlob()` | 🆓 FREE | Convert canvas → File → feed pipeline |

### MediaPipe Hands — Chi Tiết Kỹ Thuật

```
                    Bàn tay 21 Landmarks
                    
         4 (ngón cái)     8 (đầu ngón trỏ) ← DÙNG ĐỂ VẼ
          \               |
     3     \         7    |    12 (ngón giữa)
      \     \        |    |    |
  2    \   0 ────── 5 ── 9 ── 13 ── 17 (ngón út)
   \    \ /         |    |    |      |
    1    0          6    10   14     18
                         |    |      |
                         11   15     19
                               |      |
                               16     20

    Landmark 8 (INDEX_FINGER_TIP) = tọa độ vẽ
    
    Gesture Detection:
    ☝️ Drawing:  Landmark 8 cao hơn 6 (ngón trỏ duỗi)
                 + Landmark 12 thấp hơn 10 (ngón giữa gập)
    🖐️ Pause:   Tất cả 5 đầu ngón (4,8,12,16,20) 
                 đều cao hơn knuckle tương ứng
```

### Tại sao MediaPipe mà không phải TensorFlow.js HandPose?

| Tiêu chí | MediaPipe Hands | TF.js HandPose |
|:---|:---|:---|
| **Accuracy** | ⭐⭐⭐⭐⭐ (21 points, rất chính xác) | ⭐⭐⭐⭐ |
| **Performance** | ~30 FPS trên phone | ~15-20 FPS |
| **Bundle size** | ~5MB (load lazy) | ~8MB |
| **Duy trì bởi** | Google (active) | Google (stable) |
| **Multi-hand** | ✅ Detect 2 tay cùng lúc | ✅ |

---

## 3. Cử Chỉ Tay — Gesture Mapping

| Cử chỉ | Hành động | Minh họa |
|:---|:---|:---|
| **☝️ Ngón trỏ giơ lên** (các ngón khác nắm) | **VẼ** — đầu ngón trỏ = bút vẽ | Nét liên tục theo đầu ngón tay |
| **🖐️ Xòe bàn tay** (5 ngón đều mở) | **NGỪNG VẼ** — di chuyển không để lại nét | Bé có thể thay đổi vị trí |
| **✊ Nắm tay** (tất cả ngón nắm lại) | **KHÔNG LÀM GÌ** — tay nghỉ | Bé hạ tay xuống nghỉ |
| **✌️ Hai ngón** (trỏ + giữa) | **TẨY** — xóa nét tại vị trí đó *(tùy chọn nâng cao)* | Eraser mode |

### Feedback cho bé

```
┌─────────────────────────────────────────────┐
│                                              │
│   ☝️ Phát hiện: CHẾ ĐỘ VẼ                  │
│   🟢 Đang vẽ...                             │
│                                              │
│   hoặc                                       │
│                                              │
│   🖐️ Phát hiện: NGỪNG VẼ                   │
│   🟡 Di chuyển tự do                        │
│                                              │
│   hoặc                                       │
│                                              │
│   ❌ Không phát hiện tay                     │
│   Đưa tay vào khung hình nhé!              │
│                                              │
└─────────────────────────────────────────────┘
```

---

## 4. Kiến Trúc Component

### Sơ đồ module

```
src/features/storyboard/
├── components/
│   ├── StoryboardUpload.tsx      ← [SỬA] Thêm 2 tab: Upload | Vẽ tay
│   ├── HandDrawingCanvas.tsx     ← [MỚI] Component chính vẽ bằng tay
│   ├── StoryboardPlayer.tsx      ← [GIỮ NGUYÊN]
│   └── DrawingToolbar.tsx        ← [MỚI] Toolbar: màu, cỡ nét, undo, xóa
├── hooks/
│   ├── useStoryboard.ts          ← [GIỮ NGUYÊN]
│   └── useHandTracking.ts        ← [MỚI] Hook MediaPipe lifecycle
├── services/
│   └── storyboardService.ts      ← [GIỮ NGUYÊN] 
└── types/
    └── index.ts                  ← [GIỮ NGUYÊN]
```

### Luồng dữ liệu

```
StoryboardUpload (2 tabs)
    │
    ├── Tab 1: Upload ảnh (FLOW CŨ - giữ nguyên)
    │   └── fileInput → File → onProcess(file)
    │
    └── Tab 2: Vẽ bằng tay (FLOW MỚI)
        └── HandDrawingCanvas
            ├── useHandTracking() → landmarks mỗi frame
            ├── Canvas drawing logic → đường vẽ
            ├── DrawingToolbar → màu, size, undo, xóa
            └── Export button → canvas.toBlob() → File → onProcess(file)
                                                            │
                                                            ▼
                                              useStoryboard.processDrawing(file)
                                                            │
                                                            ▼
                                              POST /api/storyboard (ĐÃ CÓ)
                                                            │
                                                            ▼
                                              Gemini → DALL-E → TTS → Player
```

---

## 5. Chi Tiết File Mới

### 5.1 `useHandTracking.ts` — Custom Hook

**Chức năng:**
- Load MediaPipe `HandLandmarker` model (lazy — chỉ khi user mở tính năng)
- Quản lý webcam stream (`getUserMedia` / stop)
- Trả về hand landmarks (21 điểm) mỗi frame qua `requestAnimationFrame`
- Phát hiện gesture (vẽ vs ngừng vẽ vs nghỉ)
- Auto-cleanup khi component unmount

**API trả về:**

```typescript
interface UseHandTrackingReturn {
    // State
    isModelLoading: boolean;      // Đang tải model MediaPipe
    isModelReady: boolean;        // Model sẵn sàng
    isCameraActive: boolean;      // Camera đang chạy
    error: string | null;         // Lỗi (camera denied, model failed...)
    
    // Data mỗi frame
    landmarks: NormalizedLandmark[][] | null;  // 21 landmarks mỗi tay
    gesture: 'drawing' | 'paused' | 'none';   // Gesture hiện tại
    fingerTip: { x: number; y: number } | null; // Tọa độ đầu ngón trỏ (normalized 0-1)
    
    // Controls
    startCamera: (videoElement: HTMLVideoElement) => Promise<void>;
    stopCamera: () => void;
}
```

### 5.2 `HandDrawingCanvas.tsx` — Component Chính

**Cấu trúc UI:**

```
┌─────────────────────────────────────────────────────────┐
│  🎨 Vẽ Bằng Phép Thuật Ngón Tay ✨                     │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │                                                    │  │
│  │              📹 CAMERA FEED                        │  │
│  │         (video element, mirrored)                  │  │
│  │                                                    │  │
│  │    ┌───────────────────┐                           │  │
│  │    │ ☝️ Đang vẽ...     │  ← Gesture indicator     │  │
│  │    └───────────────────┘                           │  │
│  │                                                    │  │
│  │  ~~~~~~~~ NÉT VẼ ~~~~~~~~  ← Canvas overlay      │  │
│  │                                                    │  │
│  │         ✋ (hand skeleton)  ← Landmark overlay     │  │
│  │                                                    │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │  TOOLBAR                                           │  │
│  │  🔴 🟡 🔵 🟢 ⚫  │  ○ ◉ ⬤  │  ↩️ Undo  │  🗑️  │  │
│  │  (5 màu)         (3 cỡ nét) (hoàn tác) (xóa hết) │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │       ✨ XONG! TẠO TRUYỆN TỪ BỨC VẼ ✨           │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  💡 Mẹo: Giơ ngón trỏ ☝️ để vẽ, xòe bàn tay 🖐️     │
│     để ngừng vẽ và di chuyển!                            │
└─────────────────────────────────────────────────────────┘
```

**Kỹ thuật rendering:**

```
Layer stack (từ dưới lên):

┌─── Layer 3: Gesture Indicator (DOM overlay) ───┐
│                                                  │
│  ┌─── Layer 2: Drawing Canvas ──────────────┐   │
│  │  (nét vẽ của bé, z-index: 20)            │   │
│  │                                           │   │
│  │  ┌─── Layer 1: Hand Skeleton Canvas ──┐  │   │
│  │  │  (landmarks, z-index: 15)          │  │   │
│  │  │                                    │  │   │
│  │  │  ┌─── Layer 0: Camera Video ───┐  │  │   │
│  │  │  │  (video feed, z-index: 10)  │  │  │   │
│  │  │  └─────────────────────────────┘  │  │   │
│  │  └───────────────────────────────────┘  │   │
│  └──────────────────────────────────────────┘   │
└──────────────────────────────────────────────────┘
```

- **Video** là `<video>` element, `transform: scaleX(-1)` để mirror (bé nhìn tự nhiên)
- **Hand Canvas** vẽ skeleton + keypoints (tùy chọn bật/tắt)
- **Drawing Canvas** lưu nét vẽ, export khi bấm "Xong"
- Tất cả dùng `position: absolute` chồng lên nhau

### 5.3 `DrawingToolbar.tsx` — Toolbar Vẽ

**Bảng màu kid-friendly:**

| Màu | Hex | Tên cho bé |
|:---|:---|:---|
| 🔴 | `#FF6B6B` | Đỏ dâu tây |
| 🟡 | `#FFD93D` | Vàng mặt trời |
| 🔵 | `#4ECDC4` | Xanh biển |
| 🟢 | `#6BCB77` | Xanh lá cây |
| ⚫ | `#2D3436` | Đen huyền bí |

**Cỡ nét:** 3px (mỏng) | 6px (vừa) | 12px (dày)

### 5.4 Sửa `StoryboardUpload.tsx` — Dual Mode

```
TRƯỚC (chỉ upload):
┌──────────────────────────────────┐
│  📸 Tải vẽ tay của bé lên đây   │
│  [Chọn Từ Thư Viện]             │
└──────────────────────────────────┘

SAU (2 tabs):
┌──────────────────────────────────┐
│  [📸 Upload Ảnh] [✋ Vẽ Bằng Tay]│  ← Tab switcher
│─────────────────────────────────│
│                                  │
│  Tab 1: Upload ảnh (giữ nguyên) │
│  hoặc                            │
│  Tab 2: HandDrawingCanvas        │
│                                  │
└──────────────────────────────────┘
```

---

## 6. Xử Lý Edge Cases

| Tình huống | Xử lý |
|:---|:---|
| **Camera bị từ chối** | Hiện thông báo hướng dẫn bật camera + fallback về tab Upload |
| **Thiết bị không có camera** | Tự động ẩn tab "Vẽ bằng tay", chỉ hiện Upload |
| **Model load chậm (~2-3s)** | Hiện loading spinner "🧠 AI đang khởi động mắt thần..." |
| **Tay ra khỏi khung hình** | Hiện "❌ Đưa tay vào khung hình nhé!" |
| **Ánh sáng yếu** | MediaPipe vẫn detect OK ở ánh sáng vừa, hiện cảnh báo nếu quá tối |
| **Canvas trống (không vẽ gì)** | Disable nút "Tạo Truyện" khi chưa có nét vẽ nào |
| **Mobile browser** | Camera trước mirror, cần test touch fallback |

---

## 7. Performance

| Metric | Target | Ghi chú |
|:---|:---|:---|
| **Model load time** | < 3 giây | Lazy load, chỉ khi mở tab "Vẽ tay" |
| **Hand detection FPS** | ≥ 25 FPS | MediaPipe Hands lite model |
| **Drawing latency** | < 16ms (60fps canvas) | requestAnimationFrame |
| **Memory usage** | < 100MB | WASM model ~30MB, canvas ~10MB |
| **Bundle impact** | +5MB (lazy) | Chỉ load khi cần, không ảnh hưởng trang khác |

---

## 8. Dependencies Mới

```bash
npm install @mediapipe/tasks-vision
```

| Package | Version | Size | Mục đích |
|:---|:---|:---|:---|
| `@mediapipe/tasks-vision` | ^0.10.22 | ~5MB | HandLandmarker, WASM runtime |

> **Lưu ý:** Package sẽ được **lazy import** (`import()`) khi user mở tính năng vẽ tay — KHÔNG load khi trang web khởi động, đảm bảo không ảnh hưởng performance landing page.

---

## 9. Tích Hợp Pipeline

### Điểm kết nối chính

```typescript
// HandDrawingCanvas.tsx — khi bé nhấn "Xong"
const handleComplete = async () => {
    const canvas = drawingCanvasRef.current;
    
    // Export canvas → Blob → File
    canvas.toBlob((blob) => {
        const file = new File([blob], 'hand-drawing.png', { type: 'image/png' });
        onComplete(file); // → gọi lên StoryboardUpload → processDrawing(file)
    }, 'image/png');
};
```

```typescript
// StoryboardUpload.tsx — nhận file từ HandDrawingCanvas
<HandDrawingCanvas 
    onComplete={(file: File) => {
        onProcess(file); // → useStoryboard.processDrawing(file)
                         // → POST /api/storyboard (server đã có)
                         // → Gemini → DALL-E → TTS → Player
    }}
/>
```

**Không cần sửa bất kỳ thứ gì ở server.** Server nhận file ảnh giống y upload bình thường.

---

## 10. Giao Diện Người Dùng — Mô Phỏng

### Trạng thái 1: Chọn chế độ

```
┌─────────────────────────────────────────────────────┐
│                                                      │
│   🎨 Cỗ Máy Kể Chuyện AI                           │
│   "Mọi nét vẽ đều ẩn chứa một câu chuyện kỳ diệu" │
│                                                      │
│   ┌─────────────────┐ ┌─────────────────────────┐   │
│   │                 │ │                         │   │
│   │   📸            │ │         ✋              │   │
│   │   Upload        │ │     Vẽ Bằng Tay        │   │
│   │   Ảnh Vẽ       │ │     (Camera AI)         │   │
│   │                 │ │                         │   │
│   │  Chọn ảnh vẽ    │ │  Dùng ngón tay vẽ     │   │
│   │  từ điện thoại  │ │  trong không khí!      │   │
│   │                 │ │                         │   │
│   └─────────────────┘ └─────────────────────────┘   │
│                                                      │
└─────────────────────────────────────────────────────┘
```

### Trạng thái 2: Đang vẽ

```
┌─────────────────────────────────────────────────────┐
│  [📸 Upload] [ ✋ Vẽ Bằng Tay ← đang chọn ]       │
│                                                      │
│  ┌────────────────────────────────────────────────┐  │
│  │                                                │  │
│  │    Camera Feed (mirrored)                      │  │
│  │                                                │  │
│  │    ┌──────────────┐                            │  │
│  │    │ ☝️ Đang vẽ.. │                            │  │
│  │    │ 🟢           │                            │  │
│  │    └──────────────┘                            │  │
│  │                                                │  │
│  │       ╱╲                                       │  │
│  │      ╱  ╲    ← nét vẽ bé đang tạo            │  │
│  │     ╱    ○                                     │  │
│  │                                                │  │
│  └────────────────────────────────────────────────┘  │
│                                                      │
│  🔴 🟡 🔵 🟢 ⚫  │  ○ ◉ ⬤  │  ↩️  │  🗑️        │
│                                                      │
│  ┌────────────────────────────────────────────────┐  │
│  │          ✨ XONG! TẠO TRUYỆN! ✨               │  │
│  └────────────────────────────────────────────────┘  │
│                                                      │
│  💡 Giơ ☝️ để vẽ • Xòe 🖐️ để ngừng • Nắm ✊ nghỉ  │
└─────────────────────────────────────────────────────┘
```

### Trạng thái 3: Export → Pipeline cũ xử lý

```
┌─────────────────────────────────────────────────────┐
│                                                      │
│  🌀 AI đang đọc ý tưởng từ nét vẽ phép thuật...    │
│                                                      │
│  ┌────────────────┐                                  │
│  │ 🎨 Bức vẽ      │  ① Gemini đang phân tích... ✅  │
│  │ tay của bé     │  ② Đang sáng tác truyện... 🔄  │
│  │ (từ canvas)    │  ③ Đang tạo hình ảnh 3D... ⏳  │
│  └────────────────┘  ④ Chuẩn bị giọng đọc... ⏳    │
│                                                      │
│  ███████░░░░░░░░░░ 35%                               │
│                                                      │
└─────────────────────────────────────────────────────┘
```

---

## 11. Lộ Trình Triển Khai

### Phase 1: Core (2-3 ngày)

| # | Task | Effort | Priority |
|:---|:---|:---|:---|
| 1 | Install `@mediapipe/tasks-vision` | 🟢 5 phút | P0 |
| 2 | Build `useHandTracking.ts` hook | 🟡 4-6 giờ | P0 |
| 3 | Build `HandDrawingCanvas.tsx` (camera + canvas + vẽ) | 🟡 4-6 giờ | P0 |
| 4 | Build `DrawingToolbar.tsx` | 🟢 1-2 giờ | P0 |
| 5 | Sửa `StoryboardUpload.tsx` (dual mode) | 🟢 1-2 giờ | P0 |
| 6 | Test end-to-end: vẽ tay → export → pipeline → truyện | 🟡 2-3 giờ | P0 |

### Phase 2: Polish (1-2 ngày)

| # | Task | Effort | Priority |
|:---|:---|:---|:---|
| 7 | Thêm animation feedback gesture (pulse, glow) | 🟢 2 giờ | P1 |
| 8 | Mobile optimization (camera trước, touch fallback) | 🟡 3-4 giờ | P1 |
| 9 | Loading state đẹp khi model init | 🟢 1 giờ | P1 |
| 10 | Sound effects (vẽ, xóa, hoàn thành) | 🟢 1 giờ | P2 |

### Phase 3: Nâng cao (tùy chọn)

| # | Task | Effort | Priority |
|:---|:---|:---|:---|
| 11 | Eraser gesture (✌️ hai ngón) | 🟡 2-3 giờ | P2 |
| 12 | AI gợi ý real-time: "Hình này trông giống con mèo!" | 🟡 3-4 giờ | P2 |
| 13 | Lưu lại recording video vẽ tay (time-lapse) | 🔴 4-6 giờ | P3 |

---

## 12. An Toàn & Đạo Đức

| Vấn đề | Giải pháp |
|:---|:---|
| **Camera quyền riêng tư** | Xử lý 100% on-device (MediaPipe WASM), KHÔNG upload video lên server |
| **Chỉ lưu ảnh canvas** | Video camera KHÔNG được ghi hay lưu, chỉ export nét vẽ (canvas) |
| **Xin quyền rõ ràng** | Hiện popup giải thích tại sao cần camera trước khi hỏi permission |
| **Trẻ nhỏ** | Gợi ý "Cùng bố mẹ" — PH hướng dẫn bé sử dụng camera |
| **Không nhận diện khuôn mặt** | MediaPipe Hands CHỈ detect tay, KHÔNG detect mặt |

---

## 13. Tóm Tắt Thay Đổi

| File | Hành động | Mô tả |
|:---|:---|:---|
| `package.json` | **SỬA** | Thêm `@mediapipe/tasks-vision` |
| `useHandTracking.ts` | **MỚI** | Hook quản lý MediaPipe Hands + webcam |
| `HandDrawingCanvas.tsx` | **MỚI** | Component chính: camera + canvas + vẽ + export |
| `DrawingToolbar.tsx` | **MỚI** | Toolbar: màu, cỡ nét, undo, xóa |
| `StoryboardUpload.tsx` | **SỬA** | Thêm 2 tab (Upload ảnh / Vẽ bằng tay) |
| **Server-side** | **KHÔNG SỬA** | Output là file PNG, server nhận bình thường |

---

## 14. Kết Luận

Tính năng "Vẽ Bằng Cử Chỉ Tay" là sự kết hợp hoàn hảo giữa **AI Computer Vision (MediaPipe)** và **pipeline Cỗ Máy Kể Chuyện đã có:**

- ✅ **Effort thấp** — Chỉ cần thêm phần đầu (hand tracking → canvas), phần sau đã sẵn sàng
- ✅ **Chi phí = 0đ** — MediaPipe chạy 100% browser, không tốn API tracking
- ✅ **WOW factor cực cao** — Demo trực tiếp trước BGK EXE101 sẽ rất ấn tượng
- ✅ **An toàn** — Không lưu video, không nhận diện mặt, chỉ track tay
- ✅ **Tương thích ngược** — Không phá vỡ flow upload ảnh hiện tại

> **Bước tiếp theo:** Duyệt plan → Install dependencies → Build core components → Test end-to-end

---

*Tài liệu được tạo: 2026-04-12*  
*Dự án: KidFit Creative Ecosystem — EXE101 @ FPT University*  
*Branch: feature/ai-magic*
