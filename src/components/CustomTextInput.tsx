import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AppColor } from '../utils/StyleConstant';

type CustomTextInputProps = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  errorMessage: string;
  editable?: boolean;
  secureText?: boolean;
  backgroundColor?: string;
  containerStyle?: object;
};

const CustomTextInput = ({
  placeholder,
  value,
  onChangeText,
  errorMessage,
  editable = true,
  secureText,
  backgroundColor,
  containerStyle,
}: CustomTextInputProps) => {
  const [isSecure, setIsSecure] = useState(secureText);
  const toggleSecureText = () => {
    setIsSecure(prev => !prev);
  };

  return (
    <View style={containerStyle}>
      <View
        style={[
          styles.inputWrapper,
          {backgroundColor :backgroundColor || AppColor.lightgrey},
        ]}>
        <TextInput
          style={[styles.textInput, { width: secureText ? '90%' :'100%'}]}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={'gray'}
          onChangeText={onChangeText}
          secureTextEntry={isSecure}
          editable={editable}
        />
        {secureText && (
          <TouchableOpacity onPress={toggleSecureText}>
            <Ionicons
              name={isSecure ? 'eye-off-outline' : 'eye-outline'}
              size={28}
              color={'orange'}
            />
          </TouchableOpacity>
        )}
      </View>
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  inputWrapper: {
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  textInput: {
    color: 'black',
    paddingVertical: 10,
  },
  errorMessage: {
    color: AppColor.red,
    marginTop: 4,
  },
});
