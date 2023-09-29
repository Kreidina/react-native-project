import { useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { CameraType, Camera } from "expo-camera";
import { useSelector } from "react-redux";
import { collection, addDoc } from "firebase/firestore";

import { CreatePosts } from "../../components/CreatePosts";
import { db } from "../../firebase/config";
import { selectName, selectUserId } from "../../redux/auth/selectors";
import { keyboardHide } from "../../functions/helpers";
import { uploadImage } from "../../functions/uploadFirebase";

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

  const userName = useSelector(selectName);
  const userId = useSelector(selectUserId);

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

  const takePhoto = async () => {
    if (cameraRef) {
      const options = {
        quality: 1,
        base64: true,
        exif: false,
      };

      const { uri } = await cameraRef.takePictureAsync(options);
      const location = await Location.getCurrentPositionAsync();
      await MediaLibrary.createAssetAsync(uri);
      setPhoto(uri);
      setLocation(location);
    }
  };

  const publishSubmit = () => {
    writeDataToFirestore();
    navigation.navigate("DefaultScreen");
  };

  const backToPosts = () => {
    setPhoto(null);
    setPostContent(initialState);
    setLocation(null);
    navigation.goBack();
  };

  const writeDataToFirestore = async () => {
    try {
      const photoUrl = await uploadImage(photo);
      await addDoc(collection(db, "posts"), {
        contentName: postContent.name,
        contentLocation: postContent.location,
        location: location.coords,
        img: photoUrl,
        userId,
        userName,
        favorite: [],
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      throw e;
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => keyboardHide(setIsShowKeydoard)}>
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
