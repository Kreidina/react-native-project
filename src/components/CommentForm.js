import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";

import {
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";

export const CommentsForm = ({ setIsShowKeydoard, postComment }) => {
  const [comment, setComment] = useState("");
  const [focusedInput, setFocusedInput] = useState(null);

  const handelFocus = (inputName) => {
    setIsShowKeydoard(true);
    setFocusedInput(inputName);
  };

  const commentSubmit = () => {
    postComment(comment);
    Keyboard.dismiss();
    setComment("");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.form}>
        <View style={{ position: "relative" }}>
          <TextInput
            style={[
              styles.input,
              focusedInput === "input" && styles.inputFocus,
            ]}
            onChangeText={(value) => setComment(value)}
            value={comment}
            placeholder="Коментувати..."
            placeholderTextColor="#BDBDBD"
            onFocus={() => handelFocus("input")}
            cursorColor="#FF6C00"
          />
          <TouchableOpacity style={styles.linkrrowUp} onPress={commentSubmit}>
            <AntDesign
              name="arrowup"
              size={20}
              color="#fff"
              style={styles.iconUp}
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "#E8E8E8",
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#F6F6F6",
  },
  inputFocus: {
    borderColor: "#FF6C00",
    backgroundColor: "#FFF",
  },
  linkrrowUp: {
    position: "absolute",
    right: 8,
    bottom: 25,
    width: 34,
    height: 34,
    borderRadius: 50,
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
  },
});
