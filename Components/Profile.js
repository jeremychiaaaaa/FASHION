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

import { SliderBox } from "react-native-image-slider-box";
import Slideshow from 'react-native-slideshow-improved';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import TimedSlideshow from 'react-native-timed-slideshow';
import InstaStory from 'react-native-insta-story';
import { LinearGradient } from 'expo-linear-gradient';
import { DiscoverStack } from './Discover';
import { useSelector, useDispatch } from 'react-redux';
import { setClicked, setSearchClicked,setFilter,setTab,setArrow,setImages,setUser,setNumberOfCartItems,setAuthenticaed,setIndexEdit, setProductName,setPriceEdit,setDuplicatedIndex,setChangeAddress,setSelectedAddress } from '../redux/actions';
import { BlurView } from 'expo-blur';
import LottieView from 'lottie-react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import ReadMore from '@fawazahmed/react-native-read-more';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import HorizontalBarGraph from '@chartiful/react-native-horizontal-bar-graph'
import firebase, { createUserDocument,createCart,getCartItems,updateCartItem,deleteCartItem,getAddress } from '../firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import {doc, setDoc, addDoc, getFirestore, collection} from 'firebase/firestore'
import CounterInput from "react-native-counter-input";
import ModalDropdown from 'react-native-modal-dropdown';
import Counter from "react-native-counters";
const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width
export default function Profile(){
    const nav = useNavigation()
    const dispatch = useDispatch()
    return(
<SafeAreaView>
    <View style={{marginHorizontal:20, marginTop:20}}>
          <View style={{flexDirection:'row', borderBottomColor:'rgba(220,220,220,0.4)',borderBottomWidth:1,paddingBottom:15 }}>
              <View style={{shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 3,
},
shadowOpacity: 0.29,
shadowRadius: 4.65,

elevation: 7,}}>
                    <Image source={{uri:'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'}} style={{width:60,height:60, borderRadius:10, borderColor:'transparent',borderWidth:1,}}  />   
              </View>
           
    <View style={{justifyContent:'space-between', marginLeft:15}}>
        <Text style={{fontSize:20, fontWeight:'600',}}>Alexander Carrie</Text>
        <View style={{flexDirection:'row', alignItems:'center'}}>
           <Text style={{fontWeight:"300", fontSize:16}}>View Profile</Text>
           <Ionicons name='chevron-forward-outline' size={16} style={{marginLeft:10}} />
        </View>
        </View>    
    
            </View>
    <View style={{marginTop:15, borderBottomColor:'rgba(220,220,220,0.4)',borderBottomWidth:1,paddingBottom:15}}>
        <TouchableOpacity style={{flexDirection:'row', alignItems:'center', marginVertical:15}} onPress={() =>{ 
            
            dispatch(setAuthenticaed(true))
            nav.navigate('Orders')}}>
            <View style={{backgroundColor:'rgba(220,220,220,1)', width:40,height:40, borderRadius:5, justifyContent:'center',}}>
            <Ionicons name='cart' size={24} style={{alignSelf:'center', }} />
            </View>
            <Text style={{marginLeft:10, fontWeight:'500', fontSize:18}}>My Orders</Text>
            <Ionicons name='chevron-forward-outline' size={24} style={{position:'absolute', right:0, marginRight:10}}  />
            </TouchableOpacity>
            <View style={{flexDirection:'row', alignItems:'center', marginVertical:15}}>
            <View style={{backgroundColor:'rgba(220,220,220,1)', width:40,height:40, borderRadius:5, justifyContent:'center',alignItems:'center'}}>
            <Ionicons name='clipboard' size={24} style={{alignSelf:'center',marginLeft:5 }} />
            </View>
            <Text style={{marginLeft:10, fontWeight:'500', fontSize:18}}>My Details</Text>
            <Ionicons name='chevron-forward-outline' size={24} style={{position:'absolute', right:0, marginRight:10}}  />
            </View>
            <View style={{flexDirection:'row', alignItems:'center', marginVertical:15}}>
            <View style={{backgroundColor:'rgba(220,220,220,1)', width:40,height:40, borderRadius:5, justifyContent:'center',}}>
            <Ionicons name='home' size={24} style={{alignSelf:'center', }} />
            </View>
            <Text style={{marginLeft:10, fontWeight:'500', fontSize:18}}>Address Book</Text>
            <Ionicons name='chevron-forward-outline' size={24} style={{position:'absolute', right:0, marginRight:10}}  />
            </View>    
            <View style={{flexDirection:'row', alignItems:'center', marginVertical:15}}>
            <View style={{backgroundColor:'rgba(220,220,220,1)', width:40,height:40, borderRadius:5, justifyContent:'center',}}>
            <Ionicons name='card' size={24} style={{alignSelf:'center', }} />
            </View>
            <Text style={{marginLeft:10, fontWeight:'500', fontSize:18}}>Payment Methods</Text>
            <Ionicons name='chevron-forward-outline' size={24} style={{position:'absolute', right:0, marginRight:10}}  />
            </View>
    </View>
    <View>
    <View style={{flexDirection:'row', alignItems:'center', marginVertical:15}}>
            <View style={{backgroundColor:'rgba(220,220,220,1)', width:40,height:40, borderRadius:5, justifyContent:'center',}}>
            <Ionicons name='gift' size={24} style={{alignSelf:'center', }} />
            </View>
            <Text style={{marginLeft:10, fontWeight:'500', fontSize:18}}>Gift cards & vouchers</Text>
            <Ionicons name='chevron-forward-outline' size={24} style={{position:'absolute', right:0, marginRight:10}}  />
            </View>
    </View>
    <View style={{flexDirection:'row', alignItems:'center', marginVertical:15}}>
            <View style={{backgroundColor:'rgba(220,220,220,1)', width:40,height:40, borderRadius:5, justifyContent:'center',}}>
            <Ionicons name='documents' size={24} style={{alignSelf:'center', }} />
            </View>
            <Text style={{marginLeft:10, fontWeight:'500', fontSize:18}}>Privacy Policy</Text>
            <Ionicons name='chevron-forward-outline' size={24} style={{position:'absolute', right:0, marginRight:10}}  />
            </View>
            <View style={{flexDirection:'row', alignItems:'center', marginVertical:15}}>
            <View style={{backgroundColor:'rgba(220,220,220,1)', width:40,height:40, borderRadius:5, justifyContent:'center',}}>
            <Ionicons name='help-circle' size={24} style={{alignSelf:'center', }} />
            </View>
            <Text style={{marginLeft:10, fontWeight:'500', fontSize:18}}>FAQs</Text>
            <Ionicons name='chevron-forward-outline' size={24} style={{position:'absolute', right:0, marginRight:10}}  />
            </View>
            <View style={{flexDirection:'row', alignItems:'center', marginVertical:15}}>
            <View style={{backgroundColor:'rgba(220,220,220,1)', width:40,height:40, borderRadius:5, justifyContent:'center',}}>
            <Ionicons name='log-out' size={24} style={{alignSelf:'center', }} />
            </View>
            <Text style={{marginLeft:10, fontWeight:'500', fontSize:18}}>Log Out</Text>
            <Ionicons name='chevron-forward-outline' size={24} style={{position:'absolute', right:0, marginRight:10}}  />
            </View>
    </View>
          




</SafeAreaView>
    )
}
