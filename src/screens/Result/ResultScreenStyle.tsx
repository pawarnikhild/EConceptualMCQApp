import {StyleSheet} from 'react-native';
import {AppColor, FontSize} from '../../utils/StyleConstant';

export default StyleSheet.create({
  heading: {
    textAlign: 'center',
    fontSize: FontSize.heading,
    color: AppColor.black,
  },
  pieChart: {
    marginTop: 40,
    marginBottom: 20,
    alignSelf: 'center',
  },
  textMessage: {
    textAlign: 'center',
    fontSize: FontSize.large,
    color: AppColor.black,
  },
  textView: {
    alignSelf: 'center',
    padding: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  resultText: {
    fontSize: FontSize.medium,
    color: AppColor.black,
  },
  customButton: {
    alignSelf: 'center',
    width: 200,
    marginVertical: 8,
    padding: 8,
  },
});
