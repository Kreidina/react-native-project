import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Keyboard,
  SafeAreaView,
  FlatList,
  Image,
} from "react-native";
import { addDoc, collection, doc } from "firebase/firestore";

import { CommentsForm } from "../../components/CommentForm";
import { CommentsItem } from "../../components/CommentsItem";
import Header from "../../components/Header";

import { db } from "../../firebase/config";
import { selectAvatar, selectUserId } from "../../redux/auth/selectors";
import { formattedDate, formattedTime } from "../../functions/dateCount";
import { getAllComments } from "../../functions/getRequest";

export const CommentsScreen = ({ navigation, route }) => {
  const [isShowKeyboard, setIsShowKeydoard] = useState(false);
  const [comments, setComments] = useState([]);

  const { img, id } = route.params;

  const userId = useSelector(selectUserId);
  const avatar = useSelector(selectAvatar);

  useEffect(() => {
    getAllComments(id, setComments);
  }, []);

  const keyboardHide = () => {
    setIsShowKeydoard(false);
    Keyboard.dismiss();
  };

  const postComment = async (value) => {
    const postsDocRef = doc(db, "posts", id);
    await addDoc(collection(postsDocRef, "comments"), {
      comment: value,
      date: `${formattedDate} ${formattedTime}`,
      userId,
      avaImg: avatar,
    });
    if (value !== "") {
      await getAllComments(id, setComments);
    }
  };

  const backToPosts = () => {
    navigation.goBack();
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
          <Image source={{ uri: img }} style={styles.img} />
          {comments && (
            <SafeAreaView style={styles.comentsContainer}>
              <FlatList
                data={comments}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <CommentsItem comment={item} id={id} />
                )}
              />
            </SafeAreaView>
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
    justifyContent: "space-between",
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
  img: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginTop: 32,
    marginBottom: 20,
  },

  comentsContainer: {
    height: 320,
    // paddingBottom: 110,
  },
  footer: {
    marginTop: "auto",
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
    bottom: 8,
    left: 0,
  },
  iconBack: {
    color: "#212121",
  },
});
