import { StyleSheet, TextInput, View } from "react-native";
import { useState } from "react";

import CustomLink from "./CustomLink";
import CustomButton from "./CustomButton";
import { useDispatch } from "react-redux";
import { loginDB } from "../redux/auth/operations";

const initialState = {
  email: "",
  password: "",
};

const LoginForm = ({ isShowKeyboard, setIsShowKeydoard, navigatePage }) => {
  const [state, setState] = useState(initialState);
  const [focusedInput, setFocusedInput] = useState(null);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const dispatch = useDispatch();

  const handelFocus = (inputName) => {
    setIsShowKeydoard(true);
    setFocusedInput(inputName);
  };

  const secureTextEntryToggle = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const handelSubmit = () => {
    if (!state.email || !state.password) return;
    dispatch(loginDB(state));
    navigatePage("Home");
    setState(initialState);
  };

  return (
    <>
      <TextInput
        style={[styles.input, focusedInput === "input1" && styles.inputFocus]}
        onChangeText={(value) =>
          setState((prevState) => ({ ...prevState, email: value }))
        }
        value={state.email}
        placeholder="Адреса електронної пошти"
        placeholderTextColor="#BDBDBD"
        keyboardType="email-address"
        onFocus={() => handelFocus("input1")}
        cursorColor="#FF6C00"
      />
      <View>
        <TextInput
          style={[styles.input, focusedInput === "input2" && styles.inputFocus]}
          onChangeText={(value) =>
            setState((prevState) => ({ ...prevState, password: value }))
          }
          value={state.password}
          placeholder="Пароль"
          placeholderTextColor="#BDBDBD"
          secureTextEntry={secureTextEntry}
          onFocus={() => handelFocus("input2")}
          cursorColor="#FF6C00"
        />
        <View style={styles.showLink}>
          <CustomLink
            text={secureTextEntry ? "Показати" : "Приховати"}
            onPress={secureTextEntryToggle}
          />
        </View>
      </View>
      {!isShowKeyboard && (
        <View style={styles.formButton}>
          <CustomButton title="Увійти" onPress={handelSubmit} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: "#E8E8E8",
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#F6F6F6",
  },
  inputFocus: {
    borderColor: "#FF6C00",
    backgroundColor: "#FFF",
  },
  showLink: {
    position: "absolute",
    right: 16,
    top: 15,
  },
  formButton: {
    marginBottom: 16,
    marginTop: 27,
  },
});
export default LoginForm;
