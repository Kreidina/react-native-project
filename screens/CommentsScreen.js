import { AntDesign } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

export const CommentsScreen = () => {
  return (
    <>
      <AntDesign
        name="arrowup"
        size={24}
        color="black"
        style={styles.iconLogout}
      />
    </>
  );
};
const styles = StyleSheet.create({
  iconLogout: {},
});
