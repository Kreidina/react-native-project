import { Keyboard } from "react-native";
import { logout } from "../redux/auth/operations";

export const handelLogout = (dispatch) => {
  dispatch(logout());
};

export const keyboardHide = (setIsShowKeydoard) => {
  setIsShowKeydoard(false);
  Keyboard.dismiss();
};
