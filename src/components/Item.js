import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome, SimpleLineIcons, AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { getAllComments } from "../functions/getRequest";
import { selectUserId } from "../redux/auth/selectors";
import { updateFavorites } from "../functions/uploadFirebase";

const Item = ({ item, navigateToScreen }) => {
  const [countComment, setCountComment] = useState(0);
  const [countLike, setCountLike] = useState(0);
  const [comments, setComments] = useState([]);

  const idUser = useSelector(selectUserId);

  const { img, location, contentName, contentLocation, favorite } = item;

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
            <FontAwesome
              name="comment-o"
              size={24}
              style={styles.iconComment}
            />
            <Text style={styles.value}>{countComment}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.link}
            onPress={() => updateFavorites(postId, idUser)}
          >
            {isFavorite ? (
              <AntDesign name="like1" size={24} style={styles.likeIcon} />
            ) : (
              <AntDesign name="like2" size={24} style={styles.iconComment} />
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
          <Text style={styles.location}>{contentLocation}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 32,
  },
  img: {
    width: "100%",
    height: 240,
    borderRadius: 8,
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
  value: {
    color: "#BDBDBD",
    marginRight: 6,
  },
  link: {
    flexDirection: "row",
    alignItems: "center",
  },
  likeIcon: {
    color: "#FF6C00",
    marginRight: 6,
  },
  comLike: {
    flexDirection: "row",
  },
  iconComment: {
    color: "#BDBDBD",
    marginRight: 6,
  },
  iconLocation: {
    color: "#BDBDBD",
    marginRight: 4,
  },
  location: {
    color: "#212121",
    textAlign: "right",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontWeight: "400",
    textDecorationLine: "underline",
  },
});
