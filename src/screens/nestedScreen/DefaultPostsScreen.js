import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { useDispatch } from "react-redux";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
} from "react-native";
import { Item } from "../../components/Item";
import { logout } from "../../redux/auth/operations";
import { storage } from "../../firebase/config";

export const DefaultPostsScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);
  const [photo, setPhoto] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  const navigateToScreen = (screenName, params) => {
    navigation.navigate(screenName, params);
  };

  const handelLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    getAll();
  }, []);

  const getAll = async () => {
    try {
      const mainStorageRef = ref(storage, "postImage");

      await listAll(mainStorageRef).then((res) => {
        res.items.forEach((item) => {
          // const url = getDownloadURL(item);
          // console.log(item);
          const oneItem = item._location.path;
          const file = [];
          file.push(oneItem);
          setPhoto(file);
          // console.log("response", res.items);
          // console.log("response", res.prefixes);
        });
      });
      // console.log(files);
    } catch (e) {
      console.log("Помилка завантаження", e);
    }
  };
  // console.log(posts);

  const avaImg = require("../../../assets/img/avatar.jpg");
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Публікації</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.linkLogout}
          onPress={handelLogout}
        >
          <MaterialIcons name="logout" size={24} style={styles.iconLogout} />
        </TouchableOpacity>
      </View>
      <View style={styles.main}>
        <View style={styles.avatar}>
          <Image source={avaImg} size={60} style={styles.avaImg} />
          <Image source={{ uri: photo[0] }} size={60} style={styles.avaImg} />

          <View style={styles.avaContent}>
            <Text style={styles.avaTitle}>Natali Romanova</Text>
            <Text style={styles.avaText}>email@example.com</Text>
          </View>
        </View>
        <View style={styles.posts}>
          {posts && (
            <FlatList
              data={posts}
              keyExtractor={(item, indx) => indx.toString()}
              renderItem={({ item }) => (
                <Item
                  photo={item.photo}
                  name={item.postContent.name}
                  locationName={item.postContent.location}
                  navigateToScreen={navigateToScreen}
                  location={item.location}
                />
              )}
            />
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
    width: 60,
    height: 60,
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
    // marginBottom: 50,
  },
});
