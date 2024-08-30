import { StyleSheet } from "react-native";
import { AppColor } from "../../utils/StyleConstant";

export default StyleSheet.create({
    scrollView: {
      flexGrow: 1,
    },
    welcomeText: {
      fontSize: 34,
      color: AppColor.red,
    },
    startText: {
      fontSize: 34,
      color: AppColor.orange,
    },
    welcomeImage: {
      width: '90%',
      height: 340,
      borderRadius: 24,
      alignSelf: 'center',
      marginVertical: 16,
    },
    subContainer: {
      paddingHorizontal: 32,
    },
    input: {
      marginVertical: 8,
    },
    forgotPasswordText: {
      textAlign: 'right',
      marginBottom: 8,
      color: AppColor.lightBlue,
    },
    loginButton: {
      marginVertical: 16,
    },
    iconButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 28,
    },
    registerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    registerText: {
      color: AppColor.black,
    },
    registerLink: {
      color: AppColor.orange,
    },
  });