import { useEffect, useState } from "react";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Text,
} from "react-native";
import { BottomTabBarHeightContext } from "@react-navigation/bottom-tabs";
import { useDispatch, useSelector } from "react-redux";

import { selectName, selectUserId } from "../../redux/auth/selectors";

import ProfileItem from "../../components/ProfiIetem";

import { handelLogout } from "../../functions/helpers";
import { getUserPosts } from "../../functions/getRequest";

export const ProfileScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  const bgrImg = require("../../../assets/img/background.jpg");
  const avaImg = require("../../../assets/img/avatar.jpg");

  const name = useSelector(selectName);
  const userId = useSelector(selectUserId);

  const dispatch = useDispatch();

  useEffect(() => {
    getUserPosts(userId, setPosts);
  }, []);

  const navigateToScreen = (screenName, params) => {
    navigation.navigate(screenName, params);
  };

  return (
    <BottomTabBarHeightContext.Consumer>
      {(tabBarHeight) => (
        <View style={styles.container}>
          <View style={styles.bgrContainer}>
            <ImageBackground source={bgrImg} style={styles.bgrImage}>
              <View style={styles.contentContainer}>
                {false ? (
                  <View style={styles.avatarBox}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={{ ...styles.avatarIcon, ...styles.avatarLink }}
                      // onPress={takePhoto}
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
                    <Image source={avaImg} style={styles.avaImg}></Image>
                    <TouchableOpacity
                      style={{ ...styles.avatarIcon, ...styles.avatarLink }}
                      // onPress={setUri(null)}
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
  avaImg: {
    borderRadius: 16,
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
