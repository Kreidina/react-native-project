import { useEffect, useState } from "react";
// import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { CameraType } from "expo-camera";
import uuid from "react-native-uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { CreatePosts } from "../../components/CreatePosts";
import { storage } from "../../firebase/config";

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
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      // const mediaLibraryStatus = await MediaLibrary.requestPermissionsAsync();
      const locationStatus = await Location.requestForegroundPermissionsAsync();

      setHasPermission(
        cameraStatus.status === "granted" &&
          mediaLibraryStatus.status === "granted" &&
          locationStatus.status === "granted"
      );
      if (hasPermission === null) {
        return <View />;
      }
      if (hasPermission === false) {
        return <Text>No access to camera</Text>;
      }
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
  // useEffect(() => {
  //   takePhoto();
  // }, []);
  const takePhoto = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      const location = await Location.getCurrentPositionAsync();
      // await MediaLibrary.createAssetAsync(uri);
      setPhoto(uri);
      setLocation(location);
    }
  };

  const publishSubmit = () => {
    uploadPhotoToServer();
    navigation.navigate("DefaultScreen", {
      photo,
      postContent,
      location,
    });
  };

  const keyboardHide = () => {
    setIsShowKeydoard(false);
    Keyboard.dismiss();
  };

  const backToPosts = () => {
    setPhoto(null);
    setPostContent(initialState);
    setLocation(null);
    navigation.navigate("DefaultScreen");
  };

  const uploadPhotoToServer = async () => {
    try {
      if (photo) {
        const photoBlob = new Blob([photo], { type: "image/jpeg" });
        const uniqueId = uuid.v4();
        const storageRef = ref(storage, `postImage/${uniqueId}`);
        const mainStorageRef = ref(storage, "postImage");

        await uploadBytes(storageRef, photoBlob)
          .then((snapshot) => {
            // console.log(snapshot.metadata.fullPath);
            console.log("Фотографія успішно завантажена до Firebase Storage");
          })
          .catch((error) => {
            console.error("Помилка під час завантаження фотографії:", error);
          });
      }
    } catch (error) {
      console.error("Помилка завантаження фотографії:", error);
    }
    // const processedPhoto = await storage
    //   .ref("postImage")
    //   .child(uniqueId)
    //   .getDownloadURL();
    // console.log(processedPhoto);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <CreatePosts
          isShowKeyboard={isShowKeyboard}
          setIsShowKeydoard={setIsShowKeydoard}
          setCameraRef={setCameraRef}
          type={type}
          photo={photo}
          setPhoto={setPhoto}
          postContent={postContent}
          setPostContent={setPostContent}
          toggleCameraType={toggleCameraType}
          takePhoto={takePhoto}
          publishSubmit={publishSubmit}
          backToPosts={backToPosts}
        />
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
});
