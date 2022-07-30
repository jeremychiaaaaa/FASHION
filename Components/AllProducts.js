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
import { setProductName,setClicked, setSearchClicked,setFilter,setTab,setArrow,setImages,setUser,setNumberOfCartItems,setAuthenticaed,setDuplicatedIndex } from './redux/actions';
import firebase, { createUserDocument,createCart,getCartItems,updateCartItem,deleteCartItem,createFavorite } from './firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import {doc, setDoc, addDoc, getFirestore, collection} from 'firebase/firestore'
import { BlurView } from 'expo-blur';
import LottieView from 'lottie-react-native';
const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width
export default function AllProducts(){
    const {click,cat,c,filter,tab,product,user} = useSelector(state => state.userReducer)
    const nav = useNavigation()
    const [priceResults, setPriceResults] = useState([])
    const[image,setImage] = useState([])
    const lottieRef = useRef()
    const[loading,setLoading] = useState(false)
    const[name,setName] = useState([])
    const[tick1, setTick1] = useState(true)
    const[tick2, setTick2] = useState(false)
    const[tick3, setTick3] = useState(false)
    const[tick4, setTick4] = useState(false)
    const[favorite,setFavorite] = useState(false)
    const[clickAscendingPrice, setClickAscendingPrice] = useState(false)
    const[arrangeAscendingPrice, setArrageAscendingPrice] = useState(false)
    const[clickDescendingPrice, setClickDescendingPrice] = useState(false)
    const[arrangeDescendingPrice,setArrangeDescendingPrice] = useState(false)
    const[getDiscount,setGetDiscount] = useState('')
    const[discountPrice,setDiscountPrice] = useState([])
    const [newInItems,setNewInItems] = useState([])
    const dispatch = useDispatch()
    const addToFavorite = () => {
        if(user){
            setFavorite(true)
        } else {
            nav.navigate('SignUp')
        }

    }
    useEffect(() => {
        setLoading(true)
        lottieRef.current?.play()
        setTimeout(() => {
            fetch('https://ecommerce-7700c-default-rtdb.firebaseio.com/.json').then(
            response => response.json()
        ).then(
            responseData => {
               
               setPriceResults([])
               setImage([])
               setName([])
            for(let key=0;key<50;key++){
                let type = responseData[key].subcategory.toLowerCase()
                let name = responseData[key].name.toLowerCase()
                if(type === cat.toLowerCase() || name.slice(0,cat.length).indexOf(cat) !== -1){
                    if(arrangeAscendingPrice === true){
                          setPriceResults(prevResults => {
                        return [...prevResults, responseData[key].current_price ].sort(function(a,b) {
                            return a - b
                        })
                    })
                    } else if (arrangeDescendingPrice === true){
                        setPriceResults(prevResults => {
                            return [...prevResults, responseData[key].current_price ].sort(function(a,b) {
                                return b - a
                            })
                        })
                    } else if (getDiscount === 'SALE ITEMS'){
                        setDiscountPrice(prevResults => {
                            return [...prevResults, (responseData[key].current_price * 0.5).slice(0,3)]
                        })
                        setPriceResults(prev => {
                            return [...prev, responseData[key].current_price]
                        })
                    } else if (getDiscount === 'NEW IN'){
                        if(responseData[key].is_new === true){
                      setPriceResults(prev => {
                            return [...prev, responseData[key].current_price]
                        })
                  
                        }
                        
                    }
                    
                    
                    else {
                        setPriceResults(prev => {
                            return [...prev, responseData[key].current_price]
                        })
                    }
                  
                   
                    setImage(prev => {
                        return [...prev, responseData[key].image_url]
                    })
                    setName(prev => {
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
      
        },15000)
        
        
    },[c,])
    let final = priceResults.map((i,index) => (
        {
            price:i, image:image[index], name:name[index],discount:discountPrice[index]
        }
    ))
const[scrollOffset,setScrollOffset] = useState(0)
    const findItems = () => {
        if(clickAscendingPrice === true){
            setArrageAscendingPrice(true)
                    dispatch(setClicked(true))
                    dispatch(setFilter(false))
        } else if (clickDescendingPrice === true){
            setArrangeDescendingPrice(true)
            dispatch(setClicked(true))
            dispatch(setFilter(false))
        }
    }

    const [selectedTabs,setSelectedTabs] = useState([{
        id:"1",
        title:"ALL"
    },
    {
        id:"2",
        title:"NEW IN"
    },
    {
        id:"3",
        title:"SALE ITEMS"
    },
    {
        id:"4",
        title:"POPULAR"
    },
    {
        id:"5",
        title:"COLLECTION VI"
    },
    {
        id:"6",
        title:"COLLECTION VII"
    }
    
    
    
    ])
    const updateOnPress = (index) => {
        const categories = selectedTabs.map((item) => {
            item.selected = false;
            return item;
          });
          categories[index].selected = true;
          setSelectedTabs(categories);
    
    }



    const[headerVisible,setHeaderVisible] = useState(false)
  console.log(discountPrice)
    
    return(
   <View style={{flex:1, backgroundColor:'white'}}>
        {!c  && (
            <FlatList 
               data={selectedTabs}
               renderItem={({item,index}) => {
                   return(
                    <TouchableOpacity style={{borderWidth:1,borderColor:item.selected ? 'transparent' : 'lightgrey',  marginHorizontal:15,marginTop:20,justifyContent:'center',flex:1,padding:10,borderRadius:5,backgroundColor:item.selected ? 'rgba(172,172,172,.4)': 'white'}}
                    onPress={() => {
                        setGetDiscount(item.title)
                        dispatch(setClicked(true))
                        updateOnPress(index)
                    }}
                    >
                        <Text style={{fontSize:16, fontWeight:'600',alignSelf:'center',padding:10, bottom:5}}>{item.title}</Text>
                    </TouchableOpacity>
           
                   )
               }}
               horizontal
               pagingEnabled={true}
               showsHorizontalScrollIndicator={false}
               legacyImplementation={false}
               style={{width:WIDTH + 5, marginLeft:8,}}
               keyExtractor={(item) => item.id}

               />
        )}  

        {c && (
          <View style={{justifyContent:'center', alignItems:'center',height:HEIGHT}}>
          <LottieView source={require('./assets/197-glow-loading.json')}  ref={lottieRef}     style={{
      width:'100%', zIndex:10,alignSelf:'center', transform:[{translateY:-30}]
              
            }}  />
         
      </View>  
        )}
       {!c && (
<Text style={{alignSelf:'center', marginTop:15, fontSize:20, }}>{priceResults.length} items found</Text>

       )} 
        <FlatList 
        data={final}
        renderItem={renderItem}
        numColumns={2}
        onScroll = {(event) => {
          setScrollOffset(event.nativeEvent.contentOffset.y)
           
          }}
        style={{transform:[{translateX:18},],marginHorizontal:5,marginTop:5,height:'100%', }}
       />
        <Modal
        animationType="slide"
        transparent={true}
        visible={filter}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          dispatch(setFilter(!filter));
        }}
      >
        <View style={styles.centeredView}>
      
          <View style={styles.modalView}>
              <View style={{flexDirection:'row', alignItems:'center',justifyContent:'center', width:WIDTH,marginTop:50}}>
           
            <TouchableOpacity
      
              onPress={() => dispatch(setFilter(!filter))}
          style={{position:'absolute', left:0, marginLeft:20}}
          >
              <Feather name='x' size={28} />
            </TouchableOpacity>
            <Text style={{fontSize:28, fontWeight:'600', alignSelf:'center', textAlign:'center', marginLeft:5}}>Filter</Text>
        <TouchableOpacity style ={{position:'absolute', right:0, marginRight:20}} 
         onPress={() => {
            setTick3(false)
            setTick1(true)
            setTick2(false)
            setTick4(false)
        }}
        >
            <Text style={{fontSize:20, fontWeight:tick2 || tick3 || tick4 ? '700' : '200'}}>Clear All</Text>
        </TouchableOpacity>
            </View>
            <View >
                <Text style={{marginLeft:20, fontSize:26, fontWeight:'bold',marginTop:20}}>Sort By</Text>
                <TouchableOpacity style={{flexDirection:'row', alignItems:'center', marginTop:20,  marginLeft:20, borderBottomColor:'rgba(220,220,220,0.2)', borderBottomWidth:1,paddingBottom:10}}
                onPress={() => {
                    setTick3(false)
                    setTick1(true)
                    setTick2(false)
                    setTick4(false)
                }}
                >
                    <Text style={{fontSize:20, fontWeight:'400', }}>Recommended (All) </Text>
                    <Feather name='check-square' size={24} style={{position:'absolute', right:0,paddingBottom:10,marginRight:20, opacity:tick1 ? 1: 0 }} />
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection:'row', alignItems:'center', marginTop:20,  marginLeft:20, borderBottomColor:'rgba(220,220,220,0.2)', borderBottomWidth:1,paddingBottom:10}}
                onPress={() => {
                    setTick2(true)
                    setTick1(false)
                    setTick3(false)
                    setTick4(false)
                }}
                >
                    <Text style={{fontSize:20, fontWeight:'400', }}>New Items</Text>
                    <Feather name='check-square' size={24} style={{position:'absolute', right:0,paddingBottom:10,marginRight:20, opacity:tick2 ? 1 : 0 }} />
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection:'row', alignItems:'center', marginTop:20,  marginLeft:20, borderBottomColor:'rgba(220,220,220,0.2)', borderBottomWidth:1,paddingBottom:10}}
                onPress={() => {
                    setTick3(true)
                    setTick1(false)
                    setTick2(false)
                    setTick4(false)
                      setClickAscendingPrice(true)
                }}
                >
                    <Text style={{fontSize:20, fontWeight:'400', }}>Price (Low To High)</Text>
                    <Feather name='check-square' size={24} style={{position:'absolute', right:0,paddingBottom:10,marginRight:20, opacity:tick3 ? 1 : 0 }} />
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection:'row', alignItems:'center', marginTop:20,  marginLeft:20, borderBottomColor:'rgba(220,220,220,0.2)', borderBottomWidth:1,paddingBottom:10}}
                onPress = {() => {
                    setTick3(false)
                    setTick1(false)
                    setTick2(false)
                    setTick4(true)
                    setClickDescendingPrice(true)
                }}
                >
                    <Text style={{fontSize:20, fontWeight:'400', }}>Price (High To Low)</Text>
                    <Feather name='check-square' size={24} style={{position:'absolute', right:0,paddingBottom:10,marginRight:20, opacity:tick4 ? 1 : 0 }} />
                </TouchableOpacity>
            </View>
            <View>
            <Text style={{marginLeft:20, fontSize:26, fontWeight:'bold',marginTop:20}}>Filter By</Text>
            <TouchableOpacity style={{flexDirection:'row', alignItems:'center', marginTop:20,  marginLeft:20, borderBottomColor:'rgba(220,220,220,0.2)', borderBottomWidth:1,paddingBottom:10}}
                
                >
                    <Text style={{fontSize:20, fontWeight:'400', }}>Categories</Text>
                    <Feather name='chevrons-right' size={26} style={{position:'absolute', right:0,paddingBottom:10,marginRight:20, }} />
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection:'row', alignItems:'center', marginTop:20,  marginLeft:20, borderBottomColor:'rgba(220,220,220,0.2)', borderBottomWidth:1,paddingBottom:10}}
                
                >
                    <Text style={{fontSize:20, fontWeight:'400', }}>Colors</Text>
                    <Feather name='chevrons-right' size={26} style={{position:'absolute', right:0,paddingBottom:10,marginRight:20, }} />
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection:'row', alignItems:'center', marginTop:20,  marginLeft:20, borderBottomColor:'rgba(220,220,220,0.2)', borderBottomWidth:1,paddingBottom:10}}
                
                >
                    <Text style={{fontSize:20, fontWeight:'400', }}>Sizes</Text>
                    <Feather name='chevrons-right' size={26} style={{position:'absolute', right:0,paddingBottom:10,marginRight:20, }} />
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection:'row', alignItems:'center', marginTop:20,  marginLeft:20, borderBottomColor:'rgba(220,220,220,0.2)', borderBottomWidth:1,paddingBottom:10}}
                
                >
                    <Text style={{fontSize:20, fontWeight:'400', }}>Price Range</Text>
                    <Feather name='chevrons-right' size={26} style={{position:'absolute', right:0,paddingBottom:10,marginRight:20, }} />
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection:'row', alignItems:'center', marginTop:20,  marginLeft:20, borderBottomColor:'rgba(220,220,220,0.2)', borderBottomWidth:1,paddingBottom:10}}
                
                >
                    <Text style={{fontSize:20, fontWeight:'400', }}>Sale Discount</Text>
                    <Feather name='chevrons-right' size={26} style={{position:'absolute', right:0,paddingBottom:10,marginRight:20, }} />
                </TouchableOpacity>
                
            </View>
            <View style={{position:'absolute', bottom:60, alignSelf:'center'}}>
                <TouchableOpacity style={{borderWidth:1, width:WIDTH*0.9, marginHorizontal:10,paddingVertical:10,backgroundColor:'black'}} 
                onPress={findItems}
                
                >
                    <Text style={{alignSelf:'center', fontSize:26, fontWeight:'600', color:'white'}}>Show {name.length} items</Text>
                </TouchableOpacity>
            </View>
          </View>
       
        </View>
        
      </Modal>
   </View>
    )
}

const data = [{
    id:"1",
    title:"ALL"
},
{
    id:"2",
    title:" NEW IN"
},
{
    id:"3",
    title:" SALE ITEMS"
},
{
    id:"4",
    title:"POPULAR"
},
{
    id:"5",
    title:"COLLECTION VI"
},
{
    id:"6",
    title:"COLLECTION VII"
}



]
const renderHeader = ({item}) => {
    return(
        <HeaderItem title={item.title} index={item.id} selected={item.selected}/>
    )
}
const HeaderItem = ({title,index,selected    }) => {
    const {click,cat,c,filter,tab} = useSelector(state => state.userReducer)
    const [selectedTabs,setSelectedTabs] = useState([{
        id:"1",
        title:"ALL"
    },
    {
        id:"2",
        title:" NEW IN"
    },
    {
        id:"3",
        title:"SALE ITEMS"
    },
    {
        id:"4",
        title:"POPULAR"
    },
    {
        id:"5",
        title:"COLLECTION VI"
    },
    {
        id:"6",
        title:"COLLECTION VII"
    }
    
    
    
    ])
    const updateOnPress = (index) => {
        const categories = selectedTabs.map((item) => {
            item.selected = false;
            return item;
          });
          categories[index].selected = true;
          setSelectedTabs(categories);
    
    }
    const dispatch = useDispatch()

    return(
  
            <TouchableOpacity style={{borderWidth:1,borderColor:'lightgrey',  marginHorizontal:15,marginTop:20,justifyContent:'center',flex:1,padding:10,borderRadius:5,backgroundColor:selected ? 'rgb(255,248,220)': 'white'}}
            onPress={() => updateOnPress(index)}
            >
                <Text style={{fontSize:16, fontWeight:'600',alignSelf:'center',padding:10, bottom:5}}>{title}</Text>
            </TouchableOpacity>
   
    )
}
const Item = ({image,price,name,discount}) => {
    const {click,cat,c,filter,tab,product,user} = useSelector(state => state.userReducer)
    const nav = useNavigation()
    const dispatch = useDispatch()
    const[favorite,setFavorite] = useState(false)
    const addToFavorite = async () => {
        if(user){
            setFavorite(true)
            try {
                  let a = {image,price,name}
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
    return(
        <View>
       <TouchableOpacity style={{width:WIDTH*0.467,height:HEIGHT*0.36, marginTop:10,zIndex:10,}}
       onPress = {() => {
           dispatch(setProductName(name))
           dispatch(setClicked(true))
           nav.navigate('Product Details')
       }}
       
       >
            <Image source={{uri:image}} style={{width:'90%', height:'75%'}}/>
               <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',width:'90%',alignContent:'space-between'}}>
                <View>
               {discount && (
                       <Text style={{fontSize:20, fontWeight:'700',marginTop:10,color:'red'}}>$ {discount}</Text>
               )}
                <Text style={{fontSize:20, fontWeight:'700',textDecorationLine:discount ? 'line-through' : 'none',marginTop:5}}>${price}</Text>

                </View>
                
                <Ionicons name={favorite ? 'heart' : 'heart-outline'} size={26} color={favorite ? 'red' : 'black'} style={{position:'absolute', right:0, top:2}} 
                onPress={addToFavorite}
                />
               </View>
                <Text style={{fontSize:16, width:'90%',paddingBottom:20,marginTop:5}}>{name}</Text>
            </TouchableOpacity>
        </View>
    )
}
const renderItem = ({item}) => {
    return(
        <Item image={item.image} price={item.price} name={item.name} discount={item.discount} />
    )
}
const styles = StyleSheet.create({
    topBtn:{
        width: WIDTH*0.5,
        alignSelf:'center',
        borderLeftColor:'lightgrey',
        borderLeftWidth:1,
        height:HEIGHT*0.06,
       justifyContent:'center',
       borderBottomColor:'lightgrey',
       borderBottomWidth:1
    },
    centeredView: {
      
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
      
      },
      modalView: {
 
        backgroundColor: "white",
       

        
   
    
          width:WIDTH,
            height:HEIGHT
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
    
        textAlign: "center"
      }
    
})