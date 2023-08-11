import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import RegistrationScreen from "./components/RegistrationScreen";

export default function App() {
  const [text, onChangeText] = useState("");
  const [number, onChangeNumber] = useState("");
  const [password, onChangePassword] = useState("");
  // const [avatarImg, onChangeavatarImg] = useState(false);
  const img = require("./img/background.jpg");

  return (
    <View style={styles.scrollContainer}>
      <View style={styles.BcgContainer}>
        <ImageBackground
          source={img}
          resizeMode="contain"
          style={styles.bcgImage}
        />
      </View>
      <RegistrationScreen
        text={text}
        onChangeText={onChangeText}
        number={number}
        onChangeNumber={onChangeNumber}
        password={password}
        onChangePassword={onChangePassword}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  BcgContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    flex: 1,
    flexDirection: "column",
  },
  bcgImage: {
    width: "100%",
    height: 850,
    left: 0,
    top: 260,
  },
});
