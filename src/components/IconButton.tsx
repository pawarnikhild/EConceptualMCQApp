import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import { AppColor } from '../utils/StyleConstant';

type IconButtonProps = {
  name: string;
  size?: number;
  color?: string;
};

const IconButton = ({ name, size = 24, color = 'black' }: IconButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => console.log('IconButton pressed')}>
      <FontAwesomeIcons name={name} size={size} color={color} />
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  button: {
    width: 80,
    height: 48,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: AppColor.orange,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
