import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../firebase";

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

export { fetchAllProperties, fetchPropertyById, createNewUserWithRole };
