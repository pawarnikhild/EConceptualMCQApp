import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {Question, Answers, Result} from '../../screens/Question/QuestionTypes';

const initialState: Result = {
  correctAnswers: 0,
  wrongAnswers: 0,
  marksScored: 0,
  marksLost: 0,
  totalMarks: 0,
};

const resultSlice = createSlice({
  name: 'result',
  initialState,
  reducers: {
    calculateResult: (
      state,
      action: PayloadAction<{questions: Question[], answers: Answers}>,
    ) => {
      const {questions, answers} = action.payload;
      let correctAnswersCount = 0;
      let wrongAnswersCount = 0;
      let marksScored = 0;
      let marksLost = 0;
      let totalMarks = 0;

      questions.forEach(question => {
        const userAnswer = answers[question.id];
        const isAnswered = userAnswer !== undefined;
        if (isAnswered && userAnswer !== null) {
          const correctAnswer = Object.keys(question)
            .filter(
              key =>
                key.startsWith('answer_') &&
                question[key as keyof Question] === true,
            )
            .map(key => key.replace('answer_', ''))
            .join('');
          const isCorrect = `option_${correctAnswer}` === userAnswer;
          if (isCorrect) {
            correctAnswersCount++;
            marksScored += question.correct_mark;
          } else {
            wrongAnswersCount++;
            marksLost += question.incorrect_mark;
          }
        } else if (userAnswer === null) {
          marksScored += question.question_skipped_mark;
        }
        totalMarks += question.correct_mark;
      });
      const totalMarksScored = marksScored + marksLost;
      state.correctAnswers = correctAnswersCount,
      state.wrongAnswers = wrongAnswersCount,
      state.marksScored = totalMarksScored,
      state.marksLost = marksLost,
      state.totalMarks = totalMarks;
      console.log('state', state);
    },
  },
});

export const { calculateResult } = resultSlice.actions;

export default resultSlice.reducer;
