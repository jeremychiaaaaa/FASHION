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
import { FavoritesStack } from './Favorites';
import { useSelector, useDispatch } from 'react-redux';
import { setClicked, setSearchClicked,setFilter,setTab,setArrow,setImages,setUser,setNumberOfCartItems,setAuthenticaed,setIndexEdit, setProductName,setPriceEdit,setDuplicatedIndex,setChangeAddress,setSelectedAddress,setReviewAdded } from './redux/actions';
const Tab = createBottomTabNavigator();

const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width

const Item = ({image,title,price,id}) => {
    return(
        <View style={{}}>
        {id === "7" ? (
            <TouchableOpacity style={{width:WIDTH*0.45, height:HEIGHT*0.35,  justifyContent:'space-around',paddingBottom:20}} >
                <Text style={{justifyContent:'center', alignSelf:'center',fontSize:20, fontWeight:'600', }}>{title}</Text>
            </TouchableOpacity>
        ) : (
            <TouchableOpacity style={{width:WIDTH*0.45,height:HEIGHT*0.3540, marginTop:20,transform:[{translateX:15}]}}>
                <Image source={{uri:image}} style={{width:'90%', height:'75%'}}/>
               <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',width:'90%',alignContent:'space-between'}}>
                <Text style={{fontSize:20, fontWeight:'700',marginTop:10}}>${price}</Text>
                <Ionicons name='heart-outline' size={28} style={{alignSelf:'flex-end',marginTop:10}}/>
               </View>
                <Text style={{fontSize:16, width:'90%',paddingBottom:20}}>{title}</Text>
            </TouchableOpacity>
        )}
             
         
        </View>
    )
}
const renderItem = ({item}) => {
    return(
        <Item image = {item.image} title={item.title} price={item.Price} id = {item.id}/>
    )
}
const Sales = ({image,title,price,id,discount}) => {
    return(
        <View style={{}}>
        {id === "7" ? (
            <TouchableOpacity style={{width:WIDTH*0.45, height:HEIGHT*0.35,  justifyContent:'space-around',paddingBottom:20}} >
                <Text style={{justifyContent:'center', alignSelf:'center',fontSize:20, fontWeight:'600', }}>{title}</Text>
            </TouchableOpacity>
        ) : (
            <TouchableOpacity style={{width:WIDTH*0.45,height:HEIGHT*0.3540, marginTop:20,transform:[{translateX:15}]}}>
                <Image source={{uri:image}} style={{width:'90%', height:'75%'}}/>
               <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',width:'90%',alignContent:'space-between'}}>
                <View>
                <Text style={{fontSize:20, fontWeight:'700',marginTop:10,color:'red'}}>$ {discount}</Text>
                <Text style={{fontSize:17, fontWeight:'600',textDecorationLine:'line-through'}}>${price}</Text>

                </View>
                
                <Ionicons name='heart-outline' size={30} style={{alignSelf:'flex-end',marginTop:0,transform:[{translateY:-5}]}}/>
               </View>
                <Text style={{fontSize:16, width:'90%',paddingBottom:20}}>{title}</Text>
            </TouchableOpacity>
        )}
             
         
        </View>
    )
}
const renderSales = ({item}) => {
    return(
        <Sales image = {item.image} title={item.title} price={item.Price} id = {item.id} discount={item.Discount}/>
    )
}
export default function HomePage(){
    const {click,cat,c,filter,tab,product,arrow,images,user,cart,yes,edit,price,duplicate,reviewAdded} = useSelector(state => state.userReducer)
const dispatch = useDispatch()
    const callBack = () => {
        if(scrollRef.current){
              scrollRef.current.scrollTo({
            animated:true,
            
            x:WIDTH * position,
            y:0
        })
        }
      
    }

    const scrollRef = React.createRef()
    const[newInData,setNewInData] = useState()
    const[end,setEnd] = useState(false)
    const [ firstImages,setFirstImages ] = useState([
        'https://images.unsplash.com/photo-1619785292559-a15caa28bde6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80',
        'https://images.unsplash.com/photo-1515734674582-29010bb37906?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        'https://images.unsplash.com/photo-1514500759218-47f0ea1dce4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
    ])
    const[position,setPosition] = useState(0)
    const [imageInterval,setImageInterval] = useState(null)
    const[salesData, setSalesData] = useState()
    
const nav = useNavigation()
    useEffect(() => {
        const getData = async () => {
      
          let [newIn, saleItems] = await Promise.all([
            fetch(
                "https://my-json-server.typicode.com/jeremychiaaaaa/newinhome11/options"
              ),
              fetch(
                "https://my-json-server.typicode.com/jeremychiaaaaa/saleinhome2/options"
              )
          ])
          const data = await newIn.json();
          const sales = await saleItems.json()
          setNewInData(data);
          setSalesData(sales)
      
        };
        getData();
        if(reviewAdded === true){
            setTimeout(() => {
               dispatch(setReviewAdded(false))
            },4000)
        }
       
      },[reviewAdded]);
      const[banner,setBanner] = useState(false)
        const BottomBanner = () => {
            return(
                <View style={{position:'absolute', flexDirection:'row', bottom:0, alignItems:'center', height:80, backgroundColor:'rgb(244,202,22)',zIndex:10, width:WIDTH}}>
                    <Text style={{marginLeft:20, width:'80%', fontWeight:'500', fontSize:18}}>Your review has been successfully added. Thankyou so much for taking the time to do it. </Text>
                    <Ionicons name='close-outline' size={28} style={{position:'absolute', right:0, marginRight:10}} onPress={() => {
                        dispatch(setReviewAdded(false))
                    }} />
                </View>
            )
        }
     const setSelectedIndex = event => {
        const window = event.nativeEvent.layoutMeasurement.width
  
        const contentOffset = event.nativeEvent.contentOffset.x
        const index = Math.round(contentOffset / WIDTH)
        setPosition(index)
      }

    const [modalVisible, setModalVisible] = useState(false);
    console.log(banner)
    return(
        <SafeAreaView style={{flex:1, backgroundColor:'white', width:WIDTH}}>
            {reviewAdded && <BottomBanner />}
            <ScrollView stickyHeaderIndices={[0]}>
           <View style={{flexDirection:'row', alignItems:'center', alignContent:'center',justifyContent:'center',marginTop:20,backgroundColor:'white',paddingVertical:10 }}>
             
                                
               <Text style={{   alignSelf:'center',fontSize:30, marginRight:5, fontWeight:'700'}}>FASHION</Text>
               

               <View style={{position:'absolute', flexDirection:'row', right:0, marginRight:10}}>
                <Text style={{alignSelf:'center',  fontSize:17}}>{cart}</Text>
               <Ionicons name='cart-outline' size={28}  />
               </View>
               
           </View>
      
           <View> 
              
               <View>        
             <ScrollView
             horizontal
             pagingEnabled //allows for each item to be on a 'new page'
             onMomentumScrollEnd={setSelectedIndex} //meaning that once page end hits, change position
             showsHorizontalScrollIndicator={false}
    
             >
                 {firstImages.map(image => (
                     <Image
                     key={image}
                     source={{uri:image}}
                     style={{width:WIDTH, height:HEIGHT*0.6}}
                     
                     />
                 ))}
             </ScrollView>
             <View     style={{width:WIDTH, position:'absolute', bottom:15, height:10, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                 {firstImages.map((image,i) => (
                     <View 
                     key={image}
                    style={{height:8, width:9, borderRadius:4, backgroundColor:'white', margin:5, opacity:i === position ? 0.6 : 1}}
                     
                     />
                 ))}
             </View>
             </View>    
             {position === 0 && (
                 <View>
                     <Text style={{width:WIDTH*0.91, marginHorizontal:15,marginTop:20, fontWeight:'700', fontSize:32}}>BIG EVENT DRESSING</Text>
                <Text style={{width:WIDTH*0.91, marginHorizontal:15,marginTop:10,fontSize:24,paddingBottom:25}}  >The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.</Text>
                <TouchableOpacity style={{padding:10, width:WIDTH*0.91, borderWidth:1,marginHorizontal:15,marginTop:10,borderRadius:5 }}>
                    <Text style={{alignSelf:'center',fontSize:24}}>Shop Now</Text>
                </TouchableOpacity>
                </View>
             )} 
             {position === 1 && (
                 <View>
                     <Text style={{width:WIDTH*0.91, marginHorizontal:15,marginTop:20, fontWeight:'700', fontSize:32}}>LIFE IN ALL COLORS</Text>
                <Text style={{width:WIDTH*0.91, marginHorizontal:15,marginTop:10,fontSize:24,paddingBottom:25}}  >The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.</Text>
                <TouchableOpacity style={{padding:10, width:WIDTH*0.91, borderWidth:1,marginHorizontal:15,marginTop:10,borderRadius:5 }}>
                    <Text style={{alignSelf:'center',fontSize:24}}>Shop Now</Text>
                </TouchableOpacity>
                </View>
             )} 
                 
                 {position === 2 && (
                 <View>
                     <Text style={{width:WIDTH*0.91, marginHorizontal:15,marginTop:20, fontWeight:'700', fontSize:32}}>THE FINAL COLLECTION</Text>
                <Text style={{width:WIDTH*0.91, marginHorizontal:15,marginTop:10,fontSize:24,paddingBottom:25}}  >The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.</Text>
                <TouchableOpacity style={{padding:10, width:WIDTH*0.91, borderWidth:1,marginHorizontal:15,marginTop:10,borderRadius:5 }}>
                    <Text style={{alignSelf:'center',fontSize:24}}>Shop Now</Text>
                </TouchableOpacity>
                </View>
             )} 
               
                 </View>
       
           <View>
           <View >
                   <TouchableOpacity style={{backgroundColor:'black', width:WIDTH*0.91, paddingVertical:30, marginTop:20, marginHorizontal:15,justifyContent:'center', alignContent:'center', alignItems:'center'  }}>
                       <Text style={{color:'white', position:'absolute',top:10,fontWeight:'800'}}>🚚  IslandWide Delivery </Text>
                       <Text style={{color:'white', fontWeight:'800', fontSize:20, alignSelf:'center',paddingHorizontal:20,textAlign:'center'}}>Unlimited Express Delivery for a whole year? Yours for $30.00.
                       </Text>
                       <Text style={{color:'white',marginTop:5}}>Ts&C's apply</Text>
                   </TouchableOpacity>
               </View>
               <Text style={{width:WIDTH*0.91, marginHorizontal:15,marginTop:20, fontWeight:'600', fontSize:26}}>New in 🔥</Text>
               <Text style={{width:WIDTH*0.91, marginHorizontal:15,marginTop:10, fontWeight:'400', fontSize:20}}>Handpicked favorites daily from the widest collection of clothing that you will like !</Text>
               <FlatList 
               data={newInData}
               renderItem={renderItem}
               horizontal
               pagingEnabled={true}
               showsHorizontalScrollIndicator={true}
               legacyImplementation={false}
               style={{width:WIDTH + 5, }}
           
               />

               </View>
        <View style={{ alignSelf:'center'}}>
            <TouchableOpacity>
                <Text style={{fontSize:18, fontWeight:'600',borderWidth:1,padding:10,paddingHorizontal:40}}>View All</Text>
            </TouchableOpacity>
        </View>
        <View>
            <Text style={{marginTop:20,marginLeft:15, fontSize:26, fontWeight:'700'}}>Take A Short Cut ➡️</Text>
            <Text style={{marginTop:5, fontSize:20, width:WIDTH*0.91, marginHorizontal:15,fontWeight:'400'}}>These are some of the popular categories that we think you might fancy !</Text>
        <FlatList 
        data={data}
        renderItem={renderItem2}
      numColumns={2}
      keyExtractor={(item) => item.id}
                />
        </View>
        <View>
        <Text style={{width:WIDTH*0.91, marginHorizontal:15,marginTop:20, fontWeight:'600', fontSize:26}} >30% Sale Ongoing ⏰</Text>
               <Text style={{width:WIDTH*0.91, marginHorizontal:15,marginTop:10, fontWeight:'400', fontSize:20}}>Use Code GET30OFF Right Now Before You Check Out !</Text>
               <FlatList 
               data={salesData}
               renderItem={renderSales}
               horizontal
               pagingEnabled={true}
               showsHorizontalScrollIndicator={true}
               legacyImplementation={false}
               style={{width:WIDTH + 5, }}
           
               />
        </View>
        <View style={{ alignSelf:'center'}}>
            <TouchableOpacity>
                <Text style={{fontSize:18, fontWeight:'600',borderWidth:1,padding:10,paddingHorizontal:40}}>View All</Text>
            </TouchableOpacity>
        </View>

               </ScrollView>
        </SafeAreaView>
    )
} 

const Categories = ({title,subtitle,image}) => {
    return(
            <View >
            <TouchableOpacity style={{width:WIDTH*0.45, marginLeft:15,marginTop:0,height:HEIGHT*0.38, borderRadius:15, backgroundColor:'white', borderColor:'transparent', alignContent:'center', alignItems:'center', justifyContent:'center'}} >
                <Image source={{uri:image}} style={{width:'100%', height:HEIGHT*0.3, resizeMode:'cover'}}/>
          
            <Text style={{fontWeight:'700',  alignSelf:'center',fontSize:18,marginTop:10,textTransform:'uppercase'  }}>{title}</Text>
            <Text style={{fontWeight:'200',  alignSelf:'center',fontSize:16, marginTop:5 }}>{subtitle}</Text>
    </TouchableOpacity>
  </View>
    )
}
const renderItem2 = ({item}) => {
    return(
        <Categories title={item.title} subtitle={item.subtitle} image={item.image} />
    )
}
const data = [
    {
        id:1,
        title:'NEW Fashion Design',
        subtitle:'Change the ordinary',
        image:'https://images.unsplash.com/photo-1441123694162-e54a981ceba5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
    },

{
    id:2,
        title:'Date Night Look',
        subtitle:'Look Simply Stunning',
        image:'https://images.unsplash.com/flagged/photo-1559450907-774a40b04d79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
},
{
    id:3,
    title:'Formal Dress Code',
    subtitle:'Capture The Whole Room',
    image:'https://images.unsplash.com/photo-1528227790829-d12620d0ff4c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
},
{
    id:4,
    title:'Hot Girl Summer',
    subtitle:'Angsty-Girl Summer',
    image:'https://images.unsplash.com/photo-1551982398-b71c6a69ff42?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=845&q=80'
}
]

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
                    <TouchableOpacity onPress={() => {
                        dispatch(setAuthenticaed(true))
                       }}>
      <Feather name='user' size={28} />
                    </TouchableOpacity>
            
                ),
                headerShown:false
            }}/>
        </Tab.Navigator>
    )
}