import { useState } from "react";
import { StatusBar } from "expo-status-bar";

import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import RegisterForm from "../../components/RegisterForm";
import CustomLink from "../../components/CustomLink";

export const RegistrationScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeydoard] = useState(false);

  const keyboardHide = () => {
    setIsShowKeydoard(false);
    Keyboard.dismiss();
  };

  const bgrImg = require("../../assets/img/background.jpg");
  const avaImg = require("../../assets/img/avatar.jpg");

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <View style={styles.bgrContainer}>
          <ImageBackground source={bgrImg} style={styles.bgrImage}>
            <View style={styles.formContainer}>
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
              >
                <View>
                  {!isShowKeyboard ? (
                    <View style={styles.avatarBox}>
                      <AntDesign
                        name="pluscircleo"
                        size={25}
                        style={styles.avatarIcon}
                      />
                      <TouchableOpacity
                        style={{ ...styles.avatarIcon, ...styles.avatarLink }}
                        onPress={() => console.log("add")}
                      />
                    </View>
                  ) : (
                    <View style={styles.avatarBox}>
                      <Image source={avaImg} style={styles.avaImg}></Image>
                      <AntDesign
                        name="closecircleo"
                        size={25}
                        style={{ ...styles.avatarIcon, ...styles.deleteIcon }}
                      />
                      <TouchableOpacity
                        style={{ ...styles.avatarIcon, ...styles.avatarLink }}
                        onPress={() => console.log("delete")}
                      />
                    </View>
                  )}
                </View>

                <Text style={styles.title}>Реєстрація</Text>

                <RegisterForm
                  isShowKeyboard={isShowKeyboard}
                  setIsShowKeydoard={setIsShowKeydoard}
                />
                {!isShowKeyboard && (
                  <View style={styles.linkForm}>
                    <Text style={styles.linkText}>Вже є акаунт?</Text>
                    <CustomLink
                      text=" Увійти"
                      onPress={() => navigation.navigate("Login")}
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
  avatarBox: {
    position: "absolute",
    top: -60,
    right: "33%",
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  avaImg: {
    borderRadius: 16,
  },
  avatarIcon: {
    position: "absolute",
    right: -12,
    bottom: 14,
    color: "#FF6C00",
  },
  avatarLink: {
    width: 25,
    height: 25,
  },
  deleteIcon: {
    backgroundColor: "#FFF",
    color: "#E8E8E8",
    borderRadius: 55,
  },
  title: {
    color: "#212121",
    textAlign: "center",
    fontSize: 30,
    fontStyle: "normal",
    fontFamily: "Roboto-Medium",
    fontWeight: "500",
    letterSpacing: 0.3,
    marginTop: 92,
    marginBottom: 33,
  },
  linkForm: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 45,
  },
  linkText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontWeight: "400",
    color: "#1B4371",
  },
});
