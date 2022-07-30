import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect,useRef} from 'react'
import { StyleSheet, Text,Switch, View,SafeAreaView,Dimensions,Image,TouchableOpacity,ScrollView,FlatList, Alert, Modal, ImageStore,TouchableHighlight,TextInput } from 'react-native';
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
import { setClicked, setSearchClicked,setFilter,setTab,setArrow,setImages,setUser,setNumberOfCartItems,setAuthenticaed,setIndexEdit, setProductName,setPriceEdit,setDuplicatedIndex } from './redux/actions';
import { BlurView } from 'expo-blur';
import LottieView from 'lottie-react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import ReadMore from '@fawazahmed/react-native-read-more';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import HorizontalBarGraph from '@chartiful/react-native-horizontal-bar-graph'
import firebase, { createUserDocument,createCart,getCartItems,updateCartItem,deleteCartItem,createShipping } from './firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import {doc, setDoc, addDoc, getFirestore, collection} from 'firebase/firestore'
import CounterInput from "react-native-counter-input";
import ModalDropdown from 'react-native-modal-dropdown';
import CountryPicker, {CountryModalProvider} from 'react-native-country-picker-modal'
import Counter from "react-native-counters";
import { Formik,useFormikContext } from 'formik'
import * as Yup from 'yup';
const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const ReviewSchema = Yup.object().shape({
 
    firstName: Yup.string().required('This is a required field'),
    lastName: Yup.string().required('This is a required field'),
    address1: Yup.string().required('Please add your address line 1'),
    city:Yup.string().required('Please add your city'),
    postal: Yup.string().required('Please add your postal code'),
    phone:Yup.string().matches(phoneRegExp, 'Please add a valid phone number')
    })
export default function ShippingAddress({navigation}){
    const {click,cat,c,filter,tab,product,arrow,images,user,cart,yes,edit,price,duplicate} = useSelector(state => state.userReducer)
    const nav = useNavigation()
    const dispatch = useDispatch()
    const[selectedDate, setSelectedDate] = useState(new Date())
    const[clicked,setClicked] = useState(false)
    const [isEnabled,setIsEnabled] = useState(true)
    const[openDate,setOpenDate] = useState(false)
    const [mode,setMode] = useState('date')
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
        const dateChange = (event,date) => {
       const select = date
            setSelectedDate(select)
        
          
        }
        const switchClicked = () => setOpenDate(true)

        const[visibile,setVisible] = useState(false)
        const [stateCountry, setStateCountry] = useState('')
        const[withModal, setwithModal] = useState(false)
        const[withAlphaFilter, setWithAlphaFilter] = useState(false)
        const [fontScaling, setFontScaling] = useState(true)
        const [disableNativeModal, setDisableNativeModal] = useState(false)
        const[initial, setInitial] = useState(
          {  country:{
                cca2:'US',
                
            }}
        )
        const[withCountryNameButton, setWithCountryNameButton] = useState(true)
        const onSelect = (stateCountry) => {
            setStateCountry(stateCountry)
        
            
   
        }

        const switchVisible = () =>  setVisible(true)
    const[withFilter, setWithFilter] = useState(true)

      const[withFlag,setWithFlag] = useState(true)
    const onCreateAddress = async (firstName,lastName, destination, address1,address2, address3, city, postal, phone) => {
       
        try {
        let a = {firstName,lastName, destination, address1,address2, address3, city, postal, phone}
        let shipping = []
        shipping.push(a)
        await createShipping(user, {shipping})
        dispatch(setAuthenticaed(true))
     
        } catch (error) {
            Alert.alert('Hello', error.message)
        }
    }
    return(
        <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
<ScrollView>
<View style={{flexDirection:'row', alignItems:'center',justifyContent:'center',marginTop:10}}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{position:'absolute', left:0, marginLeft:10}}>
 <Ionicons name='arrow-back-outline' size={28}  />
                </TouchableOpacity>
               
 <Text style={{alignSelf:'center', fontWeight:'600', fontSize:22}}>Shipping Address</Text>
            </View>
<Formik 
        initialValues={{firstName: '', lastName:'', destination:'Singapore', address1:'',address2:'',address3:'', city:'', postal:'',phone:''}} //these are basically like the usestate hooks 
       validationSchema = {ReviewSchema}
        onSubmit={(values) => {
         console.log('hi')
   
            onCreateAddress(values.firstName, values.lastName, values.destination, values.address1, values.address2, values.address3, values.city, values.postal, values.phone)
   navigation.goBack()
        }}
        >
            {(props) => ( //this here is some props that are provided to us by formik such as onChange functions / access to values /submission handler
            <View style={{marginTop:10, marginHorizontal:10 }}>
                    
                 
                 <View style={{marginTop:10}}>
                     <Text style={{fontWeight:'600',fontSize:18 }}>First Name</Text>
                       <View style={{flexDirection:'row', borderBottomColor:'lightgrey', borderBottomWidth:1,paddingBottom:5,marginTop:15, alignItems:'center', }}>
                     
                 <TextInput 
                placeholder='First Name'
                style={styles.content}
                placeholderTextColor='grey'
                onChangeText={props.handleChange('firstName')} //this props.handlechange will take in the state value that we want to update
                value={props.values.firstName} 
                />    
           {props.values.firstName !== '' ? props.errors.firstName  ? <Ionicons name='alert-circle-outline' size={32} style={{color:'red', position:'absolute', right:0, marginRight:10, paddingBottom:5}}/> : <Ionicons name='checkmark-circle-outline' size={32} style={{color:'green', position:'absolute', right:0, marginRight:10, paddingBottom:5}} /> : <View />}  
                </View>
                <Text style={{fontSize:14}}>{props.errors.firstName}</Text>
                 </View>
                
                 <View style={{marginTop:20}}>
                     <Text style={{fontWeight:'600', fontSize:18 }}>Last Name</Text>
                       <View style={{flexDirection:'row', borderBottomColor:'lightgrey', borderBottomWidth:1,paddingBottom:5,marginTop:15, alignItems:'center', }}>
                     
                 <TextInput 
                placeholder='Last Name'
                style={styles.content}
                placeholderTextColor='grey'
                
                onChangeText={props.handleChange('lastName')} //this props.handlechange will take in the state value that we want to update
                value={props.values.lastName} 
                
                />    
               {props.values.lastName !== '' ? props.errors.lastName  ? <Ionicons name='alert-circle-outline' size={32} style={{color:'red', position:'absolute', right:0, marginRight:10, paddingBottom:5}}/> : <Ionicons name='checkmark-circle-outline' size={32} style={{color:'green', position:'absolute', right:0, marginRight:10, paddingBottom:5}} /> : <View />}  
                </View>
             
                   <Text style={{fontSize:14, color:'red', marginTop:5}}>{props.errors.lastName}</Text>  
                     </View>
                     <View style={{marginTop:20}}>
                     <Text style={{fontWeight:'600', fontSize:18 }}>Destination</Text>
                           <TouchableOpacity onPress={switchVisible} style={{flexDirection:'row', borderBottomColor:'lightgrey', borderBottomWidth:1,paddingBottom:5,marginTop:15, alignItems:'center', }}>

         <TextInput 
                    placeholder='Singapore'
               
                    value={stateCountry !== '' ? stateCountry.name : ''}
                  onChange={country => {
           
                  
                    onSelect(country)
                  
                  props.setFieldValue('destination', stateCountry.name)
                  
                  }}
         pointerEvents='none'
                  style={{fontSize:18, fontWeight:'300'}}
                  placeholderTextColor='black'
                  selectTextOnFocus={false}
                    />
                    <Ionicons name='chevron-down-outline' size={32} color={'lightgrey'} style={{position:'absolute', right:0, marginRight:5}}/>

</TouchableOpacity>
  
{visibile && (
                <CountryPicker 
                  {...{
                      allowFontScaling:fontScaling,
                      withFilter,
                      onSelect,
                    placeholder:'',
                   
                      preferredCountries:['SG', ],
                      disableNativeModal,
                      withAlphaFilter,
                      
                      
                      
                      withFlag,
                      onClose: () => setVisible(false),
                      onOpen: () => setVisible(true),
               
                  }}
                visible
                  />   
        )} 
                     </View>
                   







                   <View style={{marginTop:20}}>
                    
                       <View style={{flexDirection:'row', borderBottomColor:'lightgrey', borderBottomWidth:1,paddingBottom:5,marginTop:15, alignItems:'center', }}>
                     
                 <TextInput 
                placeholder='Address Line 1'
                style={styles.content}
                placeholderTextColor='grey'
                onChangeText={props.handleChange('address1')} //this props.handlechange will take in the state value that we want to update
                value={props.values.address1} 
                />    
             {props.values.address1 !== '' ? props.errors.address1  ? <Ionicons name='alert-circle-outline' size={32} style={{color:'red', position:'absolute', right:0, marginRight:10, paddingBottom:5}}/> : <Ionicons name='checkmark-circle-outline' size={32} style={{color:'green', position:'absolute', right:0, marginRight:10, paddingBottom:5}} /> : <View />}  
                </View>
                <Text style={{fontSize:14, color:'red', marginTop:5}}>{props.errors.address1}</Text>
                 </View>
                 <View style={{marginTop:20}}>
                    
                    <View style={{flexDirection:'row', borderBottomColor:'lightgrey', borderBottomWidth:1,paddingBottom:5,marginTop:15, alignItems:'center', }}>
                  
              <TextInput 
             placeholder='Address Line 2 (optional)'
             style={styles.content}
             placeholderTextColor='grey'
             onChangeText={props.handleChange('address2')} //this props.handlechange will take in the state value that we want to update
             value={props.values.address2} 
             />    
           {props.values.address2 !== '' &&  <Ionicons name='checkmark-circle-outline' size={32} style={{color:'green', position:'absolute', right:0, marginRight:10, paddingBottom:5}} />}  
             </View>
             <Text style={{fontSize:14, color:'red', marginTop:5}}>{props.errors.address2}</Text>
              </View>
              <View style={{marginTop:20}}>
                    
                    <View style={{flexDirection:'row', borderBottomColor:'lightgrey', borderBottomWidth:1,paddingBottom:5,marginTop:15, alignItems:'center', }}>
                  
              <TextInput 
             placeholder='Address Line 3 (optional)'
             style={styles.content}
             placeholderTextColor='grey'
             onChangeText={props.handleChange('address3')} //this props.handlechange will take in the state value that we want to update
             value={props.values.address3} 
             />    
           {props.values.address3 !== '' &&  <Ionicons name='checkmark-circle-outline' size={32} style={{color:'green', position:'absolute', right:0, marginRight:10, paddingBottom:5}} />}  
             </View>
             <Text style={{fontSize:14, color:'red', marginTop:5}}>{props.errors.address3}</Text>
              </View>
              <View style={{marginTop:20}}>
                    
                    <View style={{flexDirection:'row', borderBottomColor:'lightgrey', borderBottomWidth:1,paddingBottom:5,marginTop:15, alignItems:'center', }}>
                  
              <TextInput 
             placeholder='City'
             style={styles.content}
             placeholderTextColor='grey'
             onChangeText={props.handleChange('city')} //this props.handlechange will take in the state value that we want to update
             value={props.values.city} 
             />    
           {props.values.city !== '' ? props.errors.city  ? <Ionicons name='alert-circle-outline' size={32} style={{color:'red', position:'absolute', right:0, marginRight:10, paddingBottom:5}}/> : <Ionicons name='checkmark-circle-outline' size={32} style={{color:'green', position:'absolute', right:0, marginRight:10, paddingBottom:5}} /> : <View />}  
             </View>
             <Text style={{fontSize:14, color:'red', marginTop:5}}>{props.errors.city}</Text>
              </View>
              <View style={{marginTop:20}}>
                    
                    <View style={{flexDirection:'row', borderBottomColor:'lightgrey', borderBottomWidth:1,paddingBottom:5,marginTop:15, alignItems:'center', }}>
                  
              <TextInput 
             placeholder='Postal'
             style={styles.content}
             placeholderTextColor='grey'
             onChangeText={props.handleChange('postal')} //this props.handlechange will take in the state value that we want to update
             value={props.values.postal} 
             />    
   {props.values.postal !== '' ? props.errors.postal  ? <Ionicons name='alert-circle-outline' size={32} style={{color:'red', position:'absolute', right:0, marginRight:10, paddingBottom:5}}/> : <Ionicons name='checkmark-circle-outline' size={32} style={{color:'green', position:'absolute', right:0, marginRight:10, paddingBottom:5}} /> : <View />}  
             </View>
             <Text style={{fontSize:14, color:'red', marginTop:5}}>{props.errors.postal}</Text>
              </View>
              <View style={{marginTop:20}}>
                    
                    <View style={{flexDirection:'row', borderBottomColor:'lightgrey', borderBottomWidth:1,paddingBottom:5,marginTop:15, alignItems:'center', }}>
                  
              <TextInput 
             placeholder='Phone'
             style={styles.content}
             placeholderTextColor='grey'
             onChangeText={props.handleChange('phone')} //this props.handlechange will take in the state value that we want to update
             value={props.values.phone} 
             />    
           {props.values.phone !== '' ? props.errors.phone  ? <Ionicons name='alert-circle-outline' size={32} style={{color:'red', position:'absolute', right:0, marginRight:10, paddingBottom:5}}/> : <Ionicons name='checkmark-circle-outline' size={32} style={{color:'green', position:'absolute', right:0, marginRight:10, paddingBottom:5}} /> : <View />}  
             </View>
             <Text style={{fontSize:14, color:'red', marginTop:5}}>{props.errors.phone}</Text>
              </View>
              
                    <View style={{flexDirection:'row', borderBottomColor:'lightgrey', borderBottomWidth:1,paddingBottom:10, alignItems:'center',marginTop:10 }}>
                <Text style={{fontWeight:'500',fontSize:18,}}>Use as billing address</Text>
                <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
        style={{position:'absolute', right:0, marginRight:10,bottom:10}}
      />
              </View>
               <View>

                  <TouchableOpacity style={{width:WIDTH*0.85, alignSelf:'center', backgroundColor:'black', borderWidth:1, borderColor:'transparent', borderRadius:10, marginTop:15}}
                  onPress={props.handleSubmit}
                  >
                    <Text style={{alignSelf:'center', paddingVertical:10, color:'white',fontWeight:'600'}}>Add Address</Text>
                  </TouchableOpacity>


               </View>
     
            </View>
            )}
    
     </Formik>
</ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    div : {
        flex:1,
        justifyContent: 'center',
    backgroundColor:'white'
    },
    icons:{
       
        flexDirection:'row',
        
        position:'absolute',
        left:'84%',
        
        fontSize:32,
       
    },


    content: {
      
     
       
        fontSize:17,
      
        
        color:'black',
      
        fontWeight:'200',

        width:'100%'
        
    },
    welcome: {
       alignSelf: 'center',
    
        color:'white',
        fontSize:20,
        fontWeight: '600'
    }
})