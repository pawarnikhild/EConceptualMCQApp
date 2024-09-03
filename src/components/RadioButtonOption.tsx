import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { AppColor } from '../utils/StyleConstant';

interface RadioButtonOptionProps {
  value: string;
  selectedValue: string;
  label: string;
}
const RadioButtonOption = ({
  value,
  selectedValue,
  label,
}: RadioButtonOptionProps) => {
  return (
    <View
      style={[
        styles.optionView,
        {
          borderColor:
            selectedValue === value ? AppColor.purple : AppColor.darkGrey,
        },
      ]}>
      <RadioButton.Item
        value={value}
        label={label}
        color={AppColor.purple}
        labelStyle={{
          color: selectedValue === value ? AppColor.purple : AppColor.darkGrey,
        }}
      />
    </View>
  );
};

export default RadioButtonOption;

const styles = StyleSheet.create({
  optionView: {
    marginVertical: 6,
    borderWidth: 2,
    borderRadius: 8,
  },
});
