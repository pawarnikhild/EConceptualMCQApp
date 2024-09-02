import React from 'react';
import {SafeAreaView, StatusBar, Text, View} from 'react-native';
//@ts-ignore
import PieChart from 'react-native-pie-chart';

import CustomButton from '../../components/CustomButton';

import {ResultScreenViewProps} from './ResultTypes';
import GlobalStyles from '../../utils/GlobalStyles';
import {AppColor} from '../../utils/StyleConstant';
import ResultScreenStyle from './ResultScreenStyle';

const ResultScreenView = (props: ResultScreenViewProps) => {
  const {result, sections, handleReTakeTest, logout} = props;
  return (
    <SafeAreaView style={GlobalStyles.appContainer}>
      <StatusBar />
      <View>
        <Text style={ResultScreenStyle.heading}>Your Score</Text>
        <PieChart
          widthAndHeight={250}
          series={sections.percentage}
          sliceColor={sections.colors}
          // doughnut={true}
          coverRadius={0.775}
          coverFill={'#FFF'}
          style={ResultScreenStyle.pieChart}
        />
        {result.marksScored <= 0 ? (
          <Text style={[ResultScreenStyle.textMessage, {color: AppColor.red}]}>
            Keep trying!{'\n'}You scored {result.marksLost}/
            {result.totalMarks} marks.
          </Text>
        ) : (
          <Text
            style={[ResultScreenStyle.textMessage, {color: AppColor.green}]}>
            Great job!{'\n'} You scored {result.marksScored}/
            {result.totalMarks} marks.
          </Text>
        )}
        <View style={ResultScreenStyle.textView}>
          <View style={ResultScreenStyle.row}>
            <Text style={ResultScreenStyle.resultText}>Correct Answers:</Text>
            <Text style={[ResultScreenStyle.resultText, {marginLeft: 30}]}>
              {result.correctAnswers}
            </Text>
          </View>
          <View style={ResultScreenStyle.row}>
            <Text style={ResultScreenStyle.resultText}>Wrong Answers:</Text>
            <Text style={[ResultScreenStyle.resultText, {marginLeft: 30}]}>
              {result.wrongAnswers}
            </Text>
          </View>
          <View style={ResultScreenStyle.row}>
            <Text style={ResultScreenStyle.resultText}>Marks scored:</Text>
            <Text style={[ResultScreenStyle.resultText, {marginLeft: 30}]}>
              {result.marksScored}
            </Text>
          </View>
          <View style={ResultScreenStyle.row}>
            <Text style={ResultScreenStyle.resultText}>Marks lost:</Text>
            <Text style={[ResultScreenStyle.resultText, {marginLeft: 30}]}>
              {result.marksLost}
            </Text>
          </View>
          <View style={ResultScreenStyle.row}>
            <Text style={ResultScreenStyle.resultText}>Total marks:</Text>
            <Text style={[ResultScreenStyle.resultText, {marginLeft: 30}]}>
              {result.totalMarks}
            </Text>
          </View>
        </View>
      </View>
      <View>
        <CustomButton
          title="Take Test Again"
          style={ResultScreenStyle.customButton}
          onPress={handleReTakeTest}
        />
        <CustomButton
          title="Logout"
          color={AppColor.black}
          style={ResultScreenStyle.customButton}
          onPress={logout}
        />
      </View>
    </SafeAreaView>
  );
};

export default ResultScreenView;
