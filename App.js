import 'react-native-gesture-handler';
import React, {useState, useEffect,useRef,useCallback} from 'react'
import { StyleSheet, Text, View,SafeAreaView,Dimensions,Image,TouchableOpacity,ScrollView,FlatList, Alert, Modal, ImageStore,TouchableHighlight, Button } from 'react-native';
import { NavigationContainer,useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingPage from './LandingPage';
import HomePage from './HomePage';
import { Provider } from 'react-redux';
import { Store } from './redux/store';
import { HomeStack } from './HomePage';
import SignUp from './SignUp';
import SignUpStack from './SignUp';
import LogIn from './LogIn';
import ProductScreen from './ProductScreen';
import ModalProductScreen from './ModalProductScreen';
import SizeGuide from './SizeGuide';
import ViewOrders from './ViewOrders'
import { ModalNavigator } from './Favorites';
import Transaction from './Transaction';
import AddReview from './AddReview';
import { ViewAllItems } from './AddReview';
const Stack = createNativeStackNavigator()

export default function App({navigation}) {

  return (
    <Provider store={Store}>
   <NavigationContainer>
     <Stack.Navigator>
    
       <Stack.Screen name='HomePage' component = {HomeStack} 
       options={{
         headerShown:false
       }}
       />
       <Stack.Screen name ='LAnding' component={LandingPage} options={{headerShown:false}} />
       <Stack.Screen name='Product' component={ProductScreen} options={{
         headerShown:false
       }}/>
       <Stack.Screen name ='Guide' component={SizeGuide}
       options={{
         headerShown:false
       }}
       
       />
  
       <Stack.Group screenOptions={{ presentation: 'modal' }}>
           <Stack.Screen name='SignUp' component={SignUp} options={{
             headerShown:false
           }} />
           <Stack.Screen name='LogIn' component={LogIn} 
           options={{
             headerShown:false
           }}
           />
       </Stack.Group>
     <Stack.Group screenOptions={{ presentation: 'modal' }}>
           <Stack.Screen name='Update' component={ModalProductScreen} options={{
             headerShown:false
           }} />
     </Stack.Group>
 <Stack.Screen name='Orders' component={ViewOrders} options={{
   
                      
           }} />
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
           <Stack.Screen name='Transaction' component={Transaction} options={{
             headerShown:false
           }} />
     </Stack.Group>
     <Stack.Screen name='View' component={ViewAllItems}  options={{
             headerShown:false
           }}/>
     <Stack.Screen name='Add Review' component={AddReview}  options={{
             headerShown:false
           }}/>
     </Stack.Navigator>
   </NavigationContainer>
   </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
