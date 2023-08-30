import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyDH534UQVnxnJkjiIbuhQd5Mic2fxbKO8U",
    authDomain: "upload-2d329.firebaseapp.com",
    projectId: "upload-2d329",
    storageBucket: "upload-2d329.appspot.com",
    messagingSenderId: "209692644905",
    appId: "1:209692644905:web:73c332778e0af77f47ae38"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)