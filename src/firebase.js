import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBVpzhefkmo5iZ2yOIlqtSqhXTi-NqTLEc',
  authDomain: 'first-fire-20ce0.firebaseapp.com',
  projectId: 'first-fire-20ce0',
  storageBucket: 'first-fire-20ce0.firebasestorage.app',
  messagingSenderId: '879858188385',
  appId: '1:879858188385:web:15bae335fd5451afe22a20',
  measurementId: 'G-H1KQGE1BY9',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { auth, GoogleAuthProvider, signInWithPopup }
