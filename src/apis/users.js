import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import {getFromLocalStorage} from "../hooks/useLocalStorage"
import { db } from "../firebase";

const fetchAllUsers = async () =>
  await getDocs(collection(db, "users"))
    .then(response => response)
    .catch(error => {
      throw error;
    });

const updateUserRole = async (userId, updatedRole, successCallback) => {
  if (["standard", "moderator", "admin"].includes(updatedRole)) {
    const usersCollection = doc(db, "users", userId);

    try {
      // Update the role attribute in the user document
      await updateDoc(usersCollection, { role: updatedRole });
      successCallback();
      console.log("User role successfully updated!");
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  } else {
    console.error(
      "Invalid updatedRole parameter. Please provide 'standard', 'moderator', or 'admin'."
    );
  }
};

const updateUserWithZipcodes = async (userId, listOfZipcodes) => {
  try {
    if (!Array.isArray(listOfZipcodes)) {
      throw new Error('Invalid zipcodes parameter. It should be an array.');
    }
    
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      listOfZipcodes: listOfZipcodes
    });

    console.log('listOfZipcodes updated successfully!');
    return true;
  } catch (error) {
    console.error('Error updating user document:', error);
    return false;
  }
}

export { fetchAllUsers, updateUserRole, updateUserWithZipcodes };
