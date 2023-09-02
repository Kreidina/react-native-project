import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome, SimpleLineIcons } from "@expo/vector-icons";

export const Item = ({
  photo,
  location,
  locationName,
  name,
  navigateToScreen,
}) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: photo }} style={styles.img} />
      <Text style={styles.name}>{name}</Text>
      <View style={styles.info}>
        <TouchableOpacity
          style={styles.linkComent}
          onPress={() => navigateToScreen("Comments", { photo })}
        >
          <FontAwesome name="comment-o" size={24} style={styles.iconComment} />
          <Text style={styles.count}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.linkLocation}
          onPress={() => navigateToScreen("Map", { location })}
        >
          <SimpleLineIcons
            name="location-pin"
            size={24}
            color="black"
            style={styles.iconLocation}
          />
          <Text style={styles.location}>{locationName}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
  linkComent: {
    flexDirection: "row",
    alignItems: "center",
  },
  count: { color: "#BDBDBD" },
  linkLocation: {
    flexDirection: "row",
    alignItems: "center",
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
