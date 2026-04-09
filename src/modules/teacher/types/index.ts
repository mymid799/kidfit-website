export interface StoryboardData {
    story: string;
    drawingUrl: string;
}

export interface StoryboardState {
    isProcessing: boolean;
    result: StoryboardData | null;
    error: string | null;
}
