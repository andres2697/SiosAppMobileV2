import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    ActivityIndicator,
    ToastAndroid
  } from "react-native";
  import { useState } from "react";
  import { TextInput } from "react-native-paper";
  import { useFonts as Fuentes } from "expo-font";
  import { createIconSetFromIcoMoon } from "@expo/vector-icons";
  import AppLoading from "expo-app-loading";
  import { signInWithEmailAndPassword } from "firebase/auth";
  import Toast from 'react-native-root-toast';
  import { useNavigation } from '@react-navigation/native';
  import Cabecera from "./components/Cabecera";
  
  const Dashboard = () => {

    const navigation = useNavigation();

    const Iconos = createIconSetFromIcoMoon(
        require("../icons/selection.json"),
        "IcoMoon",
        "icomoon.ttf"
    );
    const [iconsLoaded] = Fuentes({
        IcoMoon: require("../icons/icomoon.ttf"),
    });
    
    if (!iconsLoaded) {
        return <AppLoading />;
    }
    
    return (
        <View style={styles.contenedorPrincipal}>
            <Cabecera></Cabecera>
            <View style={styles.contenedorComponente}>
                <Text>
                    Hola desde Dashboard
                </Text>
            </View>
        </View>
    );

};

export default Dashboard;

const styles = StyleSheet.create({
    contenedorPrincipal: {
        width: "100%",
        height: "100%",
    },
    contenedorComponente: {
        width:'100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: 'white'
    }
});