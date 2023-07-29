import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const fetchAllUsers = async () =>
  await getDocs(collection(db, "users"))
    .then(response => response)
    .catch(error => {
      throw error;
    });

const updateUserRole = async (userId, updatedRole) => {
  if (["standard", "moderator", "admin"].includes(updatedRole)) {
    const usersCollection = doc(db, "users", userId);

    try {
      // Update the role attribute in the user document
      await updateDoc(usersCollection, { role: updatedRole });
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

export { fetchAllUsers, updateUserRole };
