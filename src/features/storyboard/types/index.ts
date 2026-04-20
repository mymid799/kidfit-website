// ─── Legacy Types (backward compat with existing StoryboardPlayer) ────────────
export interface StoryScene {
    /** Narration text (Vietnamese) */
    narration: string;
    /** Narration text (English) — for bilingual learning & TTS fallback */
    narration_en: string;
    /** DALL-E visual prompt used to generate the scene image (English) */
    visualPrompt: string;
    /** Brief description of what's happening (Vietnamese) */
    sceneDescription: string;
    /** Emotional tone: happy, curious, brave, calm, excited, magical */
    emotion: 'happy' | 'curious' | 'brave' | 'calm' | 'excited' | 'magical';
    /** Ken Burns camera direction for the scene */
    kenBurns: 'zoom-in' | 'zoom-out' | 'pan-left' | 'pan-right' | 'pan-up' | 'pan-down';
    /** URL to the DALL-E generated image for this scene (empty = use drawing) */
    imageUrl: string;
}

export interface StoryboardData {
    /** Title of the generated story */
    title: string;
    /** Character design description (English) for DALL-E consistency */
    characterDesign: string;
    /** Short character name in Vietnamese (e.g. 'Thỏ Bông') */
    characterName?: string;
    /** A short moral lesson in Vietnamese */
    moralLesson?: string;
    /** Array of story scenes */
    scenes: StoryScene[];
    /** URL to the uploaded drawing */
    drawingUrl: string;
}

export interface StoryboardState {
    isProcessing: boolean;
    result: StoryboardData | null;
    error: string | null;
}

// ─── Interactive "Magic Story" Types ──────────────────────────────────────────

/** The phase the child is currently in */
export type MagicStoryPhase =
    | 'idle'           // Not started — show upload
    | 'uploading'      // Sending drawing to AI
    | 'scene1'         // AI shows arrival scene → child watches
    | 'challenge'      // AI asks the challenge question → child acts (draw/choose)
    | 'processing2'    // Generating Scene 2
    | 'scene2'         // AI shows consequence scene → child watches
    | 'empathy'        // NPC appears, moral choice → child chooses
    | 'processing3'    // Generating Scene 3
    | 'scene3'         // AI shows resolution → child watches
    | 'complete';      // Summary + sticker + play again

/** A single choice card shown to the child */
export interface StoryChoice {
    id: string;
    icon: string;        // Material icon or emoji
    label: string;       // Vietnamese label
    label_en?: string;   // English label (optional)
    /** What happens if this choice is selected (fed to AI for unique branching) */
    consequence?: string;
    consequence_en?: string;
}

/** The biome where the story takes place */
export type BiomeId = 'whispering_forest' | 'candy_valley' | 'cloud_city' | 'space_station' | 'crystal_ocean';

/** The NPC the child encounters */
export type GuardianId = 'professor_owl' | 'tiny_rabbit' | 'clanky_robot' | 'fanny_fox' | 'happy_turtle';

/** Education pillar for parent controls */
export type EducationPillar = 'stem' | 'eq' | 'arts' | 'vocabulary';

/** Interaction type for the challenge phase */
export type InteractionType = 'draw' | 'choice';

/** A story blueprint / template */
export interface StoryBlueprint {
    id: string;
    name: string;
    pillar: EducationPillar;
    interactionType: InteractionType;
    /** The challenge question in Vietnamese */
    challengePrompt: string;
    /** The challenge question in English */
    challengePrompt_en: string;
    /** Choices for 'choice' interaction type */
    choices?: StoryChoice[];
    /** Instruction for 'draw' interaction type */
    drawInstruction?: string;
    drawInstruction_en?: string;
    /** Blueprint-specific empathy/moral choices for Act 3 (instead of generic ones) */
    empathyChoices: StoryChoice[];
    /** What educational lesson this blueprint teaches (used in AI prompt + final nhận xét) */
    educationalGoal: string;
    educationalGoal_en: string;
    /** The NPC that appears in Act 3 */
    guardianId: GuardianId;
    /** Preferred biome (can be overridden) */
    preferredBiome: BiomeId;
    /** Sticker reward name */
    rewardSticker: string;
    rewardSticker_en: string;
}

/** A biome definition */
export interface Biome {
    id: BiomeId;
    name: string;
    name_en: string;
    landmarks: string[];
    visualPrompt: string;
    icon: string;
}

/** An NPC guardian definition */
export interface Guardian {
    id: GuardianId;
    name: string;
    name_en: string;
    personality: string;
    visualPrompt: string;
    icon: string;
    home: BiomeId;
}

/** Data returned from the API for each scene */
export interface MagicSceneData {
    narration: string;
    narration_en: string;
    imageUrl: string;
    emotion: StoryScene['emotion'];
    kenBurns: StoryScene['kenBurns'];
    sceneDescription: string;
}

/** Educational conclusion returned with Act 3 */
export interface LessonConclusion {
    /** Vietnamese feedback on the child's choices */
    feedback: string;
    /** English feedback */
    feedback_en: string;
    /** What the child learned (Vietnamese) */
    lesson: string;
    /** What the child learned (English) */
    lesson_en: string;
    /** The educational pillar this story covered */
    pillar: string;
}

/** Complete state of the interactive story */
export interface MagicStoryState {
    phase: MagicStoryPhase;
    /** The child's uploaded drawing URL (local blob) */
    drawingPreview: string | null;
    /** Character identified by AI */
    characterName: string | null;
    characterDesign: string | null;
    /** Selected blueprint */
    blueprint: StoryBlueprint | null;
    /** Selected biome */
    biome: Biome | null;
    /** Selected guardian */
    guardian: Guardian | null;
    /** Story title */
    title: string | null;
    /** The 3 generated scenes */
    scenes: MagicSceneData[];
    /** Child's challenge answer (choice id or file) */
    challengeAnswer: string | null;
    /** Child's empathy choice */
    empathyAnswer: string | null;
    /** The sticker earned */
    earnedSticker: string | null;
    /** Error message */
    error: string | null;
}
