// firebase-config.js
// ⚠️ Firebase 콘솔(https://console.firebase.google.com)에서 프로젝트를 만든 뒤,
// [프로젝트 설정 > 일반 > 내 앱 > SDK 설정 및 구성]에서 아래 값을 복사해 넣으세요.

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyACGgXY2fiZtdVg9ebcUsFrSjwK7Yv_sC4",
  authDomain: "mnh-coffee-repair.firebaseapp.com",
  projectId: "mnh-coffee-repair",
  storageBucket: "mnh-coffee-repair.firebasestorage.app",
  messagingSenderId: "78404702948",
  appId: "1:78404702948:web:a737889cd4dc1878d452f1"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
