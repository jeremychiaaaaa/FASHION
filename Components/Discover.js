import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect,useRef,useContext} from 'react'
import { StyleSheet,Button,Keyboard, Text, View,SafeAreaView,Dimensions,Image,TouchableOpacity,ScrollView,FlatList, Alert, Modal,TextInput,  } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import InstaStory from 'react-native-insta-story';

import SearchPage from './SearchPage';
import Entypo from 'react-native-vector-icons/Entypo'
import { useSelector, useDispatch } from 'react-redux';
import { setClicked, setSearchClicked,setFilter,setTab,setArrow,setImages,setUser,setNumberOfCartItems,setAuthenticaed,setDuplicatedIndex } from './redux/actions';
import AllProducts from './AllProducts';
import ProductScreen from './ProductScreen';
import SizeGuide from './SizeGuide';
const Tab = createBottomTabNavigator();

const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width
const Stack = createNativeStackNavigator()


export default function Discover(){
    const [searchPhrase, setSearchPhrase] = useState("");
    console.log(click)
    const nav = useNavigation()
const dataa = [
    {
        user_id: 1,
        user_image: 'https://images.unsplash.com/photo-1542731764-7d0f5660b7e1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80',
        user_name: "Summer Collection",
        stories: [
            {
                story_id: 1,
                story_image: "https://images.unsplash.com/photo-1542731764-7d0f5660b7e1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
               
                onPress: () => {
                    dispatch(setImages("https://images.unsplash.com/photo-1542731764-7d0f5660b7e1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"))
                    nav.navigate('Product')},
                     
            },
            {
                story_id: 2,
                story_image: "https://images.unsplash.com/photo-1563993297290-609c9406efcd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                onPress: () => {
                    dispatch(setImages("https://images.unsplash.com/photo-1563993297290-609c9406efcd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"))
                    nav.navigate('Product')},
            },
            {
                story_id: 3,
                story_image: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
           
                onPress: () => nav.navigate('LAnding'),
            },
            {
                story_id: 4,
                story_image: "https://images.unsplash.com/photo-1527736947477-2790e28f3443?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=762&q=80",
                onPress: () => nav.navigate('LAnding'),
            }
        
        ]
    },
    {
        user_id: 2,
        user_image: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        user_name: "Spring Collection",
        stories: [
            {
                story_id: 1,
                story_image: "https://images.unsplash.com/photo-1593409981958-562665d407cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                
                onPress: () => nav.navigate('LAnding'),
            },
            {
                story_id: 2,
                story_image: "https://images.unsplash.com/photo-1495385794356-15371f348c31?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=670&q=80",
             
                onPress: () => nav.navigate('LAnding'),
            },
            {
                story_id: 3,
                story_image: "https://images.unsplash.com/photo-1485231183945-fffde7cc051e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
             
                onPress: () => nav.navigate('LAnding'),
            },
            {
                story_id: 4,
                story_image: "https://images.unsplash.com/photo-1495385794356-15371f348c31?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=670&q=80",
                
                onPress: () => nav.navigate('LAnding'),
            }
        ]
    },
    {
        user_id: 3,
        user_image: 'https://images.unsplash.com/photo-1527736947477-2790e28f3443?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=762&q=80',
        user_name: "BSKA Collab",
        stories: [
            {
                story_id: 1,
                story_image: "https://images.unsplash.com/photo-1593409981958-562665d407cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                onPress: () => nav.navigate('LAnding'),
            },
            {
                story_id: 2,
                story_image: "https://images.unsplash.com/photo-1495385794356-15371f348c31?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=670&q=80",
              
                onPress: () => nav.navigate('LAnding'),
            },
            {
                story_id: 3,
                story_image: "https://images.unsplash.com/photo-1485231183945-fffde7cc051e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
             
                onPress: () => nav.navigate('LAnding'),
            },
            {
                story_id: 4,
                story_image: "https://images.unsplash.com/photo-1495385794356-15371f348c31?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=670&q=80",
                onPress: () => nav.navigate('LAnding'),
            }]
    },
    {
        user_id: 4,
        user_image: 'https://images.unsplash.com/photo-1560727749-cc261b23794c?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687',
        user_name: "Autumn",
        stories: [
            {
                story_id: 1,
                story_image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687",
                onPress: () => nav.navigate('LAnding'),
            },
            {
                story_id: 2,
                story_image: "https://images.unsplash.com/photo-1504439904031-93ded9f93e4e?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736",
              
                onPress: () => nav.navigate('LAnding'),
            },
            {
                story_id: 3,
                story_image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470",
              
                onPress: () => nav.navigate('LAnding'),
            },
            {
                story_id: 4,
                story_image: "https://images.unsplash.com/photo-1621086893822-ca4d5a70bf36?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765",
              
                onPress: () => nav.navigate('LAnding'),
            },

        
        
        ]
    },
    {
        user_id: 5  ,
        user_image: 'https://images.unsplash.com/photo-1572804013427-4d7ca7268217?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765',
        user_name: "Collection I",
        stories: [
            {
                story_id: 1,
                story_image: "https://images.unsplash.com/photo-1503342394128-c104d54dba01?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687",
                onPress: () => nav.navigate('LAnding'),
            },
            {
                story_id: 2,
                story_image: "https://images.unsplash.com/photo-1512413316925-fd4b93f31521?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687",
              
                onPress: () => nav.navigate('LAnding'),
            },
            {
                story_id: 3,
                story_image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470",
              
                onPress: () => nav.navigate('LAnding'),
            },
            {
                story_id: 4,
                story_image: "https://images.unsplash.com/photo-1621086893822-ca4d5a70bf36?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765",
              
                onPress: () => nav.navigate('LAnding'),
            },

        
        
        ]
    },
    {
        user_id: 6  ,
        user_image: 'https://images.unsplash.com/photo-1517805686688-47dd930554b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80',
        user_name: "Collection II",
        stories: [
            {
                story_id: 1,
                story_image: "https://images.unsplash.com/photo-1503342394128-c104d54dba01?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687",
                onPress: () => nav.navigate('LAnding'),
            },
            {
                story_id: 2,
                story_image: "https://images.unsplash.com/photo-1512413316925-fd4b93f31521?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687",
              
                onPress: () => nav.navigate('LAnding'),
            },
            {
                story_id: 3,
                story_image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470",
              
                onPress: () => nav.navigate('LAnding'),
            },
            {
                story_id: 4,
                story_image: "https://images.unsplash.com/photo-1621086893822-ca4d5a70bf36?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765",
              
                onPress: () => nav.navigate('LAnding'),
            },

        
        
        ]
    },
];
const {click} = useSelector(state => state.userReducer)
const dispatch = useDispatch()
    return(
        <SafeAreaView style={{backgroundColor:'white',flex:1}}>
           <ScrollView 
           
           >
            <SearchBar
  searchPhrase={searchPhrase}
  setSearchPhrase={setSearchPhrase}
click={click}

/>
        
        <View style={{width:WIDTH,alignContent:'space-around',}}>
        <Text style={{marginTop:20, fontSize:26, fontWeight:'600', marginLeft:20}}>
           Take A Quick Peek 👀
        </Text>
    <InstaStory data={dataa}
        duration={3}
        onStart={item => console.log(item)}
        onClose={() => {
            return(
                       <View style={{width:WIDTH, height:HEIGHT*0.5, backgroundColor:'white', zIndex:10,justifyContent:'center'}}>
        <Text>Hello</Text>
    </View>
            )
        }}
    unPressedBorderColor={'green'}
    avatarSize={80}
        style={{marginTop: 10, width:WIDTH, justifyContent:'center',marginLeft:5,resizeMode:'contain'}}
        avatarTextStyle={{fontSize:18, marginTop:5}}
   swipeToClose={false}
     customSwipeUpComponent={
         <View style={{width:WIDTH, height:50,  zIndex:10,justifyContent:'center', alignSelf:'center', marginBottom:40}}>
             <Ionicons name='chevron-up-outline' size={52} style={{alignSelf:'center', color:'white'}}/>
             <Text style={{alignSelf:'center', fontSize:28, fontWeight:'500', color:'black', borderWidth:1, borderRadius:15, padding:10, backgroundColor:'white',overflow:'hidden', borderColor:'transparent'}} >View More</Text>
             </View>
     }

        />

 </View>


      
        <TouchableOpacity style={{ flexDirection:'row', alignItems:'center', marginTop:20,  marginHorizontal:10, backgroundColor:'rgba(220,220,220,0.3)', borderWidth:1,paddingBottom:10,height:HEIGHT*0.15,borderColor:'transparent',zIndex:10}}>
    
            <Text style={{ fontSize:20, fontWeight:'700',textTransform:'uppercase', marginLeft:10,left:0}}>NEW IN</Text>
       
    <Image source={require('./photo1652966477.png')} style={{width:'30%', height:'100%', position:'absolute',right:0, transform:[{scale:1.1}]}} />
    </TouchableOpacity>
    <TouchableOpacity style={{ flexDirection:'row', alignItems:'center', marginTop:20,  marginHorizontal:10, backgroundColor:'rgba(220,220,220,0.3)', borderWidth:1,paddingBottom:10,height:HEIGHT*0.15,borderColor:'transparent',zIndex:10}}>
    
    <Text style={{ fontSize:20, fontWeight:'700',textTransform:'uppercase', marginLeft:10,left:0}}>Collections</Text>

<Image source={require('./photo1652968228.png')} style={{width:'30%', height:'100%', position:'absolute',right:0, transform:[{scale:1.1}]}} />
</TouchableOpacity>
<TouchableOpacity style={{ flexDirection:'row', alignItems:'center', marginTop:20,  marginHorizontal:10, backgroundColor:'rgba(220,220,220,0.3)', borderWidth:1,paddingBottom:10,height:HEIGHT*0.15,borderColor:'transparent',zIndex:10}}>
    
    <Text style={{ fontSize:20, fontWeight:'700',textTransform:'uppercase', marginLeft:10,left:0}}>Clothing</Text>

<Image source={require('./photo1652968146.png')} style={{width:'30%', height:'100%', position:'absolute',right:0, transform:[{scale:1.1}], }} />
</TouchableOpacity>
<TouchableOpacity style={{ flexDirection:'row', alignItems:'center', marginTop:20,  marginHorizontal:10, backgroundColor:'rgba(220,220,220,0.3)', borderWidth:1,paddingBottom:10,height:HEIGHT*0.15,borderColor:'transparent',zIndex:10}}>
    
    <Text style={{ fontSize:20, fontWeight:'700',textTransform:'uppercase', marginLeft:10,left:0}}>Sale Items</Text>

<Image source={require('./123.png')} style={{width:'30%', height:'100%', position:'absolute',right:0, transform:[{scale:1.1}],resizeMode:'contain'}} />
</TouchableOpacity>
<TouchableOpacity style={{ flexDirection:'row', alignItems:'center', marginTop:20,  marginHorizontal:10, backgroundColor:'rgba(220,220,220,0.3)', borderWidth:1,paddingBottom:10,height:HEIGHT*0.15,borderColor:'transparent',zIndex:10}}>
    
    <Text style={{ fontSize:20, fontWeight:'700',textTransform:'uppercase', marginLeft:10,left:0}}>Dresses</Text>

<Image source={require('./photo1652966591.png')} style={{width:'30%', height:'100%', position:'absolute',right:0, transform:[{scale:1.1}]}} />
</TouchableOpacity>
</ScrollView>
 </SafeAreaView>
    )
}
const Item = ({title, image}) => {
    return(
        <View style={{}}>
   <Image style={{ position:'absolute',right:0, width:'30%', height:'100%',resizeMode:'contain', }} />
      
        <TouchableOpacity style={{ flexDirection:'row', alignItems:'center', marginTop:20,  marginHorizontal:10, backgroundColor:'rgba(220,220,220,0.1)', borderWidth:1,paddingBottom:10,height:HEIGHT*0.15,borderColor:'transparent',zIndex:10}}>
    
            <Text style={{ fontSize:20, fontWeight:'700',textTransform:'uppercase', marginLeft:10,left:0}}>{title}</Text>
       
   
    </TouchableOpacity>
     
      </View>
    )
}
const renderCategory = ({item}) => {
    return(
        <Item title={item.title} image={item.image}/>
    )
}
const categories = [{
    id:"1",
    title:"New In",
    image: "./photo1652966477.png"
},
{
    id:"2",
    title:"Collections",
    image: "https://images.unsplash.com/photo-1592343665462-d29006cf2447?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
},
{
    id:"3",
    title:"Sale Items",
    image: "https://images.unsplash.com/photo-1583846717393-dc2412c95ed7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
},
{
    id:"4",
    title:"Clothing",
    image: "https://c4.wallpaperflare.com/wallpaper/962/469/83/lucy-pinder-model-brunette-wallpaper-preview.jpg"
},

{
    id:"5",
    title:"Dresses",
    image: "https://images.unsplash.com/photo-1515734674582-29010bb37906?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
},
{
    id:"6",
    title:"SportsWear",
    image: "https://images.unsplash.com/photo-1516726817505-f5ed825624d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
},
{
    id:"7",
    title:"Accessories",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZWLT1p9RqWzpWp-ndbhXTbRCFrAOVbHaYFg&usqp=CAU"
},


]
const SearchBar = (props) => {
    const {click,cat} = useSelector(state => state.userReducer)
const dispatch = useDispatch()
const nav = useNavigation()
    return(
        <View style={styles.container}>
            <View
            style={!props.click ? styles.notclick : styles.click}
            >
                 <Feather
                 name="search"
                 size={20}

                 style={{ marginLeft: 2,  }}
                
                
                />
                <TextInput 
                style={styles.input}
                placeholder='Search'
                value={props.searchPhrase}
                onChangeText={props.setSearchPhrase}
                onFocus={() => {
                    dispatch(setSearchClicked(true))
                    nav.navigate('Search')
                }}
                placeholderTextColor='black'
                />
                 <Feather
                 name="camera"
                 size={24}
              
                 style={{ marginLeft: 0,  position:'absolute', right:10 }}
                
                
                />
             </View>
        </View>
    )
}
export const DiscoverStack = () => {
    const nav = useNavigation()
    const {click,cat,filter} = useSelector(state => state.userReducer)
    const dispatch = useDispatch()
    return(
        <Stack.Navigator>
            <Stack.Screen name = 'Discover' component={Discover} options={{
                headerShown:false
            }} />
            <Stack.Screen name='Search' component={SearchPage} options={{
                headerShown:false,
               headerStyle:{
                height:120,
                backgroundColor:'white',
          
              },
                   headerBackTitleVisible:false,
                  headerBackImage: () => <Ionicons name='chevron-back-outline' size={32} color={'black'} onPress={() => dispatch(setSearchClicked(!click))}/>,
            }}/>
            <Stack.Screen name = {`${cat} page`} options={{
             headerBackTitleVisible:false,
                
                headerLeft: () => (<Ionicons name='arrow-back-outline' size={32} color={'black'} style={{position:'absolute'}} onPress={() => nav.navigate('Search')}  />),
                headerTitle:`${cat}`.toUpperCase(),
                headerTitleStyle:{
                    textTransform:'uppercase'
                },
                headerRight: () => (<Ionicons name='filter-outline' size={32} color={'black'} style={{position:'absolute',marginRight:20}} onPress={() => dispatch(setFilter(true))} />)
                
            }}  component={AllProducts} />
            <Stack.Screen name='Product Details' component={ProductScreen} options={{
                headerShown:false
            }} />
            <Stack.Screen name='Size Guide' component = {SizeGuide} 
            options={{
                headerLeft: () => (<Ionicons name='arrow-back-outline' size={32} color={'black'} style={{position:'absolute'}} onPress={() => nav.navigate('Product Details')}  />),
            }}
            
            />
        </Stack.Navigator>
    )
}
const styles = StyleSheet.create({
    div : {
        flex:1,
     
      
    },
    content: {
        marginVertical: 20,
        borderWidth:3,
        borderRadius:6,
        fontSize:18,
      
        padding:30,
      
        
    },
  
    header:{
      
      
       
   alignContent:'center',
       textAlign:'center',
        width:'100%',
        height: 220,
        borderBottomColor:'#F5F5F5',
        borderBottomWidth:1,
        alignSelf:'center',
        justifyContent:'center'
       
    },
    body:{
        flex:1,
    
       

 
      
    },
    bodyHeader:{
        
       fontSize:26,
    
       justifyContent:'flex-end',

        alignItems:'center',
        
        color:'white',
        fontWeight:'600',
alignSelf:'center',
marginRight:20,
    },
categoryContainer:{
    flex:1,
    flexDirection:'row',
    width:'90%',
    alignSelf:'center',
    marginTop:125,

},
categoryIcon:{
    borderWidth:0,
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center',
    width:70,
    height:70,
    backgroundColor:'#fdeae7',
    borderRadius:50
},
CategoryBtn:{
    flex:1,
    width:'30%',
    marginHorizontal:0,
    alignItems:'center'
},
btnText:{
    marginTop:5,
    color:'#de4f35',
    alignSelf:'center'
},
doctor:{
    flex:1,
    width:'90%',
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    top:'60%',
    left:'5%'

},
doctorBtn:{
    borderWidth:1,
    width:'100%',
    height:80,
    borderRadius:15,
    flexDirection:'row',
    shadowColor:'#999',
    shadowOffset:{width:0, height:1},
    shadowOpacity:0.8,
    shadowRadius:2,
    elevation:5,
    marginVertical:10,
  alignContent:'center'
},
container: {
    margin: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "95%",

   top:10,

  },
  notclick: {
    padding: 5,
    flexDirection: "row",
    width: '100%',
    backgroundColor: "rgba(220,220,220,0.8)",
    borderRadius: 5,
    alignItems: "center",

  },
  click: {
    padding: 10,
    flexDirection: "row",
    width: "100%",
    backgroundColor:  "rgba(220,220,220,0.2)",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
    paddingVertical:10,


},

})