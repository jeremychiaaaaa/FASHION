import firebase from 'firebase/compat/app';
import "firebase/compat/firestore";
import { doc, getFirestore, getDoc, collection, setDoc, serverTimestamp, updateDoc, runTransaction, addDoc, arrayUnion, arrayRemove,getDocs } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-Wd0sZgHrZysFyagLCAqO5yc4gTgb9kw",
  authDomain: "ecommerce-7700c.firebaseapp.com",
  databaseURL: "https://ecommerce-7700c-default-rtdb.firebaseio.com",
  projectId: "ecommerce-7700c",
  storageBucket: "ecommerce-7700c.appspot.com",
  messagingSenderId: "442296633161",
  appId: "1:442296633161:web:d9f11663ed55836b55bc98",
  measurementId: "G-21LPP94YHE"
};

// Initialize Firebase
let app;
if(firebase.apps.length === 0){
    app= firebase.initializeApp(firebaseConfig);
} else {
    app=firebase.app()
}
export const createUserDocument = async (user,additionalData) => {
    if(!user) return;
    const db=getFirestore()
          const colRef = collection(db, 'trial')
          const uid = user.user.uid
          console.log(uid)
    const userRef = doc(db, 'trial', uid) 
  const snapshot = await getDoc(userRef)
  
  if(!snapshot.exists()){
    
    const {username} = additionalData
  
    try {
      setDoc(userRef,{
       username,
       temp:[],
       favorite:[],
       shipping:[],
       paymentCards:[],
       order:[]
      })
    } catch(error){
      console.log(error.message)
    }
  }
  }
  export const createReview = async (user,additionalData) => {
    const db = getFirestore()
    const colRef = collection(db, 'reviews')
    const uid = user.user.uid
    console.log(uid)
    const userRef = collection(db, 'reviews')
    const {reviewObject} = additionalData

  
    try{
      addDoc(userRef, {
       reviewObject: reviewObject,

      },)
    } catch(error){
      console.log(error.message)
    }
  }
  export const getReviews = async (user) => {
    if(!user) return;
    const db = getFirestore()
    const colRef = collection(db, 'reviews')
    const uid = user.user.uid
    console.log(uid)
    const userRef = doc(db,'trial',uid)
    const querySnapshot = await getDocs(collection(db, "reviews"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
    
  return querySnapshot
  }
  export const createFavorite = async (user, additionalData) => {
    if(!user) return;
    const db = getFirestore()
    const colRef = collection(db, 'trial')
    const uid = user.user.uid
    console.log(uid)
    const userRef = doc(db,'trial',uid)
    const {b} = additionalData
    const snapshot = await getDoc(userRef)
  console.log('snapshot is' + snapshot)
  
    try{
      updateDoc(userRef, {
        favorite:arrayUnion(...b)
      },)
    } catch(error){
      console.log(error.message)
    }
  }
export const createShipping = async (user, additionalData) => {
  if(!user) return
  const db = getFirestore()
  const colRef = collection(db, 'trial')
  const uid = user.user.uid
  console.log(uid)
  const userRef = doc(db,'trial',uid)
  const {shipping} = additionalData
  const snapshot = await getDoc(userRef)
console.log('snapshot is' + snapshot)

  try{
    updateDoc(userRef, {
      shipping:arrayUnion(...shipping)
    },)
  } catch(error){
    console.log(error.message)
  }
}
export const createOrder = async (user, additionalData) => {
  if(!user) return
  const db = getFirestore()
  const colRef = collection(db, 'trial')
  const uid = user.user.uid
  console.log(uid)
  const userRef = doc(db,'trial',uid)
  const {order} = additionalData
  const snapshot = await getDoc(userRef)
console.log('snapshot is' + snapshot)

  try{
    updateDoc(userRef, {
      order:arrayUnion(...order)
    },)
  } catch(error){
    console.log(error.message)
  }
}
  export const createCart = async (user, additionalData) => {
    if(!user) return;
    const db = getFirestore()
    const colRef = collection(db, 'trial')
    const uid = user.user.uid
    console.log(uid)
    const userRef = doc(db,'trial',uid)
    const {temp} = additionalData
    const snapshot = await getDoc(userRef)
  console.log('snapshot is' + snapshot)
  
    try{
      updateDoc(userRef, {
        temp:arrayUnion(...temp)
      },)
    } catch(error){
      console.log(error.message)
    }
  }
  export const addCard = async (user, additionalData) => {
    if(!user) return;
    const db = getFirestore()
    const colRef = collection(db, 'trial')
    const uid = user.user.uid
    console.log(uid)
    const userRef = doc(db,'trial',uid)
    const {cardDetails} = additionalData
    const snapshot = await getDoc(userRef)
  console.log('snapshot is' + snapshot)
  
    try{
      updateDoc(userRef, {
        paymentCards:arrayUnion(...cardDetails)
      },)
    } catch(error){
      console.log(error.message)
    }
  }
  export const getCartItems = async (user) => {
    if(!user) return;
    const db = getFirestore()
    const colRef = collection(db, 'trial')
    const uid = user.user.uid
    console.log(uid)
    const userRef = doc(db,'trial',uid)
    
    try {
      const docsnap = await getDoc(userRef)
  

      console.log('Got data')
      return docsnap
    } catch (error) {
      console.log(error.message)
    }
  
  }
  export const getFavoriteItems = async (user) => {
    if(!user) return;
    const db = getFirestore()
    const colRef = collection(db, 'trial')
    const uid = user.user.uid
    console.log(uid)
    const userRef = doc(db,'trial',uid)
    
    try {
      const docsnap = await getDoc(userRef)
  

      console.log('Got data')
      return docsnap
    } catch (error) {
      console.log(error.message)
    }
  
  }
  export const getAddress = async (user) => {
    if(!user) return;
    const db = getFirestore()
    const colRef = collection(db, 'trial')
    const uid = user.user.uid
    console.log(uid)
    const userRef = doc(db,'trial',uid)
    
    try {
      const docsnap = await getDoc(userRef)
  
     
      console.log('Got data')
      return docsnap
    } catch (error) {
      console.log(error.message)
    }
  
  }
  export const updateCartItem = async (user,additionalData) => {
    if(!user) return
    const db = getFirestore()
    const colRef = collection(db, 'trial')
    const uid = user.user.uid
    console.log(uid)
    const userRef = doc(db,'trial',uid)
    const {cartItems} = additionalData
    try {
      updateDoc(userRef,{
 temp:cartItems

      }
        )
    } catch (error) {
      console.log(error.message)
    }
  }
  export const updateAddress = async (user,additionalData) => {
    if(!user) return
    const db = getFirestore()
    const colRef = collection(db, 'trial')
    const uid = user.user.uid
    console.log(uid)
    const userRef = doc(db,'trial',uid)
    const {shippingAddress} = additionalData
    try {
      updateDoc(userRef,{
 shipping:shippingAddress

      }
        )
    } catch (error) {
      console.log(error.message)
    }
  }
  export const deleteCartItem = async (user,additionalData) => {
    if(!user) return
    const db = getFirestore()
    const colRef = collection(db, 'trial')
    const uid = user.user.uid
    console.log(uid)
    const userRef = doc(db,'trial',uid)
    const {cartItems} = additionalData
    try {
      updateDoc(userRef,{
 temp:cartItems

      }
        )
    } catch (error) {
      console.log(error.message)
    }
  }
  export const deleteFavoriteItem = async (user,additionalData) => {
    if(!user) return
    const db = getFirestore()
    const colRef = collection(db, 'trial')
    const uid = user.user.uid
    console.log(uid)
    const userRef = doc(db,'trial',uid)
    const {favoriteItems} = additionalData
    try {
      updateDoc(userRef,{
 favorite:favoriteItems

      }
        )
    } catch (error) {
      console.log(error.message)
    }
  }
export default firebase