import React, { useEffect, useState } from "react";
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View } from 'react-native';

import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import { useFonts, Urbanist_400Regular } from "@expo-google-fonts/urbanist";
import { useFonts as Fuentes} from "expo-font";
import AppLoading from "expo-app-loading";
import { getAuth } from "firebase/auth";
import { useNavigation, useRoute } from "@react-navigation/native";
import Stack from "./Stack";
import Tabs from "../Tab/Tabs";

const StackN = createStackNavigator();

const StackSidebar = (props) => {
  
  const auth = getAuth();
  const route = useRoute();
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

  return (
    <View style={{ flex: 1 }}>
        <StackN.Navigator>
            <StackN.Screen
              name="Tabs"
              component={Tabs}
              options={{ headerShown: false }}
            />
            <StackN.Screen
                name="Stack"
                component={Stack}
                options={{ headerShown: false }}
            />
        </StackN.Navigator>
    </View>
  );
}

export default StackSidebar;
