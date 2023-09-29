import { View, Text, StyleSheet, Image } from "react-native";
import { selectUserId } from "../redux/auth/selectors";
import { useSelector } from "react-redux";

export const CommentsItem = ({ comment }) => {
  const { avaImg, date, userId } = comment;
  const id = useSelector(selectUserId);

  const left = userId !== id;

  // console.log(date);

  return (
    <>
      {!left ? (
        <View style={styles.container}>
          <View style={styles.commentContainer}>
            <Text style={styles.text}>{comment.comment}</Text>
            <Text style={styles.data}>{date}</Text>
          </View>
          <Image source={{ uri: avaImg }} style={styles.avatar} />
        </View>
      ) : (
        <View style={styles.containerRight}>
          <Image source={{ uri: avaImg }} style={styles.avatarRight} />
          <View style={styles.commentContainer}>
            <Text style={styles.textRigth}>{comment.comment}</Text>
            <Text style={styles.dateRigth}>{date}</Text>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginVertical: 12,
  },
  containerRight: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    marginVertical: 12,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 28,
    marginLeft: 16,
  },
  avatarRight: {
    width: 28,
    height: 28,
    borderRadius: 28,
    marginRight: 16,
  },
  commentContainer: {
    width: 270,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
  },
  text: {
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    fontWeight: "400",
    marginTop: 8,
  },
  textRigth: {
    textAlign: "right",
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
  dateRigth: {
    textAlign: "left",
    paddingRight: 16,
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    fontWeight: "400",
  },
});
