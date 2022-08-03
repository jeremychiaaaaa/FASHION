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
import { setClicked, setSearchClicked,setFilter,setTab,setArrow,setImages,setUser,setNumberOfCartItems,setAuthenticaed,setDuplicatedIndex,setColorChoose } from '../../redux/actions';
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
import { ProductSize } from './ProductSize';
const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width



export const ProductDescription = ({navigation,addToCart,final,addToFavorite}) => {
    const {click,cat,c,filter,tab,product,arrow,images,user,cart,duplicate,edit} = useSelector(state => state.userReducer)
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
    const [size,setSize] = useState('XS')
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
        
            <View style={{marginTop:15}}>
                <ReadMore
                numberOfLines={3}
                seeMoreStyle={{
                    color:'rgba(172,172,172,1)'
                }}
                seeLessStyle={{
                    color:'rgba(172,172,172,1)'
                }}
                >Structured chic panels power party flattering ultimate trim back pencil silhouette perfect look. Tops shift shape rich fabric relaxed fitting size true black gold zip virgin wool. Best seller signature waist cut pockets cotton-mix navy blue tailoring elegant cashmere. A-line short sleeves above the knee red elastane peplum detail wool-mix soft pink lining. Leather detail shoulder contrastic colour contour stunning silhouette working peplum</ReadMore>
                
                    <Text style={{fontSize:22, fontWeight:'700',marginTop:10}}>Pick A Color</Text>
                    <View style={{flexDirection:'row',  marginTop:10}}>
                        <FlatList 
                        data={colors}
                        renderItem={renderColors}
                       numColumns={5}
                        />
                    </View>
                        <ProductSize size={size} setSize={setSize} />
                           
                        <View style={{marginTop:20, alignSelf:'center'}}>
                            <TouchableOpacity style={{borderWidth:1, width:WIDTH*0.6, marginRight:10, borderColor:'transparent', borderRadius:5,backgroundColor:'rgb(255,218,185)' }}
                            onPress={addToCart}
                            >
                                <Text style={{alignSelf:'center', fontSize:20, fontWeight:'600', paddingVertical:15}}>
                                    Add To Cart 
                                </Text>
                            </TouchableOpacity>
                            </View>
                            {addingToCart && (
                         <View style={{justifyContent:'center', alignItems:'center',height:50}}>
                         <LottieView source={require('../../assets/197-glow-loading.json')}  ref={addToCartRef}     style={{
                             width:'30%', zIndex:10,alignSelf:'center', height:50
            
                           }}  /> 
                              </View>     
                             )}
                        <View style={{marginTop:10}}>
                            <Text style={{marginLeft:10, fontSize:22, fontWeight:'600',marginTop:5}} >What People Say</Text>
                            <ScrollView
                            horizontal
                         
                            showsHorizontalScrollIndicator={false}
                            style={{width:WIDTH + 5,height:HEIGHT*0.15 }}
                            >

                        {sampleReview.map((i,index) => (
                             <TouchableOpacity 
                             style={{
                             marginTop:10,marginHorizontal:5, 
                             width:WIDTH*0.8,height:HEIGHT*0.12,
                             backgroundColor:'white', borderWidth:1,
                             borderRadius:5, borderColor:'transparent', 
                             shadowColor: "#000",
                             shadowOffset: {
                             width: 0,
                             height: 3,
                             },
                             shadowOpacity: 0.29,
                             shadowRadius: 4.65,
                             
                             elevation: 7,justifyContent:'center',
                             }}>
                                                                 <Text style={{marginTop:5, alignSelf:'center',fontSize:17, marginHorizontal:10}} numberOfLines={2}>
                                                            {i.description}
                                                                 </Text>
                                                                 <View style={{marginVertical:10, flexDirection:'row',alignItems:'center'}}>
                                                                 <Rating
                                        startingValue={1}
                                         ratingCount ={1}
                                     readonly={true}
                                     imageSize={15}
                                     style={{ marginLeft:15}}
                                     />
                                     <Text style={{fontWeight:'300', fontSize:16,marginHorizontal:10}}>5</Text>
                                     <Feather name='circle' style={{color:'black'}} size={6} />
                                     <Text  style={{fontWeight:'300', fontSize:16,marginHorizontal:5}}>{i.name}</Text>
                                                                 </View>
                                      </TouchableOpacity>
                        ))}
                               
                             
                                </ScrollView>
                                <View>

                        <TouchableOpacity style={{alignSelf:'center', flexDirection:'row', alignItems:'center',backgroundColor
                        :'transparent'}}
                         onPress={() => {
                            setDescription(false)
                            setDetails(false)
                            setReviews(true)
                        }}
                        >
                            <Text style={{fontSize:18, fontWeight:'600'}}>See all reviews</Text>
                            <Ionicons name='chevron-forward-circle-outline' size={28} style={{marginLeft:5}} />
                            </TouchableOpacity>        
                            </View>
                            </View>
                        
                    <View>
                        <Text style={{marginLeft:10, fontSize:22, fontWeight:'600',marginTop:20}}>Recommended For You</Text>
                        <ScrollView
                        horizontal
                        style={{width:WIDTH + 5, height:HEIGHT*0.35}}

                        >
                            {final.map((i,index) => (
                                   <TouchableOpacity style={{width:WIDTH*0.45,height:HEIGHT*0.30, marginTop:10,transform:[{translateX:10}]}} key={index}>
                                   <Image source={{uri:i.images}} style={{width:'90%', height:'75%', borderWidth:1, borderColor:'transparent', borderRadius:5}}/>
                                  <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',width:'90%',alignContent:'space-between'}}>
                                   <Text style={{fontSize:20, fontWeight:'700',marginTop:10}}>${i.price}</Text>
                                   <Ionicons name={clickedIndex.includes(index)  ? 'heart' : 'heart-outline'} color={clickedIndex.includes(index)  ? 'red' : 'black'} size={28}  style={{alignSelf:'flex-end',marginTop:10}}
                                  
                                  onPress={() => {
                                       
                                   return(
                                        user ? setClickedIndex(prev => [...prev, index]) : nav.navigate('SignUp') 
                                   )   
                                   }}
                                   />
                                  
                                  </View>
                                   <Text style={{fontSize:16, width:'90%',paddingBottom:20}} numberOfLines={2}>{i.name}</Text>
                               </TouchableOpacity>
                            ))}
                        </ScrollView>
                        </View>
                </View>
    
    )
}

const colors = [
    {
    id:"1",
    color:"black"
    },
    {
    id:"2",
    color:"yellow"
     },
     {
    id:"3",
    color:"beige"
     },   

    {
    id:"4",
    color:"blue"
    },
    {
    id:"5",
    color:"green"
    },    
]



const ColorChoices = ({color}) => {
    const {colorChoose} = useSelector(state => state.userReducer)
    const dispatch = useDispatch()
    return(
        <TouchableOpacity style={{marginRight:10,borderWidth:color === colorChoose ? 3 : 0, borderColor:'black',width:40,height:40,borderRadius:20,justifyContent:'center', alignItems:'center'}}
        onPress={() => {
        dispatch(setColorChoose(color))
      }}
      >
          <Ionicons name='ellipse' size={28} color={color} style={{alignSelf:'center',left:1}}/>
      </TouchableOpacity>
    )
}

const renderColors = ({item}) => {
    return(
        <ColorChoices color={item.color} />
    )
}

const sampleReview = [
    {
        id:"1",
        name:"John Doe",
        description:"This sweater is pretty great. I love the length and the fit and mostly I love how cozy it is. It keeps me warm, looks great and is soft and luxurious. I am thinking about getting another in a different color…because if its this good, why not?"
    },
    {
        id:"2",
        name:"John Doe",
        description:"This sweater is pretty great. I love the length and the fit and mostly I love how cozy it is. It keeps me warm, looks great and is soft and luxurious. I am thinking about getting another in a different color…because if its this good, why not?"
    },
    {
        id:"3",
        name:"John Doe",
        description:"This sweater is pretty great. I love the length and the fit and mostly I love how cozy it is. It keeps me warm, looks great and is soft and luxurious. I am thinking about getting another in a different color…because if its this good, why not?"
    },
    {
        id:"4",
        name:"John Doe",
        description:"This sweater is pretty great. I love the length and the fit and mostly I love how cozy it is. It keeps me warm, looks great and is soft and luxurious. I am thinking about getting another in a different color…because if its this good, why not?"
    }
]
