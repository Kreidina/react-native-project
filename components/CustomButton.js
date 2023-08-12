import { StyleSheet, Text, TouchableOpacity } from "react-native";

const CustomButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={stylesB.button}
      onPress={onPress}
    >
      <Text style={stylesB.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const stylesB = StyleSheet.create({
  button: {
    width: "100%",
    // height: 50,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    marginVertical: 16,
    // font-family: Roboto;
    fontSize: 16,
    // font-style: normal;
    fontWeight: "normal",
    // line-height: normal
  },
});
export default CustomButton;
