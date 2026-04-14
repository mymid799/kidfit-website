# 🎨 PROMPT: Dashboard "Giải Pháp — Ba Trụ Cột Hệ Sinh Thái"

---

## 🧠 CONTEXT & MỤC TIÊU

Tạo một section React component tên `SolutionDashboard` cho trang landing page của dự án 
**Trạng Nguyên Kids 4.0** — nền tảng EdTech SaaS tích hợp AI cho giáo dục mầm non Việt Nam.

Section này thay thế cho `#program` (Giải Pháp) trên navbar.
Mục tiêu: Người xem hiểu ngay **3 trụ cột** chỉ trong 15 giây đọc đầu tiên.

---

## 🎯 YÊU CẦU KỸ THUẬT

- **Framework:** React 18 + TypeScript
- **Styling:** Vanilla CSS (không dùng Tailwind)
- **Animation:** CSS keyframes + Intersection Observer (như pattern hiện tại của dự án)
- **Font:** Google Fonts `Inter` hoặc `Plus Jakarta Sans`
- **Icon:** Material Symbols Outlined (đã có sẵn trong dự án)
- **Responsive:** Mobile-first, breakpoints tại 768px và 1280px
- **Color Tokens:**
  - `--primary: #186A3B` (Xanh lá đậm — màu chủ đạo dự án)
  - `--accent: #F5A623` (Cam vàng ấm)
  - `--secondary: #3B82F6` (Xanh dương)
  - Background light: `#F8FAFC`
  - Background dark card: `#0F172A`

---

## 🏗️ CẤU TRÚC LAYOUT TỔNG THỂ

```
┌─────────────────────────────────────────────────────────────┐
│  SECTION HEADER                                             │
│  Badge: "Hệ Sinh Thái Toàn Diện"                          │
│  H2: "Một Nền Tảng. Ba Thế Giới. Vô Hạn Tác Động."       │
│  Sub: Mô tả ngắn 1 dòng                                    │
├─────────────────────────────────────────────────────────────┤
│  TAB SWITCHER  [ 🏫 Nhà Trường ] [ 👩‍🏫 Giáo Viên ] [ ✨ Trẻ Em ] │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────────────┐  ┌─────────────────────────┐ │
│  │  LEFT: CONTENT PANEL     │  │  RIGHT: MOCK DASHBOARD  │ │
│  │                          │  │  (Bản xem trước UI)     │ │
│  │  - Badge vai trò         │  │                         │ │
│  │  - H3 tiêu đề trụ cột    │  │  Animated mockup        │ │
│  │  - Mô tả                 │  │  của dashboard thực tế  │ │
│  │  - Feature List (icons)  │  │                         │ │
│  │  - Impact Stats          │  │                         │ │
│  │  - CTA Button            │  │                         │ │
│  └──────────────────────────┘  └─────────────────────────┘ │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  BOTTOM: 3 STATS BAR                                        │
│  [ -80% thời gian ] [ 3+ Dashboard ] [ 6 AI Features ]     │
└─────────────────────────────────────────────────────────────┘
```

---

## 📐 CHI TIẾT TỪNG PHẦN

### SECTION HEADER
```
- Background: bg-slate-50 hoặc trắng với pattern chấm bi nhẹ
- Badge (rounded-full, bg-primary/10, text-primary):
  icon: "hub" + text: "Hệ Sinh Thái Toàn Diện"
- H2 (font-black, text-4xl md:text-5xl):
  "Một Nền Tảng. Ba Thế Giới. Vô Hạn Tác Động."
  → "Ba Thế Giới" highlight màu primary (#186A3B)
- Paragraph (text-slate-500, max-w-2xl, mx-auto):
  "Trạng Nguyên Kids 4.0 kết nối Nhà trường · Giáo viên · Trẻ em
  trong một hệ sinh thái EdTech thống nhất, nơi dữ liệu từ trẻ
  nuôi thông tin cho giáo viên và giúp nhà trường vận hành tốt hơn mỗi ngày."
```

### TAB SWITCHER
```
- 3 tab buttons, dạng pill group (border rounded-2xl)
- Tab active: bg-primary, text-white, shadow-lg
- Tab inactive: bg-white, text-slate-600, hover:bg-slate-100
- Khi click → slide animation chuyển content (transition: 400ms ease)

Tab 1: icon "domain" + "Nhà Trường" + sub "B2B Admin"
Tab 2: icon "school" + "Giáo Viên" + sub "AI Copilot"  
Tab 3: icon "auto_awesome" + "Trẻ Em" + sub "AI Magic Story"
```

---

## 🔵 TAB 1: NHÀ TRƯỜNG (B2B ADMIN)

### LEFT PANEL — Content
```
Badge (rounded-full, bg-amber-100, text-amber-700):
  icon "domain" + "Quản Trị Nhà Trường · B2B"

H3 (text-3xl, font-black, text-slate-900):
  "Dashboard Admin Thông Minh"
  → "Thông Minh" highlight gradient amber→orange

Paragraph (text-slate-600, text-lg, leading-relaxed):
  "Tập trung hóa toàn bộ hoạt động vận hành nhà trường
  trên một màn hình duy nhất. Không còn cảnh chạy từ file
  Excel này sang file Word khác — mọi dữ liệu được đồng
  bộ và phân tích tự động bởi AI."

Feature List (6 items, icon + title + description):
  ┌─ 📊 "Báo cáo vận hành real-time"
  │    "Sĩ số, điểm danh, lịch giảng dạy tự động cập nhật"
  ├─ 👥 "Quản lý nhân sự toàn diện"
  │    "Hồ sơ GV, lịch dạy, đánh giá hiệu suất, phân công lớp"
  ├─ 💰 "Tài chính minh bạch"
  │    "Theo dõi thu học phí, chi phí vận hành, dự toán tự động"
  ├─ 🔔 "Cảnh báo sớm từ AI"
  │    "\"Dự báo khu vực vui chơi cần bảo trì sau 14 ngày\""
  ├─ 📋 "Quản lý hồ sơ học sinh"
  │    "Sức khỏe, phát triển nhận thức, thông tin phụ huynh"
  └─ 🏗️ "Quản lý cơ sở vật chất"
       "Tình trạng thiết bị, phòng học, vật tư giảng dạy"

Impact Stats (2 items dạng row):
  [ -60% ] Thời gian báo cáo hành chính
  [ 4-6h ] Tiết kiệm mỗi tuần cho ban quản lý

CTA Button (rounded-full, bg-amber-500, text-white, hover:scale-105):
  icon "arrow_forward" + "Xem Demo Quản Trị →"
```

### RIGHT PANEL — Mock Dashboard UI
```
Container: rounded-2xl, bg-slate-900, shadow-2xl, overflow-hidden
  padding: 24px
  
  TOP BAR (flex, justify-between):
    Left: 3 traffic light dots (red/yellow/green, size 10px)
    Center: text "Edu-OS Admin · Trường Mầm Non Hạnh Phúc"
    Right: Avatar icon + "Hiệu Trưởng"

  STAT CARDS ROW (grid 3 cols):
    Card 1 (bg-slate-800, rounded-xl, p-4):
      icon "groups" màu amber
      "247" (text-2xl font-black text-white)
      "Học sinh" (text-slate-400 text-xs)
      "+12 tuần này" (text-green-400 text-xs)
    
    Card 2 (bg-slate-800):
      icon "person" màu blue
      "18" 
      "Giáo viên"
      "Đủ biên chế" (text-green-400)
    
    Card 3 (bg-slate-800):
      icon "payments" màu green
      "98.2%"
      "Thu học phí"
      "Tháng 4" (text-slate-400)

  AI ALERT BOX (mt-4, bg-primary/10, border border-primary/30, rounded-xl, p-3):
    icon "smart_toy" màu primary (animate-pulse)
    "AI Cảnh Báo Sớm" (text-primary text-xs font-bold)
    "Khu vực vui chơi ngoài trời cần kiểm tra bảo trì
    trong 14 ngày tới dựa trên tần suất sử dụng."
    (text-slate-300 text-xs)

  MINI BAR CHART (mt-4):
    Label: "Điểm danh tuần này" (text-slate-400 text-xs)
    5 bars (T2→T6): heights 85%, 92%, 78%, 95%, 88%
    color: bg-primary, hover → glow effect
```

---

## 🟢 TAB 2: GIÁO VIÊN (AI COPILOT)

### LEFT PANEL — Content
```
Badge (bg-green-100, text-green-700):
  icon "school" + "AI Copilot Giáo Viên · Workspace"

H3 (text-3xl, font-black):
  "Soạn Giáo Án Trong 30 Giây"
  → "30 Giây" highlight màu primary bold italic

Paragraph:
  "Chỉ cần nhập một từ khóa chủ đề — VD: \"Mùa mưa\", \"Hành tinh\",
  \"Con vật\" — AI Gemini sẽ tự động sinh ra toàn bộ giáo án STEAM
  hoàn chỉnh, cá nhân hóa theo độ tuổi và sĩ số lớp học thực tế."

Feature List (6 items):
  ⚡ "Soạn giáo án tự động" — "Từ khóa → Giáo án hoàn chỉnh, 30 giây"
  📚 "Thư viện 500+ mẫu" — "Phân loại theo chủ đề, độ tuổi, lĩnh vực STEAM"
  🎯 "Cá nhân hóa thông minh" — "AI điều chỉnh theo sĩ số, thiết bị, lịch sử dạy học"
  📝 "Xuất & Chia sẻ" — "Export PDF, chia sẻ với đồng nghiệp 1 click"
  🔄 "Phản hồi vòng lặp" — "AI học từ kết quả tiết dạy, cải thiện liên tục"
  📅 "Lịch giảng dạy thông minh" — "Tự động sắp xếp chủ đề, tránh trùng lặp"

Lesson Plan Structure Accordion (collapsible):
  title "Cấu trúc giáo án AI tạo ra" (text-slate-500, cursor-pointer)
  → Expand: numbered list 7 bước (bg-slate-50, rounded-xl, p-4)
    1. Mục tiêu học tập (5 lĩnh vực phát triển)
    2. Chuẩn bị dụng cụ & vật liệu
    3. Hoạt động khởi động (10 phút)
    4. Nội dung trọng tâm (20 phút)
    5. Trò chơi vận động tích hợp (10 phút)
    6. Câu hỏi gợi mở tư duy
    7. Tiêu chí đánh giá kết quả

Impact Stats:
  [ -80% ] Thời gian soạn bài
  [ 22h ] Tiết kiệm mỗi tuần/giáo viên

CTA (bg-primary):
  icon "auto_awesome" + "Thử AI Soạn Bài Ngay →"
```

### RIGHT PANEL — Mock AI Workspace UI
```
Container: bg-white, rounded-2xl, shadow-xl, border border-slate-200

  TOP: Input bar (bg-slate-100, rounded-xl, p-3, flex)
    Placeholder: "✨ Nhập chủ đề... VD: \"Mùa mưa\""
    Button (bg-primary, rounded-lg, px-4, text-white text-sm):
      "Tạo Giáo Án"

  PROGRESS BAR (mt-3, animated):
    "AI đang tư duy..." 
    thin progress bar (bg-primary, animate from 0→100% in 2s loop)

  RESULT CARD (mt-4, bg-gradient-to-br from-primary/5 to-blue-50, rounded-xl, p-4):
    Header:
      icon "description" màu primary  
      "Giáo Án: Khám Phá Hệ Mặt Trời 🪐" (font-bold text-slate-800)
      Badge "Lớp Lá · 5–6 tuổi · 25 trẻ" (bg-primary/10, rounded-full, text-xs)
    
    Mini step list (mt-3):
      ✅ "Mục tiêu học tập" — 5 lĩnh vực (text-xs text-slate-600)
      ✅ "Hoạt động khởi động" — Bài hát "Bầu trời xanh" (text-xs)
      ✅ "Nội dung trọng tâm" — Mô hình hành tinh 3D (text-xs)
      ✅ "Trò chơi: Phi thuyền vũ trụ" (text-xs)
      ✅ "7 câu hỏi gợi mở" (text-xs)
    
    Footer (flex, justify-between, mt-3):
      "⏱ Tạo xong trong 28 giây" (text-primary text-xs font-bold)
      Button "Export PDF" (bg-slate-900, text-white, text-xs, rounded-lg, px-3 py-1)

  TIME SAVINGS WIDGET (mt-4, bg-amber-50, rounded-xl, p-3, flex items-center gap-3):
    icon "timer" màu amber-500 text-2xl
    div:
      "Bạn vừa tiết kiệm" (text-xs text-slate-500)
      "3 giờ 20 phút" (text-xl font-black text-amber-600)
      "so với soạn thủ công" (text-xs text-slate-400)
```

---

## 🟣 TAB 3: TRẺ EM (AI MAGIC STORY)

### LEFT PANEL — Content
```
Badge (bg-purple-100, text-purple-700):
  icon "auto_awesome" + "AI Magic Story · B2C · Trẻ 3–6 tuổi"

H3 (text-3xl, font-black):
  "Nét Vẽ Của Bé → Thế Giới 3D Pixar"
  → "3D Pixar" gradient purple→blue

Paragraph:
  "Trẻ vẽ một nhân vật bằng nét bút đơn giản. Công nghệ Diffusion AI
  của chúng tôi chuyển hóa tức thì thành nhân vật 3D sống động,
  kèm câu chuyện hoàn chỉnh được AI kể bằng giọng nói tiếng Việt
  tự nhiên — gửi thẳng đến điện thoại phụ huynh."

Feature List (6 items):
  🖼️ "Drawing-to-3D Engine" — "Nét vẽ thô → nhân vật 3D chất lượng cao, 30 giây"
  🎙️ "AI Narrator tiếng Việt" — "Giọng đọc tự nhiên, cảm xúc, phù hợp độ tuổi"
  🌍 "World Builder" — "Trẻ tiếp tục mở rộng thế giới qua nhiều session"
  📱 "Parent Story Feed" — "Phụ huynh nhận video câu chuyện của bé mỗi ngày"
  🏆 "Gallery & Showcase" — "Triển lãm artwork 3D cho trẻ hàng tháng"
  📊 "Cognitive Footprint" — "Mỗi tác phẩm = 1 điểm dữ liệu nhận thức của bé"

Flow Diagram (horizontal steps, 6 bước):
  [Bé vẽ] → [Upload] → [AI nhận diện] → [Sinh 3D] → [Kể chuyện] → [PH nhận video]
  each step: rounded circle + icon + label nhỏ phía dưới
  connector: dashed line với arrow

Impact Stats:
  [ 20–30 ] Tác phẩm/bé/tháng
  [ +70% ] Gắn kết phụ huynh

CTA (bg-purple-600, hover:bg-purple-700):
  icon "brush" + "Xem Demo Trẻ Vẽ 3D →"
```

### RIGHT PANEL — Mock Story Creator UI
```
Container: bg-gradient-to-br from-purple-900 to-blue-900, rounded-2xl
  padding: 24px, text-white

  TOP BAR:
    "✨ AI Magic Story" (text-white font-bold)
    Badge "LIVE" (bg-red-500 animate-pulse rounded-full text-xs px-2)

  DRAWING PREVIEW (mt-4, bg-white/10 rounded-xl p-3):
    2 columns:
    Left: "Nét vẽ gốc của bé" label (text-xs text-white/60)
      → Box (bg-white/5, rounded-lg, h-28, border border-dashed border-white/20)
        → Simple stick-figure drawing (SVG inline hoặc emoji placeholder)
        → "🖍️" centered placeholder nếu không có SVG
    
    Arrow "→" (text-2xl text-white/40, self-center)
    
    Right: "AI Magic 3D Result" label (text-xs text-white/60)
      → Box (bg-gradient-to-br from-purple-500/30 to-blue-500/30, rounded-lg, h-28)
        → "🦄" large emoji centered (placeholder cho 3D render)
        → Sparkle particles animation (CSS ::before pseudo-elements)

  PROCESSING BAR (mt-3):
    "🤖 Diffusion AI đang render..." (text-xs text-white/70)
    thin progress bar (bg-white/10 rounded, inner bg-gradient purple→blue animate-pulse)

  STORY CARD (mt-4, bg-white/10 rounded-xl p-4):
    "📖 Câu Chuyện Của Bé" (text-xs text-white/60)
    italic text (text-white text-sm leading-relaxed):
      "\"Ngày xửa ngày xưa, có một chú kỳ lân tên Mây Trắng
      sống trên đỉnh núi cầu vồng...\"" (truncate 2 dòng)
    
    Footer (flex, justify-between mt-3):
      "🎙️ AI đang kể..." (text-xs text-white/50 + mic icon animate)
      Button "Gửi cho Phụ Huynh" (bg-white text-purple-900 text-xs rounded-lg px-3 py-1 font-bold)

  COGNITIVE TAG (mt-3, flex gap-2 flex-wrap):
    label "Dấu chân nhận thức phát hiện:" (text-xs text-white/50)
    tags: ["Tư duy sáng tạo 🎨", "Kể chuyện ✍️", "Màu sắc 🌈"]
    each: bg-white/10 rounded-full text-xs px-2 py-1
```

---

## 📊 BOTTOM STATS BAR

```
3 stat items, separated by dividers, centered:
Background: bg-slate-900 (dark)
Padding: py-12 px-20

┌────────────────┬─────────────────┬────────────────┐
│   -80%         │     3+          │      6         │
│ Thời gian soạn │ Dashboard       │ AI Features    │
│ giáo án        │ Chuyên biệt     │ Cốt Lõi        │
│                │ (Admin/GV/PH)   │                │
└────────────────┴─────────────────┴────────────────┘

Each stat:
  - Number: text-5xl font-black text-white
  - Label line 1: text-white/80 text-sm font-medium
  - Label line 2: text-white/50 text-xs
  - Animated: count-up effect khi vào viewport
```

---

## ✨ ANIMATION SPEC

```css
/* Tab content transition */
.tab-content {
  animation: slideInRight 400ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* Feature list items */
.feature-item {
  animation: fadeInLeft 300ms ease forwards;
  animation-delay: calc(var(--i) * 80ms); /* stagger */
}

/* Stats counter */
.stat-number {
  animation: countUp 1.5s ease-out forwards;
}

/* Right panel mockup */
.mockup-panel {
  animation: floatUp 4s ease-in-out infinite;
}

/* Progress bar in AI workspace */
.ai-progress {
  animation: fillBar 2s ease infinite;
}
```

---

## 🎨 CSS VARIABLES CẦN THÊM

```css
:root {
  --solution-pillar-1: #F59E0B; /* Nhà Trường — Amber */
  --solution-pillar-2: #186A3B; /* Giáo Viên — Primary Green */
  --solution-pillar-3: #7C3AED; /* Trẻ Em — Purple */
}
```

---

## 📁 FILE CẦN TẠO

```
src/
├── pages/
│   └── LandingPage.tsx          ← Thêm <SolutionDashboard /> vào đây
└── components/
    └── SolutionDashboard/
        ├── index.tsx             ← Component chính
        ├── SolutionDashboard.css ← CSS riêng cho section
        ├── TabSchool.tsx         ← Content Tab Nhà Trường
        ├── TabTeacher.tsx        ← Content Tab Giáo Viên  
        └── TabChild.tsx          ← Content Tab Trẻ Em
```

---

## 🚀 IMPLEMENTATION ORDER

1. Tạo `SolutionDashboard.css` với CSS variables và animation keyframes
2. Build `index.tsx` với tab state management (`useState`)
3. Build từng Tab component (School → Teacher → Child)
4. Tạo mock dashboard UI trong Right Panel bằng div thuần CSS
5. Thêm `useScrollAnimation` hook vào stats bar
6. Import và render trong `LandingPage.tsx` tại vị trí `id="program"`

---

*File này được generate tự động từ hệ thống content dự án.*
*Dùng prompt này với: Claude Sonnet / GPT-4o / v0.dev / Cursor AI*
*© 2026 Trạng Nguyên Kids 4.0 — CreakTech*
