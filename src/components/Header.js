import React from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { StyleSheet } from "react-native";
const Header = ({ isShowKeyboard, backToPosts, title }) => {
  return (
    <View style={[styles.header, isShowKeyboard && styles.headerKeyoard]}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.linkBack}
        onPress={backToPosts}
      >
        <AntDesign name="arrowleft" size={24} style={styles.iconBack} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  headerKeyoard: {
    marginBottom: 15,
  },
  title: {
    color: "#212121",
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    fontWeight: "500",
    marginVertical: 11,
  },
  linkBack: {
    position: "absolute",
    bottom: 10,
    left: 0,
  },
  iconBack: {
    color: "#212121",
  },
});
