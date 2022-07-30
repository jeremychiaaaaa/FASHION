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
import firebase, { createUserDocument,createCart,getCartItems,updateCartItem,deleteCartItem,getAddress,createOrder } from './firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import {doc, setDoc, addDoc, getFirestore, collection} from 'firebase/firestore'
import CounterInput from "react-native-counter-input";
import ModalDropdown from 'react-native-modal-dropdown';
import Counter from "react-native-counters";
const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width

export default function FinalCheckOut() {
    const {click,select,cat,c,filter,tab,product,arrow,images,user,cart,yes,edit,price,duplicate,change} = useSelector(state => state.userReducer)
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
    const [cards,setCards] = useState([])
    const [deliverySelected, setDeliverySelected] = useState('Free')
    useEffect(() => {
        setLoading(true)
        lottieRef.current?.play()
        setTimeout(async() => {
            if(user){
                  const data = await getCartItems(user)
      
            setCartItems(data.data().temp)
            setAddress(data.data().shipping)
            setCards(data.data().paymentCards)
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
    return () => {
        setTrial([])
        setCartItems([])
        setAddress([])
        setCards([])
    }
    },[yes,change])
    let final = cartItems.map((item,index) => (
        {
            image:item.i, name:item.product, price: item.price, size:item.size, color:item.color, serial:1, count: item.count
        }
    ))
    let shippingAddress = address.map((item,index) => (
        {
            firstName:item.firstName, lastName: item.lastName,destination: item.destination, address:item.address1, city:item.city, postal:item.postal, phone:item.phone
        }
    ))
    let cardDetails = cards.map((item,index) => (
        {
            number:item.number, expiry: item.expiry,cvc: item.cvc, type:item.type, name:item.name
        }
    ))
    const getPrice = () => {

        return final.reduce((sum,item,index) => (sum + (item.price * item.count)),0)

}

    return(
        <SafeAreaView style={{flex:1 , backgroundColor:'white'}}>
                 {loading && (
   <View style={{justifyContent:'center', alignItems:'center',height:HEIGHT}}>
   <LottieView source={require('./assets/197-glow-loading.json')}  ref={lottieRef}     style={{
width:'100%', zIndex:10,alignSelf:'center', transform:[{translateY:-30}]
       
     }}  />

</View>  
            )}
            <ScrollView>

           
            <View style={{flexDirection:'row', alignItems:'center',justifyContent:'center',marginTop:10}}>
            <TouchableOpacity onPress={() => nav.navigate('Check Out Stack')} style={{position:'absolute', left:0, marginLeft:10}}>
 <Ionicons name='arrow-back-outline' size={28}  />
                </TouchableOpacity>
               
 <Text style={{alignSelf:'center', fontWeight:'600', fontSize:22}}>Check Out</Text>
            </View>
           <View style={{marginTop:20,marginLeft:20}}>
               <View style={{flexDirection:'row', alignItems:'center'}}>
               <Text style={{fontWeight:'600', fontSize:18}}>My Cart ({cartItems.length} items)</Text>
              <TouchableOpacity style={{position:'absolute', right:0, marginRight:10, fontWeight:'300'}} onPress={() => {
                  dispatch(setAuthenticaed(true))
                  nav.navigate('View All')
              }}>
                    <Text>View All</Text>
              </TouchableOpacity>
             
</View>
               <ScrollView
                  horizontal
                             
                  showsHorizontalScrollIndicator={false}
                  style={{width:WIDTH + 5,height:HEIGHT*0.15, marginTop:15}}
               >
                   {final.map((i,index) => 
                   <Image source ={{uri: i.image}} style={{width:WIDTH*0.2, height:HEIGHT*0.15 ,borderWidth:1, borderColor:'transparent',marginRight:10}} />
                  
                   )}
                   
                   </ScrollView> 
        
           </View>
           <View style={{marginTop:15}}>
            <TouchableOpacity onPress={() => {
                {shippingAddress.length === 0 ? nav.navigate('Shipping') : nav.navigate('View Shipping Address') }
            }} style={{ paddingBottom:10 }}>
                <View style={{flexDirection:'row', alignItems:'center', }}>
                    <Text style={{fontSize:22, fontWeight: '600',marginLeft:20,textTransform:'uppercase'}}>Delivery address</Text>
                  
                </View>
               </TouchableOpacity>    
          {address.length === 0 ?   <Text style={{fontWeight:'300', marginTop:10,marginLeft:20}}>No Address Saved Currently...</Text> : (
              shippingAddress.filter((item,index) => index === select ).map((i,index) => 
              <View style={{marginTop:5,marginLeft:20}}>
                  <View style={{flexDirection:'row', alignItems:'center'}}>
                      <Feather name='home' size={32}   />
                      <Text style={{ fontWeight:'500', fontSize:18, marginLeft:10,textTransform:'uppercase'}}>Postal Address</Text>
                      <TouchableOpacity onPress={() => {
                {shippingAddress.length === 0 ? nav.navigate('Shipping') : nav.navigate('View Shipping Address') }
            }}  style={{position:'absolute', right:0, marginRight:10, backgroundColor:'rgba(220,220,220,0.2)'}}>
                <View style={{flexDirection:'row', alignItems:'center', }}>
           {shippingAddress.length === 0 ?   <Text style={{textTransform:'uppercase', fontSize:18, fontWeight:'600', borderWidth:1, borderColor:'transparent', padding:10}}>ADD</Text> :   <Text style={{textTransform:'uppercase', fontSize:18, fontWeight:'600', borderWidth:1, borderColor:'transparent', padding:10}}>Edit</Text>}    
                  
                </View>
               </TouchableOpacity>    
                
                  </View>
                <View style={{width:WIDTH*0.55,marginTop:5, paddingBottom:10, borderBottomColor:'rgba(220,220,220,0.3)', borderBottomWidth:1}}>
                <Text style={{fontWeight:'300', fontSize:17}}>{i.firstName} {i.lastName}</Text>
               <Text style={{fontWeight:'300', fontSize:17,marginTop:5}}>{i.address}</Text>
               <Text style={{fontWeight:'300', fontSize:17,marginTop:5}}>{i.destination}</Text>
               <Text style={{fontWeight:'300', fontSize:17,marginTop:5}}>{i.city}</Text>
               <Text style={{fontWeight:'300', fontSize:17,marginTop:5}}>{i.postal}</Text>
               <Text style={{fontWeight:'300', fontSize:17,marginTop:5}}>{i.phone}</Text>
                </View>
              </View>
              
              )
          )}    
         
           
                <View style={{ borderBottomColor:'rgba(220,220,220,0.2)', paddingBottom:10, borderBottomWidth:1, marginTop:20, marginLeft:20 }}>
                    <Text style={{fontSize:20, fontWeight: '600'}}>Delivery method</Text>
                    <View style={{marginTop:10, paddingBottom:10, borderBottomColor:'rgba(220,220,220,0.4)', borderBottomWidth:1}}>
                        <TouchableOpacity 
                        onPress={() => setDeliverySelected('Free')}
                        
                        >
                                  <View style={{flexDirection:'row', alignItems:'center'}}>
                    {deliverySelected === 'Free' ?    <Ionicons name='checkmark-circle-outline' size={28} color={'green'}/>  :   <Ionicons name='ellipse-outline' size={28}/> }     
                            <Text style={{fontWeight:'600',marginLeft:10}}>FREE</Text>
                            <Text style={{marginLeft:10, color:'grey', fontWeight:'700'}}>Standard Delivery</Text>
                        </View>
                        <View  style={{flexDirection:'row', alignItems:'center'}}>
                        <Ionicons name='checkmark-circle-outline' size={28} color={'transparent'}/> 
                        <View style={{marginLeft:10,width:'80%'}}>
                              <Text style={{ fontWeight:'300',marginTop:0}}>Delivered on or before Wednesday 10 June 2022</Text>
                                {deliverySelected === 'Free' && (
 <View style={{flexDirection:'row', marginTop:10, alignItems:'center'}}>
                    <Ionicons name='information-circle-outline' size={22}  /> 
                                     <ReadMore
                        numberOfLines={2}
                        seeMoreStyle={{
                            color:'black',
                            fontWeight:'600'
                        }}
                        seeLessStyle={{
                            color:'black'
                        }}
                        seeMoreText={'More'}
                        style={{
                            marginLeft:10,
                            fontWeight:'400'
                        }}
                        >
                            No delivery on Public Holidats. All orders are subject to Customs and Duty charges, payable by the recipient of the order.

                        </ReadMore>
                        </View>
                        )}  
                        </View>
                               
                        </View>
                   
                          
                        </TouchableOpacity>
                  
                    <View style={{marginTop:10}} >
                        <TouchableOpacity  onPress={() => setDeliverySelected('Express')}>
                                   <View style={{flexDirection:'row', alignItems:'center'}}>
                                   {deliverySelected === 'Express' ?    <Ionicons name='checkmark-circle-outline' size={28} color={'green'}/> :   <Ionicons name='ellipse-outline' size={28}/> }     
                            <Text style={{fontWeight:'600',marginLeft:10}}>$10.00</Text>
                            <Text style={{marginLeft:10, color:'grey', fontWeight:'700'}}>Express Delivery</Text>
                        </View>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Ionicons name='ellipse-outline' size={28} color={'transparent'} />
                            <View style={{marginLeft:10, width:'80%' }}>
                                <Text style={{fontWeight:'300'}}>Delivered on or before Wednesday 5 June 2022</Text>
                                     {deliverySelected === 'Express' && (
                 <View style={{flexDirection:'row', marginTop:10, alignItems:'center'}}>
                           <Ionicons name='information-circle-outline' size={20}  /> 
                                     <ReadMore
                        numberOfLines={2}
                        seeMoreStyle={{
                            color:'black',
                            fontWeight:'600'
                        }}
                        seeLessStyle={{
                            color:'black',
                            fontWeight:'600'
                        }}
                        seeMoreText={'More'}
                        style={{
                            marginLeft:10,
                            fontWeight:'400'
                        }}
                        >
                        Delivery is within 2 working days if ordered before 22:00 local time (Monday - Friday), excluding public holidays. l orders are subject to Customs and Duty charges, payable by the recipient of the order.

                        </ReadMore>
                        </View> 
          )}           
                                </View>
                                
                        </View>
                    
         
                        </TouchableOpacity>
            
                    </View>

                    
                    
                    
                    </View>
                </View>
          
            <View style={{marginTop:15}}>
                    <TouchableOpacity onPress={() => cardDetails.length === 0 ? nav.navigate('Add Card') : nav.navigate('View Cards')}>
                <View style={{flexDirection:'row', alignItems:'center',  paddingBottom:10, }}>
                <Ionicons name='card-outline' size={28} style={{marginLeft:20}} />
                    <Text style={{ fontWeight:'500', fontSize:18, marginLeft:10,textTransform:'uppercase'}}>Payment Method</Text>
                {cards.length === 0 ?      <Ionicons name='add-circle-outline' size={28} style={{position:'absolute', right:0, marginRight:10, }} /> :  <View/>}
                
               
                </View>
            </TouchableOpacity>
            {cards.length === 0 ?  <Text style={{fontWeight:'300', marginTop:10,marginLeft:20}}>No Cards Saved Currently...</Text> : (
                cardDetails.filter((i,index) => index === 0).map((item,index) => 
                <View style={{marginTop:15,marginLeft:20}}
               
                
                >
                <View style={{flexDirection:'row', alignItems:'center'}}>
  
                    <Text style={{textTransform:'uppercase', fontWeight:'600', fontSize:20}}>{item.type} ({item.number.slice(0,4)})</Text>
                 
                    <TouchableOpacity style={{position:'absolute', right:0, marginRight:10, backgroundColor:'rgba(220,220,220,0.2)'}}
                     onPress={() => {
                         dispatch(setAuthenticaed(true))
                         nav.navigate('View Cards')
                     }}
                     >
                    
                    
                            <Text style={{textTransform:'uppercase', fontSize:18, fontWeight:'600', borderWidth:1, borderColor:'transparent', padding:10}}>Edit</Text>
                        </TouchableOpacity>
                </View>
              <View style={{width:WIDTH*0.55,marginTop:5}}>
              <Text style={{fontWeight:'300', fontSize:17}}>{item.name}</Text>
             <Text style={{fontWeight:'300', fontSize:17,marginTop:5}}>Exp : {item.expiry}</Text>
             <Text style={{fontWeight:'300', fontSize:17,marginTop:5}}>{item.destination}</Text>
             
            
              </View>
            </View>
                )
            )
            
            
            }
            </View>
        
        </View>
        <View style={{marginTop:30, marginLeft:20}}>
        <Text style={{fontWeight:'600', fontSize:20}}>
            Order Info
        </Text>
        <View style={{flexDirection:'row', alignItems:'center', marginTop:5}}>
            <Text style={{fontWeight:'300'}}>Sub-Total</Text>
            <Text style={{position:'absolute', right:0, marginRight:10}}>$ {Math.round(totalPrice * 100) / 100}</Text>

        </View>
        <View style={{flexDirection:'row', alignItems:'center', marginTop:5}}>
            <Text style={{fontWeight:'300'}}>Delivery Cost</Text>
            <Text style={{position:'absolute', right:0, marginRight:10}}>$ 3.59</Text>

        </View>
        <View style={{flexDirection:'row', alignItems:'center', marginTop:10}}>
            <Text style={{fontWeight:'300'}}>Total</Text>
            <Text style={{position:'absolute',fontWeight:'600', fontSize:18, right:0, marginRight:10}}>$ {Math.round((totalPrice + 3.59) * 100) / 100}</Text>

        </View>
       
        <TouchableOpacity style={{marginTop:20, justifyContent:'center',width:WIDTH*0.85, alignSelf:'center',borderColor:'transparent', borderRadius:15, borderWidth:1, backgroundColor:'black'}}
                            onPress={() => nav.navigate('Transaction')}
                         
                            >
                                <Text style={{color:'white', fontWeight:'600', alignSelf:'center',paddingVertical:10,fontSize:18 }}>Check Out</Text>
  </TouchableOpacity>
        </View> 
        </ScrollView>
        </SafeAreaView>
    )
}

export const ViewAll = () => {
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
        <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
            <ScrollView>
 {loading && (
   <View style={{justifyContent:'center', alignItems:'center',height:HEIGHT}}>
   <LottieView source={require('./assets/197-glow-loading.json')}  ref={lottieRef}     style={{
width:'100%', zIndex:10,alignSelf:'center', transform:[{translateY:-30}]
       
     }}  />

</View>  
            )}
            <View style={{flexDirection:'row', alignItems:'center',justifyContent:'center',marginTop:10, borderBottomColor:'rgba(220,220,220,0.2)', paddingBottom:10,borderBottomWidth: 1 }}>
                <TouchableOpacity style={{position:'absolute', left:0, marginLeft:10,paddingBottom:10}} onPress={() => nav.navigate('Final Check Out')}>
 <Ionicons name='arrow-back-outline' size={28} />
                </TouchableOpacity>
               
 <Text style={{alignSelf:'center', fontWeight:'600', fontSize:22}}>My Cart</Text>
            </View>

        <View style={{ borderBottomColor:'rgba(220,220,220,0.2)', paddingVertical:10,borderBottomWidth: 1 }}>
            <Text style={{alignSelf:'center', fontWeight:'300', fontSize:18}}>{cartItems.length} items : Total (excluding delivery) <Text style={{fontWeight:'600',fontSize:20 }}>$ {Math.round(totalPrice * 100 ) / 100 }</Text></Text>
        </View>
        {final.map((i,index) => 
          <TouchableOpacity style={{flexDirection:'row', alignItems:'center', marginVertical:10, marginLeft:20}} onPress={() =>{ 
            dispatch(setClicked(true))
            dispatch(setProductName(i.name))
              nav.navigate('Product')
              
              }}>
              <Image source ={{uri:i.image}} style={{width:WIDTH*0.3, height:HEIGHT*0.25, borderWidth:1, borderColor:'transparent',borderRadius:10}} />
            <View style={{marginLeft:10,width:WIDTH*0.5}}>
              
                       <Text style={{width:WIDTH*0.4, fontWeight:'600', fontSize:18}}>{i.name}</Text>  
                  
           
             
                   <Text style={{fontSize:16, marginTop:5, fontWeight:'500'}}>$ {  trial.map(item => item.id === index &&  <Text>{Math.round((item.count * i.price) * 100) / 100}</Text>) }</Text>
         <View style={{flexDirection:'row', alignItems:'center'}}>
                <Text style={{marginTop:10, fontWeight:'600', fontSize:16, textTransform:'capitalize' }}>Color:  {i.color}</Text>
             
               <Text style={{marginTop:10, fontWeight:'600', fontSize:16,marginLeft:20}}>Size: {i.size}</Text>
         </View>
           <Text style={{marginTop:10, fontWeight:'400', fontSize:16}}>QTY : <Text style={{fontWeight:'600', fontSize:16}}>{i.count}</Text></Text>

                </View>
              
              
               
              </TouchableOpacity>
        )}
        </ScrollView>
        </SafeAreaView>
    )
}

