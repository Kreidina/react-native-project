import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RegistrationScreen, LoginScreen, Home } from "../screens/auth";
import { authStateChanged } from "../redux/auth/operations";

const AuthStack = createStackNavigator();

const Main = () => {
  const { stateChange } = useSelector((state) => state.auth);
  //   const state = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  //   console.log(state);

  useEffect(() => {
    dispatch(authStateChanged());
  }, []);

  return (
    <NavigationContainer>
      <AuthStack.Navigator initialRouteName={stateChange ? "Home" : "Login"}>
        {stateChange ? (
          <AuthStack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={Home}
          />
        ) : (
          <>
            <AuthStack.Screen
              options={{
                headerShown: false,
              }}
              name="Login"
              component={LoginScreen}
            />
            <AuthStack.Screen
              options={{
                headerShown: false,
              }}
              name="Registration"
              component={RegistrationScreen}
            />
          </>
        )}
      </AuthStack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
