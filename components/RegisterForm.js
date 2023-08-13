import { StyleSheet, Text, TextInput, View } from "react-native";
import CustomButton from "./CustomButton";
import CustomLink from "./CustomLink";
import { useState } from "react";

const initialRegState = {
  name: "",
  email: "",
  password: "",
};

const RegisterForm = ({
  stateReg,
  setStateReg,
  isShowKeyboard,
  setIsShowKeydoard,
}) => {
  const [focusedInput, setFocusedInput] = useState(null);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handelFocus = (inputName) => {
    setIsShowKeydoard(true);
    setFocusedInput(inputName);
  };

  const handelBlur = () => {
    setIsShowKeydoard(false);
    setFocusedInput(null);
  };

  const secureTextEntryToggle = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const handelSubmit = () => {
    if (!stateReg.email || !stateReg.password || !stateReg.name) return;
    console.log(stateReg);
    setStateReg(initialRegState);
  };

  return (
    <>
      <TextInput
        style={[styles.input, focusedInput === "input1" && styles.inputFocus]}
        onChangeText={(value) =>
          setStateReg((prevState) => ({ ...prevState, name: value }))
        }
        value={stateReg.name}
        placeholder="Логін"
        placeholderTextColor="#BDBDBD"
        onFocus={() => handelFocus("input1")}
        onBlur={handelBlur}
        cursorColor="#FF6C00"
      />
      <TextInput
        style={[styles.input, focusedInput === "input2" && styles.inputFocus]}
        onChangeText={(value) =>
          setStateReg((prevState) => ({ ...prevState, email: value }))
        }
        value={stateReg.email}
        placeholder="Адреса електронної пошти"
        placeholderTextColor="#BDBDBD"
        keyboardType="email-address"
        onFocus={() => handelFocus("input2")}
        onBlur={handelBlur}
        cursorColor="#FF6C00"
      />
      <View>
        <TextInput
          style={[styles.input, focusedInput === "input3" && styles.inputFocus]}
          onChangeText={(value) =>
            setStateReg((prevState) => ({ ...prevState, password: value }))
          }
          value={stateReg.password}
          placeholder="Пароль"
          placeholderTextColor="#BDBDBD"
          secureTextEntry={secureTextEntry}
          onFocus={() => handelFocus("input3")}
          onBlur={handelBlur}
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
        <>
          <View style={styles.formButton}>
            <CustomButton title="Зареєстуватися" onPress={handelSubmit} />
          </View>
          <View style={styles.linkForm}>
            <Text style={styles.linkText}>Вже є акаунт?</Text>
            <CustomLink
              text=" Увійти"
              onPress={() => console.log("Login Page")}
            />
          </View>
        </>
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
  linkForm: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 45,
  },
  linkText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontWeight: "400",
    color: "#1B4371",
  },
});

export default RegisterForm;
