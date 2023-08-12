import { StyleSheet, Text, TextInput, View } from "react-native";
import CustomButton from "./CustomButton";
import CustomLink from "./CustomLink";
// import { useState } from "react";

const RegisterForm = ({
  name,
  onChangeName,
  email,
  onChangeEmail,
  password,
  onChangePassword,
  isShowKeyboard,
  setIsShowKeydoard,
}) => {
  // const [isShowKeyboard, setIsShowKeydoard] = useState(false);

  return (
    <>
      <TextInput
        style={styles.input}
        onChangeText={onChangeName}
        value={name}
        placeholder="Логін"
        placeholderTextColor="#BDBDBD"
        onFocus={() => setIsShowKeydoard(true)}
        // textContentType="name"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
        placeholder="Адреса електронної пошти"
        placeholderTextColor="#BDBDBD"
        keyboardType="email-address"
        onFocus={() => {
          setIsShowKeydoard(true);
        }}
        // textContentType="emailAddress"
      />
      <View>
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          value={password}
          placeholder="Пароль"
          placeholderTextColor="#BDBDBD"
          secureTextEntry={true}
          onFocus={() => setIsShowKeydoard(true)}
          // keyboardType="visible-password"
          // textContentType="password"
        />
        <View style={styles.showLink}>
          <CustomLink text="Показати" onPress={() => console.log("show")} />
        </View>
      </View>
      <View
        style={{
          ...styles.formButton,
          display: isShowKeyboard ? "none" : "flex",
        }}
      >
        <CustomButton
          title="Зареєстуватися"
          onPress={() => console.log("Custom button clicked")}
        />
      </View>
      <View
        style={{
          ...styles.linkForm,
          display: isShowKeyboard ? "none" : "flex",
        }}
      >
        <Text>Вже є акаунт?</Text>
        <CustomLink text=" Увійти" onPress={() => console.log("Login Page")} />
      </View>
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
    marginVertical: 10,
    marginBottom: 45,
  },
});

export default RegisterForm;
