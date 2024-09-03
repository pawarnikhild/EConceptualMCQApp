import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackNavigationParamList} from '../../routes/StackNavigation';

import {useAppDispatch} from '../../redux-toolkit/hooks';
import {setToken} from '../../redux-toolkit/slices/authSlice';
import {retrieveToken} from '../../utils/asyncStorage';

import SplashScreenView from './SplashScreenView';

const SplashScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackNavigationParamList>>();
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const userToken = await retrieveToken();
      if (userToken) {
        console.log('Found token, user has logged in already!');
        // console.log('token', userToken)
        dispatch(setToken(userToken));
        setTimeout(() => {
          navigation.replace('Question');
        }, 2000);
      } else {
        console.log('No user token found, you have to login!');
        setTimeout(() => {
          navigation.replace('Login');
        }, 2000);
      }
    } catch (error) {
      console.error('Failed to check login status', error);
    }
  };
  return <SplashScreenView />;
};

export default SplashScreen;
