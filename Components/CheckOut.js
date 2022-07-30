import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect,useRef} from 'react'
import { StyleSheet, Text, View,SafeAreaView,Dimensions,Image,TouchableOpacity,ScrollView,FlatList, Alert, Modal, ImageStore,TouchableHighlight } from 'react-native';
import { NavigationContainer,useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ShippingAddress from './ShippingAddress';
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
import { setClicked, setSearchClicked,setFilter,setTab,setArrow,setImages,setUser,setNumberOfCartItems,setAuthenticaed,setIndexEdit, setProductName,setPriceEdit,setDuplicatedIndex } from './redux/actions';
import { BlurView } from 'expo-blur';
import LottieView from 'lottie-react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import ReadMore from '@fawazahmed/react-native-read-more';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import HorizontalBarGraph from '@chartiful/react-native-horizontal-bar-graph'
import firebase, { createUserDocument,createCart,getCartItems,updateCartItem,deleteCartItem } from './firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import {doc, setDoc, addDoc, getFirestore, collection} from 'firebase/firestore'
import CounterInput from "react-native-counter-input";
import ModalDropdown from 'react-native-modal-dropdown';
import Counter from "react-native-counters";
import ViewAddresses from './ViewAddresses';
import { ViewAll } from './FinalCheckOut';
import FinalCheckOut from './FinalCheckOut';
import ViewCards from './ViewCards';
import AddCard from './AddCard';
import Payment from './Payment';
const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width
export default function CheckOut(){
    const {click,cat,c,filter,tab,product,arrow,images,user,cart,yes,edit,price,duplicate} = useSelector(state => state.userReducer)
    const nav = useNavigation()
    const dispatch = useDispatch()
    const [loading,setLoading] = useState(false)
    const lottieRef = useRef()
    const [cartItems,setCartItems] = useState([])
    const [totalPrice,setTotalPrice] = useState(0)
    const [number,setNumber] = useState({})
    const [selectedIndex,setSelectedIndex] = useState()
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
setDuplicatedArray((cartItems.map((item,index) => ({
    id:index, duplicated:item.duplicated 
}))))
setLoading(false)
dispatch(setAuthenticaed(false))
            } else{
                setLoading(false)
                setCartItems([])
            }
          
        },5000)
    
    },[yes,user])

 let final = cartItems.map((item,index) => (
        {
            image:item.i, name:item.product, price: item.price, size:item.size, color:item.color, serial:1, count: item.count
        }
    ))
const [newPrices,setNewPrices] = useState([])
  const [addedPrice, setAddedPrice] = useState(0)
 const[trial,setTrial] = useState([])
const [duplicatedArray,setDuplicatedArray] = useState()
   const getPrice = () => {

            return final.reduce((sum,item,index) => (sum + (item.price * item.count)),0)
      
     
          
          
       
      
   }



const setPrice = (index,num) => {

     let updatedList = trial.map((i,number) => {
         if(index === i.id){
             return {...i, count: i.count + 1}
             
         } else {
             return i
         }
     })
     let tempList = cartItems.map((i,number) => {
         if(index === number){
             return {...i, count : i.count + 1}
         } else {
             return i
         }

     })
dispatch(setNumberOfCartItems(cart + 1))
     setTrial(updatedList)
     setCartItems(tempList)
setAddedPrice(prev => prev + final[index].price)
}



const [ n,setN] =useState(1)
const decreasePrice = (index,num) => {
    let updatedList = trial.map((i,number) => {
        if(index === i.id){
            return {...i, count: i.count - 1}
        } else {
            return i
        }
    })
   dispatch(setNumberOfCartItems(cart - 1))
    setTrial(updatedList)
    setAddedPrice(prev => prev - final[index].price)
}
const renderRightActions = (progress,id) => {
    return (
      <View
        style={{
          margin: 0,
          alignContent: 'center',
          justifyContent: 'center',
          width: 110,
        }}>
      <TouchableHighlight style={{     backgroundColor:'red',
       height:'83%',
        marginVertical:15,
        width:'100%',
        padding:20,
        alignSelf:'center',
        justifyContent:'center',
    alignItems:'center'
    }} onPress={async () => {
          cartItems.splice(id,1)
          try {
             
            await deleteCartItem(user, {cartItems})
            console.log('Successfuly deleted item')
            dispatch(setAuthenticaed(true))
        } catch (error) {
              
          }
      }}>
         <View>
             <Text style={{ fontWeight:'600',fontSize:18, color:'white',textTransform:'uppercase',alignSelf:'flex-start'}}>Delete</Text>
              <Ionicons name='trash' size={32} style={{alignSelf:'center',color:'white',marginTop:10}} />
         </View>
         
      </TouchableHighlight>
      </View>
    );
  };
  const [startingNumver,setStartingNumber] = useState(1)
    return(
        <SafeAreaView style={{flex:1, backgroundColor:'white', }}>
            {loading && (
   <View style={{justifyContent:'center', alignItems:'center',height:HEIGHT}}>
   <LottieView source={require('./assets/197-glow-loading.json')}  ref={lottieRef}     style={{
width:'100%', zIndex:10,alignSelf:'center', transform:[{translateY:-30}]
       
     }}  />

</View>  
            )}
               <ScrollView style={{marginHorizontal:20}}>
               
      {user ? cartItems.length > 0 ? (
          <View style={{paddingBottom:15, borderBottomWidth:1, borderBottomColor:'lightgrey', }}>
                      <Text style={{marginTop:10, fontSize:28, fontWeight:'700'}}>Check Out</Text>
               <Text  style={{marginTop:5, fontWeight:'300', fontSize:17}}>{cart} items</Text>
                </View>
      ): (
          <View>
        <View style={{paddingBottom:15, borderBottomWidth:1, borderBottomColor:'lightgrey', }}>
        <Text style={{marginTop:10, fontSize:28, fontWeight:'700'}}>Check Out</Text>
 <Text  style={{marginTop:5, fontWeight:'300', fontSize:17}}>{cart} items</Text>
  </View>
  <View style={{ justifyContent:'center', backgroundColor:'white', alignItems:'center',paddingTop:HEIGHT / 4}}>
<Text style={{marginBottom:10, fontSize:20, fontWeight:'600'}}>NOTHING ADDED YET...</Text>
<Text style={{width:'60%',lineHeight:20}} numberOfLines={3} >When you cart items you love, we will hold them for you here !</Text>


 <TouchableOpacity  style={{width:'60%', borderWidth:1, marginTop:15,}}
 onPress={() => {
    nav.navigate('Discover')
 }}
 >
 <Text style={{paddingVertical:15, fontSize:18, fontWeight:'600', alignSelf:'center', }}>GET STARTED</Text>
 </TouchableOpacity>
</View>  
</View>
      ): (
        <View style={{justifyContent:'center'}}>
             <View style={{ justifyContent:'center', backgroundColor:'white', alignItems:'center',paddingTop:HEIGHT / 4}}>
      <Text style={{marginBottom:10, fontSize:20, fontWeight:'600'}}>NOTHING SAVED...</Text>
      <Text style={{width:'60%',lineHeight:20}} numberOfLines={3} >...Join to start saving,or sign in to view your previous liked items ! Online shopping made way easier.</Text>
      <TouchableOpacity style={{width:'60%', borderWidth:1, marginTop:15,backgroundColor:'black'}}
      onPress={() => {
          nav.navigate('LogIn')
      }}
      >
          <Text style={{paddingVertical:15, fontSize:18, fontWeight:'600', alignSelf:'center' , color:'white'}}>SIGN IN</Text>
          </TouchableOpacity>
          <TouchableOpacity  style={{width:'60%', borderWidth:1, marginTop:15,}}
          onPress={() => {
             nav.navigate('SignUp')
          }}
          >
          <Text style={{paddingVertical:15, fontSize:18, fontWeight:'600', alignSelf:'center', }}>JOIN US</Text>
          </TouchableOpacity>
    </View>  
        </View>
    
    ) }       
     
      
             
                    {cartItems.length > 0 && final.map((i,index) => 
                    <Swipeable
                    renderRightActions={(progress,id) =>
                       renderRightActions(progress, i.id)
                     }
                   >
                        <TouchableOpacity style={{flexDirection:'row', alignItems:'center', marginVertical:10}} onPress={() =>{ 
                          dispatch(setClicked(true))
                          dispatch(setProductName(i.name))
                            nav.navigate('Product')
                            
                            }}>
                            <Image source ={{uri:i.image}} style={{width:WIDTH*0.3, height:HEIGHT*0.25, borderWidth:1, borderColor:'transparent',borderRadius:10}} />
                          <View style={{marginLeft:10,width:WIDTH*0.5}}>
                               <Feather name='edit' size={28} onPress={() => {
                                dispatch(setIndexEdit(index))
                                dispatch(setImages(i.image))
                                dispatch(setProductName(i.name))
                                dispatch(setPriceEdit(i.price))
                                nav.navigate('Update')
                                
                                
                                
                                }}
                                style={{position:'absolute', right:-20}}
                                />
                                 
                                     <Text style={{width:WIDTH*0.4, fontWeight:'600', fontSize:18}}>{i.name}</Text>  
                                
                         

                           
                                 <Text style={{fontSize:16, marginTop:5, fontWeight:'500'}}>$ {  trial.map(item => item.id === index &&  <Text>{Math.round((item.count * i.price) * 100) / 100}</Text>) }</Text>
                       
                            <Text style={{marginTop:10, fontWeight:'300', fontSize:15}}>Size: {i.size}</Text>
                           <View style={{flexDirection:'row'}}>
                             <Text style={{marginTop:5, fontWeight:'300', fontSize:15}}>Color:</Text>
                            <Ionicons name='ellipse' color={i.color} size={28} style={{marginLeft:5}}/>
                           
                             </View>
                             <Counter start={i.count} buttonStyle={{
     borderColor: '#333',
     borderWidth: 2,
     borderRadius: 25
   }}
   buttonTextStyle={{
     color: '#333',
   }}
   countTextStyle={{
     color: '#333',
   }}
   min={1}
   onChange={(num,type) => {
    {type === '+' ? (
        
     setPrice(index,num)
    ) : (
        decreasePrice(index,num)
    )}
   
   }}
   />
                              </View>
                            
                            
                             
                            </TouchableOpacity>
                            </Swipeable>
                    )
                    
                    }
                  
          {cartItems.length > 0 && (
              <View style={{marginTop:15, borderTopWidth:1, borderTopColor:'lightgrey'}}>
                        <View style={{paddingTop:15}}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Text style={{ left:0, marginLeft:10, fontSize:18}}>Subtotal</Text>
                              
                                <Text style={{ right:0, marginRight:10, fontSize:18, position:'absolute'}}>${Math.round((totalPrice + addedPrice) * 100) / 100}</Text>
                                </View>
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Text style={{ left:0, marginLeft:10, fontSize:18}}>Delivery Fee</Text>
                              
                                <Text style={{ right:0, marginRight:10, fontSize:18, position:'absolute'}}>$ 3.59</Text>
                                </View>   
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Text style={{ left:0, marginLeft:10, fontSize:18,fontWeight:'600',marginTop:15}}>Total</Text>
                              
                                <Text style={{ right:0, marginRight:10, fontSize:18, position:'absolute'}}>${Math.round((totalPrice + addedPrice + 3.59) * 100) / 100}</Text>
                                </View>
                            <TouchableOpacity style={{marginTop:20, justifyContent:'center',width:WIDTH*0.85, alignSelf:'center',borderColor:'transparent', borderRadius:15, borderWidth:1, backgroundColor:'black'}}
                            
                            onPress = {async() => {
                                await updateCartItem(user, {cartItems})
                                dispatch(setAuthenticaed(true))
                                nav.navigate('Final Check Out')
                            }}
                            >
                                <Text style={{color:'white', fontWeight:'600', alignSelf:'center',paddingVertical:10,fontSize:18 }}>Check Out</Text>
                            </TouchableOpacity>
                        </View>
                </View>
          )}      
            </ScrollView>
     

         
            </SafeAreaView>
    )
}

export const CheckOutStack = () => {
    const Stack = createNativeStackNavigator()
    return(
<Stack.Navigator>
    <Stack.Screen name ='Check Out Stack' component={CheckOut} 
    options={{headerShown:false}}
    
    />
    <Stack.Screen name='Final Check Out' component={FinalCheckOut} 
        options={{headerShown:false}}
    
    />
    <Stack.Screen name='View All' component={ViewAll}  options={{headerShown:false}}
     />
     <Stack.Screen name='Shipping' component={ShippingAddress}  options={{headerShown:false}} />
        
        <Stack.Screen name='View Shipping Address' component={ViewAddresses}  options={{headerShown:false}} />
     
    
       <Stack.Group  screenOptions={{ presentation: 'modal' }}>
             
               <Stack.Screen name='Add Card' component={AddCard}   options={{headerShown:false}}/>
       </Stack.Group>
       

    <Stack.Screen name='View Cards' component={ViewCards}   options={{headerShown:false}}/>
</Stack.Navigator>
    )
}