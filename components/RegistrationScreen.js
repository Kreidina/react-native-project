import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
} from "react-native";
import RegisterForm from "./RegisterForm";
// import { useState } from "react";

const RegistrationScreen = ({
  name,
  onChangeName,
  email,
  onChangeEmail,
  password,
  onChangePassword,
  isShowKeyboard,
  setIsShowKeydoard,
}) => {
  const bgrImg = require("../img/background.jpg");
  // const avaImg = require('../img/avatar.jpg');
  return (
    <>
      <View style={styles.bgrContainer}>
        <ImageBackground source={bgrImg} style={styles.bgrImage}>
          <View style={styles.formContainer}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <View>
                <View style={styles.avatarBox}></View>
              </View>
              <Text style={styles.title}>Реєстрація</Text>
              <RegisterForm
                name={name}
                onChangeName={onChangeName}
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
  avatarBox: {
    position: "absolute",
    top: -60,
    right: "33%",
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  title: {
    color: "#212121",
    textAlign: "center",
    fontSize: 30,
    fontStyle: "normal",
    fontWeight: "bold",
    letterSpacing: 0.3,
    marginTop: 92,
    marginBottom: 33,
  },
});

export default RegistrationScreen;
//  {
/* <Image
                style={styles.avatar}
                source={require("../img/avatar.jpg")}
              /> */
//  }
