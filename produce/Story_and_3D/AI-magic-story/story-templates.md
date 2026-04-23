# The Story Blueprint Library

To prevent the AI from generating repetitive or unsafe stories, the backend selects a **Blueprint** randomly from this library. This creates the *illusion* of infinite possibilities while keeping narrative structure educationally controlled.

> **Single Source of Truth:** Blueprints are defined in `src/features/storyboard/data/worldBible.ts` and imported by both frontend AND backend. Do NOT duplicate them.

---

## System Configuration Rules

- **Interaction Alternation (Aspirational):** The system is designed to alternate Draw (high-energy) and Choice (low-energy) blueprints. Currently selection is random from all 12; a `pillarFilter` param exists to weight selection.
- **Parental Override (Planned):** Parents can select a weekly "Focus" (e.g., STEM week), which weights the selection toward specific pillars using the `getRandomBlueprint(pillarFilter)` utility.
- **What the AI generates:** Narration text and scene images only. Choices, prompts, and draw instructions are always pre-authored — never AI-generated. This is a deliberate educational safety decision.

---

## Pillar 1: STEM — Logic & Problem Solving

### 1. `action_adventure` — Cuộc Phiêu Lưu Kỳ Thú (Draw)
- **Concept:** Crossing an uncrossable river.
- **Challenge:** "Ôi không! Có một con sông rất rộng ở phía trước. Làm sao để qua sông đây? Bé hãy vẽ thứ gì đó giúp nhé!"
- **Draw Instruction:** "Bé vẽ một thứ giúp qua sông nhé! (Cầu, thuyền, cánh...)"
- **Guardian:** Clanky the Robot | **Biome:** Whispering Forest
- **Empathy Choices:** Teach fish to jump / Build small dam / Sing a song for the sad fish
- **Reward:** Kỹ Sư Sáng Tạo / Creative Engineer

### 2. `the_builder` — Kiến Trúc Sư Nhí (Draw)
- **Concept:** Building a shelter before a thunderstorm.
- **Challenge:** "Trời sắp mưa to rồi! Bé hãy vẽ một cái mái nhà thật vững chắc để trú mưa nhé!"
- **Draw Instruction:** "Bé vẽ mái nhà hoặc chỗ trú mưa nhé! (Hình tam giác, tròn, vuông...)"
- **Guardian:** Professor Owl | **Biome:** Cloud City
- **Empathy Choices:** Invite everyone inside / Fix Owl's broken house / Teach Owl to build
- **Reward:** Kiến Trúc Sư / Master Architect

### 3. `speed_race` — Cuộc Đua Tốc Độ (Draw)
- **Concept:** A space race — design the fastest vehicle.
- **Challenge:** "Cuộc đua vũ trụ sắp bắt đầu rồi! Bé hãy vẽ một chiếc xe thật nhanh!"
- **Draw Instruction:** "Bé vẽ xe đua, tên lửa, hoặc bất cứ thứ gì nhanh nhất!"
- **Guardian:** Clanky the Robot | **Biome:** Space Station
- **Empathy Choices:** Wait for broken-down Robot / Share fuel / Tow friend to finish together
- **Reward:** Nhanh Như Chớp / Lightning Fast

---

## Pillar 2: EQ — Social-Emotional Learning

### 4. `empathy_test` — Bài Học Yêu Thương (Choice)
- **Concept:** A friend is in need (cold, hungry).
- **Challenge:** "Bạn Thỏ Út Ít đang rất đói và mệt. Mình nên làm gì đây?"
- **Choices:** Share food / Find more food together / Sing a cheering song
- **Guardian:** Tiny Rabbit | **Biome:** Candy Valley
- **Reward:** Tấm Lòng Nhân Hậu / Kind Heart

### 5. `the_mystery` — Điều Bí Ẩn (Choice)
- **Concept:** A strange but non-scary sound.
- **Challenge:** "Ôi! Có tiếng động lạ phía sau bụi cây! Bé sẽ làm gì?"
- **Choices:** Tiptoe to investigate curiously / Call bravely / Wait quietly and listen
- **Guardian:** Professor Owl | **Biome:** Whispering Forest
- **Reward:** Thám Tử Dũng Cảm / Brave Explorer

### 6. `the_great_rescue` — Cuộc Giải Cứu Vĩ Đại (Draw)
- **Concept:** Something cute is stuck high up.
- **Challenge:** "Ồ không! Bạn ngôi sao nhỏ bị mắc kẹt trên cây cao quá! Bé có thể giúp không?"
- **Draw Instruction:** "Bé vẽ thứ gì để với tới trên cao nhé! (Thang, cần cẩu, bóng bay...)"
- **Guardian:** Fanny the Fox | **Biome:** Cloud City
- **Reward:** Anh Hùng Nhỏ / Little Hero

---

## Pillar 3: Arts — Expression & Sensory

### 7. `the_talent_show` — Buổi Biểu Diễn Tài Năng (Draw)
- **Concept:** A forest festival needs a performer.
- **Challenge:** "Lễ hội âm nhạc của khu rừng sắp bắt đầu! Bé hãy vẽ một nhạc cụ thật đặc biệt!"
- **Draw Instruction:** "Bé vẽ nhạc cụ nhé! (Trống, đàn, kèn, hay bất cứ thứ gì kêu to!)"
- **Guardian:** Fanny the Fox | **Biome:** Crystal Ocean
- **Reward:** Siêu Sao / Super Star

### 8. `the_magical_transformation` — Phép Biến Hóa Kỳ Diệu (Choice)
- **Concept:** The hero needs a special power.
- **Challenge:** "Bạn Cáo có một bình thuốc màu huyền bí! Bé chọn màu nào?"
- **Choices:** Red potion (strength) / Blue potion (invisibility) / Yellow potion (fly)
- **Guardian:** Fanny the Fox | **Biome:** Cloud City
- **Reward:** Nhà Giả Kim / Magic Alchemist

### 9. `the_dream_world` — Thế Giới Trong Mơ (Choice)
- **Concept:** The hero falls into a magical dream.
- **Challenge:** "Bé sẽ mơ thấy gì trong giấc mơ huyền diệu?"
- **Choices:** Cotton candy fireworks / Flying whales / A singing rainbow
- **Guardian:** Happy Turtle | **Biome:** Crystal Ocean
- **Reward:** Người Dệt Mơ / Dream Weaver

---

## Pillar 4: Vocabulary & Spatial Awareness

### 10. `the_silly_mishap` — Sự Cố Ngộ Nghĩnh (Draw)
- **Concept:** Floating away after eating a magic fruit.
- **Challenge:** "Ôi trời! Bé ăn phải trái cây ma thuật và bay lên mất rồi! Làm sao để xuống đây?"
- **Draw Instruction:** "Bé vẽ thứ gì để chạm đất nhé! (Vật nặng, neo, dù...)"
- **Guardian:** Happy Turtle | **Biome:** Space Station
- **Reward:** Bậc Thầy Vật Lý / Physics Master

### 11. `hide_and_seek` — Trò Chơi Ẩn Nấp (Choice)
- **Concept:** Looking for a fairy friend — teaches spatial prepositions.
- **Challenge:** "Bạn tiên nhỏ đang trốn đâu đó! Bé tìm ở đâu?"
- **Choices:** Inside the cave / Behind the waterfall / Under the giant leaf
- **Guardian:** Happy Turtle | **Biome:** Whispering Forest
- **Reward:** Thám Tử Siêu Đẳng / Master Detective

### 12. `the_hungry_chef` — Đầu Bếp Nhí Tài Ba (Draw)
- **Concept:** Making the ultimate magic sandwich.
- **Challenge:** "Bạn Thỏ Út Ít đang đói lắm! Bé hãy vẽ món ngon nhất để kẹp vào bánh mì nhé!"
- **Draw Instruction:** "Bé vẽ nguyên liệu nhé! (Pho mát, dâu, cà rốt vũ trụ...)"
- **Guardian:** Tiny Rabbit | **Biome:** Candy Valley
- **Reward:** Bếp Trưởng Kỳ Diệu / Magic Chef

---

## Distribution Summary

| Pillar | Blueprints | Draw | Choice |
|---|---|---|---|
| STEM | 3 | 3 | 0 |
| EQ | 3 | 1 | 2 |
| Arts | 3 | 1 | 2 |
| Vocabulary | 3 | 2 | 1 |
| **Total** | **12** | **7** | **5** |