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


export const ProductReview = ({navigation,newReviews}) => {
    return (
        <>
            <View style={{}}>
             <View style={{flexDirection:'row', width:WIDTH*0.9,marginTop:20, height:HEIGHT*0.15, backgroundColor:'rgba(220,200,220,0.2)', borderWidth:1, borderRadius:10, borderColor:'transparent', alignItems:'center'}}>
                 <View style={{width:WIDTH*0.4}} >
                     <Text style={{marginLeft:5, fontSize:22, fontWeight:'600'}}>4.6 <Text style={{fontWeight:'300', fontSize:16,marginRight:5}}>/ 5</Text></Text>
                     <Text style={{marginLeft:5, marginTop:4, fontWeight:'300'}}>Based on <Text style={{fontSize:18}}>325</Text> reviews</Text>
                     <AirbnbRating
                     showRating={false}
           defaultRating={4}
            count ={5}
        isDisabled={true}
        size={20}
        unSelectedColor={'#BDC3C7'}
        starContainerStyle={{alignSelf:'flex-start' }}
        />
                     </View>
                <View>
               <View style={{flexDirection:'row', alignItems:'center'}}>
                   <Text>5 Star</Text>
                   <View style={{width:WIDTH*0.3, height:5, borderRadius:5,backgroundColor:'#f1c40f',marginLeft:10}} />
                   </View>
                   <View style={{flexDirection:'row', alignItems:'center'}}>
                   <Text>4 Star</Text>
                   <View style={{width:WIDTH*0.3, height:5, borderRadius:5,backgroundColor:'#BDC3C7',marginLeft:10}}>
                       <View style={{backgroundColor:'#f1c40f',zIndex:10, width:WIDTH*0.25, height:5, borderRadius:5,}}/>
                       </View>
                   </View>
                   <View style={{flexDirection:'row', alignItems:'center'}}>
                   <Text>3 Star</Text>
                   <View style={{width:WIDTH*0.3, height:5, borderRadius:5,backgroundColor:'#BDC3C7',marginLeft:10}}>
                       <View style={{backgroundColor:'#f1c40f',zIndex:10, width:WIDTH*0.15, height:5, borderRadius:5,}}/>
                       </View>
                   </View>
                   <View style={{flexDirection:'row', alignItems:'center'}}>
                   <Text>2 Star</Text>
                   <View style={{width:WIDTH*0.3, height:5, borderRadius:5,backgroundColor:'#BDC3C7',marginLeft:10}}>
                       <View style={{backgroundColor:'#f1c40f',zIndex:10, width:WIDTH*0.1, height:5, borderRadius:5,}}/>
                       </View>
                   </View>
                   <View style={{flexDirection:'row', alignItems:'center'}}>
                   <Text>1 Star</Text>
                   <View style={{width:WIDTH*0.3, height:5, borderRadius:5,backgroundColor:'#BDC3C7',marginLeft:10}}>
                       <View style={{backgroundColor:'#f1c40f',zIndex:10, width:WIDTH*0.05, height:5, borderRadius:5,}}/>
                       </View>
                   </View>
                    </View>
                 </View>
                <View>
                    <Text style={{marginVertical:10, fontWeight:'600',fontSize:18}}>User Reviews</Text>
                       

                    
                        {newReviews && newReviews.map((i,index) => 
                         <View style={{ borderWidth:1,marginVertical:15, borderColor:'transparent', borderRadius:10, backgroundColor:'rgba(220,220,220,0.3)', width:WIDTH*0.9,}}>
                         <View style={{ flexDirection:'row', alignItems:'center',marginTop:10,marginLeft:5}}>
                             <Image source={{uri:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170'}} style={{width:40, height:40,borderRadius:20}}/>
                             <Text style={{fontWeight:'600', marginLeft:10}}>Amanda Brooks</Text>
                             <Text style={{position:'absolute', right:0, marginRight:10}}>1 month ago</Text>
                             </View> 
                                <AirbnbRating
                          showRating={false}
                defaultRating={i.rating}
                 count ={5}
             isDisabled={true}
             size={20}
             unSelectedColor={'#BDC3C7'}
             starContainerStyle={{alignSelf:'flex-start',marginTop:5 }}
             />
               <Image source={{uri:i.image}} style={{width:50,height:50, borderWidth:1, borderColor:'transparent', borderRadius:5, }} />
             <Text style={{fontWeight:'700', fontSize:19,marginLeft:5}}>Wonderful</Text>
             <Text style={{marginTop:5, fontSize:14,marginLeft:5,paddingBottom:10}}>{i.text}</Text>
           
                             </View>
                        )}
                         {sampleReviewData.map((i,index) => (
                         <View style={{ borderWidth:1,marginVertical:15, borderColor:'transparent', borderRadius:10, backgroundColor:'rgba(220,220,220,0.3)', width:WIDTH*0.9,}}>
                         <View style={{ flexDirection:'row', alignItems:'center',marginTop:10,marginLeft:5}}>
                             <Image source={{uri:i.image}} style={{width:40, height:40,borderRadius:20}}/>
                             <Text style={{fontWeight:'600', marginLeft:10}}>{i.name}</Text>
                             <Text style={{position:'absolute', right:0, marginRight:10}}>{i.date}</Text>
                             </View> 
                                <AirbnbRating
                          showRating={false}
                defaultRating={4}
                 count ={5}
             isDisabled={true}
             size={20}
             unSelectedColor={'#BDC3C7'}
             starContainerStyle={{alignSelf:'flex-start',marginTop:5 }}
             />
             <Text style={{fontWeight:'700', fontSize:19,marginLeft:5}}>{i.header}</Text>
             <Text style={{marginTop:5, fontSize:14,marginLeft:5,paddingBottom:10}}>{i.description}</Text>
                             </View>
                      ))}
                        
                     
                    </View>
                    
                </View>
        </>
    )
}

const sampleReviewData = [
    {
        id:"1",
        date:"1 month ago",
        name:"Samantha Perry",
        header:"Wonderful",
        description:"This sweater is pretty great. I love the length and the fit and mostly I love how cozy it is. It keeps me warm, looks great and is soft and luxurious.",
        image:"https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688"
    },
    {
        id:"2",
        date:"1 month ago",
        name:"Amanda Brooks",
        header:"Wonderful",
        description:"This sweater is pretty great. I love the length and the fit and mostly I love how cozy it is. It keeps me warm, looks great and is soft and luxurious.",
        image:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170"
    },
    {
        id:"3",
        date:"2 months ago",
        name:"Sasha Brooks",
        header:"Wonderful",
        description:"This sweater is pretty great. I love the length and the fit and mostly I love how cozy it is. It keeps me warm, looks great and is soft and luxurious.",
        image:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170"
    },
    {
        id:"4",
        date:"4 months ago",
        name:"Peter Holland",
        header:"Wonderful",
        description:"This sweater is pretty great. I love the length and the fit and mostly I love how cozy it is. It keeps me warm, looks great and is soft and luxurious.",
        image:"https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687"
    },
    {
        id:"5",
        date:"6 months ago",
        name:"Arman Rokni",
        header:"Wonderful",
        description:"This sweater is pretty great. I love the length and the fit and mostly I love how cozy it is. It keeps me warm, looks great and is soft and luxurious.",
        image:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687"
    }
]