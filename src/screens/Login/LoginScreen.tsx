import React, {useState, useContext} from 'react';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {StackNavigationParamList} from '../../routes/StackNavigation';
import {storeToken} from '../../utils/asyncStorage';
import {useAppDispatch} from '../../redux-toolkit/hooks';
import {login} from '../../redux-toolkit/slices/authSlice';

import LoginScreenView from './LoginScreenView';

const LoginScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackNavigationParamList>>();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    let hasError = false;
    setEmailError('');
    setPasswordError('');
    if (!email.trim()) {
      setEmailError('Email is required');
      hasError = true;
    } else if (!/^[\w-.]+@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email.trim())) {
      setEmailError('Invalid email format');
      hasError = true;
    }
    if (!password) {
      setPasswordError('Password is required');
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      hasError = true;
    }
    if (hasError) {
      return;
    } else {
      try {
        const resultAction = await dispatch(login({email, password}));
        // console.log('result in loginScreen', resultAction);
        // email: admin@econceptual.com
        // password: admin-password
        if (login.fulfilled.match(resultAction)) {
          const {token} = resultAction.payload;
          storeToken(token);
          Alert.alert('Login Successful', 'You have logged in successfully!', [
            {
              text: 'Ok',
              onPress: () => navigation.replace('Question'),
            },
          ]);
        } else if (login.rejected.match(resultAction)) {
          const errorMessage = resultAction.payload as string;
          console.log('Error in getting questions', errorMessage);
          Alert.alert('Login Failed', errorMessage);
        }
      } catch (error) {
        console.log(
          'Unexpected error in logging in on LoginScreen: ',
          JSON.stringify(error),
        );
        Alert.alert('Something went wrong. Kindly try again!');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <LoginScreenView
      email={email}
      password={password}
      emailError={emailError}
      passwordError={passwordError}
      loading={loading}
      setEmail={setEmail}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};

export default LoginScreen;
