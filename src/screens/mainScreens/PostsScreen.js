import { createStackNavigator } from "@react-navigation/stack";
import { CommentsScreen, DefaultPostsScreen, MapScreen } from "../nestedScreen";

const NestedStack = createStackNavigator();

export const PostsScreen = () => {
  return (
    <NestedStack.Navigator
      initialRouteName="DefaultScreen"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: ({ focused, size, color }) => {
          if (!focused) {
            return null;
          }
          let display;
          let opacity;
          if (route.name === "Comments") {
            opacity = 0;
            display = "none";
          } else if (route.name === "Map") {
            opacity = 0;
            display = "none";
          }
          return { display: display, opacity: 0 };
        },
      })}
    >
      <NestedStack.Screen name="DefaultScreen" component={DefaultPostsScreen} />
      <NestedStack.Screen name="Comments" component={CommentsScreen} />
      <NestedStack.Screen name="Map" component={MapScreen} />
    </NestedStack.Navigator>
  );
};
