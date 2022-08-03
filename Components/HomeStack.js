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
import { CheckOutStack } from './CheckOut';
import { SliderBox } from "react-native-image-slider-box";
import Slideshow from 'react-native-slideshow-improved';
import TimedSlideshow from 'react-native-timed-slideshow';
import InstaStory from 'react-native-insta-story';
import { LinearGradient } from 'expo-linear-gradient';
import { DiscoverStack } from './Discover';
import CheckOut from './CheckOut'
import FinalCheckOut from './FinalCheckOut';
import HomePage from './HomePage';
import { FavoritesStack } from './Favorites';
import { useSelector, useDispatch } from 'react-redux';
import { setClicked, setSearchClicked,setFilter,setTab,setArrow,setImages,setUser,setNumberOfCartItems,setAuthenticaed,setIndexEdit, setProductName,setPriceEdit,setDuplicatedIndex,setChangeAddress,setSelectedAddress,setReviewAdded } from '../redux/actions';
const Tab = createBottomTabNavigator();

const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width

export const HomeStack = () => {
    const {click,cat,c,filter,tab,product,arrow,images,user,cart} = useSelector(state => state.userReducer)
    const dispatch = useDispatch()

    return(
        <Tab.Navigator
        screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle:{borderTopColor:'transparent'},
        }}
        >
            <Tab.Screen name='Home' component={HomePage} options={{
                tabBarIcon : ({color,size,focused}) => (
                    <Ionicons name='home-outline' size={24} />
                ),
                headerShown:false
            }}/>
            <Tab.Screen name='Discover' component={DiscoverStack} options={{
                tabBarIcon : ({color,size,focused}) => (
                    <Ionicons name='compass-outline' size={28} />
                ),
                headerShown:false
            }}/>
            <Tab.Screen
            name='Check Out' component={CheckOutStack} options={{
                tabBarIcon : ({color,size,focused}) => (
            

                    <TouchableOpacity onPress={() => {
                        dispatch(setAuthenticaed(true))
                       }} >
                    <Ionicons name='cart-outline' size={28} />
               </TouchableOpacity>
              
                ),
                headerShown:false,
              tabBarBadge:cart
            }}
            />
            <Tab.Screen name='Favorites' component={Favorites} options={{
                tabBarIcon : ({color,size,focused}) => (
                    <Ionicons name='heart-outline' size={28} />
                ),
                headerShown:false
            }} />
            <Tab.Screen name='Profile' component={Profile}  options={{
                tabBarIcon : ({color,size,focused}) => (
                    
      <Feather name='user' size={28} />
                  
            
                ),
                headerShown:false
            }}/>
        </Tab.Navigator>
    )
}