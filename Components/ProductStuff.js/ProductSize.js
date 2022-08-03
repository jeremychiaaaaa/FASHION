import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect,useRef} from 'react'
import { StyleSheet, Text, View,SafeAreaView,Dimensions,Image,TouchableOpacity,ScrollView,FlatList, Alert, Modal, ImageStore } from 'react-native';
import { NavigationContainer,useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Discover from '../Discover';
import Favorites from '../Favorites';
import Profile from '../Profile';
import { SliderBox } from "react-native-image-slider-box";
import Slideshow from 'react-native-slideshow-improved';
import TimedSlideshow from 'react-native-timed-slideshow';
import InstaStory from 'react-native-insta-story';
import { LinearGradient } from 'expo-linear-gradient';
import { DiscoverStack } from '../Discover';
import { useSelector, useDispatch } from 'react-redux';
import { setClicked, setSearchClicked,setFilter,setTab,setArrow,setImages,setUser,setNumberOfCartItems,setAuthenticaed,setDuplicatedIndex,setSizeChoose } from '../../redux/actions';
import { BlurView } from 'expo-blur';
import LottieView from 'lottie-react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import ReadMore from '@fawazahmed/react-native-read-more';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import HorizontalBarGraph from '@chartiful/react-native-horizontal-bar-graph'
import firebase, { createUserDocument,createCart,getCartItems,updateCartItem,getReviews } from '../../firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import {doc, setDoc, addDoc, getFirestore, collection} from 'firebase/firestore'

const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width


export const ProductSize = ({navigation,size,setSize}) => {
    const {click,cat,c,filter,tab,product,arrow,images,user,cart,duplicate,edit,sizeChoose} = useSelector(state => state.userReducer)
    const nav = useNavigation()
    const dispatch = useDispatch()
    const [carouselImages, setCarouselImages] = useState([])
    const [price,setPrice] = useState()
    const lottieRef = useRef()
    const [loading,setLoading] = useState(false)
    const [position,setPosition] = useState(0)
    const [description,setDescription] = useState(true)
    const[details,setDetails] = useState(false)
    const[reviews,setReviews] = useState(false)
    
    const[favorite,setFavorite] = useState(false)
    const [activeSections,setActiveSections] = useState([])
    const [seeMoreImages, setSeeMoreImages] = useState([])
    const[seeMorePrice,setSeeMorePrice] = useState([])
    const[seeMoreTitle, setSeeMoreTitle] = useState([])
    const [clickedIndex,setClickedIndex] = useState([])
    const [addingToCart,setAddingToCart] = useState(false)
    const addToCartRef = useRef()
    const [cartItems, setCartItems] = useState([])
    const [userReviews, setUserReviews] = useState([])

    return(
        <>
        <View style={{flexDirection:'row', alignItems:'center'}}>
        <Text style={{fontSize:22, fontWeight:'700',marginTop:10}}>Choose A Size</Text>
        <TouchableOpacity style={{position:'absolute', right:0, marginRight:10,justifyContent:'center'}}
        onPress={() => {
            nav.navigate('Size Guide')
        }}
        >
               <Text style={{fontSize:18, fontWeight:'300', textDecorationLine:'underline',alignSelf:'center',marginTop:10 }}>Size Guide</Text>
        </TouchableOpacity>

     
     </View>

        <View style={{flexDirection:'row',alignItems:'center',marginTop:10 }}>

                    {sizes.map((i,index) => (
                          <TouchableOpacity style={{borderWidth:1, borderColor:sizeChoose === i.size ? 'transparent' : 'lightgrey', borderRadius:5, width:WIDTH*0.25, marginRight:20, backgroundColor:sizeChoose === i.size ? 'rgb(255,218,185)' : 'rgba(220,220,220,0.2)'}}
                          onPress = {() => {
                              dispatch(setSizeChoose(i.size))
                          }}
                          >
                              <Text style={{fontSize:20, fontWeight:'500', paddingVertical:15,alignSelf:'center'}}>{i.size}</Text>
                              </TouchableOpacity>
                    ))}
                  
                             </View>  
                             <View style={{flexDirection:'row',alignITems:'center',marginTop:10}}>

                             {secondSize.map((i,index) => (
                          <TouchableOpacity style={{borderWidth:1, borderColor:sizeChoose === i.size ? 'transparent' : 'lightgrey', borderRadius:5, width:WIDTH*0.25, marginRight:20, backgroundColor:sizeChoose === i.size ? 'rgb(255,218,185)' : 'rgba(220,220,220,0.2)'}}
                          onPress = {() => {
                              dispatch(setSizeChoose(i.size))
                          }}
                          >
                              <Text style={{fontSize:20, fontWeight:'500', paddingVertical:15,alignSelf:'center'}}>{i.size}</Text>
                              </TouchableOpacity>
                    ))}
                                                
                                   </View>  
                                   </>
    )


}


    const sizes = [
    {
        id:"1",
        size:"XS",
    },
    {
        id:"2",
        size:"S",
    },
    {
        id:"3",
        size:"M",
    },
    

]
    const secondSize = [
        {
            id:"1",
            size:"L",
        },
        {
            id:"2",
            size:"XL",
        },
    ]

