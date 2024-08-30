import { StyleSheet } from "react-native";
import { FontSize, AppColor } from "../../utils/StyleConstant";

export default StyleSheet.create({
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    questionIndexText: {
      fontSize: FontSize.large,
      color: AppColor.darkGrey
    },
    questionIndexText1: {
      fontSize: FontSize.medium,
      color: AppColor.darkGrey
    },
    questionText: {
      marginVertical: 40,
      fontSize: FontSize.medium,
      color: AppColor.black,
    },
    customButton: {
      width: 120,
      borderRadius: 20,
    },
    buttonView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });