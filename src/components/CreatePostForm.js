import { SimpleLineIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from "react-native";

const initialState = {
  name: null,
  location: null,
};

const CreatePostForm = ({
  setIsShowKeydoard,
  publishSubmit,
  photo,
  setPhoto,
  postContent,
  setPostContent,
}) => {
  const [focusedInput, setFocusedInput] = useState(null);

  const handelFocus = (inputName) => {
    setIsShowKeydoard(true);
    setFocusedInput(inputName);
  };

  const handelSubmit = () => {
    if (!postContent?.name || !postContent?.location || !photo) return;
    publishSubmit();
    setPhoto(null);
    setIsShowKeydoard(false);
    setPostContent(initialState);
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={{ marginVertical: 32 }}>
          <TextInput
            style={[
              styles.input,
              focusedInput === "input1" && styles.inputFocus,
            ]}
            onChangeText={(value) =>
              setPostContent((prevState) => ({ ...prevState, name: value }))
            }
            value={postContent.name}
            placeholder="Назва..."
            placeholderTextColor="#BDBDBD"
            onFocus={() => handelFocus("input1")}
            cursorColor="#FF6C00"
          />
          <View style={{ position: "relative" }}>
            <TextInput
              style={[
                styles.input,
                styles.inputLocation,
                focusedInput === "input2" && styles.inputFocus,
              ]}
              onChangeText={(value) =>
                setPostContent((prevState) => ({
                  ...prevState,
                  location: value,
                }))
              }
              value={postContent.location}
              placeholder="Місцевість..."
              placeholderTextColor="#BDBDBD"
              onFocus={() => handelFocus("input2")}
              cursorColor="#FF6C00"
            />
            <View style={styles.location}>
              <SimpleLineIcons
                name="location-pin"
                size={24}
                color="black"
                style={styles.iconLocation}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
      <TouchableOpacity
        onPress={handelSubmit}
        activeOpacity={0.8}
        style={[
          !postContent.name || !postContent.location || !photo
            ? styles.btn
            : { ...styles.btn, ...styles.btnActive },
        ]}
      >
        <Text
          style={[
            !postContent.name || !postContent.location || !photo
              ? styles.btnText
              : { ...styles.btnText, ...styles.btnTextActive },
          ]}
        >
          Опубліковати
        </Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    paddingVertical: 16,
  },
  inputLocation: {
    paddingLeft: 28,
    marginTop: 16,
  },
  inputFocus: {
    borderBottomColor: "#FF6C00",
  },
  location: {
    position: "absolute",
    left: 0,
    bottom: 13,
  },
  iconLocation: {
    color: "#BDBDBD",
  },
  btn: {
    width: "100%",
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
  },
  btnText: {
    textAlign: "center",
    color: "#BDBDBD",
    marginVertical: 16,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontWeight: "400",
  },
  btnActive: {
    backgroundColor: "#FF6C00",
  },
  btnTextActive: {
    color: "#fff",
  },
});

export default CreatePostForm;
