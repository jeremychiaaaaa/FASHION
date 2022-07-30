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
import { setProductName,setClicked, setSearchClicked,setFilter,setTab,setArrow,setImages,setUser,setNumberOfCartItems,setAuthenticaed,setDuplicatedIndex } from '../redux/actions';
import firebase, { createUserDocument,createCart,getCartItems,updateCartItem,deleteCartItem,createFavorite,addCard } from '../firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import {doc, setDoc, addDoc, getFirestore, collection} from 'firebase/firestore'
import { BlurView } from 'expo-blur';
import LottieView from 'lottie-react-native';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width

export default function ViewCards({navigation}){

    const {click,cat,c,filter,tab,product,arrow,images,user,cart,yes,edit,price,duplicate,select} = useSelector(state => state.userReducer)
    const nav = useNavigation()
    const dispatch = useDispatch()
    const [loading,setLoading] = useState(false)
    const lottieRef = useRef()
    const [selectCard, setSelectCard] = useState(0)

const [cards,setCards]  = useState([])

    useEffect(() => {
        setLoading(true)
        lottieRef.current?.play()
        setTimeout(async() => {
            if(user){
                  const data = await getCartItems(user)
          
            setCards(data.data().paymentCards)
 
            
      



setLoading(false)
dispatch(setAuthenticaed(false))
            } else{
                setLoading(false)
                setCards([])
            }
          
        },5000)
    
    },[yes])
    let cardDetails = cards.map((item,index) => (
        {
            number:item.number, expiry: item.expiry,cvc: item.cvc, type:item.type, name:item.name
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
   <LottieView source={require('../assets/197-glow-loading.json')}  ref={lottieRef}     style={{
width:'100%', zIndex:10,alignSelf:'center', transform:[{translateY:-30}]
       
     }}  />

</View>  
            )}
            <ScrollView>
                <View style={{marginTop:10, marginHorizontal:20}}>
                <View style={{flexDirection:'row', alignItems:'center',justifyContent:'center',marginTop:10}}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{position:'absolute', left:0,marginRight:10}}>
 <Ionicons name='arrow-back-outline' size={28}  />
                </TouchableOpacity>
               
 <Text style={{alignSelf:'center', fontWeight:'600', fontSize:22}}>PAYMENT METHODS</Text>
            </View>
                <TouchableOpacity style={{flexDirection:'row', alignItems:'center',justifyContent:'center', marginTop:15, borderWidth:1, width:WIDTH*0.85, alignSelf:'center', borderColor:'rgba(220,220,220,0.5)', borderRadius:5}}
                onPress={() => nav.navigate('')}
                
                >
                    <Ionicons name='add-circle-outline' size={28} style={{alignSelf:'center'}}  />
                    <Text style={{alignSelf:'center', marginLeft:5, fontSize:18, fontWeight:'600', paddingVertical:10}}>ADD NEW PAYMENT METHOD</Text>
                </TouchableOpacity>
                {cardDetails.map((i,index) => 
             <TouchableOpacity style={{marginTop:15,width:WIDTH*0.85,padding:10, justifyContent:'center', borderWidth:1, borderColor:selectCard === index ? 'green' : 'rgba(220,220,220,0.3)', borderRadius:5, marginVertical:15,marginHorizontal:10}}
             onPress={() => {
                
             }}
             
             >
             <View style={{flexDirection:'row', alignItems:'center'}}>
                
                 <Text style={{textTransform:'uppercase', fontWeight:'600', fontSize:20,}}>{i.type} ({i.number.slice(0,4)})</Text>
                   <TouchableOpacity style={{position:'absolute', right:0, marginRight:10, backgroundColor:'rgba(220,220,220,0.2)'}}>
              {selectCard === index && <Ionicons name='checkmark-circle-outline' size={32} style={{color:'green', position:'absolute', right:0,transform:[{translateY:-5}]}} /> }     
                   </TouchableOpacity>
           
             </View>
           <View style={{width:WIDTH*0.55,marginTop:5}}>
           <Text style={{fontWeight:'500', fontSize:17}}>{i.name}</Text>
          <Text style={{fontWeight:'500', fontSize:17,marginTop:5}}>Exp : {i.expiry}</Text>
          <Text style={{fontWeight:'500', fontSize:17,marginTop:5}}>{i.destination}</Text>
          
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
                </View>
            </ScrollView>
            </SafeAreaView>
    )
}