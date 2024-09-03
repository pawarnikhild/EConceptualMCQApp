export type Question = {
    id: number;
    question: string;
    option_1: string;
    option_2: string;
    option_3: string;
    option_4: string;
    option_5?: string;
    answer_1: boolean;
    answer_2: boolean;
    answer_3: boolean;
    answer_4: boolean;
    answer_5?: boolean;
    correct_mark: number;
    incorrect_mark: number;
    question_skipped_mark: number;
}

export type Answers = { [key: number]: string | null }

export type Result = {
    correctAnswers: number;
    wrongAnswers: number;
    marksScored: number;
    marksLost: number;
    totalMarks: number;
}