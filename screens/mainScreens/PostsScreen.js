import { MaterialIcons } from "@expo/vector-icons";

import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";

export const PostsScreen = () => {
  const avaImg = require("../../assets/img/avatar.jpg");
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Публікації</Text>
        <TouchableOpacity activeOpacity={0.8} style={styles.linkLogout}>
          <MaterialIcons name="logout" size={24} style={styles.iconLogout} />
        </TouchableOpacity>
      </View>
      <View style={styles.main}>
        <View style={styles.avatar}>
          <Image source={avaImg} size={60} style={styles.avaImg} />
          <View style={styles.avaContent}>
            <Text style={styles.avaTitle}>Natali Romanova</Text>
            <Text style={styles.avaText}>email@example.com</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 11,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  title: {
    color: "#212121",
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    fontWeight: "500",
    marginVertical: 11,
  },
  linkLogout: {
    position: "absolute",
    bottom: 10,
    right: 0,
  },
  iconLogout: {
    color: "#BDBDBD",
  },
  main: {},
  avatar: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 32,
  },
  avaImg: {
    width: 60,
    height: 60,
  },
  avaContent: {
    marginLeft: 6,
  },
  avaTitle: {
    color: "#212121",
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    fontWeight: "700",
    // lineHeight: 15,
  },
  avaText: {
    color: "rgba(33, 33, 33, 0.80)",
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    fontWeight: "400",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
    marginTop: "auto",
    paddingBottom: 22,
    paddingTop: 9,
    height: 70,
  },
  btn: {
    backgroundColor: "#FF6C00",
    width: 70,
    marginHorizontal: 39,
    borderRadius: 19,
  },
});
