import React from 'react';
import {StyleSheet, Text, Pressable} from 'react-native';

import {AppColor, FontSize} from '../utils/StyleConstant';

type CustomButtonProps = {
  title: string;
  style?: any;
  color?: string;
  titleColor?: string;
  onPress: () => void;
};

const CustomButton = ({
  title,
  style,
  color,
  titleColor,
  onPress,
}: CustomButtonProps) => {
  const defaultColor = color || AppColor.purple;
  const defaultTitleColor = titleColor || AppColor.white;
  return (
    <Pressable
      style={({pressed}) => [
        {backgroundColor: defaultColor},
        {opacity: pressed ? 0.5 : null},
        {...styles.customButton, ...style},
      ]}
      onPress={onPress}>
      <Text style={{...styles.title, color: defaultTitleColor}}>{title}</Text>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  customButton: {
    padding: 8,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: AppColor.white,
    fontSize: FontSize.small,
  },
});
