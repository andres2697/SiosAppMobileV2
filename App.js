import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, LogBox } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { useFonts, Urbanist_400Regular } from '@expo-google-fonts/urbanist';
import AppLoading from "expo-app-loading";
import { RootSiblingParent } from 'react-native-root-siblings';
import 'react-native-gesture-handler';
import { Video } from 'expo-av';
import * as SplashScreen from 'expo-splash-screen';
import Tabs from "./views/components/Tab/Tabs";
import Stack from "./views/components/Stack/Stack";
import Sidebar from './views/components/Sidebar/Sidebar';
import { navigationRef } from './views/RootNavigation';
import { getAuth } from "firebase/auth";

// import fondo from "./assets/";

export default function App() {  
  const [splashScreen, setSplashScreen] = useState(false);
  const video = React.useRef(null);
  const navigation = null; 

  const auth = getAuth();
  
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
        >
        </Video>
      </View>
    );
  }else{

    // let ventana = auth.currentUser ? 'Sidebar' : 'Stack';
    // console.log(ventana);

    return (
      <RootSiblingParent>
        <NavigationContainer ref={navigationRef}>
          <Stack></Stack>
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
