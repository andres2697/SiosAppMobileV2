import React, { useEffect, useState } from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, View } from "react-native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Sidebar from "../Sidebar/Sidebar";
import Login from "../../Login";

import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import { useFonts, Urbanist_400Regular } from "@expo-google-fonts/urbanist";
import { useFonts as Fuentes } from "expo-font";
import AppLoading from "expo-app-loading";
import { getAuth } from "firebase/auth";
import { useNavigation, useRoute } from "@react-navigation/native";
import Tabs from "../Tab/Tabs";
import Miscelaneos from '../vistaMateriales/Miscelaneos';
import MaterialesTP from '../vistaMateriales/MaterialesTP';
import Conceptos from '../vistaConceptos/Conceptos';
import Observaciones from '../vistaObservaciones/Observaciones';
import Camara from '../Camara';

const StackN = createStackNavigator();

const Stack = (props) => {
  const auth = getAuth();
  // const route = useRoute();

  // const user = auth.currentUser.displayName;

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

  let ventana = auth.currentUser ? "" : "Login";
  console.log(ventana);
  return (
    <View style={{ flex: 1 }}>
      <StackN.Navigator initialRouteName={ventana}>
        <StackN.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <StackN.Screen
          name="Sidebar"
          component={Sidebar}
          options={{ headerShown: false }}
        />
        <StackN.Screen
          name="Miscelaneos"
          component={Miscelaneos}
          options={{
            title: "Miscelaneos",
            headerBackButtonMenuEnabled: true,
            headerTitleStyle: { fontWeight: "bold" },
          }}
        />
        <StackN.Screen
          name="MaterialesTP"
          component={MaterialesTP}
          options={{
            title: "Materiales TP",
            headerBackButtonMenuEnabled: true,
            headerTitleStyle: { fontWeight: "bold" },
          }}
        />
        <StackN.Screen
          name="Conceptos"
          component={Conceptos}
          options={{
            title: "Conceptos",
            headerBackButtonMenuEnabled: true,
            headerTitleStyle: { fontWeight: "bold" },
          }}
        />
        <StackN.Screen
          name="Observaciones"
          component={Observaciones}
          options={{
            title: "Observaciones",
            headerBackButtonMenuEnabled: true,
            headerTitleStyle: { fontWeight: "bold" },
          }}
        />
        <StackN.Screen
          name="Camara"
          component={Camara}
          options={{ headerBackButtonMenuEnabled: false, headerShown: false }}
          initialParams={{ img: false }}
        />
      </StackN.Navigator>
    </View>
  );
};

export default Stack;
