import React, {useContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import AuthContext from '../../context/AuthContext';
import {useAppDispatch} from '../../redux-toolkit/hooks';
import {calculateResult} from '../../redux-toolkit/slices/resultSlice';

import {StackNavigationParamList} from '../../routes/StackNavigation';
import {fetchQuestions} from '../../services/question-services';

import {Question} from './QuestionTypes';
import QuestionScreenView from './QuestionScreenView';

const QuestionScreen = () => {
  const authContext = useContext(AuthContext);
  if (authContext === undefined) {
    throw new Error('AuthContext is missing values!');
  }
  const {token} = authContext;

  const dispatch = useAppDispatch();

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
