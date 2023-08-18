import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { useState } from "react";

import CustomLink from "./CustomLink";
import CustomButton from "./CustomButton";

const initialState = {
  name: "",
  email: "",
  password: "",
};

const RegisterForm = ({ isShowKeyboard, setIsShowKeydoard, navigatePage }) => {
  const [state, setState] = useState(initialState);
  const [focusedInput, setFocusedInput] = useState(null);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handelFocus = (inputName) => {
    setIsShowKeydoard(true);
    setFocusedInput(inputName);
  };

  const secureTextEntryToggle = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const handelSubmit = () => {
    if (!state.email || !state.password || !state.name) return;
    navigatePage("Home");
    setState(initialState);
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <TextInput
          style={[styles.input, focusedInput === "input1" && styles.inputFocus]}
          onChangeText={(value) =>
            setState((prevState) => ({ ...prevState, name: value }))
          }
          value={state.name}
          placeholder="Логін"
          placeholderTextColor="#BDBDBD"
          onFocus={() => handelFocus("input1")}
          cursorColor="#FF6C00"
        />
        <TextInput
          style={[styles.input, focusedInput === "input2" && styles.inputFocus]}
          onChangeText={(value) =>
            setState((prevState) => ({ ...prevState, email: value }))
          }
          value={state.email}
          placeholder="Адреса електронної пошти"
          placeholderTextColor="#BDBDBD"
          keyboardType="email-address"
          onFocus={() => handelFocus("input2")}
          cursorColor="#FF6C00"
        />
        <View>
          <TextInput
            style={[
              styles.input,
              focusedInput === "input3" && styles.inputFocus,
            ]}
            onChangeText={(value) =>
              setState((prevState) => ({ ...prevState, password: value }))
            }
            value={state.password}
            placeholder="Пароль"
            placeholderTextColor="#BDBDBD"
            secureTextEntry={secureTextEntry}
            onFocus={() => handelFocus("input3")}
            cursorColor="#FF6C00"
          />
          <View style={styles.showLink}>
            <CustomLink
              text={secureTextEntry ? "Показати" : "Приховати"}
              onPress={secureTextEntryToggle}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
      {!isShowKeyboard && (
        <View style={styles.formButton}>
          <CustomButton title="Зареєстуватися" onPress={handelSubmit} />
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

export default RegisterForm;
