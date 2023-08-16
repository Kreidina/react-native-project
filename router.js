import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, Feather } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";

import { RegistrationScreen, LoginScreen, Home } from "./screens/auth";
import {
  PostsScreen,
  ProfileScreen,
  CreatePostsScreen,
} from "./screens/mainScreens";
import { StyleSheet } from "react-native";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

export const Navigator = ({ isAuth, handleAuth }) => {
  return (
    <NavigationContainer>
      {isAuth ? (
        <MainTab.Navigator
          initialRouteName="Posts"
          screenOptions={{ headerShown: false, tabBarShowLabel: false }}
        >
          <MainTab.Screen
            name="Posts"
            component={PostsScreen}
            options={{
              tabBarActiveTintColor: "#FF6C00",
              tabBarInactiveTintColor: "rgba(33, 33, 33, 0.8)",
              tabBarIcon: ({ focused, size, color }) => (
                <AntDesign name="appstore-o" size={size} color={color} />
              ),
            }}
          />
          <MainTab.Screen
            name="Create"
            component={CreatePostsScreen}
            options={{
              tabBarInactiveTintColor: "rgba(33, 33, 33, 0.8)",
              tabBarIcon: ({ focused, size, color }) => (
                <AntDesign name="plus" size={16} style={styles.iconPlus} />
              ),
            }}
          />
          <MainTab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarActiveTintColor: "#FF6C00",
              tabBarInactiveTintColor: "rgba(33, 33, 33, 0.8)",
              tabBarIcon: ({ focused, size, color }) => (
                <Feather name="user" size={size} color={color} />
              ),
            }}
          />
        </MainTab.Navigator>
      ) : (
        <AuthStack.Navigator initialRouteName="Login">
          <AuthStack.Screen
            options={{
              headerShown: false,
            }}
            name="Login"
            component={LoginScreen}
            initialParams={{ handleAuth }}
          />
          <AuthStack.Screen
            options={{
              headerShown: false,
            }}
            name="Registration"
            component={RegistrationScreen}
            initialParams={{ handleAuth }}
          />
          <AuthStack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={Home}
          />
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
};

// const useRoute = (isAuth) => {
//   if (!isAuth) {
//     return (
//       <AuthStack.Navigator initialRouteName="Login">
//         <AuthStack.Screen
//           options={{ headerShown: false }}
//           name="Login"
//           component={LoginScreen}
//         />
//         <AuthStack.Screen
//           options={{ headerShown: false }}
//           name="Registration"
//           component={RegistrationScreen}
//         />
//         <AuthStack.Screen
//           options={{ headerShown: false }}
//           name="Home"
//           component={Home}
//         />
//       </AuthStack.Navigator>
//     );
//   }
//   return (
//     <MainTab.Navigator
//       initialRouteName="Profile"
//       screenOptions={{ headerShown: false, tabBarShowLabel: false }}
//     >
//       <MainTab.Screen
//         name="Posts"
//         component={PostsScreen}
//         options={{
//           tabBarActiveTintColor: "#FF6C00",
//           tabBarInactiveTintColor: "rgba(33, 33, 33, 0.8)",
//           tabBarIcon: ({ focused, size, color }) => (
//             <AntDesign name="appstore-o" size={size} color={color} />
//           ),
//         }}
//       />
//       <MainTab.Screen
//         name="Create"
//         component={CreatePostsScreen}
//         options={{
//           tabBarInactiveTintColor: "rgba(33, 33, 33, 0.8)",
//           tabBarIcon: ({ focused, size, color }) => (
//             <AntDesign name="plus" size={16} style={styles.iconPlus} />
//           ),
//         }}
//       />
//       <MainTab.Screen
//         name="Profile"
//         component={ProfileScreen}
//         options={{
//           tabBarActiveTintColor: "#FF6C00",
//           tabBarInactiveTintColor: "rgba(33, 33, 33, 0.8)",
//           tabBarIcon: ({ focused, size, color }) => (
//             <Feather name="user" size={size} color={color} />
//           ),
//         }}
//       />
//     </MainTab.Navigator>
//   );
// };

const styles = StyleSheet.create({
  iconPlus: {
    textAlign: "center",
    color: "#fff",
    paddingVertical: 12,
    backgroundColor: "#FF6C00",
    width: 70,
    borderRadius: 19,
  },
});
