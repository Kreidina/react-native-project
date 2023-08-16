import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { useState } from "react";

import { Navigator } from "./router";

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleAuth = () => {
    setIsAuth(true);
  };
  return <Navigator isAuth={isAuth} handleAuth={handleAuth} />;
}
