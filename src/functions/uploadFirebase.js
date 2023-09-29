import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import uuid from "react-native-uuid";
import { storage } from "../firebase/config";
import { Alert } from "react-native";

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
