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
  linkText: {},
});
export default CustomLink;
