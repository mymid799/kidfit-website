# Drawing Explorer 3D — Feature Documentation

> **Sidebar label:** Drawing Explorer 3D  
> **Tab heading:** Drawing Explorer 3D — Khám phá qua nét vẽ ✏️  
> **Dashboard id:** `ar-explorer`  
> **Backend route:** `POST /api/ar/analyze`  
> **Status:** ✅ Live  
> **Last updated:** 2026-04-12

---

## What It Does

Children upload a photo of their drawing. Gemini Vision analyzes it and the feature:

1. **Identifies** what was drawn (any subject)
2. **Rates accuracy** 0–100 → shown as 1–5 stars
3. **Gives Vietnamese feedback** — specific praise + one fun drawing tip
4. **Teaches** — 2-3 wow fun-facts about the subject
5. **Sparks imagination** — a creative "what-if" what-to-draw-next prompt
6. **Renders a 3D model** (GLB from `public/assets/ar-models/`) + **the child's own drawing** as a 3D floating card beside it for direct comparison

If the subject is **not in the model library**, the feature tells the child which subjects they can draw to get a 3D model — no image generation fallback.

---

## User Flow

```
1. Teacher opens "Drawing Explorer 3D" tab in Teacher Dashboard
2. Child uploads drawing (pick from gallery) OR takes a photo (camera modal)
3. Optionally types what they drew → helps Gemini match correctly
4. Taps "Biến hình 3D!" → POST /api/ar/analyze
5. Backend:  Gemini analyzes → maps to GLB registry → returns result
6. Frontend shows:
   ┌─────────────────────────────────────────────────┐
   │  [3D GLB model, auto-rotate]  [Child's drawing] │  <- Both in same 3D scene
   │         ← drag to orbit, scroll to zoom →       │
   └─────────────────────────────────────────────────┘
   • ✅ Giỏi lắm (green)  •  ✏️ Thử thách nhỏ (amber)
   • 🧠 Bạn có biết? (blue)  •  🚀 Tưởng tượng nào! (purple)
7. "Vẽ bức mới!" → shows back-navigation confirm dialog → returns to idle
8. Fullscreen toggle available for 3D viewer
9. If no GLB match → amber notice with 4 random drawable suggestions shown
```

---

## Architecture

```
FRONTEND                            BACKEND (Express)
─────────────────────               ─────────────────────────
TeacherDashboard
  └── AIARExplorerTab               POST /api/ar/analyze
        └── ARExplorer ─────────────────────────────────►
              │                           │
              │                     Gemini Vision (flash-lite-latest)
              │                     → identified: "cat"
              │                     → accuracy: 78
              │                     → praise/tip/description/imagination
              │                           │
              │                     findGlbModel("cat")
              │                     → /assets/ar-models/Cat.glb
              │                           │
              │       ◄───────────────────┘
              │       { success, data: ARAnalysisResult }
              │
              ├── Scene3D (Canvas)
              │    ├── GLBModel (auto-center, 2-unit normalize, float + auto-rotate)
              │    ├── DrawingCard3D (child's image as texture on 3D plane, beside GLB)
              │    └── OrbitControls (camera z=6, drag/zoom freely)
              │
              ├── BackConfirmDialog (shown before reset)
              ├── StarRating (accuracy → 1-5 stars)
              ├── Feedback cards (4 colored cards)
              ├── Not-in-library notice + suggestions
              └── Available subjects grid (clickable chips → autofill label)
```

---

## File Map

```
src/features/ar/
├── README.md                           ← This file
├── types/index.ts
│   ├── SubjectSuggestion               { id, nameVi, emoji }
│   ├── ARAnalysisResult
│   │   ├── identified / identifiedVi / emoji
│   │   ├── accuracy (0-100)
│   │   ├── praise / tip / description / imagination
│   │   ├── modelType: 'glb' | 'none'
│   │   ├── modelUrl (empty if none)
│   │   ├── primaryColor / accentColor
│   │   ├── isInLibrary: boolean
│   │   └── suggestions: SubjectSuggestion[]
│   ├── ARStatus: 'idle' | 'analyzing' | 'result' | 'error'
│   └── ARState / ARAnalyzeResponse
│
├── services/arService.ts
│   └── analyzeImage(dataUrl, label?) → POST /api/ar/analyze
│
├── hooks/useAR.ts
│   ├── DEMO_RESULT (Cat.glb, full Vietnamese content)
│   ├── state (ARState)
│   ├── setLabel / setImagePreview / analyzeImage / loadDemo / reset
│   └── useEffect: window.beforeunload warning when status='result'
│
└── components/
    ├── ARExplorer.tsx            ← Full feature UI
    │   ├── AVAILABLE_SUBJECTS[]         28 subjects (mirrors arRoutes.ts)
    │   ├── GLBModel                     R3F: load GLB, auto-center, float+rotate
    │   ├── DrawingCard3D               R3F: child's drawing on 3D plane (beside model)
    │   ├── LoadingRing                  Green torus spinner
    │   ├── CameraCapture               Fullscreen camera modal
    │   ├── StarRating                   1-5 stars from accuracy %
    │   ├── BackConfirmDialog            Warning before resetting result
    │   ├── Scene3D                      Canvas: GLB(left) + DrawingCard(right), z=6
    │   └── ResultView                   Header, 3D viewer, 4 cards, suggestions

src/routes/arRoutes.ts
│   ├── GLB_MODELS{}                     52 id→filename entries
│   ├── AVAILABLE_SUBJECTS[]             28 subjects exposed to frontend
│   ├── SYNONYM_MAP{}                    60+ word→id aliases (Gemini normalization)
│   ├── findGlbModel(identified)         disk check + URL encoding
│   ├── getRandomSuggestions(exclude)    4 random suggestions when no GLB
│   ├── ANALYZE_PROMPT                   Kid-friendly Gemini system prompt
│   └── POST /api/ar/analyze            Main route

src/components/AIARExplorerTab.tsx       Dashboard tab wrapper (green theme)
src/pages/TeacherDashboard.tsx           Nav: "Drawing Explorer 3D", id='ar-explorer'
```

---

## GLB Model Library — 28 Drawable Subjects

All files are in `public/assets/ar-models/`. Files with spaces in names are URL-encoded automatically.

| Subject | Vietnamese | Emoji | GLB File |
|---|---|---|---|
| cat | Mèo | 🐱 | Cat.glb |
| dog | Chó | 🐶 | Dog.glb |
| rabbit | Thỏ | 🐰 | Bunny.glb |
| bird | Chim | 🐦 | Bird.glb |
| chicken | Gà | 🐓 | Chicken.glb |
| chick | Gà con | 🐤 | Chick.glb |
| duck | Vịt | 🦆 | Ducky.glb |
| fish | Cá | 🐟 | Fish.glb |
| shark | Cá mập | 🦈 | Shark.glb |
| dolphin | Cá heo | 🐬 | Dolphin.glb |
| whale | Cá voi | 🐳 | Whale.glb |
| clownfish | Cá hề | 🤡 | Clownfish.glb |
| frog | Ếch | 🐸 | Frog.glb |
| snake | Rắn | 🐍 | Snake.glb |
| dinosaur | Khủng long | 🦕 | cutedino.glb |
| dragon | Rồng | 🐉 | Dragon Evolved.glb |
| cow | Bò | 🐮 | Cow.glb |
| horse | Ngựa | 🐴 | Horse.glb |
| pig | Lợn | 🐷 | Pig.glb |
| sheep | Cừu | 🐑 | Sheep.glb |
| fox | Cáo | 🦊 | Fox.glb |
| wolf | Sói | 🐺 | Wolf.glb |
| deer | Nai | 🦌 | Deer.glb |
| bat | Dơi | 🦇 | Bat.glb |
| bee | Ong | 🐝 | Bee.glb |
| cactus | Xương rồng | 🌵 | Cactoro.glb |
| zebra | Ngựa vằn | 🦓 | Zebra.glb |
| alpaca | Lạc đà con | 🦙 | Alpaca.glb |

Additional GLBs in the folder are mapped as synonyms (e.g., husky/pug/shiba → dogs, stegosaurus/velociraptor → dinos) via SYNONYM_MAP.

### Adding a new model

**1. Drop the `.glb` file in `public/assets/ar-models/`**

**2. Add an entry to `GLB_MODELS` in `arRoutes.ts`:**
```typescript
penguin: { file: 'Penguin.glb' },
```

**3. Add synonyms if needed:**
```typescript
puffin: 'penguin', seabird: 'penguin',
```

**4. Add to `AVAILABLE_SUBJECTS` in both `arRoutes.ts` and `ARExplorer.tsx`:**
```typescript
{ id: 'penguin', nameVi: 'Chim cánh cụt', emoji: '🐧' },
```

That's it — no other changes needed.

---

## Design Decisions

### No live camera AR
Evolved from "live scan" to "upload & analyze" because:
- Kids draw on paper, in books, in worksheets — a static capture works better for AI analysis
- The educational value is in the **AI feedback** (accuracy score, specific drawing tips), not the AR overlay
- Upload gives Gemini a clean, full-resolution image for best accuracy

### No AI image fallback
When a drawing doesn't match any GLB subject:
- Instead of generating a slow (~30s) AI image, show the kid which subjects they *can* draw to get a 3D model
- Faster, cheaper, more educational ("draw a fish to see its 3D model!")
- The AI still analyzes the drawing and provides feedback regardless

### Camera pulled back to z=6
Some models (Dragon, Shark, Whale) are large. z=6 with fov=45 ensures the whole model is visible on first load. The `OrbitControls minDistance=2` lets kids zoom right in, and they can also go fullscreen.

### Drawing shown as 3D card
The child's drawing is shown as a `DrawingCard3D` — a textured plane floating beside the GLB model in the same 3D scene. This lets the child spin the scene and compare both views at the same angle, which is more engaging than a flat 2D thumbnail.

### Back confirmation
Both the "←" back button and "Vẽ bức mới!" button show a confirmation dialog. The `window.beforeunload` event also warns on browser close/navigation.

### Theme
**Follows KidFit Pro's primary green (`#4cae4f`).**  
No purple/indigo (those were from a previous iteration).

---

## Gemini Prompt Design

The prompt (`ANALYZE_PROMPT` in `arRoutes.ts`) instructs Gemini to act as an enthusiastic art teacher for ages 4-10. Key rules:
- `praise` — purely positive, specific to what's visible in the drawing
- `tip` — framed as a fun game/challenge, never criticism
- `description` — wow facts with exclamation marks, kid vocabulary
- `imagination` — a creative "what-if" to make kids want to draw more immediately
- Colors returned (`primaryColor`, `accentColor`) are used for 3D lighting

---

## Future Roadmap

### Near-term
- Add more GLB models: frog walking, butterfly, horse galloping
- Vietnamese TTS narration for feedback (Web Speech API)
- Sound effect on "Biến hình 3D!" animation

### Medium-term
- Student-facing tab (not teacher-only)
- Save results to DB: drawing_analyses (user_id, identified, accuracy, created_at)
- Teacher progress view: "Your student's cat went from 45% → 78% in one month!"

### Long-term
- Multi-subject detection (e.g., scene with cat + house + sun)
- Custom GLB upload by teacher (school-specific models)
