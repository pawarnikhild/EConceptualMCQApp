import { Question } from "../../types/CommonTypes"

export type QuestionScreenViewProps = {
    loading: boolean,
    questions: Question[],
    currentQuestionIndex: number,
    currentQuestion: Question,
    currentAnswer: string,
    handleValueChange: (value: string) => void,
    handleNextButtonPress: () => void,
    handlePreviousButtonPress: () => void,
    handleSubmit: () => void,
}

