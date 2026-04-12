export interface VocabularyItem {
    /** Vietnamese word */
    word: string;
    /** Simple meaning explanation in Vietnamese */
    meaning: string;
    /** English translation */
    english: string;
}

export interface QuizItem {
    /** Question text in Vietnamese */
    question: string;
    /** Answer options (3 choices) */
    options: string[];
    /** Index of correct answer (0-based) */
    correct: number;
    /** Bloom's taxonomy level: ghi nhớ | hiểu | phân tích */
    level: string;
}

export interface ReadingData {
    /** Full extracted text from the book page (Vietnamese with diacritics) */
    extractedText: string;
    /** Book type: truyện cổ tích | sách khoa học | sách giáo khoa | thơ | truyện tranh | other */
    bookType: string;
    /** Suitable reading level: 3-4 tuổi | 4-5 tuổi | 5-7 tuổi | 7-9 tuổi | 9-12 tuổi */
    readingLevel: string;
    /** Description of illustrations in the page */
    illustrations: string;
    /** Simple summary of the page content for children */
    summary: string;
    /** Fun fact related to the content */
    funFact: string;
    /** Vocabulary items extracted from the page */
    vocabulary: VocabularyItem[];
    /** Quiz questions (3 levels of Bloom's taxonomy) */
    quiz: QuizItem[];
    /** Vietnamese narration in storytelling tone */
    narration: string;
    /** English narration for bilingual learning */
    narration_en: string;
    /** URL to the uploaded book page image */
    imageUrl: string;
}

export interface ReadingState {
    isProcessing: boolean;
    result: ReadingData | null;
    error: string | null;
}
