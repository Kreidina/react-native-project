import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
} from "react-native";
import LoginForm from "./LoginForm";

const LoginScreen = ({
  email,
  onChangeEmail,
  password,
  onChangePassword,
  isShowKeyboard,
  setIsShowKeydoard,
}) => {
  const bgrImg = require("../img/background.jpg");
  return (
    <>
      <View style={styles.bgrContainer}>
        <ImageBackground source={bgrImg} style={styles.bgrImage}>
          <View style={styles.formContainer}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <Text style={styles.title}>Увійти</Text>
              <LoginForm
                email={email}
                onChangeEmail={onChangeEmail}
                password={password}
                onChangePassword={onChangePassword}
                isShowKeyboard={isShowKeyboard}
                setIsShowKeydoard={setIsShowKeydoard}
              />
            </KeyboardAvoidingView>
          </View>
        </ImageBackground>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  bgrContainer: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  bgrImage: {
    flex: 1,
    resizeMode: "contain",
    justifyContent: "flex-end",
  },
  formContainer: {
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  title: {
    color: "#212121",
    textAlign: "center",
    fontSize: 30,
    fontStyle: "normal",
    fontWeight: "500",
    letterSpacing: 0.3,
    marginVertical: 33,
  },
});
export default LoginScreen;
