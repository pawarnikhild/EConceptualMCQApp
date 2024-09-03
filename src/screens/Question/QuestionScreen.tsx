import React, {useContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import AuthContext from '../../context/AuthContext';
import {useAppDispatch, useAppSelector} from '../../redux-toolkit/hooks';
import {calculateResult} from '../../redux-toolkit/slices/resultSlice';

import {StackNavigationParamList} from '../../routes/StackNavigation';
import {fetchQuestions} from '../../redux-toolkit/slices/questionSlice';

import QuestionScreenView from './QuestionScreenView';

const QuestionScreen = () => {
  const authContext = useContext(AuthContext);
  if (authContext === undefined) {
    throw new Error('AuthContext is missing values!');
  }
  const {token} = authContext;

  const dispatch = useAppDispatch();
  const {questions, loading} = useAppSelector(state => state.question);

  const navigation =
    useNavigation<NativeStackNavigationProp<StackNavigationParamList>>();

  const [answers, setAnswers] = useState<{[key: number]: string | null}>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestion?.id] || '';

  useEffect(() => {
    dispatch(fetchQuestions(token));
  }, [token]);

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
          dispatch(calculateResult({questions, answers}));
          navigation.replace('Result');
        },
      },
    ]);
    // dispatch(calculateResult({questions, answers}))
    // navigation.navigate('Result')
  };

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
