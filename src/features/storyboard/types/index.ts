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
