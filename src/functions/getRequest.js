import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";

export const getAllComments = async (id, setComments) => {
  try {
    const postsDocRef = doc(db, "posts", id);

    const snapshot = await getDocs(collection(postsDocRef, "comments"));
    const commentsArray = [];
    snapshot.forEach((doc) => {
      commentsArray.push({ ...doc.data() });
    });
    setComments(commentsArray);
    // setCountComment(commentsArray.length);
  } catch (error) {
    console.log("Comments error", error);
    throw error;
  }
};

export const getUserImage = async (id, setPosts, collectionName) => {
  try {
    const postsCollection = collection(db, collectionName);
    const q = query(postsCollection, where("userId", "==", id));

    const snapshot = await getDocs(q);
    const postsArray = [];
    snapshot.forEach((doc) => {
      postsArray.push({ id: doc.id, ...doc.data() });
    });
    setPosts(postsArray);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllPosts = async (setPosts) => {
  try {
    const postsCollection = collection(db, "posts");

    const snapshot = await getDocs(postsCollection);
    const postsArray = [];
    snapshot.forEach((doc) => {
      postsArray.push({ id: doc.id, ...doc.data() });
    });
    setPosts(postsArray);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
