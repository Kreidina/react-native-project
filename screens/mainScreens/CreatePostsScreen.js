import {
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";
import { Camera, CameraType } from "expo-camera";

import CreatePostForm from "../../components/CreatePostForm";

const initialState = {
  name: null,
  location: null,
};
export const CreatePostsScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeydoard] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [photo, setPhoto] = useState(null);
  const [postContent, setPostContent] = useState(initialState);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryStatus = await MediaLibrary.requestPermissionsAsync();
      const locationStatus = await Location.requestForegroundPermissionsAsync();

      setHasPermission(
        cameraStatus.status === "granted" &&
          mediaLibraryStatus.status === "granted" &&
          locationStatus.status === "granted"
      );
    })();
  }, []);

  const toggleCameraType = () => {
    setType((current) => {
      switch (current) {
        case CameraType.back:
          return CameraType.front;
        case CameraType.front:
          return CameraType.back;
        default:
          return current;
      }
    });
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const takePhoto = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      const location = await Location.getCurrentPositionAsync();
      // await MediaLibrary.createAssetAsync(uri);
      setPhoto(uri);
    }
  };

  const publishSubmit = () => {
    navigation.navigate("DefaultScreen", { photo, postContent });
  };

  const keyboardHide = () => {
    setIsShowKeydoard(false);
    Keyboard.dismiss();
  };

  const backToPosts = () => {
    setPhoto(null);
    setPostContent(initialState);
    navigation.navigate("DefaultScreen");
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <View style={[styles.header, isShowKeyboard && styles.headerKeyoard]}>
          <Text style={styles.title}>Створити публікацію</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.linkBack}
            onPress={backToPosts}
          >
            <AntDesign name="arrowleft" size={24} style={styles.iconBack} />
          </TouchableOpacity>
        </View>
        <View style={styles.main}>
          {!isShowKeyboard && (
            <View>
              <Camera style={styles.cameraBox} type={type} ref={setCameraRef}>
                {photo && (
                  <View style={styles.photoBox}>
                    <Image source={{ uri: photo }} style={styles.photo} />
                  </View>
                )}
                <TouchableOpacity
                  style={styles.changeCamera}
                  onPress={toggleCameraType}
                >
                  <MaterialCommunityIcons
                    name="camera-retake"
                    size={20}
                    color="#fff"
                  />
                </TouchableOpacity>

                <TouchableOpacity style={styles.linkCamera} onPress={takePhoto}>
                  <MaterialIcons
                    name="photo-camera"
                    size={24}
                    style={[styles.iconCamera, photo && styles.iconPhotoCamera]}
                  />
                </TouchableOpacity>
              </Camera>
              <TouchableOpacity>
                {photo ? (
                  <Text style={styles.cameraTitle}>Редагувати фото </Text>
                ) : (
                  <Text style={styles.cameraTitle}>Завантажте фото</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
          <CreatePostForm
            setIsShowKeydoard={setIsShowKeydoard}
            photo={photo}
            setPhoto={setPhoto}
            postContent={postContent}
            setPostContent={setPostContent}
            publishSubmit={publishSubmit}
          />
        </View>
        {!isShowKeyboard && (
          <View style={styles.footer}>
            <TouchableOpacity style={styles.linkDelete} onPress={backToPosts}>
              <AntDesign name="delete" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

//
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
    justifyContent: "center",
    alignItems: "center",
    height: 240,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    marginTop: 32,
  },
  iconCamera: {
    color: "#BDBDBD",
    backgroundColor: "#fff",
    paddingHorizontal: 18,
    paddingVertical: 18,
    borderRadius: 50,
  },
  iconPhotoCamera: {
    color: "#fff",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  changeCamera: {
    position: "absolute",
    top: 5,
    right: 5,
    width: 30,
    height: 30,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  photoBox: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  photo: {
    width: 200,
    height: 150,
  },
  cameraTitle: {
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontWeight: "400",
    marginTop: 8,
  },
  footer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
  },
  linkDelete: {
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F6F6F6",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 9,
    marginBottom: 22,
  },
});
