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
import { setClicked, setSearchClicked,setFilter,setTab,setArrow,setImages,setUser,setNumberOfCartItems,setAuthenticaed,setDuplicatedIndex } from '../../redux/actions';
import { BlurView } from 'expo-blur';
import LottieView from 'lottie-react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import ReadMore from '@fawazahmed/react-native-read-more';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import HorizontalBarGraph from '@chartiful/react-native-horizontal-bar-graph'
import firebase, { createUserDocument,createCart,getCartItems,updateCartItem,getReviews,createFavorite } from '../../firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import {doc, setDoc, addDoc, getFirestore, collection} from 'firebase/firestore'
import { ProductDescription } from './ProductDescription';
import { ProductReview } from './ProductReview';
const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width

export default function ProductScreen({navigation}) {
    const {click,cat,c,filter,tab,product,arrow,images,user,cart,duplicate,edit,colorChoose,sizeChoose} = useSelector(state => state.userReducer)
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
    const[color,setColor] = useState('black')
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

    useEffect(() => {
        setLoading(true)
        lottieRef.current?.play()
        setTimeout(() => {
            fetch('https://ecommerce-7700c-default-rtdb.firebaseio.com/.json').then(response => response.json()).then(
                responseData => {
                    setCarouselImages([])

                    for(let key=0; key < 50; key++){
                        let name = responseData[key].name.toLowerCase()
                        if(name === product.toLowerCase()){
                            dispatch(setImages(responseData[key].image_url))
                            setCarouselImages(prev => {
                                return [...prev, responseData[key].image_url, responseData[key].variation_0_thumbnail,responseData[key].variation_1_thumbnail]
                            })
                            setPrice(responseData[key].current_price)
                        }
                    if(key < 6){
                        setSeeMoreImages(prev => {
                            return [...prev, responseData[key].image_url]
                        })
                        setSeeMorePrice(prev => {
                            return [...prev, responseData[key].current_price]
                        })
                        setSeeMoreTitle(prev => {
                            return [...prev, responseData[key].name]
                        })
                    }
                    }
                    setLoading(false)
                    dispatch(setClicked(false))
                   
                
                }
            ).catch(err => {
                console.log(err)
            })
        },5000)

    },[c])

    const triggerReviews = async () => {
        setDescription(false)
        setDetails(false)
        setReviews(true)
         let data = await getReviews(user)
         data.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
           
            setUserReviews(prev =>{ return [...prev,doc.data().reviewObject]})
            
          });
        
    }
 
  let newReviews = userReviews.filter((i,index) => i.name === product ).map((i,index) => (
      {
        text:i.description, image: i.fileURL, product:i.name,rating:i.rating
      }
  ))
    let final = seeMoreImages.map((i,index) => (
        {
            images:i, name:seeMoreTitle[index], price:seeMorePrice[index]
        }
    ))

    const setSelectedIndex = event => {
        const contentOffset = event.nativeEvent.contentOffset.x
        const index = Math.round(contentOffset / WIDTH)
        setPosition(index)
    }
    const updateSections = (activeSections) => {
 
        setActiveSections(activeSections)
        
    }
    const addToFavorite = async () => {
        if(user){
            setFavorite(true)
            try {
                let a = {images,price,product}
          let b = []
          b.push(a)
          await createFavorite(user, {b})
          console.log('Added to favorites')
          } catch (error) {
              console.log(error.message)
          }
        dispatch(setAuthenticaed(true))

        } else {
            nav.navigate('SignUp')
        }

    }

    const addToCart = async() => {
        if(user){
           let data =  await getCartItems(user)
            setCartItems(data.data().temp)
            try {
                setAddingToCart(true)
                addToCart.current?.play()
      let a={sizeChoose,colorChoose,i,product,price,count}
      let count=1
      let i =images[0]
      let duplicated;
             let temp = []
       if(cartItems.map(item => item.sizeChoose).indexOf(a.sizeChoose) !== -1 && cartItems.map(item => item.product).indexOf(a.product) !== -1 && cartItems.map(item => item.colorChoose).indexOf(a.colorChoose) !== -1  ){
       cartItems.forEach( (i,serial) => {
           if(i.sizeChoose === a.sizeChoose && i.product === a.product && i.colorChoose === a.colorChoose){
               dispatch(setDuplicatedIndex(serial))
               i.count = i.count + 1
             
               
           }
       })      
            await updateCartItem(user,{cartItems})
            console.log('hi')
            setAddingToCart(false)
             getCartItems(user).then(data => setCartItems(data.data().temp)).then( dispatch(setNumberOfCartItems(cartItems.length + 1)))
            dispatch(setAuthenticaed(true))   
       } else {
     
     
         a = {sizeChoose,colorChoose,i,product,price,count}
        temp.push(a)
        await createCart(user,{temp})
        setAddingToCart(false)
         getCartItems(user).then(data => setCartItems(data.data().temp)).then( dispatch(setNumberOfCartItems(cartItems.length + 1)))
        dispatch(setAuthenticaed(true))   
       }
           
                

            } catch (error) {
                
                console.log(error.message)
            }
            
        }else {
            nav.navigate('SignUp')
        }
    }
  
    return(
      <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
          <ScrollView>

     
          {c && (
          <View style={{justifyContent:'center', alignItems:'center',height:HEIGHT}}>
          <LottieView source={require('../../assets/197-glow-loading.json')}  ref={lottieRef}     style={{
      width:'100%', zIndex:10,alignSelf:'center', transform:[{translateY:-30}]
              
            }}  />
         
      </View>  
        )}

        <View>
             <ScrollView
               horizontal
               pagingEnabled //allows for each item to be on a 'new page'
               onMomentumScrollEnd={setSelectedIndex} //meaning that once page end hits, change position
               showsHorizontalScrollIndicator={false}
             
             
             >
            {c ?  carouselImages.map((image,index) => (
               
           
                    
<Image 
               key={index}
                source={{uri:image}}
                style={{width:WIDTH,height:HEIGHT*0.45}}
                />
      
            
            
            )) : images.map((image,index) => (
                <Image 
               key={index}
                source={{uri:image}}
                style={{width:WIDTH,height:HEIGHT*0.45}}
                />
            ))}
        </ScrollView>
    <View style={{width:WIDTH, position:'absolute', bottom:15, height:10, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
        {carouselImages.map((i,index) => (
            <View
            key={index}
            style={{height:8, width:index === position ? 35 : 9, borderRadius:4, backgroundColor:'white', margin:5, opacity:index === position ? 0.5 : 1}}
            />
        ))}
    </View>
    <Ionicons name='arrow-back-outline' size={32} color={'black'} style={{position:'absolute',left:0,fontWeight:'800', backgroundColor:'rgba(220,220,220,0.2)', marginTop:10, marginLeft:5}} onPress={() => navigation.goBack()}  />
    <Ionicons name='share-outline' size={28} color={'black'} style={{position:'absolute',right:0,fontWeight:'800', backgroundColor:'rgba(220,220,220,0.2)', marginTop:10, marginRight:5}}  />
        </View>
        <View style={{marginLeft:20, paddingTop:20}}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
      {c ? <Text style={{fontSize:26, fontWeight:'700'}}>$ {price}</Text> : <Text style={{fontSize:26, fontWeight:'700'}}>$ 24.99</Text>}            
                <Ionicons name={favorite ? 'heart' : 'heart-outline'} size={32} color={favorite ? 'red' : 'black'} style={{position:'absolute', right:0, marginRight:30,}} 
                onPress={addToFavorite}
                />
            </View>
          
       { c ? <Text style={{fontSize:20, fontWeight:'300', marginTop:10}} numberOfLines={2}>{product}</Text> : <Text style={{fontSize:20, fontWeight:'300', marginTop:10}} numberOfLines={2}>Structured chic panels power party flattering ultimate trim back pencil silhouette perfect look</Text> }    
            <View style={{flexDirection:'row', alignItems:'center'}}>
<Rating
               startingValue={4}
                ratingCount ={5}
            readonly={true}
            imageSize={20}
            style={{alignSelf:'flex-start', marginTop:5}}
            />
    <Text style={{marginLeft:10, fontSize:16, alignSelf:'center',top:2,fontWeight:'300'}}>4.0 (325)</Text>

            </View>
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <TouchableOpacity style={{marginTop:15, justifyContent:'center',width:WIDTH*0.25, borderWidth:1,marginRight:20, borderRadius:5, borderColor:description === true ? 'transparent' :'lightgrey', backgroundColor:description ? 'rgb(255,218,185)':'white',}}
                onPress={() => {
                    setDescription(true)
                    setDetails(false)
                    setReviews(false)
                }}
                >
                  

                    <Text style={{ alignSelf:'center',paddingVertical:10,fontSize:18,fontWeight:'500'}}>Description</Text>
                
                </TouchableOpacity>
                <TouchableOpacity style={{marginTop:15, justifyContent:'center',width:WIDTH*0.25, borderWidth:1,marginRight:20, borderRadius:5, borderColor:reviews === true ? 'transparent' :'lightgrey', backgroundColor:reviews ? 'rgb(255,218,185)':'white'}}
                    onPress={triggerReviews}
                >
                    
                            <Text style={{ alignSelf:'center',paddingVertical:10,fontSize:18,fontWeight:'500',}}>Reviews</Text>
                 
                
                    
                </TouchableOpacity>
                <TouchableOpacity style={{marginTop:15, justifyContent:'center',width:WIDTH*0.25, borderWidth:1,marginRight:10, borderRadius:5, borderColor:details === true ? 'transparent' :'lightgrey', backgroundColor:details ? 'rgb(255,218,185)':'white'}}
                    onPress={() => {
                        setDescription(false)
                        setDetails(true)
                        setReviews(false)
                    }}
                >
                    
                    <Text style={{ alignSelf:'center',paddingVertical:10,fontSize:18,fontWeight:'500',}} numberOfLines={1}>Product Details</Text>
                   
                </TouchableOpacity>

            </View>
            {description && (
               <ProductDescription addToCart = {addToCart} final={final} addToFavorite={addToFavorite}  />
            )}
           
            {reviews && (
                <ProductReview newReviews={newReviews} />
            )}
              {details && (
                <View style={{marginTop:20}}>
                  <Accordion 
                  sections={SECTIONS}
                  renderContent={renderContent}
                  renderHeader={renderHeader}
                  activeSections={activeSections}
                  onChange={updateSections}
                underlayColor={'transparent'}
               
                  />
                    </View>
            )}
        </View>    
         </ScrollView>
      </SafeAreaView>
    )
}

const SECTIONS = [
    {
        title:'Product Info',
        description:'Bow detail metallic eyelets leather lining luxurious finish classic courts formal slingback square toe contrasting cap. Faux real sexy split up the back pockets cut out detail on the front strappy brown paisley print. Smart rich stretch viscose green yellow poly- blend fabric spaghetti straps figure-skimming fit. Slimming removable contrast straps black waist band ultra-feminine floral print versatility of wear sun-soaked. Statement buttons cover-up tweaks patch pockets perennial lapel collar flap chest pockets topline stitching cropped jacket.'
    },
    {
        title:'Composition & Care',
        description: 'Composition',
        description2:'Cotton 100%',
        description3:'Style ID',
        description4:'SH0134DF56G'
    },
    {
        title:'About The Brand',
        description:'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
    },
    {
        title:'Delivery & Returns',
        description: 'One delivery fee, on multiple pieces, no matter where to !',
        description2:'You will only pay one fee no matter where you order from',
        button:'Find Out More',
        description3:'Free Returns Collection',
        description4:'We offer free global returns. You have 14 days from receiving your oder to return your time. However wwe recommend that you book your free returns within the first 7 days to ensure you receive back your order in time ! ',
        button2:'Full Returns Policy'
    }
]
const renderHeader = (section,isActive) => {

    return(
        <View style={{ flexDirection:'row', alignItems:'center', paddingBottom:15, borderBottomWidth:1, borderBottomColor:'rgba(220,220,220,0.2)', marginVertical:10}}
        >
            <Text style={{fontSize:22, fontWeight:'300', textTransform:'uppercase'}}>{section.title}</Text>
     
     
             
      
        </View>
    )
}
const renderContent = (section) => {
    return(
        <View>
            <Text style={{marginTop:5, fontSize:section.description2 ? 18 : 14, fontWeight:section.description2 ? '600' : '400'}}>{section.description}</Text>
            {section.description2 && (
                <Text style={{fontSize:15, fontWeight:'300'}}>{section.description2}</Text>
            )}
         
             {section.button && (
                 <TouchableOpacity style={{marginTop:5, borderWidth:1, width:WIDTH*0.88, marginHorizontal:15, borderColor:'lightgrey', borderRadius:5, justifyContent:'center'}}>
                        <Text style={{alignSelf:'center', fontWeight:'500', fontSize:20}}>{section.button}</Text>
                 </TouchableOpacity>
             
            )}
             {section.description3 && (
                <Text style={{fontWeight:'600', fontSize:18,marginTop:10}}>{section.description3}</Text>
            )}
             {section.description4 && (
                <Text style={{fontSize:15, fontWeight:'300'}}>{section.description4}</Text>
            )}
             {section.button2 && (
                 <TouchableOpacity>
                        <Text>{section.button2}</Text>
                 </TouchableOpacity>
             
            )}
        </View>
    )
}