import { Text, TouchableOpacity, View, Image, StyleSheet } from "react-native";
import {
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Camera } from "expo-camera";

import CreatePostForm from "./CreatePostForm";
import Header from "./Header";
export const CreatePosts = ({
  isShowKeyboard,
  setIsShowKeydoard,
  setCameraRef,
  type,
  photo,
  setPhoto,
  postContent,
  setPostContent,
  toggleCameraType,
  takePhoto,
  publishSubmit,
  backToPosts,
}) => {
  return (
    <>
      <Header
        title="Створити публікацію"
        isShowKeyboard={isShowKeyboard}
        backToPosts={backToPosts}
      />
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
            {photo ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity>
                  <Text style={styles.cameraTitle}>Редагувати фото </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setPhoto(null)}>
                  <Text style={styles.cameraTitle}>Перефотографувати</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity>
                <Text style={styles.cameraTitle}>Завантажте фото</Text>
              </TouchableOpacity>
            )}
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
    </>
  );
};
const styles = StyleSheet.create({
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
    width: "100%",
  },
  photo: {
    height: 240,
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
    marginBottom: 7,
  },
});
