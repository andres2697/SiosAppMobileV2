import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useFonts, Urbanist_400Regular } from "@expo-google-fonts/urbanist";
import { useFonts as Fuentes } from "expo-font";
import AppLoading from "expo-app-loading";
import { useNavigation, useRoute } from "@react-navigation/native";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Correctivo from "../../Correctivo";
import Preventivo from "../../Preventivo";
import Cabecera from "../Cabecera";

import Dashboard from "../../Dashboard";
import Notificaciones from "../Notificaciones/Notificaciones";
import ModoOscuro from "../modoOscuro/ModoOsuro";
import Avisos from "../Avisos/Avisos";

const Tab = createBottomTabNavigator();

const Tabs = (props) => {

  const Iconos = createIconSetFromIcoMoon(
    require("../../../icons/selection.json"),
    "IcoMoon",
    "icomoon.ttf"
  );
  const [iconsLoaded] = Fuentes({
    IcoMoon: require("../../../icons/icomoon.ttf"),
  });
  const [fontsLoaded] = useFonts({
    Urbanist_400Regular,
  });

  if (!iconsLoaded || !fontsLoaded) {
    return <AppLoading />;
  }

  const Correctivo2 = () => {
    const navigation = useNavigation();
    return(
      <View style={{width: '100%', height: '100%'}}> 
        <Cabecera navigation={navigation}></Cabecera>
        <Correctivo></Correctivo>
      </View>
    );
    
  }
  
  const Preventivo2 = () => {
    const navigation = useNavigation();
    return(
      <View style={{width: '100%', height: '100%'}}> 
        <Cabecera navigation={navigation}></Cabecera>
        <Preventivo></Preventivo>
      </View>
    );
  }

  return (
    <View style={{ flex: 5 }}>

      <Tab.Navigator
          initialRouteName={'Dashboard'}
          screenOptions={ ({ route }) => ({
              headerShown: false,
              tabBarStyle:{backgroundColor: '#EDF2F9'},
              tabBarActiveTintColor: '#2166E5',
              tabBarInactiveTintColor: 'black',
              tabBarLabelStyle: {fontSize: 11},
              tabBarIcon: ({focused, color, size}) => {
                let icon = '';
                switch(route.name){
                  case 'Correctivo':
                    icon = 'correctivo';
                  break; 
                  case 'Preventivo':
                    icon = 'preventivo';
                  break; 
                }
                return <Iconos name={icon} size={43} color={color} style={styles.iconosStyle}/>;
              }
            })
          }         
      >
        <Tab.Screen name="Dashboard" component={Dashboard}
          options={{
              headerShown: false,
              tabBarItemStyle: {display:"none"},
          }}
        />
        <Tab.Screen name="Notificaciones" component={Notificaciones}
          options={{
              headerShown: false,
              tabBarItemStyle: {display:"none"},
          }}
        />
        <Tab.Screen name="ModoOscuro" component={ModoOscuro}
          options={{
              headerShown: false,
              tabBarItemStyle: {display:"none"},
          }}
        />
        <Tab.Screen name="Avisos" component={Avisos}
          options={{
              headerShown: false,
              tabBarItemStyle: {display:"none"},
          }}
        />
        <Tab.Screen
          name="Correctivo"
          component={Correctivo2}
        />
        <Tab.Screen
          name="Preventivo"
          component={Preventivo2}
          initialParams={{img: false}}
        />
      </Tab.Navigator>
    </View>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  iconosStyle: {
    fontFamily: "Urbanist_400Regular",
  },
});
