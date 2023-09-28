import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import uuid from "react-native-uuid";
import { storage } from "../firebase/config";

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
