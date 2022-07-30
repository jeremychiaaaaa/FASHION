    import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect,useRef} from 'react'
import { StyleSheet, Text, View,SafeAreaView,Dimensions,Image,TouchableOpacity,ScrollView,FlatList, Alert, Modal, ImageStore, Touchable } from 'react-native';
import { NavigationContainer,useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Discover from './Discover';
import Favorites from './Favorites';
import Profile from './Profile';
import { SliderBox } from "react-native-image-slider-box";
import Slideshow from 'react-native-slideshow-improved';
import TimedSlideshow from 'react-native-timed-slideshow';
import InstaStory from 'react-native-insta-story';
import { LinearGradient } from 'expo-linear-gradient';
import { DiscoverStack } from './Discover';
import { useSelector, useDispatch } from 'react-redux';
import { setProductName,setClicked, setSearchClicked,setFilter,setTab,setArrow,setImages,setUser,setNumberOfCartItems,setAuthenticaed,setDuplicatedIndex } from './redux/actions';
import firebase, { createUserDocument,createCart,getCartItems,updateCartItem,deleteCartItem,createFavorite,addCard } from './firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import {doc, setDoc, addDoc, getFirestore, collection} from 'firebase/firestore'
import { BlurView } from 'expo-blur';
import LottieView from 'lottie-react-native';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width

//modal popup

export default function AddCard({navigation}){
    const {click,cat,c,filter,tab,product,arrow,images,user,cart,yes,edit,price,duplicate,select} = useSelector(state => state.userReducer)
    const nav = useNavigation()
    const dispatch = useDispatch()
    const [number,setNumber] = useState()
    const[expiry,setExpiry] = useState()
    const [cvc,setCVC] = useState()
    const [type,setType] = useState()
    const [name,setName] = useState()
    const [valid,setValid] = useState(false)

    const add = async () => {
        try {
             let cardDetails = []
        let a = {number, expiry, cvc, type, name}
        cardDetails.push(a)
        console.log(cardDetails)
        await addCard(user,{cardDetails})
        dispatch(setAuthenticaed(true))
        navigation.goBack()
        } catch (error) {
            console.log(error.message)
        }
       
    }
    return(
        <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
            <View style={{marginTop:10}}>
                <View style={{flexDirection:'row', alignItems:'center',justifyContent:'center'}}>
                      <Ionicons name='close-outline' size={32} color={'black'} style={{position:'absolute',right:0, marginRight:10}} onPress={() =>    navigation.goBack()}  />
                      <Text style={{alignSelf:'center', fontWeight:'600', fontSize:22}}>ADD CREDIT / DEBIT CARD</Text>
                </View>
            <CreditCardInput onChange = {(form) => {
                console.log(form)
                setName(form.values.name)
                setExpiry(form.values.expiry)
                setCVC(form.values.cvc)
                setType(form.values.type)
                setNumber(form.values.number)
               {form.valid &&  setValid(true)}
            }} 
            requiresCVC
            requiresName
            
            />
    {valid && (
        <TouchableOpacity style={{marginTop:15, width:WIDTH*0.85, borderWidth:1, borderColor:'transparent', backgroundColor:'black', borderRadius:10, justifyContent:'center', alignSelf:'center'}}
        onPress={add}
        >
            <Text style={{alignSelf:'center', paddingVertical:10, fontSize:18, fontWeight:'600', color:'white',textTransform:'uppercase'}}>Add This Card</Text>
            </TouchableOpacity>
    )}

            </View>
        </SafeAreaView>
    )
}