import { StyleSheet, TextInput, View } from "react-native";
import CustomButton from "./CustomButton";

const RegisterForm = ({
  text,
  onChangeText,
  number,
  onChangeNumber,
  password,
  onChangePassword,
}) => {
  return (
    <>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Логін"
        // textContentType="name"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Адреса електронної пошти"
        // keyboardType="email-address"
        // textContentType="emailAddress"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        placeholder="Пароль"
        // keyboardType="visible-password"
        // textContentType="password"
      />
      <View style={styles.registerButton}>
        <CustomButton
          title="Зареєстуватися"
          onPress={() => console.log("Custom button clicked")}
        />
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
  registerButton: {
    marginBottom: 16,
    marginTop: 27,
  },
});

export default RegisterForm;
