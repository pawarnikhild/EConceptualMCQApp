import React from 'react';
import { View, Text, SafeAreaView, ActivityIndicator } from 'react-native';
import { RadioButton } from 'react-native-paper';

import RadioButtonOption from '../../components/RadioButtonOption';
import CustomButton from '../../components/CustomButton';

import { QuestionScreenViewProps } from './QuestionTypes';
import GlobalStyles from '../../utils/GlobalStyles';
import { AppColor } from '../../utils/StyleConstant';
import QuestionScreenStyle from './QuestionScreenStyle';

const QuestionScreenView = ({
  loading,
  questions,
  currentQuestionIndex,
  currentQuestion,
  currentAnswer,
  handleValueChange,
  handleNextButtonPress,
  handlePreviousButtonPress,
  handleSubmit,
}: QuestionScreenViewProps) => {
  return (
    <SafeAreaView style={GlobalStyles.appContainer}>
      {loading || questions.length === 0 ? (
        <View style={QuestionScreenStyle.loadingContainer}>
          <ActivityIndicator size="large" color={AppColor.purple} />
        </View>
      ) : (
        <>
          <View>
            <Text style={QuestionScreenStyle.questionIndexText}>
              Question {currentQuestionIndex + 1}
              <Text style={QuestionScreenStyle.questionIndexText1}>
                /{questions.length}
              </Text>
            </Text>

            <Text style={QuestionScreenStyle.questionText}>
              {questions[currentQuestionIndex].question}
            </Text>
            <RadioButton.Group
              onValueChange={handleValueChange}
              value={currentAnswer}>
              <RadioButtonOption
                label={questions[currentQuestionIndex].option_1}
                value="option_1"
                selectedValue={currentAnswer}
              />
              <RadioButtonOption
                label={questions[currentQuestionIndex].option_2}
                value="option_2"
                selectedValue={currentAnswer}
              />
              <RadioButtonOption
                label={questions[currentQuestionIndex].option_3}
                value="option_3"
                selectedValue={currentAnswer}
              />
              <RadioButtonOption
                label={questions[currentQuestionIndex].option_4}
                value="option_4"
                selectedValue={currentAnswer}
              />
              {currentQuestion.option_5 && (
                <RadioButtonOption
                  label={currentQuestion.option_5}
                  value="option_5"
                  selectedValue={currentAnswer}
                />
              )}
            </RadioButton.Group>
          </View>
          <View style={QuestionScreenStyle.buttonView}>
            {currentQuestionIndex > 0 ? (
              <CustomButton
                title="Previous"
                style={QuestionScreenStyle.customButton}
                onPress={() => {
                  handlePreviousButtonPress();
                }}
              />
            ) : (
              <View></View>
            )}
            {currentQuestionIndex < questions.length - 1 ? (
              <CustomButton
                title="Next"
                style={QuestionScreenStyle.customButton}
                onPress={() => {
                  handleNextButtonPress();
                }}
              />
            ) : (
              <CustomButton
                title="Submit"
                style={QuestionScreenStyle.customButton}
                onPress={() => {
                  handleSubmit();
                }}
              />
            )}
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default QuestionScreenView;
