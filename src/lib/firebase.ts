import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA-cDJY2dAc9VY479ggPUp_DEZJMJijcIY",
  authDomain: "chatwithyash-6e5a3.firebaseapp.com",
  databaseURL: "https://chatwithyash-6e5a3-default-rtdb.firebaseio.com",
  projectId: "chatwithyash-6e5a3",
  storageBucket: "chatwithyash-6e5a3.appspot.com",
  messagingSenderId: "860118961558",
  appId: "1:860118961558:web:f0342e835939e2d8f4e1b7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);