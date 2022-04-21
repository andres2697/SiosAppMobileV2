import {
    StyleSheet,
    View,
    Image
  } from "react-native";
import { useState } from "react";
import { TextInput } from "react-native-paper";
import { useFonts as Fuentes } from "expo-font";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import { signInWithEmailAndPassword } from "firebase/auth";
import Toast from 'react-native-root-toast';
import { useNavigation } from '@react-navigation/native';
import SvgComponent from '../../assets/img/svg/logo_barra_svg.js';
import { createDrawerNavigator } from '@react-navigation/drawer';
  
const Cabecera = () => {

    const navigation = useNavigation();

    const Iconos = createIconSetFromIcoMoon(
        require("../../icons/selection.json"),
        "IcoMoon",
        "icomoon.ttf"
    );
    const [iconsLoaded] = Fuentes({
        IcoMoon: require("../../icons/icomoon.ttf"),
    });
    
    if (!iconsLoaded) {
        return <AppLoading />;
    }

    return(
        <View style={styles.contenedorPrincipal}>
            <View style={styles.box1}>
                <Iconos name="hamburguesa" size={50} onPress= {
                        () => navigation.openDrawer()
                    }
                />
            </View>
            <View style={styles.box2}>
                <SvgComponent></SvgComponent>
            </View>
            {/* <View style={styles.box3}></View> */}
        </View>
    );
};

export default Cabecera;

const styles = StyleSheet.create({
    contenedorPrincipal: {
        width: "100%",
        height: "12%",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: '#EDF2F9',
        flexDirection: "row"
    },
    box1: {
        height:'100%',
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        alignContent: 'center',
        flexDirection: 'row',
        marginTop: '8%'
    },
    box2: {
        width: '80%',
        marginTop: '8%',
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        paddingRight: '12%'
    },
    // box3: {
    //     width: '20%',
    //     alignContent: 'flex-end'
    // },
});