import { useEffect, useState } from "react";
import { MaterialIcons, AntDesign, Feather } from "@expo/vector-icons";
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Text,
  Alert,
} from "react-native";
import { BottomTabBarHeightContext } from "@react-navigation/bottom-tabs";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";

import {
  selectAvatar,
  selectName,
  selectUserId,
} from "../../redux/auth/selectors";

import ProfileItem from "../../components/ProfiIetem";

import { handelLogout } from "../../functions/helpers";
import { getUserImage } from "../../functions/getRequest";
import { storage } from "../../firebase/config";
import { deleteObject, ref } from "firebase/storage";
import { uploadToPhoto } from "../../functions/uploadFirebase";
import { updateAvatarImg } from "../../redux/auth/operations";

export const ProfileScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [files, setFiles] = useState(null);

  const bgrImg = require("../../../assets/img/background.jpg");

  const name = useSelector(selectName);
  const userId = useSelector(selectUserId);
  const avatar = useSelector(selectAvatar);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserImage(userId, setPosts, "posts");
  }, []);

  useEffect(() => {
    if (files) {
      dispatch(updateAvatarImg(files));
    }
  }, [files]);

  const navigateToScreen = (screenName, params) => {
    navigation.navigate(screenName, params);
  };

  const takePhoto = async () => {
    try {
      const cameraResp = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
      });

      if (avatar) {
        const decodedFilename = decodeURIComponent(avatar);
        const parts = decodedFilename.split("/");
        const filenameWithParams = parts[parts.length - 1];
        const filename = filenameWithParams.split("?")[0];
        const fileRef = ref(storage, `avatars/${filename}`);
        await deleteObject(fileRef);
      }

      await uploadToPhoto(cameraResp, setFiles);
    } catch (e) {
      Alert.alert("Error Make Image " + e.message);
      console.log(e.message);
    }
  };

  return (
    <BottomTabBarHeightContext.Consumer>
      {(tabBarHeight) => (
        <View style={styles.container}>
          <View style={styles.bgrContainer}>
            <ImageBackground source={bgrImg} style={styles.bgrImage}>
              <View style={styles.contentContainer}>
                {!avatar ? (
                  <View style={styles.avatarBox}>
                    <Feather
                      name="user"
                      size={60}
                      color="black"
                      style={styles.avaIcon}
                    />
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
                    <Image source={{ uri: avatar }} style={styles.avaImg} />
                    <TouchableOpacity
                      style={{ ...styles.avatarIcon, ...styles.avatarLink }}
                      onPress={takePhoto}
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
                <Text style={styles.titleMain}>{name}</Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.linkLogout}
                  onPress={() => handelLogout(dispatch)}
                >
                  <MaterialIcons
                    name="logout"
                    size={25}
                    style={styles.iconLogout}
                  />
                </TouchableOpacity>

                <View style={styles.posts}>
                  {posts && (
                    <SafeAreaView>
                      <FlatList
                        data={posts}
                        keyExtractor={(item, indx) => indx.toString()}
                        renderItem={({ item }) => (
                          <ProfileItem
                            item={item}
                            navigateToScreen={navigateToScreen}
                          />
                        )}
                      />
                    </SafeAreaView>
                  )}
                </View>
              </View>
            </ImageBackground>
          </View>
        </View>
      )}
    </BottomTabBarHeightContext.Consumer>
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
  },
  contentContainer: {
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    marginTop: 100,
    height: "100%",
  },
  avatarBox: {
    position: "absolute",
    top: -60,
    right: "36%",
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  avaIcon: {
    position: "absolute",
    top: 28,
    left: 30,
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
  titleMain: {
    color: "#212121",
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 30,
    fontWeight: "500",
    letterSpacing: 0.3,
    marginTop: 92,
  },
  iconComment: { paddingBottom: 300 },
  linkLogout: {
    position: "absolute",
    top: 22,
    right: 16,
  },
  iconLogout: {
    width: 24,
    height: 24,
    color: "#BDBDBD",
  },
  posts: {
    paddingBottom: 250,
    // marginBottom: 50,
  },
});
