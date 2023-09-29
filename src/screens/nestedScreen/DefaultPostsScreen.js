import { MaterialIcons, Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  SafeAreaView,
} from "react-native";

import {
  selectAvatar,
  selectEmail,
  selectName,
} from "../../redux/auth/selectors";

import { handelLogout } from "../../functions/helpers";
import { getAllPosts } from "../../functions/getRequest";
import Item from "../../components/Item";

export const DefaultPostsScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  const name = useSelector(selectName);
  const email = useSelector(selectEmail);
  const avatar = useSelector(selectAvatar);

  const dispatch = useDispatch();

  useEffect(() => {
    getAllPosts(setPosts);
  }, []);

  const navigateToScreen = (screenName, params) => {
    navigation.navigate(screenName, params);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Публікації</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.linkLogout}
          onPress={() => handelLogout(dispatch)}
        >
          <MaterialIcons name="logout" size={24} style={styles.iconLogout} />
        </TouchableOpacity>
      </View>
      <View style={styles.main}>
        <View style={styles.avatar}>
          {avatar ? (
            <Image source={{ uri: avatar }} size={60} style={styles.avaImg} />
          ) : (
            <View style={styles.boxAva}>
              <Feather
                name="user"
                size={24}
                color="black"
                style={styles.avaIcon}
              />
            </View>
          )}
          <View style={styles.avaContent}>
            <Text style={styles.avaTitle}>{name}</Text>
            <Text style={styles.avaText}>{email}</Text>
          </View>
        </View>

        <View style={styles.posts}>
          {posts && (
            <SafeAreaView>
              <FlatList
                data={posts}
                keyExtractor={(item, indx) => indx.toString()}
                renderItem={({ item }) => (
                  <Item item={item} navigateToScreen={navigateToScreen} />
                )}
              />
            </SafeAreaView>
          )}
        </View>
      </View>
    </View>
  );
};
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
    // paddingTop: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  title: {
    color: "#212121",
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    fontWeight: "500",
    marginVertical: 11,
  },
  linkLogout: {
    position: "absolute",
    bottom: 10,
    right: 0,
  },
  iconLogout: {
    color: "#BDBDBD",
  },
  avatar: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 32,
  },
  avaImg: {
    borderRadius: 16,
    width: 60,
    height: 60,
  },
  boxAva: {
    position: "relative",
    borderRadius: 16,
    width: 60,
    height: 60,
    backgroundColor: "#F6F6F6",
  },
  avaIcon: {
    position: "absolute",
    top: 17,
    right: 17.5,
  },
  avaContent: {
    marginLeft: 6,
  },
  avaTitle: {
    color: "#212121",
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    fontWeight: "700",
    // lineHeight: 15,
  },
  avaText: {
    color: "rgba(33, 33, 33, 0.80)",
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    fontWeight: "400",
  },
  posts: {
    paddingBottom: 250,
  },
});
