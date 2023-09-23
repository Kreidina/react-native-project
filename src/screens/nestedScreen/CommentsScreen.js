import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";

import {
  TouchableWithoutFeedback,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from "react-native";
import { CommentsForm } from "../../components/CommentForm";
import { Image } from "react-native";
import { CommentsItem } from "../../components/CommentsItem";
import { FlatList } from "react-native";
import Header from "../../components/Header";

export const CommentsScreen = ({ navigation, route }) => {
  const [isShowKeyboard, setIsShowKeydoard] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPhoto(route.params.photo);
    }
  }, [route]);

  const keyboardHide = () => {
    setIsShowKeydoard(false);
    Keyboard.dismiss();
  };

  const postComment = (value) => {
    setComments((prevState) => [...prevState, value]);
  };

  const backToPosts = () => {
    navigation.navigate("DefaultScreen");
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <Header
          title="Коментарі"
          isShowKeyboard={isShowKeyboard}
          backToPosts={backToPosts}
        />

        <View style={styles.main}>
          <Image source={{ uri: photo }} style={styles.img} />
          {comments && (
            <FlatList
              data={comments}
              keyExtractor={(item, indx) => indx.toString()}
              renderItem={({ item }) => <CommentsItem comment={item} />}
            />
          )}
        </View>
        <View style={styles.footer}>
          <CommentsForm
            setIsShowKeydoard={setIsShowKeydoard}
            postComment={postComment}
          />
        </View>
      </View>
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
    paddingTop: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  // headerKeyoard: {
  //   marginBottom: 15,
  // },
  title: {
    color: "#212121",
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    fontWeight: "500",
    marginVertical: 11,
  },
  linkBack: {
    position: "absolute",
    bottom: 8,
    left: 0,
  },
  iconBack: {
    color: "#212121",
  },
  img: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginTop: 32,
    marginBottom: 20,
  },
  footer: {
    marginTop: "auto",
  },
});
