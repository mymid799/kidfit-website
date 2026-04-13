# 🎨 THIẾT KẾ SECTION "GIỚI THIỆU" — LANDING PAGE
## Trạng Nguyên Kids 4.0

> **Mục tiêu:** Thiết kế bố cục & nội dung Section "Giới Thiệu" sao cho người đọc (nhà đầu tư, giảng viên EXE, phụ huynh) hiểu ngay dự án làm gì, giải quyết vấn đề gì, và tại sao nên quan tâm — **trong vòng 30 giây cuộn trang**.

---

## 📍 VỊ TRÍ TRÊN LANDING PAGE

Hiện tại Landing Page có cấu trúc:

```
1. ✅ Navigation (sticky header)
2. ✅ Hero Section (3D + Video giới thiệu)
3. ❌ ← CHÈN GIỚI THIỆU Ở ĐÂY ← (chưa có)
4. ✅ Goals Section (6 cards Hệ Sinh Thái)
5. ✅ Team Section (6 thành viên)
6. ✅ Footer
```

**Section mới sẽ nằm giữa Hero và Goals** — vì sau khi người đọc xem Hero/Video xong, họ cần **hiểu bối cảnh vấn đề** trước khi xem giải pháp.

---

## 🧠 NGUYÊN TẮC STORYTELLING

Áp dụng framework **PSPA** (Problem → Solution → Proof → Action):

```
┌────────────────────────────────────────────────────────┐
│  HERO: "Chúng tôi là gì?" (đã có)                     │
├────────────────────────────────────────────────────────┤
│                                                        │
│  BLOCK 1: VẤN ĐỀ → "Tại sao cần chúng tôi?"          │
│           (Gây đồng cảm, tạo urgency)                 │
│                                                        │
│  BLOCK 2: DỰ ÁN LÀ GÌ → "Chúng tôi giải quyết ra    │
│           sao?" (Tổng quan giải pháp)                  │
│                                                        │
│  BLOCK 3: 3 SẢN PHẨM AI → "Xem thử đi!"              │
│           (Demo trực quan)                             │
│                                                        │
│  BLOCK 4: BẰNG CHỨNG → "Ai đã tin tưởng?"             │
│           (Social proof, con số)                       │
│                                                        │
│  BLOCK 5: CTA → "Bắt đầu ngay hôm nay"               │
│           (Chuyển đổi)                                 │
│                                                        │
├────────────────────────────────────────────────────────┤
│  GOALS SECTION (đã có)                                 │
│  TEAM SECTION (đã có)                                  │
└────────────────────────────────────────────────────────┘
```

---

## 📐 BLOCK 1: VẤN ĐỀ (PAIN POINTS)

### Wireframe:

```
┌──────────────────────────────────────────────────────────────────┐
│  Section: bg-gradient light → cream                              │
│                                                                  │
│              ── Bạn Có Biết? ──                                  │
│  "3 mâu thuẫn lớn nhất trong giáo dục mầm non Việt Nam"        │
│                                                                  │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │ 😰              │  │ 📊              │  │ 🎨              │  │
│  │                  │  │                  │  │                  │  │
│  │  CON SỐ LỚN     │  │  CON SỐ LỚN     │  │  CON SỐ LỚN     │  │
│  │  "3-4 giờ/ngày"  │  │  "70% thủ công"  │  │  "Bé ngoan/     │  │
│  │                  │  │                  │  │   chưa ngoan"    │  │
│  │  Mô tả ngắn     │  │  Mô tả ngắn     │  │  Mô tả ngắn     │  │
│  │  (2 dòng)       │  │  (2 dòng)       │  │  (2 dòng)       │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
│                                                                  │
│        ↓ Animated divider (wave or arrow) ↓                     │
└──────────────────────────────────────────────────────────────────┘
```

### Nội dung:

**Heading:** `Bạn Có Biết?`
**Subheading:** `3 mâu thuẫn lớn nhất trong giáo dục mầm non Việt Nam hiện nay`

| # | Emoji | Số liệu nổi bật | Tiêu đề | Mô tả |
|---|---|---|---|---|
| 1 | 😰 | **3-4 giờ/ngày** | Giáo viên kiệt sức với sổ sách | Thay vì ở bên trẻ, giáo viên mầm non tốn phần lớn thời gian soạn giáo án, viết báo cáo, điền sổ sách. |
| 2 | 📊 | **70%** | Nhà trường quản trị bằng Excel | 70% hiệu trưởng mầm non vẫn quản lý nhân sự, tài chính, lịch học bằng file Excel — không có hệ thống cảnh báo sớm. |
| 3 | 🎨 | **"Bé ngoan"** | Đánh giá trẻ dừng ở nhận xét chung | Phụ huynh nhận xét kiểu "Bé ngoan / chưa ngoan" — không có dữ liệu định lượng về tiềm năng nhận thức thực sự của bé. |

### Thiết kế:
- **Background:** Gradient nhẹ `bg-gradient-to-b from-white to-amber-50/30`
- **Cards:** Viền trái đậm (màu đỏ/cam nhẹ gợi "vấn đề"), icon lớn, typography scale
- **Animation:**
  - Số liệu animateNumber đếm từ 0 lên (countUp)
  - 3 cards xuất hiện lần lượt trái → phải (stagger 200ms)
- **Responsive:** Desktop 3 cột, Tablet 2+1, Mobile stack dọc

---

## 📐 BLOCK 2: GIẢI PHÁP (DỰ ÁN LÀ GÌ?)

### Wireframe:

```
┌──────────────────────────────────────────────────────────────────┐
│  Section: bg-white                                               │
│                                                                  │
│  ┌─────────────────────────────┐  ┌────────────────────────────┐ │
│  │                              │  │          VỚI              │ │
│  │   Illustration / Mockup     │  │  TRẠNG NGUYÊN KIDS 4.0    │ │
│  │   (Dashboard preview)       │  │                            │ │
│  │                              │  │  "Một nền tảng duy nhất   │ │
│  │   Có thể dùng ảnh chụp     │  │   kết nối Nhà trường –    │ │
│  │   thật dashboard hoặc      │  │   Giáo viên – Phụ huynh"  │ │
│  │   mockup đẹp                │  │                            │ │
│  │                              │  │  ✅ Bullet 1              │ │
│  │                              │  │  ✅ Bullet 2              │ │
│  │                              │  │  ✅ Bullet 3              │ │
│  │                              │  │  ✅ Bullet 4              │ │
│  │                              │  │                            │ │
│  └─────────────────────────────┘  │  [Khám phá ngay →]        │ │
│                                    └────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
```

### Nội dung:

**Badge:** `💡 Giải pháp`
**Heading:** `Một Nền Tảng Duy Nhất — Ba Hệ Sinh Thái`
**Subheading:** `Trạng Nguyên Kids 4.0 không chỉ là ứng dụng. Đó là Hệ Điều Hành Giáo Dục Mầm Non — nơi AI trở thành trợ lý cho mọi vai trò.`

**4 Bullet Points (với icon):**

| Icon | Nội dung |
|---|---|
| 🏫 | **Cho Nhà Trường:** Dashboard quản trị tập trung — nhân sự, tài chính, lớp học, cơ sở vật chất trên một màn hình. |
| 👩‍🏫 | **Cho Giáo Viên:** AI Copilot soạn giáo án STEAM từ một từ khóa. Tiết kiệm 22 giờ/tuần. |
| 👨‍👩‍👦 | **Cho Phụ Huynh:** Theo dõi hành trình phát triển của bé qua "Hồ sơ Năng lực Ẩn" — không phải điểm số. |
| 🧒 | **Cho Trẻ Em:** Biến mỗi nét vẽ thành phim 3D, mỗi bức tranh thành mô hình xoay 360°. |

**CTA Button:** `Khám phá Hệ sinh thái →`

### Thiết kế:
- **Layout:** 2 cột 50/50 (ảnh trái, nội dung phải), đảo ngược trên mobile
- **Ảnh bên trái:** Screenshot thật của dashboard (hoặc mockup)
  - Có viền bo tròn, shadow lớn `shadow-2xl`
  - Hiệu ứng tilt 3D nhẹ khi hover
- **Animation:**
  - Ảnh: slideIn từ trái
  - Text: fadeInUp stagger
- **Responsive:** Stack dọc trên mobile (ảnh trên, text dưới)

---

## 📐 BLOCK 3: BA SẢN PHẨM AI (DEMO TRỰC QUAN)

### Wireframe:

```
┌──────────────────────────────────────────────────────────────────┐
│  Section: bg-gradient dark (slate-900 → slate-800)               │
│                                                                  │
│        ── Sức Mạnh AI Tích Hợp Sâu ──                           │
│  "3 engine AI đang hoạt động trên nền tảng"                     │
│                                                                  │
│  ┌───────── TAB 1 ─────────┬───── TAB 2 ─────┬─── TAB 3 ───┐  │
│  │  🎬 AI Magic Story      │ 📚 Lesson Plan  │ 🎨 Drawing  │  │
│  └─────────────────────────┴─────────────────┴──────────────┘  │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                                                             │ │
│  │   ┌──────────────────┐     ┌─────────────────────────────┐ │ │
│  │   │                  │     │  TÊN TÍNH NĂNG              │ │ │
│  │   │  Demo Screenshot │     │                             │ │ │
│  │   │  hoặc GIF        │     │  Mô tả ngắn 2-3 câu       │ │ │
│  │   │  hoặc Video      │     │                             │ │ │
│  │   │                  │     │  TRƯỚC         SAU          │ │ │
│  │   │                  │     │  ┌──────┐     ┌──────┐     │ │ │
│  │   │                  │     │  │Nét vẽ│ →→→ │3D HD │     │ │ │
│  │   │                  │     │  └──────┘     └──────┘     │ │ │
│  │   │                  │     │                             │ │ │
│  │   │                  │     │  ⏱️ "30 giây"   🎯 "98%"   │ │ │
│  │   └──────────────────┘     │                             │ │ │
│  │                             │  [Thử ngay →]              │ │ │
│  │                             └─────────────────────────────┘ │ │
│  └─────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
```

### Nội dung cho 3 Tab:

#### Tab 1: 🎬 AI Magic Story
| Thuộc tính | Nội dung |
|---|---|
| **Badge** | `B2C · Trẻ em & Phụ huynh` |
| **Heading** | Cỗ Máy Kể Chuyện AI |
| **Tagline** | *"Mỗi nét vẽ đều ẩn chứa một câu chuyện"* |
| **Mô tả** | Trẻ vẽ bất kỳ thứ gì trên giấy. Upload lên nền tảng. AI phân tích nội dung bức vẽ, tự động sáng tác 5 cảnh phim hoạt hình 3D phong cách Pixar — kèm giọng kể chuyện AI bằng tiếng Việt. |
| **So sánh TRƯỚC/SAU** | `Nét vẽ nguệch ngoạc` → `5 cảnh phim 3D HD` |
| **KPI nhỏ** | ⏱️ 30 giây · 🎯 98% trẻ hào hứng · ✨ Giọng kể Việt/English |
| **CTA** | `Xem Demo →` (link tới `/teacher` > AI Storyboard) |

#### Tab 2: 📚 AI Lesson Planner
| Thuộc tính | Nội dung |
|---|---|
| **Badge** | `B2B · Giáo viên mầm non` |
| **Heading** | Trợ Lý Soạn Giáo Án AI |
| **Tagline** | *"Từ một từ khóa đến giáo án STEAM hoàn chỉnh"* |
| **Mô tả** | Giáo viên chỉ cần nhập chủ đề ("Đại dương", "Mùa mưa"). AI Gemini tự động sinh giáo án STEAM đầy đủ: mục tiêu, hoạt động, câu chuyện dẫn dắt, câu hỏi tương tác — phù hợp chuẩn Bộ GD&ĐT. |
| **So sánh TRƯỚC/SAU** | `3-4 giờ soạn bài` → `30 giây với AI` |
| **KPI nhỏ** | ⏱️ 30 giây · 📋 Chuẩn STEAM · 🎓 3 độ tuổi (3-4, 4-5, 5-6) |
| **CTA** | `Thử soạn giáo án →` |

#### Tab 3: 🎨 Drawing Explorer 3D
| Thuộc tính | Nội dung |
|---|---|
| **Badge** | `B2C · Giáo dục STEAM` |
| **Heading** | Khám Phá Qua Nét Vẽ 3D |
| **Tagline** | *"Bức vẽ con mèo biến thành mô hình 3D xoay 360°"* |
| **Mô tả** | Trẻ vẽ con vật, upload lên. Gemini Vision AI nhận diện chủ đề, chấm điểm chính xác 0-100, đưa ra nhận xét khích lệ bằng tiếng Việt, và render mô hình 3D GLB tương ứng ngay trên trình duyệt. |
| **So sánh TRƯỚC/SAU** | `Bức vẽ trên giấy` → `3D Model xoay 360°` |
| **KPI nhỏ** | 🎨 28 chủ đề · 🧠 AI chấm điểm · 📦 52 mô hình 3D |
| **CTA** | `Thử nhận diện →` |

### Thiết kế:
- **Background:** Dark mode gradient (`slate-900` → `slate-800`) tạo contrast mạnh
- **Tab bar:** Pills nổi, active tab có glow effect
- **Demo area:** 2 cột (ảnh/GIF trái, nội dung phải)
- **TRƯỚC/SAU:** Dùng 2 mini-cards ngang hàng với arrow animation ở giữa
- **Glassmorphism:** Cards trong dark mode dùng `bg-white/5 backdrop-blur border-white/10`
- **Animation:**
  - Tab switch: crossfade 300ms
  - KPI numbers: countUp khi scroll vào viewport
  - Arrow TRƯỚC → SAU: pulse animation

---

## 📐 BLOCK 4: BẰNG CHỨNG XÃ HỘI (SOCIAL PROOF)

### Wireframe:

```
┌──────────────────────────────────────────────────────────────────┐
│  Section: bg-emerald-50/30                                       │
│                                                                  │
│        ── Đối Tác & Số Liệu ──                                  │
│                                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │   4.5M   │  │   50+    │  │    3     │  │    6     │        │
│  │ Trẻ mầm  │  │ Trường   │  │ AI       │  │ Thành    │        │
│  │ non VN   │  │ tiềm năng│  │ Engines  │  │ viên     │        │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘        │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                                                             │ │
│  │  ┌─────────────────┐  ┌─────────────────┐                  │ │
│  │  │  🏫 Logo/Tên    │  │  🎓 Logo/Tên    │                  │ │
│  │  │  Trường Mầm Non │  │  FPT University  │                  │ │
│  │  │  Sao Mai         │  │  Cần Thơ        │                  │ │
│  │  │                  │  │                  │                  │ │
│  │  │  "Nhận xét..."  │  │  "Nhận xét..."  │                  │ │
│  │  └─────────────────┘  └─────────────────┘                  │ │
│  └─────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
```

### Nội dung:

**Heading:** `Được Tin Tưởng Bởi`

**4 Metrics (countUp animation):**

| Số liệu | Label | Ý nghĩa |
|---|---|---|
| **4.5M** | Trẻ mầm non Việt Nam | TAM (tổng thị trường) |
| **50+** | Trường tiềm năng SOM | Mục tiêu năm đầu |
| **3** | AI Engines tích hợp | Gemini + DALL-E + HuggingFace |
| **6** | Thành viên sáng lập | Sinh viên FPT Cần Thơ |

**2 Testimonial Cards:**

| # | Đối tác | Quote (gợi ý) |
|---|---|---|
| 1 | 🏫 **Trường Mầm Non Sao Mai** | *"Trạng Nguyên Kids giúp giáo viên chúng tôi tiết kiệm đáng kể thời gian soạn bài, để tập trung hơn vào việc đồng hành cùng trẻ."* |
| 2 | 🎓 **FPT University Cần Thơ** | *"Dự án thể hiện tư duy sản phẩm trưởng thành và khả năng ứng dụng AI vào thực tiễn giáo dục — xứng đáng hỗ trợ phát triển."* |

### Thiết kế:
- **Background:** Gradient xanh nhạt `from-emerald-50/30 to-white`
- **Metrics:** 4 cột, số lớn (text-5xl font-black), label nhỏ bên dưới
- **Testimonial:** Cards trắng, border trái 4px màu chủ đạo, quote marks lớn
- **Logo đối tác:** Hàng ngang, grayscale → color on hover
- **Animation:** Numbers countUp, cards fadeIn stagger

---

## 📐 BLOCK 5: CTA CHUYỂN ĐỔI

### Wireframe:

```
┌──────────────────────────────────────────────────────────────────┐
│  Section: bg-primary (full-width, green bold)                    │
│                                                                  │
│           "Sẵn sàng thay đổi cách bạn                           │
│            quản trị giáo dục mầm non?"                           │
│                                                                  │
│  ┌──────────────────────┐  ┌──────────────────────────┐          │
│  │  🏫 Cho Nhà Trường   │  │  👩‍🏫 Cho Giáo Viên       │          │
│  │  Đăng ký dùng thử    │  │  Trải nghiệm AI ngay    │          │
│  │  [MIỄN PHÍ 3 THÁNG]  │  │  [THỬ SOẠN GIÁO ÁN]    │          │
│  └──────────────────────┘  └──────────────────────────┘          │
│                                                                  │
│           📞 0961 372 222 · trangnguyenkids4@gmail.com           │
└──────────────────────────────────────────────────────────────────┘
```

### Nội dung:

**Heading:** `Sẵn Sàng Thay Đổi Cách Bạn Quản Trị Giáo Dục Mầm Non?`
**Subheading:** `Tham gia cùng hàng nghìn giáo viên và nhà trường đang chuyển đổi số với Trạng Nguyên Kids 4.0`

**2 CTA buttons:**

| # | Label | Link | Style |
|---|---|---|---|
| 1 | 🏫 **Đăng ký dùng thử MIỄN PHÍ** | `/register` | White bg, green text (primary) |
| 2 | 👩‍🏫 **Trải nghiệm tính năng AI** | `/ai` | Outlined white border |

**Contact info:** `📞 0961 372 222 · ✉️ trangnguyenkids4@gmail.com`

### Thiết kế:
- **Background:** Full-width `bg-primary` (xanh lá đậm #186A3B)
- **Text:** White, centered
- **Buttons:** Lớn, bo tròn pill, hover scale + glow
- **Decorations:** Subtle geometric shapes (circles, dots) ở góc, opacity thấp

---

## 🗂️ TÓM TẮT THỨ TỰ CÁC SECTION SAU KHI CHÈN

```
┌──────────────────────────────────────────┐
│ 🔝 NAVIGATION (sticky)                   │
├──────────────────────────────────────────┤
│ 🦸 HERO (3D + Video)                     │  ← Đã có
├──────────────────────────────────────────┤
│ ❌ BLOCK 1: VẤN ĐỀ (Pain Points)         │  ← MỚI
│    3 cards: Số liệu thực trạng           │
├──────────────────────────────────────────┤
│ 💡 BLOCK 2: GIẢI PHÁP (Dự án là gì)      │  ← MỚI
│    2 cột: Mockup + 4 bullets             │
├──────────────────────────────────────────┤
│ 🤖 BLOCK 3: 3 AI ENGINES (Tab demo)      │  ← MỚI
│    Dark mode, tab switch, so sánh         │
├──────────────────────────────────────────┤
│ 📊 BLOCK 4: SOCIAL PROOF                 │  ← MỚI
│    Metrics + Testimonials                 │
├──────────────────────────────────────────┤
│ 🚀 BLOCK 5: CTA                          │  ← MỚI
│    2 buttons, contact info                │
├──────────────────────────────────────────┤
│ 🎯 GOALS (Hệ Sinh Thái 6 cards)          │  ← Đã có
├──────────────────────────────────────────┤
│ 👥 TEAM (6 thành viên)                   │  ← Đã có
├──────────────────────────────────────────┤
│ 📮 FOOTER                                │  ← Đã có
└──────────────────────────────────────────┘
```

---

## 🎨 HỆ MÀU SẮC & TYPOGRAPHY

### Bảng màu cho từng block:

| Block | Background | Text chính | Accent |
|---|---|---|---|
| Block 1 (Vấn đề) | `white → amber-50/30` | `slate-900` | `red-500/amber-500` (gợi urgency) |
| Block 2 (Giải pháp) | `white` | `slate-900` | `primary green #186A3B` |
| Block 3 (AI Demo) | `slate-900 → slate-800` | `white` | `neon glow, purple/blue` |
| Block 4 (Social Proof) | `emerald-50/30 → white` | `slate-800` | `primary green` |
| Block 5 (CTA) | `primary #186A3B` (full) | `white` | `white buttons` |

### Font Scale:

| Element | Size | Weight |
|---|---|---|
| Section Badge | `text-xs uppercase tracking-widest` | `font-bold` |
| Section Heading | `text-3xl md:text-4xl` | `font-black` |
| Section Subheading | `text-lg` | `font-medium, text-slate-600` |
| Card Title | `text-xl` | `font-bold` |
| Card Desc | `text-sm` | `font-medium, text-slate-600` |
| Big Numbers | `text-5xl md:text-6xl` | `font-black` |

---

## 📱 RESPONSIVE BREAKPOINTS

| Breakpoint | Block 1 | Block 2 | Block 3 | Block 4 | Block 5 |
|---|---|---|---|---|---|
| **Desktop** (lg) | 3 cột | 2 cột 50/50 | 2 cột tab | 4 cột metrics | 2 cột CTA |
| **Tablet** (md) | 3 cột | 2 cột | stack dọc | 2x2 grid | stack dọc |
| **Mobile** (sm) | stack dọc | stack dọc | stack dọc | 2x2 grid | stack dọc |

---

## ✅ ANIMATION CHECKLIST

| Element | Animation | Trigger |
|---|---|---|
| Section headings | `fadeInUp3D` | Scroll into viewport |
| Pain Point cards | `fadeInUp3D stagger` | Scroll, delay 200ms each |
| Big numbers | `countUp` (0 → target) | Scroll into viewport |
| Mockup image | `slideInLeft` | Scroll |
| Bullet points | `fadeInRight stagger` | Scroll, delay 150ms each |
| Tab content | `crossfade` (300ms) | Tab click |
| TRƯỚC → SAU arrow | `pulse` (infinite) | Always |
| CTA buttons | `hover:scale-105 + glow` | Hover |
| Testimonial cards | `fadeIn stagger` | Scroll |

---

## 🔑 NGUYÊN TẮC VÀNG CHO NGƯỜI ĐỌC

1. **Quy tắc 3 giây:** Mỗi block phải truyền tải đúng 1 thông điệp trong 3 giây đầu nhìn vào
2. **Contrast mạnh:** Block Vấn đề (sáng, warm) → Block AI Demo (tối, cool) → CTA (xanh lá, bold)
3. **Số liệu trước, mô tả sau:** Não người đọc số nhanh hơn đọc text
4. **So sánh trực quan:** TRƯỚC/SAU là cách hiệu quả nhất để giải thích AI
5. **Chỉ 1 CTA mỗi block:** Không phân tán sự chú ý

---

> **Tiếp theo:** Sau khi bạn duyệt bản thiết kế này, tôi sẽ code trực tiếp vào `LandingPage.tsx` từng block một.
