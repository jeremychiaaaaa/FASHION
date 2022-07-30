import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect,useRef} from 'react'
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
import firebase, { createUserDocument,createCart,getCartItems,updateCartItem,deleteCartItem,getAddress,updateAddress } from './firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import {doc, setDoc, addDoc, getFirestore, collection} from 'firebase/firestore'
import CounterInput from "react-native-counter-input";
import ModalDropdown from 'react-native-modal-dropdown';
import Counter from "react-native-counters";
const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width


export default function ViewAddresses({navigation}){
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

    useEffect(() => {
        setLoading(true)
        lottieRef.current?.play()
        setTimeout(async() => {
            if(user){
                  const data = await getCartItems(user)
          
            setAddress(data.data().shipping)
 
            
      



setLoading(false)
dispatch(setAuthenticaed(false))
            } else{
                setLoading(false)
                setCartItems([])
            }
          
        },5000)
    
    },[yes])
    let shippingAddress = address.map((item,index) => (
        {
            firstName:item.firstName, lastName: item.lastName,destination: item.destination, address:item.address1, city:item.city, postal:item.postal, phone:item.phone
        }
    ))
  const updateAddress = () =>{
    
       dispatch(setChangeAddress(true))
        nav.navigate('Final Check Out')
    
  }
    return(
        <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
                 {loading && (
   <View style={{justifyContent:'center', alignItems:'center',height:HEIGHT}}>
   <LottieView source={require('./assets/197-glow-loading.json')}  ref={lottieRef}     style={{
width:'100%', zIndex:10,alignSelf:'center', transform:[{translateY:-30}]
       
     }}  />

</View>  
            )}
            <ScrollView>
            <View style={{flexDirection:'row', alignItems:'center',justifyContent:'center',marginTop:10}}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{position:'absolute', left:0, marginLeft:10}}>
 <Ionicons name='arrow-back-outline' size={28}  />
                </TouchableOpacity>
               
 <Text style={{alignSelf:'center', fontWeight:'600', fontSize:22}}>Delivery Address</Text>
            </View>
            <View style={{marginHorizontal:20, marginTop:10}}>
               
                <TouchableOpacity style={{flexDirection:'row', alignItems:'center',justifyContent:'center', marginTop:10, borderWidth:1, width:WIDTH*0.85, alignSelf:'center', borderColor:'rgba(220,220,220,0.5)', borderRadius:5}}
                onPress={() => nav.navigate('Shipping')}
                
                >
                    <Ionicons name='add-circle-outline' size={28} style={{alignSelf:'center'}}  />
                    <Text style={{alignSelf:'center', marginLeft:5, fontSize:18, fontWeight:'600', paddingVertical:10}}>Add New Address</Text>
                </TouchableOpacity>
                {shippingAddress.map((i,index) => 
                  <TouchableOpacity style={{marginTop:15,width:WIDTH*0.85,padding:10, justifyContent:'center', borderWidth:1, borderColor:select === index ? 'green' : 'rgba(220,220,220,0.3)', borderRadius:5, marginVertical:15,marginHorizontal:10}}
                  onPress={() => {
                      dispatch(setSelectedAddress(index))
                  }}
                  
                  >
                  <View style={{flexDirection:'row', alignItems:'center'}}>
                      <Feather name='home' size={32}   />
                      <Text style={{textTransform:'uppercase', fontWeight:'600', fontSize:20, marginLeft:20}}>Postal Address</Text>
                        <TouchableOpacity style={{position:'absolute', right:0, marginRight:10, backgroundColor:'rgba(220,220,220,0.2)'}}>
                   {select === index && <Ionicons name='checkmark-circle-outline' size={32} style={{color:'green', position:'absolute', right:0,transform:[{translateY:-5}]}} /> }     
                        </TouchableOpacity>
                
                  </View>
                <View style={{width:WIDTH*0.55,marginTop:5}}>
                <Text style={{fontWeight:'500', fontSize:17}}>{i.firstName} {i.lastName}</Text>
               <Text style={{fontWeight:'500', fontSize:17,marginTop:5}}>{i.address}</Text>
               <Text style={{fontWeight:'500', fontSize:17,marginTop:5}}>{i.destination}</Text>
               <Text style={{fontWeight:'500', fontSize:17,marginTop:5}}>{i.city}</Text>
               <Text style={{fontWeight:'500', fontSize:17,marginTop:5}}>{i.postal}</Text>
               <Text style={{fontWeight:'500', fontSize:17,marginTop:5}}>{i.phone}</Text>
               <TouchableOpacity style={{marginTop:15,flexDirection:'row', alignItems:'center'}}>
                   <Text style={{fontWeight:'600', fontSize:18}}>Edit</Text>
                   <Feather name='edit' size={28} onPress={() => {
                             
                                
                                
                                }}
                                style={{marginLeft:10}}
                                />
               </TouchableOpacity>
                </View>
              </TouchableOpacity>
                
                
                )}
             <TouchableOpacity style={{marginTop:15, width:WIDTH*0.85, borderWidth:1, borderColor:'transparent', backgroundColor:'black', borderRadius:10, justifyContent:'center', alignSelf:'center'}}
             onPress={updateAddress}
             >
                 <Text style={{alignSelf:'center', paddingVertical:10, fontSize:18, fontWeight:'600', color:'white'}}>Save And Continue</Text>
                 </TouchableOpacity>   
            </View>
            </ScrollView>
        </SafeAreaView>
    )
}