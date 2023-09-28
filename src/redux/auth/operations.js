import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth, db } from "../../firebase/config";
import { authSlice } from "./authSlice";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

export const registerDB =
  ({ email, password, name, img }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const currentUser = await auth.currentUser;

      await addDoc(collection(db, "avatars"), {
        avaImg: img,
        userId: currentUser.uid,
      });

      const postsCollection = collection(db, "avatars");
      const q = query(postsCollection, where("userId", "==", currentUser.uid));
      const snapshot = await getDocs(q);
      let avatarImg;

      snapshot.forEach((doc) => {
        const { avaImg } = doc.data();
        avatarImg = avaImg;
      });

      if (currentUser) {
        await updateProfile(currentUser, {
          displayName: name,
          photoURL: avatarImg,
        });
      }

      const { uid, displayName, photoURL } = await auth.currentUser;
      const emailUser = currentUser.email;

      dispatch(
        updateUserProfile({
          userId: uid,
          name: displayName,
          emailUser: emailUser.email,
          avaImg: photoURL,
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
          avaImg: user.photoURL,
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
