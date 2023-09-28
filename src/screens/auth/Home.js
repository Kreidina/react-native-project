import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, Feather } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

import { PostsScreen, ProfileScreen, CreatePostsScreen } from "../mainScreens";
import { useSelector } from "react-redux";

const MainTab = createBottomTabNavigator();
export const Home = () => {
  const { stateChange } = useSelector((state) => state.auth);
  if (!stateChange) {
    return;
  }
  return (
    <MainTab.Navigator
      initialRouteName="Posts"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, size, color }) => {
          let icon;
          color = focused ? "#FF6C00" : "rgba(33, 33, 33, 0.8)";
          if (route.name === "Create") {
            icon = <AntDesign name="plus" size={16} style={styles.iconPlus} />;
          } else if (route.name === "Profile") {
            icon = <Feather name="user" size={size} color={color} />;
          } else if (route.name === "Posts") {
            icon = <AntDesign name="appstore-o" size={size} color={color} />;
          }
          return icon;
        },
      })}
    >
      <MainTab.Screen name="Posts" component={PostsScreen} />
      <MainTab.Screen
        name="Create"
        component={CreatePostsScreen}
        options={{
          tabBarStyle: { display: "none" },
        }}
      />
      <MainTab.Screen name="Profile" component={ProfileScreen} />
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
