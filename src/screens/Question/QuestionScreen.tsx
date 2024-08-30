import React, {useContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import AuthContext from '../../context/AuthContext';
import {StackNavigationParamList} from '../../routes/StackNavigation';
import {fetchQuestions} from '../../services/question-services';

import {Answers, Question, Results} from './QuestionTypes';
import QuestionScreenView from './QuestionScreenView';

const QuestionScreen = () => {
  const authContext = useContext(AuthContext);
  if (authContext === undefined) {
    throw new Error('AuthContext is missing values!');
  }
  const {token} = authContext;

  const navigation =
    useNavigation<
      NativeStackNavigationProp<StackNavigationParamList, 'Login'>
    >();

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{[key: number]: string | null}>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestion?.id] || '';

  useEffect(() => {
    loadQuestions();
  }, [token]);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      const result = await fetchQuestions(token);
      if (result.success) {
        setQuestions(result.data);
        console.log('Questions fetched');
      } else {
        console.log('Error in getting questions', result.error);
        Alert.alert('Failure in fetching questions', result.error);
      }
    } catch (error) {
      console.log(
        'Unexpected error in getting questions on QuestionScreen: ',
        JSON.stringify(error),
      );
      Alert.alert('Something went wrong. Kindly try again!');
    } finally {
      setLoading(false);
    }
  };

  const handleValueChange = (newValue: string) => {
    setAnswers(prevAnswers => {
      const currentAnswer = prevAnswers[currentQuestion.id];
      if (currentAnswer === newValue) {
        return {
          ...prevAnswers,
          [currentQuestion.id]: null, // or ''
        };
      } else {
        return {...prevAnswers, [currentQuestion.id]: newValue};
      }
    });
  };

  const handleNextButtonPress = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousButtonPress = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    Alert.alert('Confirm', 'Do you want to submit test ?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Test submission canceled!'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          const results = calculateResults(questions, answers);
          console.log('Results:', results);
          navigation.replace('Result', results);
        },
      },
    ]);
    // const results = calculateResults(questions, answers);
    // console.log('Results:', results);
    // navigation.navigate('Result', results);
  };

  function calculateResults(questions: Question[], answers: Answers): Results {
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
    return {
      correctAnswers: correctAnswersCount,
      wrongAnswers: wrongAnswersCount,
      marksScored: totalMarksScored,
      marksLost,
      totalMarks,
    };
  }

  return (
    <QuestionScreenView
      loading={loading}
      questions={questions}
      currentQuestionIndex={currentQuestionIndex}
      currentQuestion={currentQuestion}
      currentAnswer={currentAnswer}
      handleValueChange={handleValueChange}
      handleNextButtonPress={handleNextButtonPress}
      handlePreviousButtonPress={handlePreviousButtonPress}
      handleSubmit={handleSubmit}
    />
  );
};

export default QuestionScreen;
