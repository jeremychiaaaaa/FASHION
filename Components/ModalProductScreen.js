import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect,useRef} from 'react'
import { StyleSheet, Text, View,SafeAreaView,Dimensions,Image,TouchableOpacity,ScrollView,FlatList, Alert, Modal, ImageStore } from 'react-native';
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
import { setClicked, setSearchClicked,setFilter,setTab,setArrow,setImages,setUser,setNumberOfCartItems,setAuthenticaed } from '../redux/actions';
import { BlurView } from 'expo-blur';
import LottieView from 'lottie-react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import ReadMore from '@fawazahmed/react-native-read-more';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import HorizontalBarGraph from '@chartiful/react-native-horizontal-bar-graph'
import firebase, { createUserDocument,createCart,getCartItems,updateCartItem } from '../firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import {doc, setDoc, addDoc, getFirestore, collection} from 'firebase/firestore'

const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width
export default function ModalProductScreen({navigation}){
    const {click,cat,c,filter,tab,product,arrow,images,user,cart,edit,price} = useSelector(state => state.userReducer)
    const nav = useNavigation()
    const dispatch = useDispatch()
    const[color,setColor] = useState('black')
    const lottieRef = useRef()
    const [loading,setLoading] = useState(false)
    const [size,setSize] = useState('XS')
    const [addingToCart,setAddingToCart] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const addToCartRef = useRef()
    console.log(price)
    useEffect(() => {
        setLoading(true)
        lottieRef.current?.play()
        setTimeout(async () => {
            const data = await getCartItems(user)
            setCartItems(data.data().temp)
            setLoading(false)
        },2000)
    },[edit])
    const addToCart = async() => {
         cartItems.splice(edit, 1)
console.log(cartItems + 'before')
            try {
                setAddingToCart(true)
                addToCart.current?.play()
            const a = {size,color,images,product,price}
           cartItems.splice(edit, 0, a)
          console.log(cartItems + 'after')
            await updateCartItem(user,{cartItems})
            setAddingToCart(false)
       
            dispatch(setAuthenticaed(true))        
                    navigation.goBack()
            } catch (error) {
                
                console.log(error.message)
            }
            
        
    }

    return(
        <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
         {loading && (
   <View style={{justifyContent:'center', alignItems:'center',height:HEIGHT}}>
   <LottieView source={require('../assets/197-glow-loading.json')}  ref={lottieRef}     style={{
width:'100%', zIndex:10,alignSelf:'center', transform:[{translateY:-30}]
       
     }}  />
     </View>)}
     <ScrollView>
   <View>
             
         
               
           
                    
<Image 
               
                source={{uri:images[0]}}
                style={{width:WIDTH,height:HEIGHT*0.45}}
                />
      
                
            
     
  

    <Ionicons name='close-outline' size={32} color={'black'} style={{position:'absolute',left:0,fontWeight:'800', backgroundColor:'rgba(220,220,220,0.2)', marginTop:10, marginLeft:5}} onPress={() =>    navigation.goBack()}  />
    <Ionicons name='share-outline' size={28} color={'black'} style={{position:'absolute',right:0,fontWeight:'800', backgroundColor:'rgba(220,220,220,0.2)', marginTop:10, marginRight:5}}  />
        </View>
        <View style={{marginTop:15,marginLeft:10}}>
        <Text style={{fontSize:20, fontWeight:'600',marginBottom:10 }} numberOfLines={2}>{product}</Text>
        <Text style={{fontSize:18, fontWeight:'700',marginBottom:10}}>$ {price}</Text>
        <View style={{flexDirection:'row', alignItems:'center'}}>
<Rating
               startingValue={4}
                ratingCount ={5}
            readonly={true}
            imageSize={20}
            style={{alignSelf:'flex-start', }}
            />
    <Text style={{marginLeft:10, fontSize:16, alignSelf:'center',top:2,fontWeight:'300'}}>4.0 (325)</Text>

            </View>
                    <ReadMore
                    numberOfLines={3}
                    seeMoreStyle={{
                        color:'rgba(172,172,172,1)'
                    }}
                    seeLessStyle={{
                        color:'rgba(172,172,172,1)'
                    }}
                    style={{marginTop:5}}
                    >Structured chic panels power party flattering ultimate trim back pencil silhouette perfect look. Tops shift shape rich fabric relaxed fitting size true black gold zip virgin wool. Best seller signature waist cut pockets cotton-mix navy blue tailoring elegant cashmere. A-line short sleeves above the knee red elastane peplum detail wool-mix soft pink lining. Leather detail shoulder contrastic colour contour stunning silhouette working peplum</ReadMore>
                    
                        <Text style={{fontSize:22, fontWeight:'700',marginTop:10}}>Pick A Color</Text>
                        <View style={{flexDirection:'row',  marginTop:10}}>
                            <TouchableOpacity style={{marginRight:10,borderWidth:color === 'black' ? 3 : 0, borderColor:'black',width:40,height:40,borderRadius:20,justifyContent:'center', alignItems:'center'}}
                              onPress={() => {
                                setColor('black')
                            }}
                            >
                                <Ionicons name='ellipse' size={28} color={'black'} style={{alignSelf:'center',left:1}}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={{marginRight:10, borderWidth:color === 'yellow' ? 3 : 0,  borderColor:'black',width:40,height:40,borderRadius:20,justifyContent:'center', alignItems:'center'}} onPress={() => {
                                setColor('yellow')
                            }}>
                                <Ionicons name='ellipse' size={28} color={'rgb(255,255,102)'} style={{alignSelf:'center',left:1}}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={{marginRight:10, borderWidth: color === 'beige' ? 3 : 0, borderColor:'black',width:40,height:40,borderRadius:20,justifyContent:'center', alignItems:'center'}}
                            onPress={() => {
                                setColor('beige')
                            }}
                            >
                                <Ionicons name='ellipse' size={28} color={'beige'} style={{alignSelf:'center',left:1}}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={{marginRight:10, borderWidth: color === 'blue' ? 3 :0, borderColor:'black',width:40,height:40,borderRadius:20,justifyContent:'center', alignItems:'center' }}
                            onPress={() => {
                                setColor('blue')
                            }}
                            >
                                <Ionicons name='ellipse' size={28} color={'blue'} style={{alignSelf:'center',left:1}} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{marginRight:10, borderWidth: color === 'green' ? 3 : 0,borderColor:'black',width:40,height:40,borderRadius:20,justifyContent:'center', alignItems:'center' }}
                                                    onPress={() => {
                                                        setColor('green')
                                                    }}
                            >
                                <Ionicons name='ellipse' size={28} color={'rgb(46,139,87)'} style={{alignSelf:'center',left:1}} />
                            </TouchableOpacity>
                        </View>
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
                          <TouchableOpacity style={{borderWidth:1, borderColor:size === 'XS' ? 'transparent' : 'lightgrey', borderRadius:5, width:WIDTH*0.25, marginRight:20, backgroundColor:size === 'XS' ? 'rgb(255,218,185)' : 'rgba(220,220,220,0.2)'}}
                          onPress = {() => {
                              setSize('XS')
                          }}
                          >
                              <Text style={{fontSize:20, fontWeight:'500', paddingVertical:15,alignSelf:'center'}}>XS</Text>
                              </TouchableOpacity>
                              <TouchableOpacity style={{borderWidth:1,borderColor:size === 'S' ? 'transparent' : 'lightgrey', borderRadius:5, width:WIDTH*0.25, marginRight:20, backgroundColor:size === 'S' ? 'rgb(255,218,185)' : 'rgba(220,220,220,0.2)'}}
                              onPress = {() => {
                                setSize('S')
                            }}
                              >
                              <Text style={{fontSize:20, fontWeight:'500', paddingVertical:15,alignSelf:'center'}}>S</Text>
                              </TouchableOpacity>     
                              <TouchableOpacity style={{borderWidth:1, borderColor:size === 'M' ? 'transparent' : 'lightgrey', borderRadius:5, width:WIDTH*0.25, marginRight:20, backgroundColor:size === 'M' ? 'rgb(255,218,185)' : 'rgba(220,220,220,0.2)'}}
                              onPress = {() => {
                                setSize('M')
                            }}
                              >
                              <Text style={{fontSize:20, fontWeight:'500', paddingVertical:15,alignSelf:'center'}}>M</Text>
                              </TouchableOpacity>     
                                 </View>  
                                 <View style={{flexDirection:'row',alignITems:'center',marginTop:10}}>

                              <TouchableOpacity style={{borderWidth:1, borderColor:size === 'L' ? 'transparent' : 'lightgrey', borderRadius:5, width:WIDTH*0.25, marginRight:20, backgroundColor:size === 'L' ? 'rgb(255,218,185)' : 'rgba(220,220,220,0.2)'}}
                              onPress = {() => {
                                setSize('L')
                            }}
                              >
                              <Text style={{fontSize:20, fontWeight:'500', paddingVertical:15,alignSelf:'center'}}>L</Text>
                              </TouchableOpacity>     
                              <TouchableOpacity style={{borderWidth:1, borderColor:size === 'XL' ? 'transparent' : 'lightgrey', borderRadius:5, width:WIDTH*0.25, marginRight:20, backgroundColor:size === 'XL' ? 'rgb(255,218,185)' : 'rgba(220,220,220,0.2)'}}
                              onPress = {() => {
                                setSize('XL')
                            }}
                              >
                              <Text style={{fontSize:20, fontWeight:'500', paddingVertical:15,alignSelf:'center'}}>XL</Text>
                              </TouchableOpacity>                                   
                                       </View>        
                            <View style={{marginTop:20, alignSelf:'center'}}>
                                <TouchableOpacity style={{borderWidth:1, width:WIDTH*0.6, marginRight:10, borderColor:'transparent', borderRadius:5,backgroundColor:'rgb(255,218,185)' }}
                                onPress={addToCart}
                                >
                                    <Text style={{alignSelf:'center', fontSize:20, fontWeight:'600', paddingVertical:15}}>
                                      Update Item
                                    </Text>
                                </TouchableOpacity>
                                </View>
                                {addingToCart && (
            <View style={{justifyContent:'center', alignItems:'center',height:50}}>
            <LottieView source={require('../assets/197-glow-loading.json')}  ref={addToCartRef}     style={{
        width:'30%', zIndex:10,alignSelf:'center', height:50
                
              }}  />
              
               </View>   )
               }
           
            </View>
  </ScrollView>
        </SafeAreaView>
  

    )
}