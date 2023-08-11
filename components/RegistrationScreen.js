import { StyleSheet, Text, View } from "react-native";
import CustomLink from "./CustomLink";
import RegisterForm from "./RegisterForm";

const RegistrationScreen = ({
  text,
  onChangeText,
  number,
  onChangeNumber,
  password,
  onChangePassword,
}) => {
  return (
    <View style={styles.registerContainer}>
      <View>
        <View style={styles.avatarBox}>
          {/* <ImageBackground
                style={styles.avatar}
                source={require("./screens/avatar.jpg")}
              /> */}
        </View>
        {/* <Image
            style={styles.avatar}
            source={require("./screens/avatar.jpg")}
          /> */}
      </View>
      <Text style={styles.title}>Реєстрація</Text>
      <RegisterForm
        text={text}
        onChangeText={onChangeText}
        number={number}
        onChangeNumber={onChangeNumber}
        password={password}
        onChangePassword={onChangePassword}
      />
      <View style={styles.linkRegister}>
        <Text>Вже є акаунт?</Text>
        <CustomLink text="Увійти" onPress={() => console.log("Login Page")} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  registerContainer: {
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    width: "100%",
  },
  avatarBox: {
    position: "absolute",
    top: -60,
    right: "33%",
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  title: {
    color: "#212121",
    textAlign: "center",
    fontSize: 30,
    fontStyle: "normal",
    fontWeight: "bold",
    letterSpacing: 0.3,
    marginTop: 92,
    marginBottom: 33,
  },
  linkRegister: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
});

export default RegistrationScreen;
