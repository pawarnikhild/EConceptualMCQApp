import React from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import IconButton from '../../components/IconButton';

import {LoginScreenViewProps} from './LoginTypes';
import GlobalStyles from '../../utils/GlobalStyles';
import {AppColor} from '../../utils/StyleConstant';
import LoginScreenStyle from './LoginScreenStyle';

const LoginScreenView = ({
  email,
  password,
  emailError,
  passwordError,
  loading,
  setEmail,
  setPassword,
  handleSubmit,
}: LoginScreenViewProps) => {
  return (
    <SafeAreaView style={GlobalStyles.appContainer}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={30}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={LoginScreenStyle.scrollView}>
            <Spinner
              visible={loading}
              textContent={'Loading...'}
              color="orange"
            />
            <Text style={LoginScreenStyle.welcomeText}>Welcome back!</Text>
            <Text style={LoginScreenStyle.startText}>Let's start now</Text>
            <Image
              source={{
                uri: 'https://img.freepik.com/premium-psd/psd-white-t-shirt-mockup-with-flowerpot-background_1168401-34.jpg',
              }}
              style={LoginScreenStyle.welcomeImage}
            />
            <View style={LoginScreenStyle.subContainer}>
              <CustomTextInput
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                backgroundColor={AppColor.lightgrey}
                containerStyle={LoginScreenStyle.input}
                errorMessage={emailError}
              />
              <CustomTextInput
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                backgroundColor={AppColor.lightgrey}
                containerStyle={LoginScreenStyle.input}
                secureText={true}
                errorMessage={passwordError}
              />
              <TouchableOpacity
                onPress={() => console.log('Forgot Password pressed')}>
                <Text style={LoginScreenStyle.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
              <CustomButton
                title="Login"
                style={LoginScreenStyle.loginButton}
                onPress={() => {
                  handleSubmit();
                }}
              />
              <View style={LoginScreenStyle.iconButtonContainer}>
                <IconButton name="facebook" size={24} color={AppColor.orange} />
                <IconButton name="apple" size={24} color={AppColor.orange} />
                <IconButton name="google" size={24} color={AppColor.orange} />
              </View>
              <View style={LoginScreenStyle.registerContainer}>
                <Text style={LoginScreenStyle.registerText}>Don't have an account? </Text>
                <TouchableOpacity
                  onPress={() => console.log('Register Now pressed')}>
                  <Text style={LoginScreenStyle.registerLink}>Register Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreenView;
