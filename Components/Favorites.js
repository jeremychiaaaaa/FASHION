import { StatusBar } from 'expo-status-bar';
import LottieView from 'lottie-react-native';
import React, {useState, useEffect,useRef,useContext} from 'react'
import { StyleSheet, Text, View,SafeAreaView,Dimensions,Image,TouchableOpacity,TouchableHighlight, ScrollView, FlatList } from 'react-native';
import { NavigationContainer,useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { setClicked, setSearchClicked,setFilter,setTab,setArrow,setImages,setUser,setNumberOfCartItems,setAuthenticaed,setIndexEdit, setProductName,setPriceEdit,setDuplicatedIndex } from '../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import firebase, { createUserDocument,createCart,getCartItems,updateCartItem,deleteCartItem,getFavoriteItems,deleteFavoriteItem } from '../firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import {doc, setDoc, addDoc, getFirestore, collection} from 'firebase/firestore'
import { Rating, AirbnbRating } from 'react-native-ratings';
import ReadMore from '@fawazahmed/react-native-read-more';
import Feather from 'react-native-vector-icons/Feather'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Modal from "react-native-modal";
import RBSheet from "react-native-raw-bottom-sheet";
import { FocusScrollView } from 'react-native-focus-scroll';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ScrollPicker from 'react-native-picker-scrollview';
import {Picker} from '@react-native-picker/picker';
const Tab = createMaterialTopTabNavigator();



const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width

export default function Favorites({navigation}){
  const refRBSheet = useRef();
  const ref = useRef()
  const [viewSizes, setViewSizes] = useState(false)
  const[selectedIndex, setSelectedIndex] = useState(-1)
  const [modalVisible, setModalVisible] = useState(false)
  const [colorModalVisible,setColorModalVisible] = useState(false)
  const[cartItems,setCartItems] = useState([])
  const [color,setColor] = useState('black')
  const[addingToCart,setAddingToCart] = useState(false)
  const [sizee,setSizee] = useState([])
    const dispatch = useDispatch()
    const addToCartRef = useRef()
      const nav = useNavigation()
    const {user,modal,yes,} = useSelector(state => state.userReducer)
    const [loading,setLoading] = useState(false)
    const [favoriteItems, setFavoriteItems] = useState([])
    const lottieRef = useRef()
    useEffect(() => {
        setLoading(true)
        lottieRef.current?.play()
        setTimeout(async() => {
            if(user){
                  const data = await getFavoriteItems(user)
          
            setFavoriteItems(data.data().favorite)
        
           
          setSizee(favoriteItems.map((i,index) => ({
              id:index, size:'Size', color:'Color'
            })))

  
setLoading(false)
dispatch(setAuthenticaed(false))
            } else{
                setLoading(false)
             setFavoriteItems([])
            }
          
        },5000)

    },[user,yes,])

    let final = favoriteItems.map((item,index) => (
        {
            image: item.images[0], price: item.price, product:item.product, 
        }
    ))
console.log(sizee)
const pickSize = (itemValue, itemIndex) => {
  console.log(itemValue)
 let updatedList =  sizee.map((i,index) => {
    if(selectedIndex === i.id){
      return {...i , size : itemValue }
    } else {
      return i
    }
  })
  setSizee(updatedList)
}
const pickColor = (name) => {
  let updatedList =  sizee.map((i,index) => {
    if(selectedIndex === i.id){
      return {...i , color : name }
    } else {
      return i
    }
  })
  setSizee(updatedList)
}

const addToBag = async () => {
  
  let data =  await getCartItems(user)
            setCartItems(data.data().temp)
  
            try {

                setAddingToCart(true)
                addToCartRef.current?.play()

      let a={sizeChoose,colorChoose,i,product,price,count}
      let sizeChoose = sizee[selectedIndex].size
      let colorChoose = sizee[selectedIndex].color
      let count=1
      let i = favoriteItems[selectedIndex].image
      let price = favoriteItems[selectedIndex].price
      let product = favoriteItems[selectedIndex].name
      const [totalPrice,setTotalPrice] = useState(0)
      console.log(product)
      let duplicated;
             let temp = []
      if(colorChoose !== 'Color' && sizeChoose !== 'Size'){
         if(cartItems.map(item => item.sizeChoose).indexOf(a.sizeChoose) !== -1 && cartItems.map(item => item.product).indexOf(a.product) !== -1 && cartItems.map(item => item.colorChoose).indexOf(a.colorChoose) !== -1  ){
       cartItems.forEach( (i,serial) => {
           if(i.sizeChoose === a.sizeChoose && i.product === a.product && i.colorChoose === a.colorChoose){
               dispatch(setDuplicatedIndex(serial))
               i.count = i.count + 1
             
               
           }
       })
       console.log('sizee is' + sizee)
      
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
           
      } else if (colorChoose !== 'Color' && sizeChoose === 'Size') {
        setModalVisible(true)
        setAddingToCart(true)
        setColorModalVisible(false)
      } else if (colorChoose === 'Color' && sizeChoose !== 'Size') {
        setModalVisible(true)
        setAddingToCart(true)
      setViewSizes(false)
      } else{
        setModalVisible(true)
        setAddingToCart(false)
        setColorModalVisible(true)
        setViewSizes(false)
      }
      
                

            } catch (error) {
                
                console.log(error.message)
            }
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
          favoriteItems.splice(id,1)
          try {
             
            await deleteCartItem(user, {favoriteItems})
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

  


    return(
        <SafeAreaView style={{flex:1, backgroundColor:'white',justifyContent:'center'}}>
            {loading && (
   <View style={{justifyContent:'center', alignItems:'center',height:HEIGHT}}>
   <LottieView source={require('../assets/197-glow-loading.json')}  ref={lottieRef}     style={{
width:'100%', zIndex:10,alignSelf:'center', transform:[{translateY:-30}]
       
     }}  />

</View>  
            )}
        <ScrollView style={{marginHorizontal:20}}>
       
   {user ? favoriteItems.length > 0 ? (
      <View style={{paddingBottom:15, borderBottomWidth:1, borderBottomColor:'lightgrey', }}>
                      <Text style={{marginTop:10, fontSize:28, fontWeight:'700'}}>Saved Items</Text>
               <Text  style={{marginTop:5, fontWeight:'300', fontSize:17}}>{favoriteItems.length} items</Text>
                </View>
   ) : (
    <View style={{justifyContent:'center'}}>
         <View style={{paddingBottom:15, borderBottomWidth:1, borderBottomColor:'lightgrey', }}>
                      <Text style={{marginTop:10, fontSize:28, fontWeight:'700'}}>Saved Items</Text>
               <Text  style={{marginTop:5, fontWeight:'300', fontSize:17}}>{favoriteItems.length} items</Text>
                </View>
    <View style={{ justifyContent:'center', backgroundColor:'white', alignItems:'center',paddingTop:HEIGHT / 4}}>
<Text style={{marginBottom:10, fontSize:20, fontWeight:'600'}}>NOTHING SAVED YET...</Text>
<Text style={{width:'60%',lineHeight:20}} numberOfLines={3} >When you favorite items you love, you'll find them here !</Text>


 <TouchableOpacity  style={{width:'60%', borderWidth:1, marginTop:15,}}
 onPress={() => {
    nav.navigate('Discover')
 }}
 >
 <Text style={{paddingVertical:15, fontSize:18, fontWeight:'600', alignSelf:'center', }}>GET STARTED</Text>
 </TouchableOpacity>
</View>  
</View>
   ):(
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
              {favoriteItems.length > 0 && final.map((i,index) => 
             <Swipeable
             renderRightActions={(progress,id) =>
                renderRightActions(progress, i.id)
              }
            >
                 <TouchableOpacity style={{flexDirection:'row',  marginVertical:10}} onPress={() =>{ 
                   dispatch(setClicked(true))
                   dispatch(setProductName(i.name))
                     nav.navigate('Product')
                     
                     }}>
                     <Image source ={{uri:i.image}} style={{width:WIDTH*0.3, height:HEIGHT*0.25, borderWidth:1, borderColor:'transparent',borderRadius:10}} />
                   <View style={{marginLeft:10,width:WIDTH*0.5, }}>
                      
                          
                         
                  

                    
                          <Text style={{fontSize:20, fontWeight:'600', alignSelf:'flex-start',marginVertical:10}}>$ {i.price}</Text>
                  <Text style={{width:WIDTH*0.45, fontWeight:'300', fontSize:18,marginBottom:15}}>{i.product}</Text> 
                  <View style={{flexDirection:'row',alignItems:'center', }}>
                      <TouchableOpacity style={{width:'55%', borderRightWidth:1, borderRightColor:'lightgrey',flexDirection:'row',alignItems:'flex-start',justifyContent:'flex-start'}}
                      onPress={ () => {
                        setSelectedIndex(index)
                       console.log(selectedIndex)
                       setModalVisible(true)
                        setColorModalVisible(true)
                      setViewSizes(false)
                      }}
                      
                      >
                          <Text style={{alignSelf:'center',fontSize:16, fontWeight:'300', }}>{sizee.map((item,num) => item.id === index && <Text>{item.color}</Text>)}</Text>
                         
                      </TouchableOpacity>
                        
                      <TouchableOpacity style={{width:'40%',justifyContent:'center'}}
                      onPress={() =>{ 
                        setSelectedIndex(index)
                        setModalVisible(true)
                        setViewSizes(true)
                        setColorModalVisible(false)
                      }}
                      >
                          <Text style={{alignSelf:'flex-start', fontWeight:'300', fontSize:16,marginLeft:10}} >{sizee.map((item,num) => item.id === index && <Text>{item.size}</Text>)}</Text>
                      </TouchableOpacity>
                      </View> 
                   <TouchableOpacity style={{marginTop:15,width:WIDTH*0.27,borderWidth:1, borderColor:'green',transform:[{translateY:30}]}} 
                   onPress={() => {
                      setSelectedIndex(index)
                      {selectedIndex === index && addToBag}  
                   }}
                   >
                       <Text style={{ paddingVertical:6,marginLeft:5,fontWeight:'500', textTransform:'uppercase' }}>Move To Bag</Text>
                   </TouchableOpacity>
                   {addingToCart && (
            <View style={{justifyContent:'center', alignItems:'center',height:50,}}>
            <LottieView source={require('../assets/197-glow-loading.json')}  ref={addToCartRef}     style={{
        width:'30%', zIndex:10,alignSelf:'center', height:50
                
              }}  /> 
            </View>     
        )}
                       </View>
                     
                     
                    
                     </TouchableOpacity>
                     </Swipeable>
            ) }   
      <Modal
       isVisible={modalVisible}
       backdropColor={'transparent'}
       style={{
   
       justifyContent: 'flex-end',
     margin: 0,
 
       }}
    
       onBackdropPress = {() => {
         setModalVisible(false)
       }}
      >
        <View  style={{width:WIDTH, height:HEIGHT*0.5}}>
          <View style={{backgroundColor:'white', flexDirection:'row'}}>
         <TouchableOpacity style={{width:WIDTH*0.4, paddingBottom:15, borderBottomWidth:1, borderBottomColor:colorModalVisible ? 'blue' : 'transparent',justifyContent:'center',marginLeft:20}}
         onPress={
           () => {
            setColorModalVisible(true)
            setViewSizes(false)
           }
         }
         >
           <Text style={{alignSelf:'center',marginTop:15}}>Select Color</Text>
         </TouchableOpacity>
         <TouchableOpacity style={{width:WIDTH*0.45,paddingBottom:15, borderBottomWidth:1, borderBottomColor:viewSizes ? 'blue' : 'transparent',alignSelf:'center',marginLeft:20}}
               onPress={
                () => {
                 setColorModalVisible(false)
                 setViewSizes(true)
                }
              }
         >
           <Text style={{alignSelf:'center',  marginTop:15}}>Select Size</Text>
         </TouchableOpacity>
       </View>
          {colorModalVisible && (
        <View 
        style={{width:WIDTH, height:HEIGHT*0.5}}
        
        >
       
       <View
   style={{
     height:HEIGHT*0.5,
     width:WIDTH,
     backgroundColor:'white'
   }}
    >
    
      <Text style={{alignSelf:'center', fontWeight:'500',fontSize:20,paddingBottom:10,marginTop:10}}> Select Color</Text>
        <ScrollView style={{  }}>
       
         <Image source={{uri: selectedIndex !== -1 ? favoriteItems[selectedIndex].images[0] : ''}}   style={{width:WIDTH, height:HEIGHT*0.25,}} />

     
        <View style={{flexDirection:'row',  marginTop:10,marginLeft:20,alignItems:'center'}}>
          <Text style={{fontSize:18, fontWeight:'600'}}>Select Color : </Text>
                          <TouchableOpacity style={{marginRight:10,borderWidth:color === 'black' ? 3 : 0, borderColor:'black',width:40,height:40,borderRadius:20,justifyContent:'center', alignItems:'center'}}
                            onPress={() => {
                              setColor('black')
                              pickColor('Black')
                          }}
                          >
                              <Ionicons name='ellipse' size={28} color={'black'} style={{alignSelf:'center',left:1}}/>
                          </TouchableOpacity>
                          <TouchableOpacity style={{marginRight:10, borderWidth:color === 'yellow' ? 3 : 0,  borderColor:'black',width:40,height:40,borderRadius:20,justifyContent:'center', alignItems:'center'}} onPress={() => {
                              setColor('yellow')
                              pickColor('Yellow')
                          }}>
                              <Ionicons name='ellipse' size={28} color={'rgb(255,255,102)'} style={{alignSelf:'center',left:1}}/>
                          </TouchableOpacity>
                          <TouchableOpacity style={{marginRight:10, borderWidth: color === 'beige' ? 3 : 0, borderColor:'black',width:40,height:40,borderRadius:20,justifyContent:'center', alignItems:'center'}}
                          onPress={() => {
                              setColor('beige')
                              pickColor('Beige')
                          }}
                          >
                              <Ionicons name='ellipse' size={28} color={'beige'} style={{alignSelf:'center',left:1}}/>
                          </TouchableOpacity>
                          <TouchableOpacity style={{marginRight:10, borderWidth: color === 'blue' ? 3 :0, borderColor:'black',width:40,height:40,borderRadius:20,justifyContent:'center', alignItems:'center' }}
                          onPress={() => {
                              setColor('blue')
                              pickColor('Blue')
                          }}
                          >
                              <Ionicons name='ellipse' size={28} color={'blue'} style={{alignSelf:'center',left:1}} />
                          </TouchableOpacity>
                          <TouchableOpacity style={{marginRight:10, borderWidth: color === 'green' ? 3 : 0,borderColor:'black',width:40,height:40,borderRadius:20,justifyContent:'center', alignItems:'center' }}
                                                  onPress={() => {
                                                      setColor('green')
                                                      pickColor('Green')
                                                  }}
                          >
                              <Ionicons name='ellipse' size={28} color={'rgb(46,139,87)'} style={{alignSelf:'center',left:1}} />
                          </TouchableOpacity>
                      </View>
                      <View style={{flexDirection:'row',marginLeft:20,marginTop:15}}>
<TouchableOpacity style={{width:WIDTH*0.4, borderWidth:1, borderColor:'rgba(220,220,220,0.3)',borderRadius:5}} 
onPress={() => setModalVisible(false)}

>
  <Text style={{alignSelf:'center',paddingVertical:12,fontWeight:'500'}}>Save Color</Text>
</TouchableOpacity>
<TouchableOpacity style={{width:WIDTH*0.4, marginLeft:20,borderWidth:1, borderColor:'transparent', backgroundColor:'black',borderRadius:5}}

  onPress={
   addToBag
  }



>
  <Text style={{alignSelf:'center',paddingVertical:12,fontWeight:'600',color:'white'}}>Add To Bag</Text>
</TouchableOpacity>
</View>
</ScrollView>
    </View>
   </View>
   
     )}  
   
 {viewSizes && (
   <View
    
  
  
  
    >
      <View
   style={{
     height:HEIGHT*0.5,
     width:WIDTH,
     backgroundColor:'white'
   }}
    >
     
        <View style={{marginTop:10,    height:HEIGHT*0.3,
     width:WIDTH, }}>
          <Text style={{alignSelf:'center', fontWeight:'500',fontSize:20}}> Select Size</Text>
          <Picker
  selectedValue={sizee}
  style={{height:50, width:'100%'}}
  onValueChange={(itemValue, itemIndex) =>
  pickSize(itemValue,itemIndex)
  }>
  <Picker.Item label="XXS" value="XXS" />
  <Picker.Item label="XS" value="XS" />
  <Picker.Item label="S" value="S" />
  <Picker.Item label="M" value="M" />
  <Picker.Item label="L" value="L" />
  <Picker.Item label="XL" value="XL" />
  </Picker>
  
        </View>
   <View style={{marginLeft:20,bottom:20}}>
     <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}} onPress={() => {
       {selectedIndex !== - 1 && 
         dispatch(setIndexEdit(selectedIndex))
     dispatch(setImages(favoriteItems[selectedIndex].image))
     dispatch(setProductName(favoriteItems[selectedIndex].name))
     dispatch(setPriceEdit(favoriteItems[selectedIndex].price))
     nav.navigate('Guide')
     setModalVisible(false)
       }
     
  }}>
       <Text style={{fontSize:18}}>Size Guide</Text>
       <Ionicons name='chevron-forward' size={28} style={{position:'absolute', right:0, marginRight:10}} />
     </TouchableOpacity>
     <TouchableOpacity style={{marginTop:10,flexDirection:'row', alignItems:'center'}}>
       
       <Text  style={{fontSize:18}}>Unable To Find Size ?</Text>
       <Ionicons name='chevron-forward' size={28} style={{position:'absolute', right:0, marginRight:10}} />
     </TouchableOpacity>
   </View>
  <View style={{flexDirection:'row',marginLeft:20}}>
  <TouchableOpacity style={{width:WIDTH*0.4, borderWidth:1, borderColor:'rgba(220,220,220,0.3)',borderRadius:5}} >
  <Text style={{alignSelf:'center',paddingVertical:12,fontWeight:'500'}}>Save Size</Text>
  </TouchableOpacity>
  <TouchableOpacity style={{width:WIDTH*0.4, marginLeft:20,borderWidth:1, borderColor:'transparent', backgroundColor:'black',borderRadius:5}}>
  <Text style={{alignSelf:'center',paddingVertical:12,fontWeight:'600',color:'white'}}>Add To Bag</Text>
  </TouchableOpacity>
  </View>
    </View>
   </View>
 )}  
          </View>
     
      </Modal>
        
    
        </ScrollView>
       
             
        </SafeAreaView>
    
    )
}
const DATA = [
  {
    id:'1',
    size:'XS'
  },
  {
    id:'2',
    size:'S'
  },
  {
    id:'3',
    size:'M'
  },
  {
    id:'4',
    size:'L'
  },
  {
    id:'5',
    size:'XL'
  },
]



