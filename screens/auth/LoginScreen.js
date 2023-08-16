import { StatusBar } from "expo-status-bar";
import { useState } from "react";

import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import LoginForm from "../../components/LoginForm";
import CustomLink from "../../components/CustomLink";

export const LoginScreen = ({ navigation, route }) => {
  const [isShowKeyboard, setIsShowKeydoard] = useState(false);
  const handleAuth = route.params.handleAuth;

  const keyboardHide = () => {
    setIsShowKeydoard(false);
    Keyboard.dismiss();
  };
  const navigatePage = (pageName) => {
    navigation.navigate(pageName);
  };
  const bgrImg = require("../../assets/img/background.jpg");

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <View style={styles.bgrContainer}>
          <ImageBackground source={bgrImg} style={styles.bgrImage}>
            <View style={styles.formContainer}>
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
              >
                <Text style={styles.title}>Увійти</Text>
                <LoginForm
                  isShowKeyboard={isShowKeyboard}
                  setIsShowKeydoard={setIsShowKeydoard}
                  navigatePage={navigatePage}
                  handleAuth={handleAuth}
                />
                {!isShowKeyboard && (
                  <View style={styles.linkForm}>
                    <Text style={styles.linkText}>Немає акаунту? </Text>
                    <CustomLink
                      text="Зареєструватися"
                      onPress={() => navigatePage("Registration")}
                    />
                  </View>
                )}
              </KeyboardAvoidingView>
            </View>
          </ImageBackground>
        </View>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
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
    fontFamily: "Roboto-Medium",
    color: "#212121",
    textAlign: "center",
    fontSize: 30,
    fontStyle: "normal",
    fontWeight: "500",
    letterSpacing: 0.3,
    marginVertical: 33,
  },
  linkForm: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 111,
  },
  linkText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontWeight: "400",
    color: "#1B4371",
  },
});
