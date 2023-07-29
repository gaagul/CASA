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

const fetchAllUsers = async () =>
    await getDocs(collection(db, "users"))
        .then(response => response)
        .catch(error => {
            throw error;
        });

export {
    fetchAllUsers
};
