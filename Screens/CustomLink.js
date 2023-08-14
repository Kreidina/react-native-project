import { StyleSheet, Text, TouchableOpacity } from "react-native";

const CustomLink = ({ text, onPress }) => {
  return (
    <TouchableOpacity style={stylesL.link} onPress={onPress}>
      <Text style={stylesL.linkText}>{text}</Text>
    </TouchableOpacity>
  );
};

const stylesL = StyleSheet.create({
  link: {},
  linkText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontWeight: "400",
    color: "#1B4371",
  },
});
export default CustomLink;
