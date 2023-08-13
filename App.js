import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { useFonts } from "expo-font";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { LoginScreen, PostsScreen, RegistrationScreen } from "./components";

const initialRegState = {
  name: "",
  email: "",
  password: "",
};

const initialLogState = {
  email: "",
  password: "",
};

export default function App() {
  const [stateReg, setStateReg] = useState(initialRegState);
  const [stateLog, setStateLog] = useState(initialLogState);
  const [isShowKeyboard, setIsShowKeydoard] = useState(false);

  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const keyboardHide = () => {
    setIsShowKeydoard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <RegistrationScreen
          stateReg={stateReg}
          setStateReg={setStateReg}
          isShowKeyboard={isShowKeyboard}
          setIsShowKeydoard={setIsShowKeydoard}
        />
        {/* <LoginScreen
          stateLog={stateLog}
          setStateLog={setStateLog}
          isShowKeyboard={isShowKeyboard}
          setIsShowKeydoard={setIsShowKeydoard}
        /> */}
        {/* <PostsScreen /> */}
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
});
