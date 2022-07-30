import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect,useRef,useCallback} from 'react'
import { StyleSheet, Text, View,SafeAreaView,Dimensions,Image,TouchableOpacity,ScrollView,FlatList, Alert, Modal, ImageStore,TouchableHighlight, Button } from 'react-native';
import { NavigationContainer,useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
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
import {doc, setDoc, addDoc, getFirestore, collection} from 'firebase/firestore'
import CounterInput from "react-native-counter-input";
import ModalDropdown from 'react-native-modal-dropdown';
import Counter from "react-native-counters";
import { ViewAll } from './FinalCheckOut';
const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width

const Tab = createMaterialTopTabNavigator()

export default function ViewOrders({navigation}){
    const {click,cat,c,filter,tab,product,arrow,images,user,cart,yes,edit,price,duplicate} = useSelector(state => state.userReducer)
    const nav = useNavigation()
    const dispatch = useDispatch()
    const [loading,setLoading] = useState(false)
    const lottieRef = useRef()
    const [cartItems,setCartItems] = useState([])
    const[trial,setTrial] = useState([])
    const [totalPrice,setTotalPrice] = useState(0)
    const [duplicatedArray,setDuplicatedArray] = useState([])
    const [addedPrice,setAddedPrice] = useState(0)
    useEffect(() => {
        setLoading(true)
        lottieRef.current?.play()
        setTimeout(async() => {
            if(user){
                  const data = await getCartItems(user)
     
            setCartItems(data.data().temp)
            dispatch(setNumberOfCartItems(final.reduce((sum,item,index) => (sum + (item.count)),0)))
            
      

   setTrial(cartItems.map((i,index) => (
    {
        id: index, count: i.count
    }
)))    
 setTotalPrice(getPrice())

setLoading(false)
dispatch(setAuthenticaed(false))
            } else{
                setLoading(false)
                setCartItems([])
            }
          
        },5000)
    
    },[yes])
    let final = cartItems.map((item,index) => (
        {
            image:item.i, name:item.product, price: item.price, size:item.size, color:item.color, serial:1, count: item.count
        }
    ))
    const getPrice = () => {

        return final.reduce((sum,item,index) => (sum + (item.price * item.count)),0)
  
 
      
      
   
  
}
    return(
        <SafeAreaView style={{flex:1,}}>
             {loading && (
   <View style={{justifyContent:'center', alignItems:'center',height:HEIGHT}}>
   <LottieView source={require('./assets/197-glow-loading.json')}  ref={lottieRef}     style={{
width:'100%', zIndex:10,alignSelf:'center', transform:[{translateY:-30}]
       
     }}  />

</View>  
            )}
            <ScrollView>
         
         <View style={{backgroundColor:'white', marginVertical:40, paddingBottom:20}}>
               <View style={{marginLeft:20, marginTop:20, }}>
            

            <View>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Text style={{fontWeight:'600', fontSize:18}}>ITEM DELIVERED</Text>
                    <Ionicons name='chevron-forward-outline' size={28} style={{position:'absolute', right:0, marginRight:10}} />
                </View>
                <Text style={{marginTop:5, fontWeight:'300',}}>DELIVERED ON 20 JUNE 2022</Text>
            </View>
            
            <View style={{borderBottomColor:'rgba(220,220,220,0.4)',borderBottomWidth:1,paddingBottom:15}}>
                  <ScrollView
                  
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{width:WIDTH + 5,height:HEIGHT*0.15, marginTop:15,  }}
                  >
                          {final.map((i,index) => 
                          <View style={{marginRight:15}}>
                                       <Image source ={{uri:i.image}} style={{width:WIDTH*0.3, height:HEIGHT*0.15, borderWidth:1, borderColor:'transparent',borderRadius:10, paddingBottom:15,}} />  
                          </View>
 
                          )}
                      
                  </ScrollView>
            </View>
                

              
         
               
              
     
    <TouchableOpacity style={{paddingVertical:10, borderBottomColor:'rgba(220,220,220,0.4)',borderBottomWidth:1,paddingBottom:15}}>
        <Text style={{color:'rgb(0,122,255)', fontSize:18, }}>Track Parcel</Text>
    </TouchableOpacity>
    <Text style ={{fontWeight:'300', marginVertical:10}}>Order Number :730356163 </Text>
   
    <Text style ={{fontWeight:'300', marginVertical:10}}>Shipped Date: 14 June 2022</Text>
    <TouchableOpacity style={{width:WIDTH*0.9, borderWidth:1, marginTop:15,backgroundColor:'black', alignSelf:'center', marginRight:20,}}
      
      >
          <Text style={{paddingVertical:15, fontSize:18, fontWeight:'600', alignSelf:'center' , color:'white'}}>ORDER AGAIN</Text>
          </TouchableOpacity>
          <TouchableOpacity  style={{width:WIDTH*0.9, borderWidth:1, marginTop:15,backgroundColor:'white', alignSelf:'center', marginRight:20}}
            onPress={() => nav.navigate('View')}
          >
          <Text style={{paddingVertical:15, fontSize:18, fontWeight:'600', alignSelf:'center', }}>ADD REVIEW</Text>
          </TouchableOpacity>
        </View>
         </View>
      



            </ScrollView>
        
        
        </SafeAreaView>
    )
}