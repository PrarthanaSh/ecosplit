import { getAuth, createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    updateProfile,
    signOut as fbSignOut,
    initializeAuth, getReactNativePersistence, onAuthStateChanged
  } from 'firebase/auth';
  import { getApps, initializeApp } from 'firebase/app';
  import { firebaseConfig } from './Secrets';

// import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });
  
let app, auth;

const apps = getApps();
if (apps.length == 0) { 
  app = initializeApp(firebaseConfig);
} else {
  app = apps[0];
}

// auth = getAuth(app); // if auth already initialized

try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
} catch (error) {
  auth = getAuth(app); // if auth already initialized
}

// let unsubscribeFromAuthChanges = undefined;

const subscribeToAuthChanges = (navigation) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      navigation.navigate('HomeSet');
      // console.log("loggin in", user)
    } else {
      navigation.navigate('Login');
      // console.log("no one logged in")
    }
  })
}
  
const signIn = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password);
}

const signUp = async (displayName, email, password) => {
  const userCred = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(userCred.user, {displayName: displayName});
  return userCred.user
}

const signOut = async () => {
  await fbSignOut(auth);
}

const getAuthUser = () => {
  return auth.currentUser;
}

export { signUp, signIn, signOut, getAuthUser, subscribeToAuthChanges };