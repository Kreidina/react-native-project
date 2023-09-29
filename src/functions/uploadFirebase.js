import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import uuid from "react-native-uuid";
import { Alert } from "react-native";
import { doc, runTransaction } from "firebase/firestore";

import { db, storage } from "../firebase/config";

export const uploadImage = async (uri) => {
  try {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const uniqueId = uuid.v4();
    const storageRef = ref(storage, `postImage/${uniqueId}`);
    await uploadBytes(storageRef, blob);

    blob.close();

    const photoUrl = await getDownloadURL(storageRef);

    return photoUrl;
  } catch (error) {
    console.error("Помилка завантаження фотографії:", error);
  }
};

const uploadToFirebase = async (uri, name, onProgress, setFiles) => {
  const fetchResponse = await fetch(uri);
  const theBlob = await fetchResponse.blob();

  const imageRef = ref(storage, `avatars/${name}`);

  const uploadTask = uploadBytesResumable(imageRef, theBlob);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress && onProgress(progress);
      },
      (error) => {
        console.log(error, "error");
        reject(error);
      },

      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        setFiles(downloadUrl);
        resolve({
          downloadUrl,
          metadata: uploadTask.snapshot.metadata,
        });
      }
    );
  });
};

export const uploadToPhoto = async (cameraRef, setFiles) => {
  try {
    if (!cameraRef.canceled) {
      const { uri } = cameraRef.assets[0];
      const fileName = uri.split("/").pop();

      await uploadToFirebase(uri, fileName, (v) => console.log(v), setFiles);
    }
  } catch (e) {
    Alert.alert("Error Uploading Image " + e.message);
    console.log(e.message);
  }
};

export const updateFavorites = async (postId, userId) => {
  const postRef = doc(db, "posts", postId);

  try {
    await runTransaction(db, async (transaction) => {
      const postDoc = await transaction.get(postRef);

      if (!postDoc.exists) {
        throw "Post document does not exist!";
      }

      const favorites = postDoc.data().favorite || [];
      const userIndex = favorites.findIndex(
        (favorite) => favorite.userId === userId
      );

      if (userIndex === -1) {
        favorites.push({ userId });
      } else {
        favorites.splice(userIndex, 1);
      }

      transaction.update(postRef, { favorite: favorites });
    });
  } catch (error) {
    console.error("Error adding/removing from favorites: ", error);
  }
};
