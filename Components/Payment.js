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
import firebase, { createUserDocument,createCart,getCartItems,updateCartItem,deleteCartItem,createFavorite } from './firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import {doc, setDoc, addDoc, getFirestore, collection} from 'firebase/firestore'
import { BlurView } from 'expo-blur';
import LottieView from 'lottie-react-native';
const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width


export default function Payment({navigation}){
    const {click,cat,c,filter,tab,product,arrow,images,user,cart,yes,edit,price,duplicate,select} = useSelector(state => state.userReducer)
    const nav = useNavigation()
    const dispatch = useDispatch()
    const [loading,setLoading] = useState(false)
    const lottieRef = useRef()
    const [cartItems,setCartItems] = useState([])
    const[trial,setTrial] = useState([])
    const [totalPrice,setTotalPrice] = useState(0)
    const [duplicatedArray,setDuplicatedArray] = useState([])
    const [addedPrice,setAddedPrice] = useState(0)
    const [address, setAddress] = useState([])

   
    return(
        <SafeAreaView style={{flex:1, backgroundColor:'white'}}>



   
            <View style={{flexDirection:'row', alignItems:'center',justifyContent:'center',marginTop:10}}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{position:'absolute', left:0, marginLeft:10}}>
 <Ionicons name='close-outline' size={28}  />
                </TouchableOpacity>
               
 <Text style={{alignSelf:'center', fontWeight:'600', fontSize:22}}>Payment Methods</Text>
            </View>
     <View>
        <TouchableOpacity style={{flexDirection:'row', marginTop:10, borderWidth:1, borderColor:'rgba(220,220,220,0.3)', alignItems:'center', width:WIDTH*0.85, alignSelf:'center'}} 
        onPress={() => nav.navigate('Add Card')}
        >
              <Ionicons name='card-outline' size={28} style={{alignSelf:'center'}} />
            <Text style={{alignSelf:'center', fontSize:18, paddingVertical:10, fontWeight:'600', marginLeft:10}}>CREDIT / DEBIT CARD</Text>
         
        </TouchableOpacity>
        <Text style={{alignSelf:'center', marginVertical:10, fontWeight:'500', fontSize:18}}>OR</Text>
        <TouchableOpacity style={{flexDirection:'row', marginTop:10, borderWidth:1, borderColor:'rgba(220,220,220,0.3)', alignItems:'center', width:WIDTH*0.85, alignSelf:'center'}} >
             
            <Text style={{alignSelf:'center', fontSize:18, paddingVertical:10, fontWeight:'600', marginLeft:10}}>PAYPAL</Text>
         
        </TouchableOpacity>
     </View>

          
        </SafeAreaView>
    )
}