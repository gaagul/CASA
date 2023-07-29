import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    updateDoc,
    where
} from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import randomString from "random-string";
import { db, storage } from "../firebase";

const fetchAllZipcodes = async () =>
    await getDocs(collection(db, "zipcodes"))
        .then(response => response)
        .catch(error => {
            throw error;
        });

const isZipcodeExists = async (zipcode) => {
    try {
        const zipcodesRef = collection(db, 'zipcodes');

        // Query for the zipcode document that matches the given zipcode
        const querySnapshot = await getDocs(query(zipcodesRef, where('zipcode', '==', zipcode)));

        // If the querySnapshot is not empty, the zipcode exists
        if (!querySnapshot.empty) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error checking zipcode:', error);
        return false;
    }
}

const createZipcode = async zipcode => {
    let exists = await isZipcodeExists(zipcode);
    if (!exists)
        await addDoc(collection(db, "zipcodes"), {zipcode: zipcode})
            .then(response =>{ console.log("Response Zipcode", response) })
            .catch(error => {
                throw error;
            });
}


export {
    fetchAllZipcodes,
    createZipcode
};
