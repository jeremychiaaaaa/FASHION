import React, {useState, useEffect} from 'react'
import { StyleSheet, Button, TextInput, Text, View, Alert,KeyboardAvoidingView, ScrollView,TouchableOpacity, Modal,Image,Dimensions } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import LogIn from './LogIn';
import firebase, { createUserDocument } from '../firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import {doc, setDoc, addDoc, getFirestore, collection} from 'firebase/firestore'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons'

import { useSelector, useDispatch } from 'react-redux';
import { setUser,setSignUp } from '../redux/actions';


const {width, height} = Dimensions.get('window')



const auth=getAuth()
const ReviewSchema = Yup.object().shape({
 
    email: Yup.string().email('Not a valid email').required('This is a required field'),
    password: Yup.string().required('This is a required field').matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Must Contain at least 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
   
    })
export default function SignUp({navigation}) {

    
  
    const {user,modal} = useSelector(state => state.userReducer)
  const dispatch = useDispatch()
    
    const onSignUp = async (email, password, username) => {
       
        try {
           const user= await createUserWithEmailAndPassword(auth,email,password)
           console.log(user.user.uid)
            createUserDocument(user, {username})
            dispatch(setUser(user))
            console.log('Successful', email, password)
          console.log(username)
        } catch (error) {
            Alert.alert('Hello', error.message)
        }
    }
   const nav = useNavigation()
    return (
        
        <KeyboardAvoidingView style={styles.div} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          
                      <ScrollView>
                          <View style={{flexDirection:'row',alignItems:'center',width:width,justifyContent:'center',marginTop:20}}>
                               <TouchableOpacity onPress={() => navigation.goBack()} style={{marginVertical:40, marginLeft:20,position:'absolute', left:0}}>
             <Ionicons name='close-outline' size={32} />
            </TouchableOpacity>   
            <Text style={{marginVertical:40, alignSelf:'center',fontSize:20, fontWeight:'600'}}>Create an Account</Text>
                          </View>
        
        <Formik 
        initialValues={{email: '', password:'', username:''}} //these are basically like the usestate hooks 
       validationSchema = {ReviewSchema}
        onSubmit={(values) => {
         
            onSignUp(values.email, values.password, values.username)
            nav.navigate('LogIn')
        }}
        >
            {(props) => ( //this here is some props that are provided to us by formik such as onChange functions / access to values /submission handler
            <View style={{ width:'90%',  marginLeft:20, marginTop:20, height:height*0.7}}>
                            <Text style={{fontSize:24, fontWeight:'700',marginLeft:15 }}>Sign Up With...</Text>
                  <View style={{flexDirection:'row', alignContent:'center',marginTop:15, }}>
                      <TouchableOpacity style={{borderWidth:1, borderColor:'lightgrey',width:width*0.25,height:60,justifyContent:'center', alignItems:'center',marginHorizontal:5}}>
                        <Image source={{uri:'http://assets.stickpng.com/images/5847f9cbcef1014c0b5e48c8.png'}} style={{width:40, height:40, padding:20}} />
                      </TouchableOpacity>
                      <TouchableOpacity style={{borderWidth:1, borderColor:'lightgrey',width:width*0.25,height:60,justifyContent:'center', alignItems:'center',marginHorizontal:5}}>
                        <Image source={{uri:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAA6lBMVEX///8sPv8fX/ceY/YcZ/UfYPcgXfcdZPYdZfUbavQhW/gqQ/4pRf0iV/kjVfkabPQkUvocMv8oSfwmTfufpP8lT/siWfgoSP0abvMqRP34+f8AJP8rPf/s7v4mOf+rsP++xv0QK/+Tmf/Hzf6mq/+qtP2dq/xUYP/l5v/P0v9mcP8AEv+Mk/9CUP/e4P+prf+8v/+OrfjO2fyIqve4zPpqh/np6v91ff9bZv+Zn//O2vuuw/lumPdNhPWatfhej/VRiPUqdvOIofo1e/RmgvpkgvlYefpGbfpKdPiXs/lOaft/h/9SXv9wjvnuTEgTAAAIXElEQVR4nO2da3eaShSGQVFRkXAJEuVSaGNrkjZNTWubpkl6TZNzTv//3zkDRqswwMxoZsha+/nUD12zeNYLM5uZLZEkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABDHeDwWfQmPQvD58t2Xq4Nmo9FqNNrt1sHVl/PLWSD6snbE5+sbpakqSrfb3es+oKidZqvRa3y9n4m+vC0Jrr82kdteSneFkqKqarPV039dz0VfJivB9beOsneA2BRUVoKq2ul0Wu2Bcv8Ub9j3V83uwcHKLyuoPgg2E1o94zYSfcF0jK+7i/SqAmwuDFsoyOG7pzPLjs/Vh/hIAkz8EI3G0Pn+RBzfqcv4SANM/NAq0hg430VfPAGX3VV+VILthJ5unIkWqGD6Qyny65YHmAoiDHUqWqKM8+YBe4CpYK83cOt7q86/Fd6gxVPMRoAJw6HRrmmMlzsIMBEcDPTRRLQMjhuiJzC3RmQDRIII66donRzBt70dBYjQdd3p1ayQm2afQLJFHh+gnmBYp6Kl1pl1mALMCv71Q4aG/EK01l/eN8sDVGgDTAQNw49Eiy3JCrIFOMz4JYo1KXDYBKsCTHDCSLRcwqy1VZVWGKDhIMIaPIvTJmuA7YoAU0LhM2qgVAZYWaWtB7ghaCNk0evicqFnCXD44FUUYCJou4ZYwZsuW5U21A3b+X374cOHX7e/e5bmWpbtOEY2wIT+R5GClypLgD3d/jWZbexYBKcvJhe3ejZA27YsKxRYhs9bDFVaz7mLCsYb97MBWgmmuJep9CGkXOSNu8+F4wX9XIAJms3RaYNzpaJK6+QCHBpRyYDIMBeg5bqu/5yX0ibTFvUiP7gr3S8M+vkAkaCrxWJWxR97tFOM/qF8xNQwGyAS1PpCloxLlXaRH1QISoGMCRAJapopYj5VaRf54e+qIQMZc4cmjPomD6VN3im0VZpRuWcf+NgAR6N+P+Q+2YxbtFWaE1UOujDMBYgE+/2Y95nGuUK5lza8qx40NcQEmBC+fnypdVCElGW2TTDhB2FBgAjZ4xvivUoVIFmEyDAT4EpQlmXz4tGt1lGJAlx7ESytZZY8GGICRPhcp9P3TcIqbfWiS1RapobYABNinvtSVwpZlbYSrKpmFiSGuSlmKSiHrx5ba+1K2hRTTPoUlh18zmcvHjiTCwNM8Pi1pdx3CBf51VaMXfSKd/TT9xfX76N/FAeYYO5zMzxQaPfSXPxA4398t3iR3/RDt2nBKLtn3qbeS2thBwo0K/8eURBgepvyetm/bpIHuDhv0fHHgbpVFmBOUDYPORleqUSL/NpmqIGtmyd9mgCT2/QTJ8MeXYAoQnyfjGPRBJjepnwEZw26AAe67rzEjDMPcwEWTDEr4iMuhvct6hNPG2cY9ekC5LdefO1QH5hhDZ/16QJMHsRjLoYt+gMzrOFhn3iKWcKn+g6G9AdmxYYUAaZTDY+TqFmb/sDMKjCkCpDbVHPZIO+KWR6Y4Q1lygARXHYVzxtEa8TGiWexIU2AiSGPLbebFmWAJYZka8QaIY/DxB8tygARLtbQX/iR3qGpIY+3YIVskd84si42pAkQ4Y84GA4JqrTsmTzeMKSYYpaGMQdDnb4rxtHwhpQBJvCovXW6tqb0RFDDvdjth5QBcjIc6yQBLl8atMVsGeIq5v04DM0NfALDx9/5Tg0rq7Q/k01wP1E7epZhElYr8jA0CKo0l60dzatFhpJBsMi7EcvI07gWz6HkECzybIZRTQx1gkVei1hGPjQrBbmsh02CNYLN8N+w2pBHTXPbq67SRhHLyP9VG3KpS/8Mqxd5NsO4erHg8m7xXa+u0voRw8ABwWLB5f3wzKiu0pgMj2ICQx7v+DOn+EVw2VjIZDipnkr57NMEdkWArIbPCQy57LVJxrCi+ZzR8JhgseDTrfBLLw8wabCPGMYdEUylfPa8XxrlAdq2JUcM45JMpXzOLWZ2eYDovVCO6Iclqbs5nT1JGlZwvXdZjuhHjQgMOZ0fSndGaYAIlt/VEdTd3M6AJ05pgJbl+mfJx4TWwQyT+Q8EdTe3c/y5Vhpgct6y2ICJl5zguu4uTrx1qgX59WJIbaNEEHfiiZ0D9wlW+M2blFs/jfTSLg0wf96yG0OOPVFBv1Qwf2C2G0OOfW3Sb6dgiik48dyJIc/eRCnSyAJcbmfvxJBrf6lkOeQB7siQb4+w9NIlD3BHhpz7vMd+UYDYA7NdGHLu1ZcuXOIAd2Nocv69hTQOiQPcjSHvCFGIWvkiv2NDLptsGWSLrHd5J4ZcdvOzTGTy1tetDWMhv+ceuMR9adsahm+42yWcmsR9adsaeoK+jvHcJ2193dKQ+0qxwh4R9qVtZxjyOFLDM40J+9K2M+T3ap/nmUnW1rSVYfyWu9caH32itqZtDE0++9yFvJFJ2pq2MAw17k6bBKZM0LfFbujHor8xJJ0SHDewG/qiVsJ1XrCeqJAYntTgW1+SdFatyGro1eSTdNWKjIZ1EUSKJxWHm0yG/kltBJNnsVyRxdD3avEMLjmNSw9WGAxDQd8VKiTQyq6X3tDUhK+DOY7jHRrGgks1PG+LjwApDUNPaLFdzHRUdM10huaopt/zRrwuiJHGMPSEvdGTcPoG20JJbujHb2o2h+aYxJgLJzY0xWwbUvLcy106oaHpCfp8IC3j117m5y8khr7pvX4if6MEMb4wN4qcasMwNi+ejl/K2SvPDAkNQ9N7VaMqm5j5vruULDNEeu7+k/2jVtPDT15shn6BoR+asffpsL7rOxlH+8dmQdeXebzPqZ3y0Qlwd+G8fm8PAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPD0+R/2Fo8m+pOGyQAAAABJRU5ErkJggg=='}} style={{width:80, height:50, padding:20,backgroundColor:'white'}} />
                      </TouchableOpacity>
                      <TouchableOpacity style={{borderWidth:1, borderColor:'lightgrey',width:width*0.25,height:60,justifyContent:'center', alignItems:'center',marginHorizontal:5}}>
                        <Image source={{uri:'data:image/png;base64,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'}} style={{width:40, height:40, padding:20}} />
                      </TouchableOpacity>
                  </View>
                  <Text style={{marginTop:30, alignSelf:'center', fontWeight:'200',}}>Or, register with email...</Text>
                  <View style={{flexDirection:'row', borderBottomColor:'lightgrey', borderBottomWidth:1,paddingBottom:5,marginTop:25}}>
                      <Ionicons name='body-outline' size={32} style={{color:'grey'}}/>
                 <TextInput 
                placeholder='UserName'
                style={styles.content}
                placeholderTextColor='grey'
                onChangeText={props.handleChange('username')} //this props.handlechange will take in the state value that we want to update
                value={props.values.username} 
                />    
                </View>
                <View style={{flexDirection:'row', borderBottomColor:'lightgrey', borderBottomWidth:1,paddingBottom:5,marginTop:25}}>
                      <Ionicons name='at-circle-outline' size={32} style={{color:'grey'}}/>
                <TextInput 
                placeholder='Email'
                style={styles.content}
                onChangeText={props.handleChange('email')} //this props.handlechange will take in the state value that we want to update
                value={props.values.email} 
                placeholderTextColor='grey'
                />
               
                </View>
                   <Text style={{fontSize:14}}>{props.errors.email}</Text>
                <View style={{flexDirection:'row', borderBottomColor:'lightgrey', borderBottomWidth:1,paddingBottom:5,marginTop:25}}>
                      <Ionicons name='lock-closed-outline' size={32} style={{color:'grey'}}/>
                    
              
            
                <TextInput 
                placeholder='Password'
                style={styles.content}
                placeholderTextColor='grey'
                onChangeText={props.handleChange('password')} //this props.handlechange will take in the state value that we want to update
                value={props.values.password} 
                secureTextEntry
                />
               </View>
                <Text style={{fontSize:14, marginTop:10,}}>{props.errors.password}</Text>
                <TouchableOpacity style={{alignSelf:'center', width:'90%', marginHorizontal:15, padding:15,    backgroundColor:'rgba(67,179,174,1)',
   borderColor:'transparent', borderWidth:1, borderRadius:15,marginTop:15 }} onPress={props.handleSubmit}>
                    <Text style={{alignSelf:'center',color:'white',fontSize:20, fontWeight:'600'}}>Submit</Text>
                </TouchableOpacity>
                <View style={{flexDirection:'row',alignItems:'center',alignContent:'center', padding:20, alignSelf:'center'}}>
            <Text style={{fontWeight:'200',opacity:1,}}>Already have an account?</Text>
         <TouchableOpacity onPress={() => nav.navigate('LogIn')}>
                <Text style={{color:'rgba(67,179,174,1)',fontSize:14, marginLeft:10,fontWeight:'800'}}>Sign In</Text>
             </TouchableOpacity>
           </View>
            </View>
            )}
    
     </Formik>
    
    </ScrollView>
      

    </KeyboardAvoidingView>
    
    )
}
const Stack = createNativeStackNavigator()
export const SignUpStack = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name='Sign Up 2' component={SignUp} options={{
                headerShown:false
            }}/>
            <Stack.Screen name='Login' component={LogIn} />
        </Stack.Navigator>

    )
}

const styles = StyleSheet.create({
    div : {
        flex:1,
        justifyContent: 'center',
    backgroundColor:'white',
    },
    icons:{
       
        flexDirection:'row',
        
        position:'absolute',
        left:'84%',
        
        fontSize:32,
       
    },
    content: {
      
     
       
        fontSize:18,
      
        
        color:'black',
      
        fontWeight:'600',
        transform:[{translateX: 40}],
        zIndex:10,
        width:'100%'
        
    },
    welcome: {
       alignSelf: 'center',
    
        color:'white',
        fontSize:20,
        fontWeight: '600'
    }
})

