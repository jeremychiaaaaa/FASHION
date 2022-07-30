import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect,useRef,useCallback} from 'react'
import { StyleSheet, Text, View,SafeAreaView,Dimensions,Image,TouchableOpacity,ScrollView,FlatList, Alert, Modal, ImageStore,TouchableHighlight,TextInput,KeyboardAvoidingView, ActivityIndicator } from 'react-native';
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
import { getStorage, ref, uploadBytes,getDownloadURL } from "firebase/storage";
import { setClicked, setSearchClicked,setFilter,setTab,setArrow,setImages,setUser,setNumberOfCartItems,setAuthenticaed,setIndexEdit, setProductName,setPriceEdit,setDuplicatedIndex,setChangeAddress,setSelectedAddress,setReviewAdded } from './redux/actions';
import { BlurView } from 'expo-blur';
import LottieView from 'lottie-react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import ReadMore from '@fawazahmed/react-native-read-more';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import HorizontalBarGraph from '@chartiful/react-native-horizontal-bar-graph'
import firebase, { createUserDocument,createCart,getCartItems,updateCartItem,deleteCartItem,getAddress,createOrder,createReview } from './firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import {doc, setDoc, addDoc, getFirestore, collection} from 'firebase/firestore'
import CounterInput from "react-native-counter-input";
import ModalDropdown from 'react-native-modal-dropdown';
import Counter from "react-native-counters";
import * as ImagePicker from 'expo-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width
const storage = getStorage()
const storageRef = ref(storage)
export default function AddReview({navigation}) {
    const {click,cat,c,filter,tab,product,arrow,images,user,cart,yes,edit,price,duplicate} = useSelector(state => state.userReducer)
    const nav = useNavigation()
    const dispatch = useDispatch()
    const [image, setImage] = useState(null);
    const [loading,setLoading] = useState(false)
    const[spinner,setSpinner] = useState(false)
    const lottieRef = useRef()
    const [cartItems,setCartItems] = useState([])
    const[trial,setTrial] = useState([])
    const [totalPrice,setTotalPrice] = useState(0)
    const [modalVisible,setModalVisible] = useState(false)
    const [duplicatedArray,setDuplicatedArray] = useState([])
    const [addedPrice,setAddedPrice] = useState(0)
    const [selectedIndex,setSelectedIndex] = useState(0)
    const [rating,setRating] = useState(-1)
    const [imageObject, setImageObject] = useState()
    const [fileName,setFileName] = useState()
    const[description,setDescription] = useState('')
    const [fileURL,setFileURL] = useState()
    const [uploaded,setUploaded] = useState(false)
    const [confirm,setConfirm] = useState(false)
    useEffect(() => {
        setLoading(true)
        lottieRef.current?.play()
        setTimeout(async() => {
            if(user){
                  const data = await getCartItems(user)
     
            setCartItems(data.data().temp)
            dispatch(setNumberOfCartItems(final.reduce((sum,item,index) => (sum + (item.count)),0)))
            
      

  


setLoading(false)
dispatch(setAuthenticaed(false))
            } else{
                setLoading(false)
                setCartItems([])
            }
          
        },5000)
    
    },[yes])
    let final = cartItems.filter((i,index) => index === duplicate).map((item,index) => (
        {
            image:item.i, name:item.product, price: item.price, size:item.size, color:item.color, serial:1, count: item.count
        }
    ))

    const metadata = {
        contentType: 'image/jpeg',
    }
    const uploadFile = async () => {
        setSpinner(true)
        console.log(fileName)
           const fileRef = ref(storageRef, 'image')
         await uploadBytes(fileRef, imageObject,metadata)
               
                 console.log('Success upload')
               setSpinner(false)
                 setUploaded(true)
       
           setFileURL(await getDownloadURL(fileRef))
           console.log('Added URL')
           setModalVisible(true)
       }

    const uploadToFireBase = async () => {
        setSpinner(true)
        try {
             let product = final[duplicate].name
         
        let reviewObject = {
        fileURL, description, product
        }
        await createReview(user, {reviewObject})
        console.log('Success')
        setSpinner(false)
        } catch (error) {
            console.log(error.message)
        }
    
    }
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
            try {
              
           const response = await fetch(result.uri)
           let blob = await response.blob()
           setFileName(result.name)
           setImageObject(blob)
              setImage(result.uri);
         } catch (error) {
             console.log(error.message)
         }
       
       
        }
      };
    return(
        <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
            {loading && (
   <View style={{justifyContent:'center', alignItems:'center',height:HEIGHT}}>
   <LottieView source={require('./assets/197-glow-loading.json')}  ref={lottieRef}     style={{
width:'100%', zIndex:10,alignSelf:'center', transform:[{translateY:-30}]
       
     }}  />

</View>  
            )}
            <KeyboardAwareScrollView>

          
             <View style={{flexDirection:'row', alignItems:'center',justifyContent:'center',marginTop:10}}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{position:'absolute', left:0, marginLeft:10}}>
 <Ionicons name='arrow-back-outline' size={28}  />
                </TouchableOpacity>
               
 <Text style={{alignSelf:'center', fontWeight:'600', fontSize:22}}>Add Review</Text>
            </View>
            <View style={{marginHorizontal:20, marginTop:20}}>
             
                     {final.map((i,index) => 
          <View style={{flexDirection:'row',marginTop:10, borderBottomColor:'rgba(220,220,220,0.4)',borderBottomWidth:1,paddingBottom:15 }} >
              <Image source ={{uri:i.image}} style={{width:WIDTH*0.3, height:HEIGHT*0.15, borderWidth:1, borderColor:'transparent',borderRadius:10, }} />
            <View style={{marginLeft:10,width:WIDTH*0.5}}>
              
                       <Text style={{width:WIDTH*0.4, fontWeight:'600', fontSize:18}}>{i.name}</Text>  
                  
           
             
                   <Text style={{fontSize:16, marginTop:5, fontWeight:'400'}}>$ {  trial.map(item => item.id === index &&  <Text>{Math.round((item.count * i.price) * 100) / 100}</Text>) }</Text>
        
                <Text style={{marginTop:10, fontWeight:'400', fontSize:16, textTransform:'capitalize' }}>Color:  {i.color}</Text>
             
               <Text style={{marginTop:10, fontWeight:'400', fontSize:16}}>Size: {i.size}</Text>
        
       

                </View>
              
              
               
              </View>
              
        )}
        <View style={{marginTop:10,borderBottomColor:'rgba(220,220,220,0.4)',borderBottomWidth:1,paddingBottom:15 }}>
            <Text style={{fontSize:18, fontWeight:'600', marginBottom:10}}>Add Rating</Text>
         <View style={{height:20}} />
          <AirbnbRating
          defaultRating={0}
          count={5}
          size={20}
          showRating={false}
          onFinishRating={(rating) => setRating(rating) }
          starContainerStyle={{position:'absolute', left:0, paddingBottom:15}}
          />
        </View>
        <View style={{marginTop:10,borderBottomColor:'rgba(220,220,220,0.4)',borderBottomWidth:1,paddingBottom:15 }}>
            <Text  style={{fontSize:18, fontWeight:'600', marginBottom:10}}>Add Photo Or Video</Text>
            <TouchableOpacity style={{width:WIDTH*0.9, borderRadius:5, borderColor:'transparent', borderWidth:1, backgroundColor:'rgba(220,220,220,1)', alignSelf:'center',justifyContent:'center', alignItems:'center', paddingVertical:20}}
            onPress={pickImage} 
            >

                   {image ? <Image source={{ uri: image }} style={{ width: '80%', height: 200 }} /> :                     <Ionicons name='cloud-upload-outline' size={28} style={{alignSelf:'center'}} />}
                    <Text style={{marginTop:10, fontWeight:'500', textAlign:'center',fontSize:18, alignSelf:'center'}}>
                    Click Here To Upload an Image / Video
                    </Text>
                  
            </TouchableOpacity>
            </View>   
            <View style={{marginTop:10,borderBottomColor:'rgba(220,220,220,0.4)',borderBottomWidth:1,paddingBottom:15 }}>
            <Text  style={{fontSize:18, fontWeight:'600', marginBottom:10}}>Add Description</Text>

                     <TextInput
        style={{width:WIDTH*0.9, borderRadius:5, borderColor:'transparent', borderWidth:1, backgroundColor:'rgba(220,220,220,1)', alignSelf:'center',justifyContent:'center', alignItems:'center',height:HEIGHT*0.2, overflow:'scroll',}}
            value={description}
            placeholder='Add Description'
            onChangeText={text=>setDescription(text)}
            multiline={true}
            underlineColorAndroid='transparent'
    />      
     
 
                </View>   
                <TouchableOpacity  style={{marginTop:20, justifyContent:'center',width:WIDTH*0.85, alignSelf:'center',borderColor:'transparent', borderRadius:15, borderWidth:1, backgroundColor:'black'}}
        onPress={uploadFile}
     
        
        >
            <Text  style={{color:'white', fontWeight:'600', alignSelf:'center',paddingVertical:10,fontSize:18 }}>Upload Review</Text>
            </TouchableOpacity>
            {spinner && (
        <LottieView source={require('./assets/197-glow-loading.json')}       style={{
          width:'100%', height:50,
                  
                }} autoPlay loop/>
       )} 
       
            <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >

        <View style={styles.centeredView}>
      
         <BlurView intensity={100} style={{height:'100%', justifyContent:'center', width:'100%'}}>
          <View style={styles.modalView}> 
         

          <Feather name='upload' size={40} style={{alignSelf:'center'}} />
            <Ionicons name='close-circle' size={32} onPress={() => setModalVisible(false)} style={{position:'absolute', right:0, marginRight:30,top:10 }}/>
             <ScrollView 
             style={{width:WIDTH*0.9, height:HEIGHT*0.6}}
             
             >
            
            <View style={{marginVertical:10, marginLeft:20}}>
                  
            <Text style={{fontSize:18, fontWeight:'600',marginVertical:20}}>Product : <Text style={{fontWeight:'300'}}>{final.map(i => i.name)}</Text></Text>
            <View style={{flexDirection:'row'}}>
               <Text style={{fontSize:18, fontWeight:'600',marginVertical:20}}>Rating :  </Text>
            <AirbnbRating
          defaultRating={rating}
          count={5}
          size={20}
          showRating={false}
         isDisabled={true}
          starContainerStyle={{marginLeft:15}}
          />  
            </View>
           
            <View style={{flexDirection:'row', alignItems:'center',marginVertical:20}}>
            <Text style={{fontSize:18, fontWeight:'600', marginRight:20, marginTop:20}}>Image : </Text>
            <Image source={{uri:image}} style={{width:80,height:80,}}/>
         
            </View>
          
                 <Text style={{fontSize:18, fontWeight:'600'}}>Description : </Text>
                 <ReadMore   numberOfLines={2}
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
                            fontWeight:'400',
                          marginTop:10
                           
                        }}>{description}</ReadMore>
      
        
            </View>

            
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={confirm ? () =>{ 
                setModalVisible(false)
           
                nav.navigate('Home') }:  async () => {
                    setSpinner(true)
                    try {
                            let name = final.map((i,index) => i.name).toString()
                    let reviewObject = {
                    fileURL, description, name, rating
                    }
                    await createReview(user, {reviewObject})
                    console.log('Success')
                    setSpinner(false)
                    dispatch(setReviewAdded(true))
                    nav.navigate('Home')
                    } catch (error) {
                        console.log(error.message)
                    }
                
                } 
              }
            >
                 <Text style={styles.buttonText}>{confirm ? 'Return To Home' :'Confirm Review'}</Text>
  
            </TouchableOpacity>
          
       
      
          </ScrollView>
          </View>
       </BlurView>
        </View>
      </Modal>

         </View>
        </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}


export const ViewAllItems = ({navigation}) =>{
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
    const [selectedIndex,setSelectedIndex] = useState(0)
    useEffect(() => {
        setLoading(true)
        lottieRef.current?.play()
        setTimeout(async() => {
            if(user){
                  const data = await getCartItems(user)
     
            setCartItems(data.data().temp)
            dispatch(setNumberOfCartItems(final.reduce((sum,item,index) => (sum + (item.count)),0)))
            
      

  


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
  

    return(
        <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
             {loading && (
   <View style={{justifyContent:'center', alignItems:'center',height:HEIGHT}}>
   <LottieView source={require('./assets/197-glow-loading.json')}  ref={lottieRef}     style={{
width:'100%', zIndex:10,alignSelf:'center', transform:[{translateY:-30}]
       
     }}  />

</View>  
            )}
              <View style={{flexDirection:'row', alignItems:'center',justifyContent:'center',marginTop:10}}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{position:'absolute', left:0, marginLeft:10}}>
 <Ionicons name='arrow-back-outline' size={28}  />
                </TouchableOpacity>
               
 <Text style={{alignSelf:'center', fontWeight:'600', fontSize:22}}>Choose Item</Text>
            </View>
            {final.map((i,index) => 
          <TouchableOpacity style={{flexDirection:'row', marginVertical:10, marginLeft:20,justifyContent:'center'}} onPress={() =>{ 
            setSelectedIndex(index)
              
              }}>
                {selectedIndex === index ? <Ionicons name='checkmark-circle-outline' size={28} color={'green'} style={{marginRight:10, alignSelf:'center'}} /> : <Ionicons name='ellipse-outline' style={{marginRight:10, alignSelf:'center'}} size={28} /> }
              <Image source ={{uri:i.image}} style={{width:WIDTH*0.3, height:HEIGHT*0.2, borderWidth:1, borderColor:'transparent',borderRadius:10}} />
            <View style={{marginLeft:10,width:WIDTH*0.5}}>
              
                       <Text style={{width:WIDTH*0.4, fontWeight:'600', fontSize:18}}>{i.name}</Text>  
                  
           
             
                   <Text style={{fontSize:16, marginTop:5, fontWeight:'400'}}>$ {  trial.map(item => item.id === index &&  <Text>{Math.round((item.count * i.price) * 100) / 100}</Text>) }</Text>
        
                <Text style={{marginTop:10, fontWeight:'400', fontSize:16, textTransform:'capitalize' }}>Color:  {i.color}</Text>
             
               <Text style={{marginTop:10, fontWeight:'400', fontSize:16}}>Size: {i.size}</Text>
        
       

                </View>
              
              
               
              </TouchableOpacity>
              
        )}
        <TouchableOpacity  style={{marginTop:20, justifyContent:'center',width:WIDTH*0.85, alignSelf:'center',borderColor:'transparent', borderRadius:15, borderWidth:1, backgroundColor:'black'}}
        
        onPress={() => {
            dispatch(setDuplicatedIndex(selectedIndex))
            dispatch(setAuthenticaed(true))
            nav.navigate('Add Review')
        }}
        
        >
            <Text  style={{color:'white', fontWeight:'600', alignSelf:'center',paddingVertical:10,fontSize:18 }}>Add A Review</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}
const styles= StyleSheet.create({
    header:{
        
        
         
      alignContent:'center',
          textAlign:'center',
           width:'100%',
           height: HEIGHT * 0.55,
           borderBottomColor:'#F5F5F5',
           borderBottomWidth:1,
           alignSelf:'center',
           justifyContent:'center'
          
       },
      text:{
          fontSize:20,
          padding:10,
          width:100,
          height:50,
          marginLeft:30,
          marginBottom:10,
         alignSelf:'center',
  backgroundColor:'rgba(220,220,220,0.2)',
  borderRadius:10,
  justifyContent:'center'
      },
      click:{
          backgroundColor:'rgb(214,202,221)',
          fontSize:20,
          padding:10,
       width:100,
       height:50,
          alignSelf:'center',
          marginLeft:30,
          marginBottom:10,
          borderRadius:10,
          justifyContent:'center'
          
      },
      unavailable:{
          backgroundColor:'red',
          fontSize:20,
          padding:15,
          borderWidth:1,
          borderRadius:15,
          margin:10,
          marginHorizontal:25
      },
      button: {
  marginTop:20, justifyContent:'center',width:WIDTH*0.85, alignSelf:'center',borderColor:'transparent', borderRadius:15, borderWidth:1, backgroundColor:'black'
  
      },
      button1: {
        alignSelf:'center',
       padding:15,
       borderWidth:1,
    borderRadius:15,
   position:'absolute',
   top:'25%',
   
     width:'90%',
     marginHorizontal:10,
     backgroundColor:'rgba(67,179,174,1)',
     borderColor:'transparent'
   
       },
      buttonText:{
        fontSize:20,
        alignSelf:'center',
        color:'white',
        fontWeight:'600',
        paddingVertical:10
      },
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        
      },
      modalView: {
      
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '90%',
        height: HEIGHT * 0.6,
    
        alignSelf:'center'
      },
    
  
  })