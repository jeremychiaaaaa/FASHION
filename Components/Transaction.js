import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect,useRef,useCallback} from 'react'
import { StyleSheet, Text, View,SafeAreaView,Dimensions,Image,TouchableOpacity,ScrollView,FlatList, Alert, Modal, ImageStore,TouchableHighlight } from 'react-native';
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
import Swipeable from 'react-native-gesture-handler/Swipeable';
import TimedSlideshow from 'react-native-timed-slideshow';
import InstaStory from 'react-native-insta-story';
import { LinearGradient } from 'expo-linear-gradient';
import { DiscoverStack } from './Discover';
import { useSelector, useDispatch } from 'react-redux';
import { setClicked, setSearchClicked,setFilter,setTab,setArrow,setImages,setUser,setNumberOfCartItems,setAuthenticaed,setIndexEdit, setProductName,setPriceEdit,setDuplicatedIndex,setChangeAddress,setSelectedAddress } from './redux/actions';
import { BlurView } from 'expo-blur';
import LottieView from 'lottie-react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import ReadMore from '@fawazahmed/react-native-read-more';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import HorizontalBarGraph from '@chartiful/react-native-horizontal-bar-graph'
import firebase, { createUserDocument,createCart,getCartItems,updateCartItem,deleteCartItem,getAddress } from './firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import {doc, setDoc, addDoc, getFirestore, collection, } from 'firebase/firestore'
import CounterInput from "react-native-counter-input";
import ModalDropdown from 'react-native-modal-dropdown';
import Counter from "react-native-counters";
const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width


export default function Transaction({navigation}){
    return(
        <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
          <View style={{flexDirection:'row',alignItems:'center',width:WIDTH,justifyContent:'center'}}>
                               <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ marginRight:20,position:'absolute', right:0,top:10}}>
             <Ionicons name='close-circle-outline' size={32} />
            </TouchableOpacity>   
           
                          </View>
 <Text style={{marginTop:40, alignSelf:'center',fontSize:32, fontWeight:'600', transform:[{translateY:30}]}}>Transaction Success !</Text>
            <View style={{marginTop:10, width:WIDTH, height:HEIGHT*0.35, justifyContent:'center'}}>
                <LottieView source={require('./assets/100563-add-to-product.json')} autoPlay loop />
            </View>
 
                <Text style={{alignSelf:'center', fontWeight:'300', fontSize:18, marginHorizontal:25,textAlign:'center'}}>
                Your order has been successfully placed. You may view your order with the link below... Thankyou for shopping with us !
            </Text>
            <TouchableOpacity style={{marginTop:20, width:WIDTH*0.9,alignSelf:'center', borderWidth:1,borderColor:'transparent', borderRadius:10, backgroundColor:'black'}}
            
            
            >
                <Text style={{alignSelf:'center', fontWeight:'600', color:'white', fontSize:18, paddingVertical:10}}>View Order</Text>
            </TouchableOpacity>
            
        </SafeAreaView>
    )
}