import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppColor } from '../../utils/StyleConstant';

const SplashScreenView = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>Econceptual</Text>
        <Text style={styles.subtitleText}>App</Text>
      </View>
    </View>
  );
};

export default SplashScreenView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColor.midnightBlue,
  },
  textContainer: {
    alignItems: 'flex-end',
  },
  titleText: {
    fontSize: 46,
    color: AppColor.orange,
    fontWeight: '200',
    letterSpacing: 1.5,
  },
  subtitleText: {
    fontSize: 34,
    color: AppColor.white,
    fontWeight: '100',
  },
});
