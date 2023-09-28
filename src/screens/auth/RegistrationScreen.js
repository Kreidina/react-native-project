import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import RegisterForm from "../../components/RegisterForm";
import CustomLink from "../../components/CustomLink";
import { storage } from "../../firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const RegistrationScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeydoard] = useState(false);
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();
  const [files, setFiles] = useState(null);
  const bgrImg = require("../../../assets/img/background.jpg");

  // keyboard
  const keyboardHide = () => {
    setIsShowKeydoard(false);
    Keyboard.dismiss();
  };

  const navigatePage = (pageName) => {
    navigation.navigate(pageName);
  };

  // permission check
  if (permission?.status !== ImagePicker.PermissionStatus.GRANTED) {
    return (
      <View style={styles.container}>
        <Text>Permission Not Granted - {permission?.status}</Text>
        <StatusBar style="auto" />
        <Button title="Request Permission" onPress={requestPermission}></Button>
      </View>
    );
  }

  const uploadToFirebase = async (uri, name, onProgress) => {
    const fetchResponse = await fetch(uri);
    const theBlob = await fetchResponse.blob();

    const imageRef = ref(storage, `avatars/${name}`);

    const uploadTask = uploadBytesResumable(imageRef, theBlob);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress && onProgress(progress);
        },
        (error) => {
          console.log(error, "error");
          reject(error);
        },

        async () => {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          setFiles(downloadUrl);
          resolve({
            downloadUrl,
            metadata: uploadTask.snapshot.metadata,
          });
        }
      );
    });
  };

  const takePhoto = async () => {
    try {
      const cameraResp = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
      });

      await uploadToPhoto(cameraResp);
    } catch (e) {
      Alert.alert("Error Make Image " + e.message);
    }
  };

  const uploadToPhoto = async (cameraRef) => {
    try {
      if (!cameraRef.canceled) {
        const { uri } = cameraRef.assets[0];

        const fileName = uri.split("/").pop();

        await uploadToFirebase(uri, fileName, (v) => console.log(v));
      }
    } catch (e) {
      Alert.alert("Error Uploading Image " + e.message);
      console.log(e.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <View style={styles.bgrContainer}>
          <ImageBackground source={bgrImg} style={styles.bgrImage}>
            <View style={styles.formContainer}>
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
              >
                {!files ? (
                  <View style={styles.avatarBox}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={{ ...styles.avatarIcon, ...styles.avatarLink }}
                      onPress={takePhoto}
                    >
                      <AntDesign
                        name="pluscircleo"
                        size={25}
                        style={styles.avatarIcon}
                      />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.avatarBox}>
                    <Image
                      source={{ uri: files }}
                      style={styles.avaImg}
                    ></Image>
                    <TouchableOpacity
                      style={{ ...styles.avatarIcon, ...styles.avatarLink }}
                      onPress={() => setFiles(null)}
                      activeOpacity={0.8}
                    >
                      <AntDesign
                        name="closecircleo"
                        size={25}
                        style={{
                          ...styles.avatarIcon,
                          ...styles.deleteIcon,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                )}
                <Text style={styles.title}>Реєстрація</Text>

                <RegisterForm
                  isShowKeyboard={isShowKeyboard}
                  setIsShowKeydoard={setIsShowKeydoard}
                  files={files}
                  setFiles={setFiles}
                />
                {!isShowKeyboard && (
                  <View style={styles.linkForm}>
                    <Text style={styles.linkText}>Вже є акаунт? </Text>
                    <CustomLink
                      text="Увійти"
                      onPress={() => navigatePage("Login")}
                    />
                  </View>
                )}
              </KeyboardAvoidingView>
            </View>
          </ImageBackground>
        </View>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
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
    justifyContent: "flex-end",
  },
  formContainer: {
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  avatarBox: {
    position: "absolute",
    top: -60,
    right: "33%",
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  avaImg: {
    borderRadius: 16,
    width: 120,
    height: 120,
  },
  avatarIcon: {
    color: "#FF6C00",
    backgroundColor: "#FFF",
    borderRadius: 55,
  },
  avatarLink: {
    position: "absolute",
    right: -12,
    bottom: 14,
    width: 26,
    height: 26,
    borderRadius: 50,
  },
  deleteIcon: {
    color: "#E8E8E8",
  },
  title: {
    color: "#212121",
    textAlign: "center",
    fontSize: 30,
    fontStyle: "normal",
    fontFamily: "Roboto-Medium",
    fontWeight: "500",
    letterSpacing: 0.3,
    marginTop: 92,
    marginBottom: 33,
  },
  linkForm: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 45,
  },
  linkText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontWeight: "400",
    color: "#1B4371",
  },
});
