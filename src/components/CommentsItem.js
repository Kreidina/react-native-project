import { View, Text, StyleSheet } from "react-native";

export const CommentsItem = ({ comment }) => {
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const currentDate = new Date().toLocaleString("uk-UA", options);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{comment}</Text>
      <Text style={styles.data}>{currentDate}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginVertical: 12,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
  },
  text: {
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    fontWeight: "400",
    marginTop: 8,
  },
  data: {
    textAlign: "right",
    paddingRight: 16,
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    fontWeight: "400",
  },
});
