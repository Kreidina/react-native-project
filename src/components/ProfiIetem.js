import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { AntDesign, FontAwesome, SimpleLineIcons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { getAllComments } from "../functions/getRequest";
import { updateFavorites } from "../functions/uploadFirebase";
import { selectUserId } from "../redux/auth/selectors";

const ProfileItem = ({ item, navigateToScreen }) => {
  const [comments, setComments] = useState([]);
  const [countComment, setCountComment] = useState(0);
  const [countLike, setCountLike] = useState(0);

  const idUser = useSelector(selectUserId);

  const { contentLocation, contentName, img, location, favorite } = item;

  useEffect(() => {
    getAllComments(item.id, setComments);
    setCountComment(comments.length);
    setCountLike(favorite.length);
  }, [comments]);

  const postId = item.id;
  const isFavorite = favorite.some((fav) => fav.userId === idUser);

  return (
    <View style={styles.container}>
      <Image source={{ uri: img }} style={styles.img} />
      <Text style={styles.name}>{contentName}</Text>
      <View style={styles.info}>
        <View style={styles.comLike}>
          <TouchableOpacity
            style={styles.link}
            onPress={() => navigateToScreen("Comments", { img, id: item.id })}
          >
            <FontAwesome name="comment" size={24} style={styles.iconComment} />
            <Text style={{ ...styles.value, marginRight: 24 }}>
              {countComment}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.link}
            onPress={() => updateFavorites(postId, idUser)}
          >
            {isFavorite ? (
              <AntDesign name="like1" size={24} style={styles.likeIcon} />
            ) : (
              <AntDesign name="like2" size={24} style={styles.likeIcon} />
            )}
            <Text style={styles.value}>{countLike}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.link}
          onPress={() => navigateToScreen("Map", { location })}
        >
          <SimpleLineIcons
            name="location-pin"
            size={24}
            color="black"
            style={styles.iconLocation}
          />
          <Text
            style={{
              ...styles.value,
              textDecorationLine: "underline",
            }}
          >
            {contentLocation}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileItem;

const styles = StyleSheet.create({
  img: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginTop: 35,
  },
  name: {
    color: "#212121",
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    fontWeight: "500",
    marginVertical: 8,
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  comLike: {
    flexDirection: "row",
  },
  link: {
    flexDirection: "row",
    alignItems: "center",
  },

  likeIcon: {
    color: "#FF6C00",
    marginRight: 6,
  },
  iconComment: {
    color: "#FF6C00",
    marginRight: 6,
  },
  iconLocation: {
    color: "#BDBDBD",
    marginRight: 4,
  },
  value: {
    color: "#212121",
    textAlign: "right",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontWeight: "400",
  },
});
