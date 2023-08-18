import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, Feather } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

import { PostsScreen, ProfileScreen, CreatePostsScreen } from "../mainScreens";

const MainTab = createBottomTabNavigator();

export const Home = () => {
  return (
    <MainTab.Navigator
      initialRouteName="Posts"
      screenOptions={{ headerShown: false, tabBarShowLabel: false }}
    >
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        tabBarHideOnKeyboard={true}
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
        tabBarHideOnKeyboard={true}
        options={{
          tabBarStyle: { display: "none" },
          tabBarInactiveTintColor: "rgba(33, 33, 33, 0.8)",
          tabBarIcon: ({ focused, size, color }) => (
            <AntDesign name="plus" size={16} style={styles.iconPlus} />
          ),
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        tabBarHideOnKeyboard={true}
        options={{
          tabBarActiveTintColor: "#FF6C00",
          tabBarInactiveTintColor: "rgba(33, 33, 33, 0.8)",
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </MainTab.Navigator>
  );
};
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
