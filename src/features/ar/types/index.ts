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

// ─── PER-MODEL ITEM ─────────────────────────────────────────────────────────
/** One identified subject + its 3D model info (part of a multi-object result) */
export interface ARModelItem {
    /** English identifier (lowercase single word) */
    identified: string;
    /** Vietnamese name for display */
    identifiedVi: string;
    /** Representative emoji */
    emoji: string;
    /** 0-100 — how recognizable the drawing of this subject is */
    accuracy: number;
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
}

// ─── SHARED FEEDBACK ─────────────────────────────────────────────────────────
/** Encouragement text generated for the overall drawing (primary subject focus) */
export interface ARFeedback {
    praise: string;
    tip: string;
    description: string;
    imagination: string;
    /** Populated when the primary subject has no matching GLB */
    suggestions: SubjectSuggestion[];
}

// ─── MULTI-OBJECT RESULT ────────────────────────────────────────────────────
/** Full response: 1-4 detected models + shared feedback */
export interface ARMultiResult {
    /** 1-4 items; always at least 1 (graceful degradation guaranteed) */
    items: ARModelItem[];
    feedback: ARFeedback;
}

// ─── LEGACY ALIAS (keep useAR demo data compiling) ──────────────────────────
/** @deprecated use ARModelItem + ARFeedback instead */
export type ARAnalysisResult = ARModelItem & ARFeedback;

// ─── AR STATE ───────────────────────────────────────────────────────────────
export type ARStatus =
    | 'idle'        // Waiting for image input
    | 'analyzing'   // Sending to Gemini, awaiting result
    | 'result'      // Analysis done — showing result
    | 'error';      // Something went wrong

export interface ARState {
    status: ARStatus;
    /** null until analysis completes; always has ≥1 item on success */
    result: ARMultiResult | null;
    error: string | null;
    /** base64 data URL of the uploaded/captured drawing */
    imagePreview: string | null;
    /** Optional label the child typed ("what did you draw?") */
    label: string;
}

// ─── API RESPONSE WRAPPER ────────────────────────────────────────────────────
export interface ARAnalyzeResponse {
    success: boolean;
    /** New multi-object payload */
    results?: ARModelItem[];
    feedback?: ARFeedback;
    /** Legacy single-object fallback (if backend returned old format) */
    data?: ARAnalysisResult;
    error?: string;
    details?: string;
}
