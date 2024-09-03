import React from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { StackNavigationParamList } from '../../routes/StackNavigation';
import { useAppSelector } from '../../redux-toolkit/hooks';
import { removeToken } from '../../utils/asyncStorage';

import { sections } from './ResultTypes';
import { AppColor } from '../../utils/StyleConstant';
import ResultScreenView from './ResultScreenView';

const ResultScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackNavigationParamList>>();

  const result = useAppSelector(state => state.result);

  const sections: sections = {
    percentage: [],
    colors: [],
  };

  if (result.marksScored < 0) {
    sections.percentage = [1]; // This requires at least a number which should not be 0 or negative
    sections.colors = [AppColor.grey];
  } else {
    sections.percentage = [
      result.marksScored,
      result.totalMarks - result.marksScored,
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
      result={result}
      sections={sections}
      handleReTakeTest={handleReTakeTest}
      logout={logout}
    />
  );
};

export default ResultScreen;
