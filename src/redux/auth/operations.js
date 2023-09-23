import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { authSlice } from "./authSlice";

const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

export const registerDB =
  ({ email, password, name }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const currentUser = await auth.currentUser;
      if (currentUser) {
        await updateProfile(currentUser, { displayName: name });
      }

      const { uid, displayName } = await auth.currentUser;
      const emailUser = currentUser.email;

      dispatch(
        updateUserProfile({
          userId: uid,
          name: displayName,
          emailUser,
        })
      );
    } catch (error) {
      throw error;
    }
  };

export const authStateChanged = () => async (dispatch, getState) => {
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(
        updateUserProfile({
          userId: user.uid,
          name: user.displayName,
          emailUser: user.email,
        })
      );
      dispatch(authStateChange({ stateChange: true }));
    }
  });
};

export const loginDB =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  };

export const logout = () => async (dispatch, getState) => {
  try {
    await signOut(auth);
    dispatch(authSignOut());
  } catch (e) {
    throw e;
  }
};
