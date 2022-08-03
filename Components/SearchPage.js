import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect,useRef} from 'react'
import { StyleSheet,Button,Keyboard, Text, View,SafeAreaView,Dimensions,Image,TouchableOpacity,ScrollView,FlatList, Alert, Modal,TextInput, Touchable,  } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo'
import { NavigationContainer,useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Discover from './Discover';
import Favorites from './Favorites';
import Profile from './Profile';
import { SliderBox } from "react-native-image-slider-box";
import { useSelector, useDispatch } from 'react-redux';
import { setSearchClicked,setClicked,setFilter,setTab,setCategoryClicked } from '../redux/actions';
import Slideshow from 'react-native-slideshow-improved';
import TimedSlideshow from 'react-native-timed-slideshow';
import InstaStory from 'react-native-insta-story';
import { LinearGradient } from 'expo-linear-gradient';

const Tab = createBottomTabNavigator();
const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width

let reg = /abc/
reg = new  RegExp('abc')

export default function SearchPage(){
    const[searchPhrase,setSearchPhrase] = useState('')
    const {click,cat,c,filter,tab} = useSelector(state => state.userReducer)
    const [searchResult,setSearchResult] = useState(new Set())
    const[searched,setSearched] = useState(false)
const dispatch = useDispatch()
useEffect(() => {
    if(searchPhrase.length > 0){
         
        fetch('https://ecommerce-7700c-default-rtdb.firebaseio.com/.json').then(
        response => response.json()
).then(responseData => {
    setSearchResult([])
    let searchQuery = searchPhrase.toLowerCase()

    for(let key=0; key < 100; key++){
        let type = responseData[key].subcategory.toLowerCase()
        let specific = responseData[key].name.toLowerCase()
        if((type.indexOf(searchQuery) !== -1) ){
     
                 setSearchResult(prevResult => new Set(prevResult).add(responseData[key].subcategory))
                
        
         
        } 
    }
}).catch(err => {
    console.log(err)
})

    } else {
     
        setSearchResult([])

    }

},[searchPhrase])

const nav = useNavigation()
const [modalVisible,setModalVisible] = useState(false)
return(
<SafeAreaView style={{ flex:1,backgroundColor:'white'}}>
    <View style={{flexDirection:'row', alignItems:'center',borderBottomColor:'rgba(220,220,220,0.3)', borderBottomWidth:1, paddingBottom:20,paddingTop:10, backgroundColor:'white'}}>
    <Ionicons name='arrow-back-outline' size={32} color={'black'} onPress={() => {dispatch(setSearchClicked(!click))
    nav.navigate('Discover')
    }} style={{marginLeft:10}}/>
    <SearchBar
    searchPhrase={searchPhrase}
    setSearchPhrase={setSearchPhrase}
  click={click}
  
  />

  </View>
 
  {Array.from(searchResult).map((result) => (
  <TouchableOpacity style={{padding:20, width:WIDTH,backgroundColor:'white',flexDirection:'row', borderBottomWidth:1, borderBottomColor:'rgba(220,220,220,0.3)', paddingBottom:20, alignItems:'center' }}
  onPress={() => {
      dispatch(setCategoryClicked(result))
        nav.navigate(`${cat} page`)
    dispatch(setClicked(true))

  }}
  
  >
      {searchPhrase !== '' && result.slice(0,20).split('').map((i,index) => (
          <Text style={{fontWeight:i === searchPhrase[index] || i=== searchPhrase ? '300':'700', fontSize:20,     }} numberOfLines={3}>{i}</Text>
      ))}
      <Ionicons name='chevron-forward-outline' size={32} style={{position:'absolute', right:0, marginRight:10}}/>
  </TouchableOpacity>
  ))}
    
   

</SafeAreaView>
)

}
const SearchBar = (props) => {
    const {click,cat} = useSelector(state => state.userReducer)
const dispatch = useDispatch()
const nav = useNavigation()
console.log(click)
    return(
        <View style={styles.container}>
            <View
            style={!props.click ? styles.notclick : styles.click}
            >
                 <Feather
                 name="search"
                 size={20}

                 style={{ marginLeft: 2, opacity: props.click ? 0 : 1 }}
                
                
                />
                <TextInput 
                style={styles.input}
                placeholder='Search'
                value={props.searchPhrase}
                autoFocus={true}
                onChangeText={props.setSearchPhrase}
                onFocus={() => {
                    dispatch(setSearchClicked(true))
                    
                }}
                placeholderTextColor='black'
                onSubmitEditing={() => {
                    dispatch(setCategoryClicked(props.searchPhrase))
                    
                    nav.navigate(`${cat} page`)
                    dispatch(setClicked(true))
                }}
                />
                 <Feather
                 name="camera"
                 size={24}
              
                 style={{ marginLeft: 0, opacity: props.click ? 0 : 1, position:'absolute', right:10 }}
                
                
                />
                {props.click && (
                    <Entypo name="cross" size={24} color="rgb(72,209,204)" style={{ padding: 1 }} onPress={() => {
                             props.setSearchPhrase("")
                             }}/>
                )}  
            </View>
            {props.click && (
                <View>
                    <Button
                    title='Cancel'
                    color={'rgb(72,209,204)'}
                    onPress={() => {
                        dispatch(setSearchClicked(false))
                        Keyboard.dismiss()
                    }}
                    >

                    </Button>
                    </View>
            )}
        </View>
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

    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "85%",
    marginLeft:15

  },
  notclick: {
    padding: 5,
    flexDirection: "row",
    width: '80%',
    backgroundColor: "rgba(220,220,220,0.2)",
    borderRadius: 15,
    alignItems: "center",

  },
  click: {
    padding: 10,
    flexDirection: "row",
    width: "80%",
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