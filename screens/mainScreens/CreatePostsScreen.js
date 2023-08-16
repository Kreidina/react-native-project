import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import CreatePostForm from "../../components/CreatePostForm";

export const CreatePostsScreen = () => {
  const [isShowKeyboard, setIsShowKeydoard] = useState(false);

  const keyboardHide = () => {
    setIsShowKeydoard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <View style={[styles.header, isShowKeyboard && styles.headerKeyoard]}>
          <Text style={styles.title}>Створити публікацію</Text>
          <TouchableOpacity activeOpacity={0.8} style={styles.linkBack}>
            <AntDesign
              name="arrowleft"
              size={24}
              color="black"
              style={styles.iconBack}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.main}>
          {!isShowKeyboard && (
            <>
              <View style={styles.cameraBox}>
                <MaterialIcons
                  name="photo-camera"
                  size={24}
                  color="black"
                  style={styles.iconCamera}
                />
              </View>
              <Text style={styles.cameraTitle}>Завантажте фото</Text>
            </>
          )}
          <CreatePostForm setIsShowKeydoard={setIsShowKeydoard} />
        </View>
      </View>
      {/* <AntDesign
        name="delete"
        size={24}
        color="black"
        style={styles.iconDelete}
      /> */}
    </TouchableWithoutFeedback>
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
  cameraBox: {
    width: "100%",
    height: 240,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    marginTop: 32,
  },
  iconCamera: {
    position: "absolute",
    top: "37%",
    right: "40%",
    color: "#BDBDBD",
    backgroundColor: "#fff",
    paddingHorizontal: 18,
    paddingVertical: 18,
    borderRadius: 50,
  },
  cameraTitle: {
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontWeight: "400",
    marginTop: 8,
  },
});
