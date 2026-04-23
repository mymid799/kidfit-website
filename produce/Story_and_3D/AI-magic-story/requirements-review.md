# AI Magic Story: Non-Functional Requirements & Quality Assessment

> This document evaluates the feature against school, parent, child, and developer standards.
> **STRATEGIC PIVOT (B2B EdTech):** This feature has shifted from a consumer toy to a B2B preschool assessment tool. The primary value proposition is the AI-generated "Behavioral Evaluation" (Nhận xét hành vi) which maps to Early Childhood Development (ECD) domains, allowing teachers to easily generate student progress reports.

---

## 1. Parent Requirements

| Requirement | Status | Notes |
|---|---|---|
| ✅ Safe content — no violence, fear, or critique | **Met** | Global negative prompt in `VISUAL_NEGATIVE` + guardrail doc enforced at backend prompt level |
| ✅ Educationally defensible (ECD Focus) | **Met** | 12 blueprints mapped to 4 Early Childhood Development domains (Cognitive, SEL, Creativity, Language). The "Nhận xét" is designed as a progress report for teachers. |
| ✅ Lesson summary visible to parent | **Met** | `lessonConclusion.feedback` + `lessonConclusion.lesson` shown in History Timeline |
| ✅ No infinite screen time | **Met** | Session is strictly capped at 3 scenes + 2 interactions (~5 min). No continuation mechanism |
| ✅ Bilingual support | **Met** | All narration in VI + EN. Parent/child can toggle narrator language at any time |
| ✅ Child's drawing preserved | **Met** | Drawing preview stored as ObjectURL; shown in History Timeline with fullscreen view |
| ✅ Quit confirmation | **Met** | Quit button + confirmation modal prevents accidental progress loss |
| ⚠️ Parental pillar weighting | **Planned** | `getRandomBlueprint(pillarFilter)` utility exists but no parent UI to set weekly focus yet |
| ⚠️ Session history persistence | **Not implemented** | All state is in-memory. Closing the tab loses the session permanently. No database persistence |

---

## 2. Child Requirements

| Requirement | Status | Notes |
|---|---|---|
| ✅ Immediate visual feedback | **Met** | Cinematic cross-fade transitions, animated dual-layer image viewer |
| ✅ Audio narration | **Met** | Web Speech API with bilingual voice selection. Toggle on/off freely |
| ✅ Camera capture (not file picker) | **Met** | Live webcam viewfinder via `getUserMedia`. Canvas snapshot on button press |
| ✅ Consistent "Continue" button | **Met** | Button uses CSS opacity (not conditional rendering) — no layout shift. Synced via `window.__storySceneCache` across fullscreen toggles |
| ✅ Fullscreen cinematic mode | **Met** | Header hides, body overflow locked. Auto-exits on interactive phases |
| ✅ Choice cards are tappable | **Met** | Large touch-friendly choice cards with hover/press animations |
| ✅ Drawing is celebrated in history | **Met** | History timeline shows the child's actual drawing with "✏️ Bức vẽ của bé" badge |
| ✅ Narrator toggle doesn't conflict | **Met** | Phase-transition auto-silence only fires once on phase change (not on every render) |
| ⚠️ Background music | **Partially met** | 4 ambient tracks available. Volume at 5% (whisper-quiet). No music selection UI |

---

## 3. Developer Requirements (Non-Functional)

### 3.1 Maintainability ✅

- **Single Source of Truth:** All Biomes, Guardians, and Blueprints live in `worldBible.ts` and are imported by both frontend and backend. Adding a new blueprint = one file edit.
- **Hook-based architecture:** All story state is encapsulated in `useMagicStory`. Components are purely presentational.
- **Typed API contracts:** `magicStoryService.ts` defines fully-typed request/response interfaces. Backend changes will surface as TypeScript errors immediately.
- **Demo Mode:** Any developer can test the full user flow without backend, API keys, or a database via `seed === 123456`. Reduces onboarding friction significantly.

### 3.2 Scalability ✅

- **Blueprint expansion is O(1):** Push a new object to `BLUEPRINTS[]`. Zero code changes elsewhere.
- **Biome/Guardian expansion is O(1):** Same pattern. The `getRandomBlueprint(pillarFilter)` utility auto-includes new entries.
- **AI model is swappable:** The backend routes are a thin wrapper. Swapping Gemini for another LLM only requires changes inside `storyboard.routes.ts` — the hook and UI are unaffected.
- **Image generation model is independent:** Visual prompt strings (`VISUAL_STYLE_SHELL`, `VISUAL_NEGATIVE`) are defined in `worldBible.ts`. Swapping FLUX for another image model requires only prompt format changes there.

### 3.3 Known Technical Debt

| Item | Severity | Description |
|---|---|---|
| Backend 3-Act routes missing | 🔴 High | `/api/story/start`, `/api/story/act2`, `/api/story/act3` are designed but not implemented. **Demo Mode is unaffected** — it never calls the API. However, if a real user uploads their own drawing (`isDemoMode === false`), the fetch hits a dead endpoint and falls back to `phase = 'idle'`. The feature is demo-only until these routes are built. |
| No session persistence | 🟡 Medium | All state is in React memory. A page refresh loses the entire session |
| `kenBurnsInitial` config unused | 🟢 Low | Ken Burns panning config still defined in `StorySceneDisplay.tsx` but the panning animation is only applied to the foreground layer. Safe to clean up later |
| Empathy choices always from blueprint | 🟢 Low | Act 2 backend is designed to allow the backend to override `empathyChoices`, but currently the frontend always uses the blueprint's pre-set choices |

---

## 4. AI Guardrail Compliance

| Rule | Enforced By | Status |
|---|---|---|
| No scary/violent content | `VISUAL_NEGATIVE` constant in `worldBible.ts` | ✅ Code-level |
| "Accept Everything" — no critique | Backend system prompt instruction | ✅ Documented in `ai-guardrails-and-rules.md` |
| 1+1 Rule (max 2 custom variables) | Backend prompt construction design | ✅ Designed, to be enforced when backend is built |
| Narration max 3–4 sentences | Backend system prompt instruction | ✅ Documented, to be enforced when backend is built |
| Consistent visual style (Deconstructed Ghibli) | `VISUAL_STYLE_SHELL` in `worldBible.ts` | ✅ Code-level |
| NPC appearance consistency | Guardian `visualPrompt` field in `worldBible.ts` | ✅ Code-level |

---

## 5. Overall Verdict

The frontend is **production-ready** for demo and stakeholder presentation. The architecture is clean, scalable, and well-typed. Educational integrity is maintained through pre-authored blueprints rather than AI-generated choices.

**Blockers before live launch:**
1. Build the 3 backend API endpoints (`/api/story/start`, `act2`, `act3`)
2. Implement session saving (at minimum, save completed sessions to the `journal` module)
3. Add parent UI for weekly pillar focus weighting
