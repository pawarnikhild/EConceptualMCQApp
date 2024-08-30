import React from 'react';
import {View, Text, Alert} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {StackNavigationParamList} from '../../routes/StackNavigation';

import ResultScreenView from './ResultScreenView';
import {AppColor} from '../../utils/StyleConstant';
import {sections} from './ResultTypes';
import {removeToken} from '../../utils/asyncStorage';

const ResultScreen = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<StackNavigationParamList, 'Login'>
    >();

  const route = useRoute<RouteProp<StackNavigationParamList, 'Result'>>();

  const results = route.params ?? {
    correctAnswers: 0,
    wrongAnswers: 0,
    marksScored: 0,
    marksLost: 0,
    totalMarks: 0,
  };

  const sections: sections = {
    percentage: [],
    colors: [],
  };

  if (results.marksScored < 0) {
    sections.percentage = [1]; // This requires at least a number which should not be 0 or negative
    sections.colors = [AppColor.grey];
  } else {
    sections.percentage = [
      results.marksScored,
      results.totalMarks - results.marksScored,
    ];
    sections.colors = [AppColor.green, AppColor.red];
  }

  const handleReTakeTest = () => {
    navigation.replace('Question');
  };

  const logout = async () => {
    Alert.alert('Logged out', 'Do you want to log out?', [
      {
        text: 'Go back',
      },
      {
        text: 'logout',
        onPress: async () => {
          try {
            await removeToken();
            navigation.replace('Login');
          } catch (error) {
            console.log('Error in logging out: ', JSON.stringify(error));
            Alert.alert('Something went wrong. Kindly try again!');
          }
        },
      },
    ]);
  };

  return (
    <ResultScreenView
      results={results}
      sections={sections}
      handleReTakeTest={handleReTakeTest}
      logout={logout}
    />
  );
};

export default ResultScreen;
