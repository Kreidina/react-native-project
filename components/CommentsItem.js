import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
export const CommentsItem = ({ comment }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{comment}</Text>
      <Text>Data</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: "rgba(0, 0, 0, 0.03);",
  },
  text: {
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    fontWeight: "400",
  },
});
