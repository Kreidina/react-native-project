import "react-native-gesture-handler";
import { useFonts } from "expo-font";
// import { NavigationContainer } from "@react-navigation/native";

// import useRoute from "./router";
import { useState } from "react";
import { Navigator } from "./router";
// import { createStackNavigator } from "@react-navigation/stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { AntDesign, Feather } from "@expo/vector-icons";

// import { RegistrationScreen, LoginScreen, Home } from "./screens/auth";
// import {
//   PostsScreen,
//   ProfileScreen,
//   CreatePostsScreen,
// } from "./screens/mainScreens";
// import { StyleSheet } from "react-native";

// const AuthStack = createStackNavigator();
// const MainTab = createBottomTabNavigator();

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });
  // const routing = useRoute(enter);

  if (!fontsLoaded) {
    return null;
  }
  const handleAuth = () => {
    setIsAuth(true);
  };
  return <Navigator isAuth={isAuth} handleAuth={handleAuth} />;
}
// const styles = StyleSheet.create({
//   iconPlus: {
//     textAlign: "center",
//     color: "#fff",
//     paddingVertical: 12,
//     backgroundColor: "#FF6C00",
//     width: 70,
//     borderRadius: 19,
//   },
// });
// export default function App() {
//   const [isAuth, setIsAuth] = useState(false);
//   const [fontsLoaded] = useFonts({
//     "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
//     "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
//     "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
//   });
//   const routing = useRoute(isAuth);

//   if (!fontsLoaded) {
//     return null;
//   }

//   return <NavigationContainer>{routing}</NavigationContainer>;
// }
