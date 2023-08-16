import { EvilIcons } from "@expo/vector-icons";
import { ImageBackground, StyleSheet, View, Image } from "react-native";

export const ProfileScreen = () => {
  const bgrImg = require("../../assets/img/background.jpg");
  const avaImg = require("../../assets/img/avatar.jpg");

  return (
    <View style={styles.container}>
      <View style={styles.bgrContainer}>
        <ImageBackground source={bgrImg} style={styles.bgrImage}>
          <View style={styles.contentContainer}>
            <View style={styles.avatarBox}>
              <Image source={avaImg} style={styles.avaImg} />
            </View>
            <EvilIcons
              name="comment"
              size={24}
              color="black"
              style={styles.iconComment}
            />
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  bgrContainer: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  bgrImage: {
    flex: 1,
    resizeMode: "contain",
    justifyContent: "center",
  },
  contentContainer: {
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  avatarBox: {
    position: "absolute",
    top: -60,
    right: "36%",
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  avaImg: {
    borderRadius: 16,
  },
  iconComment: { paddingBottom: 300 },
});
