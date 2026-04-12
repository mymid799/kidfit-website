// ─── SUBJECT SUGGESTION ────────────────────────────────────────────────────
/** One of the available subjects shown as a suggestion when no GLB is matched */
export interface SubjectSuggestion {
    id: string;
    nameVi: string;
    emoji: string;
}

/** A category group of drawable subjects (used in the UI subject picker) */
export interface SubjectGroup {
    group: string;
    emoji: string;
    subjects: SubjectSuggestion[];
}

// ─── ANALYSIS RESULT ────────────────────────────────────────────────────────
/** Full response returned by POST /api/ar/analyze via arService */
export interface ARAnalysisResult {
    /** English identifier Gemini used (lowercase single word) */
    identified: string;
    /** Vietnamese name for display */
    identifiedVi: string;
    /** Representative emoji */
    emoji: string;
    /** 0-100 — how recognizable the drawing is as the identified subject */
    accuracy: number;
    /** Encouraging Vietnamese praise (purely positive, child-friendly) */
    praise: string;
    /** One fun Vietnamese drawing challenge/tip */
    tip: string;
    /** 2-3 wow fun-facts in Vietnamese */
    description: string;
    /** Creative what-if imagination prompt in Vietnamese */
    imagination: string;
    /** 'glb' = real 3D model found, 'none' = no model in library */
    modelType: 'glb' | 'none';
    /** URL to the .glb file, empty string when modelType is 'none' */
    modelUrl: string;
    /** Primary color for lighting/glow (hex) */
    primaryColor: string;
    /** Accent/secondary color (hex) */
    accentColor: string;
    /** Whether a 3D model was found in our GLB library */
    isInLibrary: boolean;
    /** Suggested subjects to draw instead (populated when isInLibrary is false) */
    suggestions: SubjectSuggestion[];
}

// ─── AR STATE ───────────────────────────────────────────────────────────────
export type ARStatus =
    | 'idle'        // Waiting for image input
    | 'analyzing'   // Sending to Gemini, awaiting result
    | 'result'      // Analysis done — showing result
    | 'error';      // Something went wrong

export interface ARState {
    status: ARStatus;
    result: ARAnalysisResult | null;
    error: string | null;
    /** base64 data URL of the uploaded/captured drawing */
    imagePreview: string | null;
    /** Optional label the child typed ("what did you draw?") */
    label: string;
}

// ─── API RESPONSE WRAPPER ────────────────────────────────────────────────────
export interface ARAnalyzeResponse {
    success: boolean;
    data?: ARAnalysisResult;
    error?: string;
    details?: string;
}
