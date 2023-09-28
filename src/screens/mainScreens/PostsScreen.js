import { createStackNavigator } from "@react-navigation/stack";
import { CommentsScreen, DefaultPostsScreen, MapScreen } from "../nestedScreen";

const NestedStack = createStackNavigator();

export const PostsScreen = () => {
  return (
    <NestedStack.Navigator
      initialRouteName="DefaultScreen"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarVisible:
          route.name === "Comments" || route.name === "Map" ? false : true,
      })}
    >
      <NestedStack.Screen name="DefaultScreen" component={DefaultPostsScreen} />
      <NestedStack.Screen name="Comments" component={CommentsScreen} />
      <NestedStack.Screen name="Map" component={MapScreen} />
    </NestedStack.Navigator>
  );
};
