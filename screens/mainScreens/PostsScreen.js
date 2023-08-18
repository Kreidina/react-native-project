import { createStackNavigator } from "@react-navigation/stack";
import { CommentsScreen, DefaultPostsScreen, MapScreen } from "../nestedScreen";

const NestedStack = createStackNavigator();

export const PostsScreen = () => {
  return (
    <NestedStack.Navigator initialRouteName="DefaultScreen">
      <NestedStack.Screen
        options={{
          headerShown: false,
        }}
        name="DefaultScreen"
        component={DefaultPostsScreen}
      />
      <NestedStack.Screen
        options={{
          headerShown: false,
        }}
        name="Comments"
        component={CommentsScreen}
      />
      <NestedStack.Screen
        options={{
          headerShown: false,
        }}
        name="Map"
        component={MapScreen}
      />
    </NestedStack.Navigator>
  );
};
