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
import { useSelector, useDispatch } from 'react-redux';
import { setClicked, setSearchClicked,setFilter,setTab,setArrow,setImages } from '../redux/actions';
import { LinearGradient } from 'expo-linear-gradient';
import { DiscoverStack } from './Discover';
import { DataTable } from 'react-native-paper';
const Tab = createBottomTabNavigator();

const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width
export default function SizeGuide({navigation}){
    const {click,cat,c,filter,tab,product,arrow,images} = useSelector(state => state.userReducer)
    const nav = useNavigation()
    const dispatch = useDispatch()
    console.log(product)
    return(
        <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
          <ScrollView>
          <Ionicons name='arrow-back-outline' size={32} color={'black'} style={{left:0,fontWeight:'800', backgroundColor:'white', marginTop:10, marginLeft:10}} onPress={() =>    navigation.goBack()}  />
    <Ionicons name='share-outline' size={28} color={'black'} style={{position:'absolute',right:0,fontWeight:'800', backgroundColor:'white', marginTop:10, marginRight:5}}  />
        
            <View style={{marginLeft:15,marginVertical:10, flexDirection:'row',alignItems:'center',marginTop:10}}>
                 <Image source={{uri:images[0]}} style={{width:WIDTH*0.32, height:HEIGHT*0.3, }}  />
                <View style={{marginLeft:15}}>
                    <Text style={{fontWeight:'600', fontSize:18}}>JA AMBER</Text>
                    <Text style={{marginTop:5, fontWeight:'300', fontSize:16}} numberOfLines={2}>{product}</Text>
                </View>
            
            </View>
            <View>
            <DataTable style={{padding:15}}>
      <DataTable.Header  style={{backgroundColor:'black'}} >
        <DataTable.Title style={{color:'white'}} textStyle={{color:'white',fontSize:20,fontWeight:'600'}}>Size</DataTable.Title>
        <DataTable.Title style={{color:'white'}} textStyle={{color:'white',fontSize:20,fontWeight:'600'}}>Bust</DataTable.Title>
        <DataTable.Title style={{color:'white'}} textStyle={{color:'white',fontSize:20,fontWeight:'600'}}>Hip</DataTable.Title>
        <DataTable.Title style={{color:'white'}} textStyle={{color:'white',fontSize:20,fontWeight:'600'}}>Low Hip</DataTable.Title>
        <DataTable.Title style={{color:'white'}} textStyle={{color:'white',fontSize:20,fontWeight:'600'}}>Waist</DataTable.Title>

      </DataTable.Header>
      <DataTable.Row>
        <DataTable.Cell>UK 4</DataTable.Cell>
        <DataTable.Cell>31.1</DataTable.Cell>
        <DataTable.Cell>29.9</DataTable.Cell>
        <DataTable.Cell>33.1</DataTable.Cell>
        <DataTable.Cell>23.6</DataTable.Cell>
      </DataTable.Row>
  
      <DataTable.Row style={{backgroundColor:'lightgrey'}}>
      <DataTable.Cell>UK 6</DataTable.Cell>
        <DataTable.Cell>31.1</DataTable.Cell>
        <DataTable.Cell>29.9</DataTable.Cell>
        <DataTable.Cell>33.1</DataTable.Cell>
        <DataTable.Cell>23.6</DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
      <DataTable.Cell>UK 8</DataTable.Cell>
        <DataTable.Cell>31.1</DataTable.Cell>
        <DataTable.Cell>29.9</DataTable.Cell>
        <DataTable.Cell>33.1</DataTable.Cell>
        <DataTable.Cell>23.6</DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row style={{backgroundColor:'lightgrey'}}>
      <DataTable.Cell>UK 10</DataTable.Cell>
        <DataTable.Cell>31.1</DataTable.Cell>
        <DataTable.Cell>29.9</DataTable.Cell>
        <DataTable.Cell>33.1</DataTable.Cell>
        <DataTable.Cell>23.6</DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
      <DataTable.Cell>UK 12</DataTable.Cell>
        <DataTable.Cell>31.1</DataTable.Cell>
        <DataTable.Cell>29.9</DataTable.Cell>
        <DataTable.Cell>33.1</DataTable.Cell>
        <DataTable.Cell>23.6</DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row style={{backgroundColor:'lightgrey'}}>
      <DataTable.Cell>UK 14</DataTable.Cell>
        <DataTable.Cell>31.1</DataTable.Cell>
        <DataTable.Cell>29.9</DataTable.Cell>
        <DataTable.Cell>33.1</DataTable.Cell>
        <DataTable.Cell>23.6</DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
      <DataTable.Cell>UK 16</DataTable.Cell>
        <DataTable.Cell>31.1</DataTable.Cell>
        <DataTable.Cell>29.9</DataTable.Cell>
        <DataTable.Cell>33.1</DataTable.Cell>
        <DataTable.Cell>23.6</DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row style={{backgroundColor:'lightgrey'}}>
      <DataTable.Cell>UK 18</DataTable.Cell>
        <DataTable.Cell>31.1</DataTable.Cell>
        <DataTable.Cell>29.9</DataTable.Cell>
        <DataTable.Cell>33.1</DataTable.Cell>
        <DataTable.Cell>23.6</DataTable.Cell>
      </DataTable.Row>
    </DataTable>
            </View>
           <Text style={{marginLeft:15, fontSize:16,fontWeight:'300'}}>
             *Please note that this is a guide only.
           </Text>  
           <Text style={{marginLeft:15, fontSize:16,fontWeight:'300',marginTop:5,width:'90%'}} numberOfLines={2}>
             Measurements may vary according to brand and style.
           </Text>
           </ScrollView>
        </SafeAreaView>
    )
}