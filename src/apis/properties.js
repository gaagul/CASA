import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import randomString from "random-string";
import { db, storage } from "../firebase";

const fetchAllProperties = async () =>
  await getDocs(collection(db, "properties"))
    .then(response => response)
    .catch(error => {
      throw error;
    });

const fetchPropertyById = async id =>
  await getDoc(doc(db, "properties", id))
    .then(response => response)
    .catch(error => {
      throw error;
    });

const createProperty = async propertyInfo =>
  await addDoc(collection(db, "properties"), propertyInfo)
    .then(response => response)
    .catch(error => {
      throw error;
    });

const fetchUserById = async uid =>
  await getDoc(doc(db, "users", uid))
    .then(response => response)
    .catch(error => {
      throw error;
    });

const createNewUserWithRole = async (userId, userDetails) => {
  const isUserExists = await fetchUserById(userId);
  if (isUserExists.exists()) {
    throw "User Already exists!!!";
  }

  return await setDoc(doc(db, "users", userId), userDetails)
    .then(response => {
      console.log("Successfully created user");
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
};

const getImageURL = async imageSnapshotRef =>
  await getDownloadURL(imageSnapshotRef);

const uploadImageAsset = async thumbURL => {
  const storageRef = ref(storage, `properties-images/${randomString()}.jpg`);
  const uploadedSnapshot = await uploadString(storageRef, thumbURL, "base64");
  const downloadURL = await getImageURL(uploadedSnapshot.ref);
  console.log("File available at", downloadURL);

  return downloadURL;
};

export {
  fetchAllProperties,
  fetchPropertyById,
  createProperty,
  createNewUserWithRole,
  uploadImageAsset,
  getImageURL,
};
