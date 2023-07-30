import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  deleteDoc,
  where
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import randomString from "random-string";
import { db, storage } from "../firebase";
import { createZipcode } from "./zipcode";

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

const fetchApprovedProperties = async () => 
    await getDocs(query(collection(db, "properties"), where("status", "==", "approved")))
      .then(response => response)
      .catch(error => {
        throw error;
      });

const fetchFeaturedProperties = async () => 
await getDocs(query(collection(db, "properties"), where("isFeatured", "==", true)))
  .then(response => response)
  .catch(error => {
    throw error;
  })

const createProperty = async propertyInfo => {
  let propertyResponse = await addDoc(collection(db, "properties"), propertyInfo)
  .then(response => response)
  .catch(error => {
    throw error;
  });
  if(propertyResponse)
    await createZipcode(propertyInfo.zipcode);
  return propertyResponse;
}

const deletePropertyById = async (propertyId) => {
  return await deleteDoc(doc(db, "properties", propertyId)).then(response=>{console.log("Successfully Deleted"+propertyId)}).catch(error=>{throw error});
}

const fetchUserById = async uid =>
  await getDoc(doc(db, "users", uid))
    .then(response => response)
    .catch(error => {
      throw error;
    });

const setPropertyStatus = async (
  propertyId,
  status,
  successCallback = () => {}
) => {
  const property = await fetchPropertyById(propertyId);
  const currentStatus = property.data().status;
  let updatedStatus = currentStatus;
  if (status === "Approve") updatedStatus = "approved";
  else if (status === "Reject") updatedStatus = "rejected";
  else if (status === "Pending") updatedStatus = "pending";

  if (updatedStatus !== currentStatus) {

    await updateDoc(
      doc(db, property._key.path.segments[0], property._key.path.segments[1]),
      { status: updatedStatus }
    );
    successCallback();
    return true;
    
  }
  throw "Nothing to update as current state same as the update state.";
};

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

const uploadImageAsset = async file => {
  const storageRef = ref(storage, `properties-images/${randomString()}.jpg`);
  try {
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    console.log("Download URL:", downloadURL);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
  }
  // const uploadedSnapshot = await uploadString(storageRef, thumbURL, "base64");
  // const downloadURL = await getImageURL(uploadedSnapshot.ref);
  // console.log("File available at", downloadURL);
};

const getPropertiesByUserId = async (uid) => {
  try {
    const propertiesRef = collection(db, 'properties');

    // Query for properties where the uid matches the given parameter
    const querySnapshot = await getDocs(query(propertiesRef, where('userId', '==', uid)));

    // Extract and return the property data
    const properties = [];
    querySnapshot.forEach((propertyDoc) => {
      properties.push({
        id: propertyDoc.id,
        ...propertyDoc.data(),
      });
    });

    return properties;
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
}

const getPropertiesWithMatchingZipcodes = async userId => {
  try {
    // Step 1: Get the user document using the user ID
    const userRef = doc(collection(db, 'users'), userId);
    const userDoc = await getDoc(userRef);

    // Step 2: Extract the listOfZipcodes array from the user document
    const listOfZipcodes = userDoc.data().listOfZipcodes;

    // Step 3: Fetch properties that have a zipcode matching any value in the listOfZipcodes array
    const propertiesQuery = query(collection(db, 'properties'), where('zipcode', 'in', listOfZipcodes));
    const propertiesSnapshot = await getDocs(propertiesQuery);

    // Step 4: Extract and return the property data
    const properties = [];
    propertiesSnapshot.forEach((propertyDoc) => {
      properties.push({
        id: propertyDoc.id,
        ...propertyDoc.data(),
      });
    });

    return properties;
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
}

export {
  fetchAllProperties,
  fetchPropertyById,
  fetchUserById,
  fetchApprovedProperties,
  fetchFeaturedProperties,
  createProperty,
  setPropertyStatus,
  createNewUserWithRole,
  uploadImageAsset,
  getImageURL,
  getPropertiesWithMatchingZipcodes,
  getPropertiesByUserId,
  deletePropertyById
};
