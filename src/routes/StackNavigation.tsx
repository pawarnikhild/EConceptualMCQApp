import React from 'react';
import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SplashScreen from '../screens/Splash/SplashScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import QuestionScreen from '../screens/Question/QuestionScreen';
import ResultScreen from '../screens/Result/ResultScreen';
import { Results } from '../screens/Question/QuestionTypes';

const Stack = createNativeStackNavigator<StackNavigationParamList>();

export type StackNavigationParamList = {
  Splash: undefined;
  Login: undefined;
  Question: undefined;
  Result: Results
};

// export type ResultScreenRouteProp = RouteProp<StackNavigationParamList, 'Result'>;


const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Question"
          component={QuestionScreen}
          options={{title: 'Map View'}}
        />
        
        <Stack.Screen
          name="Result"
          component={ResultScreen}
          options={{title: 'Map View'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
