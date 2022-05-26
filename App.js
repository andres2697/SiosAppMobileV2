import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, LogBox } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import { useFonts, Urbanist_400Regular } from '@expo-google-fonts/urbanist';
import AppLoading from "expo-app-loading";
import { RootSiblingParent } from 'react-native-root-siblings';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import Sidebar from './views/components/Sidebar';
import Camara from './views/components/Camara';
import Conceptos from './views/components/vistaConceptos/Conceptos';
import MaterialesTP from './views/components/vistaMateriales/MaterialesTP';
import Miscelaneos from './views/components/vistaMateriales/Miscelaneos';
import Observaciones from './views/components/vistaObservaciones/Observaciones';
import Correctivo from './views/Correctivo';
import { Video } from 'expo-av';
import * as SplashScreen from 'expo-splash-screen';
// import fondo from "./assets/";

const Stack = createNativeStackNavigator();

export default function App() {
  
  const [splashScreen, setSplashScreen] = useState(false);
  const video = React.useRef(null);
  
  LogBox.ignoreLogs(['Remote debugger']);
  const [fontsLoaded] = useFonts({
    Urbanist_400Regular,
  });
  SplashScreen.preventAutoHideAsync()
  .then(result => console.log(''))
  .catch(console.warn); 

  SplashScreen.hideAsync()
  .then(result => console.log(''))
  .catch(console.warn); 
  setTimeout(async () => {
    await SplashScreen.hideAsync();
  }, 2000);
  clearTimeout();
    // Prevent native splash screen from autohiding before App component declaration

  if (!fontsLoaded) {return <AppLoading />};

  if(!splashScreen){
    setTimeout(function () {
      setSplashScreen(true);
    }, 3500);
    clearTimeout(); 
    return (
      <View style={{ width: '100%', height: '100%', backgroundColor: 'white', justifyContent: "center" }}>

        {/* <Text> Prueba de Splash Screen </Text> */}
        <Video
          source={require("./assets/video/Sios_app.mp4")}
          resizeMode="contain"
          shouldPlay={true}
          isMuted={true}
          style={{ width: '60%', height: '60%', alignSelf:"center" }}
          // useNativeControls
          // isLooping
          // onPlaybackStatusUpdate={status => setStatus(() => status)}
        >
        </Video>
      </View>
    );
  }else{

    return (
      <RootSiblingParent>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen 
              name="Login" 
              component={Login} 
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="Sidebar" 
              component={Sidebar} 
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="Correctivo" 
              component={Correctivo} 
              options={{ title: 'Correctivo', headerBackButtonMenuEnabled: true, headerTitleStyle: {fontWeight: 'bold'} }}
            />
            <Stack.Screen 
              name="Miscelaneos" 
              component={Miscelaneos} 
              options={{ title: 'Miscelaneos', headerBackButtonMenuEnabled: true, headerTitleStyle: {fontWeight: 'bold'} }}
            />
            <Stack.Screen 
              name="MaterialesTP" 
              component={MaterialesTP} 
              options={{ title: 'Materiales TP', headerBackButtonMenuEnabled: true, headerTitleStyle: {fontWeight: 'bold'} }}
            />
            <Stack.Screen 
              name="Conceptos" 
              component={Conceptos} 
              options={{ title: 'Conceptos', headerBackButtonMenuEnabled: true, headerTitleStyle: {fontWeight: 'bold'} }}
            />
            <Stack.Screen 
              name="Observaciones" 
              component={Observaciones} 
              options={{ title: 'Observaciones', headerBackButtonMenuEnabled: true, headerTitleStyle: {fontWeight: 'bold'} }}
            />
            <Stack.Screen 
              name="Camara" 
              component={Camara} 
              options={{ headerBackButtonMenuEnabled: false, headerShown: false}}
              initialParams={{ img: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </RootSiblingParent>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
