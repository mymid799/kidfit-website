Build a React 18 + TypeScript section component called `SolutionDashboard` for the landing page of **Trạng Nguyên Kids 4.0** — a Vietnamese AI-powered EdTech SaaS platform for kindergarten education. This section replaces `id="program"` in the navbar. Use Vanilla CSS (no Tailwind). Icons use Material Symbols Outlined (already loaded). Fonts: Inter or Plus Jakarta Sans from Google Fonts. Responsive: mobile-first, breakpoints at 768px and 1280px.

---

**COLOR TOKENS:**
- Primary: #186A3B (dark green)
- Pillar 1 (School): #F59E0B (amber)
- Pillar 2 (Teacher): #186A3B (green)
- Pillar 3 (Child): #7C3AED (purple)
- Background: #F8FAFC | Dark card: #0F172A

---

**OVERALL LAYOUT (top → bottom):**

1. SECTION HEADER (centered, white bg with subtle dot pattern)
2. TAB SWITCHER (3 pill tabs)
3. TWO-COLUMN PANEL: Left = content, Right = animated mock UI
4. BOTTOM STATS BAR (dark bg)

---

**SECTION HEADER:**

- Badge (rounded-full, bg-#186A3B/10, text-#186A3B): icon "hub" + text "Hệ Sinh Thái Toàn Diện"
- H2 (font-black, 4xl→5xl): "Một Nền Tảng. Ba Thế Giới. Vô Hạn Tác Động." → "Ba Thế Giới" in #186A3B
- Paragraph (text-slate-500, max-w-2xl, centered): "Trạng Nguyên Kids 4.0 kết nối Nhà trường · Giáo viên · Trẻ em trong một hệ sinh thái EdTech thống nhất, nơi dữ liệu từ trẻ nuôi thông tin cho giáo viên và giúp nhà trường vận hành tốt hơn mỗi ngày."

---

**TAB SWITCHER:**

3 pill buttons inside a rounded-2xl border group.
- Active tab: bg-#186A3B, text-white, box-shadow
- Inactive: bg-white, text-slate-600, hover:bg-slate-100
- On click: slide/fade content in 400ms ease

Tab 1: icon "domain" | label "Nhà Trường" | sub "B2B Admin"
Tab 2: icon "school" | label "Giáo Viên" | sub "AI Copilot"
Tab 3: icon "auto_awesome" | label "Trẻ Em" | sub "AI Magic Story"

---

**TAB 1 — NHÀ TRƯỜNG (B2B ADMIN):**

LEFT PANEL:
- Badge: bg-amber-100, text-amber-700, icon "domain", text "Quản Trị Nhà Trường · B2B"
- H3: "Dashboard Admin Thông Minh" → "Thông Minh" in amber gradient
- Description: "Tập trung hóa toàn bộ hoạt động vận hành nhà trường trên một màn hình duy nhất. Không còn cảnh chạy từ file Excel sang file Word — mọi dữ liệu đồng bộ và phân tích tự động bởi AI."
- 6 feature rows (icon + bold title + description):
  1. icon "bar_chart" — "Báo cáo vận hành real-time" — "Sĩ số, điểm danh, lịch giảng dạy tự động cập nhật"
  2. icon "group" — "Quản lý nhân sự toàn diện" — "Hồ sơ GV, lịch dạy, đánh giá hiệu suất, phân công lớp"
  3. icon "payments" — "Tài chính minh bạch" — "Theo dõi thu học phí, chi phí vận hành, dự toán tự động"
  4. icon "notifications_active" — "Cảnh báo sớm từ AI" — "\"Dự báo khu vực vui chơi cần bảo trì sau 14 ngày\""
  5. icon "folder_shared" — "Quản lý hồ sơ học sinh" — "Sức khỏe, phát triển nhận thức, thông tin phụ huynh"
  6. icon "apartment" — "Quản lý cơ sở vật chất" — "Tình trạng thiết bị, phòng học, vật tư giảng dạy"
- 2 impact stats in a row:
  [ -60% ] "Thời gian báo cáo hành chính"
  [ 4–6h ] "Tiết kiệm mỗi tuần cho ban quản lý"
- CTA button (rounded-full, bg-amber-500, text-white, hover:scale-105): icon "arrow_forward" + "Xem Demo Quản Trị →"

RIGHT PANEL — Mock Admin Dashboard (bg-#0F172A, rounded-2xl, shadow-2xl):
- Top bar: 3 traffic light dots (red/yellow/green) | center text "Edu-OS Admin · Trường Mầm Non Hạnh Phúc" | right: avatar + "Hiệu Trưởng"
- 3 stat cards (grid 3 cols, bg-slate-800, rounded-xl):
  Card 1: icon "groups" amber | "247" white font-black | "Học sinh" slate-400 | "+12 tuần này" green-400
  Card 2: icon "person" blue | "18" | "Giáo viên" | "Đủ biên chế" green
  Card 3: icon "payments" green | "98.2%" | "Thu học phí" | "Tháng 4" slate-400
- AI Alert box (bg-#186A3B/10, border #186A3B/30, rounded-xl): icon "smart_toy" animate-pulse | bold "AI Cảnh Báo Sớm" | body: "Khu vực vui chơi ngoài trời cần kiểm tra bảo trì trong 14 ngày tới dựa trên tần suất sử dụng."
- Mini bar chart: label "Điểm danh tuần này" | 5 bars (T2→T6) heights: 85%, 92%, 78%, 95%, 88% | bg-#186A3B | hover glow

---

**TAB 2 — GIÁO VIÊN (AI COPILOT):**

LEFT PANEL:
- Badge: bg-green-100, text-green-700, icon "school", text "AI Copilot Giáo Viên · Workspace"
- H3: "Soạn Giáo Án Trong 30 Giây" → "30 Giây" in bold italic primary color
- Description: "Chỉ cần nhập một từ khóa chủ đề — VD: \"Mùa mưa\", \"Hành tinh\", \"Con vật\" — AI Gemini sẽ tự động sinh ra toàn bộ giáo án STEAM hoàn chỉnh, cá nhân hóa theo độ tuổi và sĩ số lớp học thực tế."
- 6 feature rows:
  1. icon "bolt" — "Soạn giáo án tự động" — "Từ khóa → Giáo án hoàn chỉnh trong 30 giây"
  2. icon "menu_book" — "Thư viện 500+ mẫu" — "Phân loại theo chủ đề, độ tuổi, lĩnh vực STEAM"
  3. icon "tune" — "Cá nhân hóa thông minh" — "AI điều chỉnh theo sĩ số, thiết bị, lịch sử dạy học"
  4. icon "picture_as_pdf" — "Xuất & Chia sẻ" — "Export PDF, chia sẻ với đồng nghiệp 1 click"
  5. icon "loop" — "Phản hồi vòng lặp" — "AI học từ kết quả tiết dạy, cải thiện liên tục"
  6. icon "calendar_month" — "Lịch giảng dạy thông minh" — "Tự động sắp xếp chủ đề, tránh trùng lặp"
- Collapsible accordion "Cấu trúc giáo án AI tạo ra" → expand: numbered list 7 steps:
  1. Mục tiêu học tập (5 lĩnh vực phát triển)
  2. Chuẩn bị dụng cụ & vật liệu
  3. Hoạt động khởi động (10 phút)
  4. Nội dung trọng tâm (20 phút)
  5. Trò chơi vận động tích hợp (10 phút)
  6. Câu hỏi gợi mở tư duy
  7. Tiêu chí đánh giá kết quả
- 2 impact stats: [ -80% ] "Thời gian soạn bài" | [ 22h ] "Tiết kiệm mỗi tuần/giáo viên"
- CTA (bg-#186A3B): icon "auto_awesome" + "Thử AI Soạn Bài Ngay →"

RIGHT PANEL — Mock AI Workspace (bg-white, border border-slate-200, rounded-2xl, shadow-xl):
- Input bar (bg-slate-100, rounded-xl): placeholder "✨ Nhập chủ đề... VD: \"Mùa mưa\"" | button "Tạo Giáo Án" (bg-#186A3B, text-white)
- Progress bar: label "AI đang tư duy..." | thin bar animating 0→100% loop (bg-#186A3B)
- Result card (bg-gradient from-#186A3B/5 to-blue-50, rounded-xl):
  Header: icon "description" primary | "Giáo Án: Khám Phá Hệ Mặt Trời 🪐" font-bold | badge "Lớp Lá · 5–6 tuổi · 25 trẻ" bg-primary/10
  5 checkmark rows: ✅ "Mục tiêu học tập" | ✅ "Khởi động: Bài hát Bầu trời xanh" | ✅ "Nội dung: Mô hình hành tinh 3D" | ✅ "Trò chơi: Phi thuyền vũ trụ" | ✅ "7 câu hỏi gợi mở"
  Footer: "⏱ Tạo xong trong 28 giây" text-primary | button "Export PDF" bg-slate-900 text-white
- Time savings widget (bg-amber-50, rounded-xl, flex): icon "timer" amber | "Bạn vừa tiết kiệm" text-xs | "3 giờ 20 phút" text-xl font-black text-amber-600 | "so với soạn thủ công" text-xs

---

**TAB 3 — TRẺ EM (AI MAGIC STORY):**

LEFT PANEL:
- Badge: bg-purple-100, text-purple-700, icon "auto_awesome", text "AI Magic Story · B2C · Trẻ 3–6 tuổi"
- H3: "Nét Vẽ Của Bé → Thế Giới 3D Pixar" → "3D Pixar" gradient purple→blue
- Description: "Trẻ vẽ một nhân vật bằng nét bút đơn giản. Công nghệ Diffusion AI chuyển hóa tức thì thành nhân vật 3D sống động, kèm câu chuyện được AI kể bằng giọng nói tiếng Việt tự nhiên — gửi thẳng đến điện thoại phụ huynh."
- 6 feature rows:
  1. icon "image" — "Drawing-to-3D Engine" — "Nét vẽ thô → nhân vật 3D chất lượng cao trong 30 giây"
  2. icon "mic" — "AI Narrator tiếng Việt" — "Giọng đọc tự nhiên, cảm xúc, phù hợp theo độ tuổi"
  3. icon "public" — "World Builder" — "Trẻ tiếp tục mở rộng thế giới qua nhiều session"
  4. icon "smartphone" — "Parent Story Feed" — "Phụ huynh nhận video câu chuyện của bé mỗi ngày"
  5. icon "emoji_events" — "Gallery & Showcase" — "Triển lãm artwork 3D cho trẻ hàng tháng"
  6. icon "insights" — "Cognitive Footprint" — "Mỗi tác phẩm = 1 điểm dữ liệu nhận thức của bé"
- Horizontal flow diagram (6 steps with icons + labels + dashed connectors):
  [🖍️ Bé vẽ] → [📤 Upload] → [🤖 AI nhận diện] → [✨ Sinh 3D] → [🎙️ Kể chuyện] → [📱 PH nhận video]
- 2 impact stats: [ 20–30 ] "Tác phẩm/bé/tháng" | [ +70% ] "Gắn kết phụ huynh"
- CTA (bg-purple-600, hover:bg-purple-700): icon "brush" + "Xem Demo Trẻ Vẽ 3D →"

RIGHT PANEL — Mock Story Creator (bg-gradient-to-br from-purple-900 to-blue-900, rounded-2xl, text-white):
- Top bar: "✨ AI Magic Story" font-bold | badge "LIVE" bg-red-500 animate-pulse
- Drawing preview (bg-white/10, rounded-xl, grid 2 cols + center arrow):
  Left: label "Nét vẽ gốc của bé" | box (border-dashed border-white/20) with "🖍️" placeholder
  Center: "→" text-white/40
  Right: label "AI Magic 3D Result" | box (bg-gradient purple/30→blue/30) with "🦄" + sparkle animation
- Processing bar: "🤖 Diffusion AI đang render..." | progress gradient purple→blue animate-pulse
- Story card (bg-white/10, rounded-xl): "📖 Câu Chuyện Của Bé" | italic: "\"Ngày xửa ngày xưa, có một chú kỳ lân tên Mây Trắng sống trên đỉnh núi cầu vồng...\"" (2-line clamp) | footer: "🎙️ AI đang kể..." + button "Gửi cho Phụ Huynh" bg-white text-purple-900
- Cognitive tags row: label "Dấu chân nhận thức phát hiện:" | tags: ["Tư duy sáng tạo 🎨", "Kể chuyện ✍️", "Màu sắc 🌈"] each bg-white/10 rounded-full text-xs

---

**BOTTOM STATS BAR (bg-#0F172A, py-16):**

3 stats centered with vertical dividers:
- "-80%" | "Thời gian soạn giáo án" | "So với phương pháp thủ công"
- "3+" | "Dashboard Chuyên Biệt" | "Admin · Giáo Viên · Phụ Huynh"
- "6" | "AI Features Cốt Lõi" | "Tích hợp Gemini & Diffusion AI"
Numbers: text-5xl font-black text-white, animated count-up on viewport entry.

---

**ANIMATIONS:**
- Tab content: slideInRight 400ms cubic-bezier(0.4,0,0.2,1) on tab switch
- Feature list: fadeInLeft stagger 80ms per item via CSS --i variable
- Stats bar: countUp 1.5s ease-out on scroll into view (Intersection Observer)
- Right mock panel: subtle floatUp 4s ease-in-out infinite
- AI progress bar: fillBar 2s ease infinite loop

**CSS VARIABLES TO ADD:**
```css
:root {
  --pillar-school: #F59E0B;
  --pillar-teacher: #186A3B;
  --pillar-child: #7C3AED;
}
```

**FILE STRUCTURE:**
```
src/components/SolutionDashboard/
  ├── index.tsx          (main component, tab state with useState)
  ├── SolutionDashboard.css
  ├── TabSchool.tsx
  ├── TabTeacher.tsx
  └── TabChild.tsx
```
Import into LandingPage.tsx at position `id="program"`.
