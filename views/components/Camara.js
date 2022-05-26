import { StyleSheet, Text, View, Animated, useWindowDimensions, ActivityIndicator, Pressable, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useState, useEffect, useCallback, useRef } from "react";
import { useFonts as Fuentes } from "expo-font";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import { useFonts, Urbanist_400Regular } from "@expo-google-fonts/urbanist";
import AppLoading from "expo-app-loading";
import * as ImagePicker from "expo-image-picker";
import { Camera, CameraType } from 'expo-camera';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 
import { useNavigation, NavigationAction, useRoute } from '@react-navigation/native';

import { GLView } from 'expo';
import Expo2DContext from 'expo-2d-context';


const Camara = () => {
    const route = useRoute();
    const navigation = useNavigation();

    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(CameraType.back);
    const [capturedPhoto, setCapturedPhoto] = useState(null);
    const camRef = useRef(null);
    const [fotoTomada, setFotoTomada] = useState(false);
    const [tomandoFoto, setTomandoFoto] = useState(false);

    const cargarCamaraPermisos = useCallback(async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      let permisos = false;
      if (status === "granted") {
        permisos = true;
      }
      setHasPermission(permisos);
    });

    useEffect(()=> {
        cargarCamaraPermisos();
    }, []);  

    const takePick = async () => {
        setTomandoFoto(true);
        let options = {
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            allowsMultipleSelection: false,
            aspect: [4, 3],
            quality: 1
        }
        let newPhoto = await camRef.current.takePictureAsync(options);
        setTomandoFoto(false);
        setCapturedPhoto(newPhoto);
        // console.log(capturedPhoto);
        setFotoTomada(true);
    }

    const Iconos = createIconSetFromIcoMoon(
        require("../../icons/selection.json"),
        "IcoMoon",
        "icomoon.ttf"
        );
        const [iconsLoaded] = Fuentes({
        IcoMoon: require("../../icons/icomoon.ttf"),
    });
    const [fontsLoaded] = useFonts({
        Urbanist_400Regular,
    });
    
    if (!iconsLoaded || !fontsLoaded ) {
        // return
        // <View>
        return <AppLoading />
    }

    if (hasPermission === null || hasPermission === undefined) {
        return <View style={{width: '100%', height: '100%'}}>
            <Text>Nulo</Text>
        </View>;
    }
    if (hasPermission === false) {
        return <View style={{width: '100%', height: '100%'}}>
            <Text>No access to camera</Text>
        </View>;
    }

    return(
        <Camera type={type} ref={camRef} style={{flex: 8, alignItems:'center', justifyContent: 'flex-end', width: '100%', height: '100%'}}>
            <View style={{flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity
                    style={[styles.contenedorAcciones, {display: fotoTomada ? 'none' : 'flex', marginBottom: 50}]}
                    onPress={()=>{
                        takePick();
                    }}>
                        <Feather name="camera" size={30} color="black" style={{alignSelf: 'center', display: tomandoFoto ? 'none' : 'flex'}}/>
                        <ActivityIndicator
                            size="large"
                            color="#2166E5"
                            style={{display: tomandoFoto ? 'flex' : 'none'}}
                            animating={tomandoFoto}
                        /> 
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row', display: fotoTomada ? 'flex' : 'none', justifyContent: 'center'}}>
                        { capturedPhoto && <Image source={{uri: capturedPhoto.uri}} style={styles.imagenPrevia}></Image>}
                        <TouchableOpacity
                            style={[styles.contenedorAcciones, {backgroundColor: 'white', marginTop: 15, marginLeft: 50}]}
                            onPress={()=>{
                                //    takePick();
                                console.log('foto aceptada');
                                navigation.navigate("Preventivo", {img: capturedPhoto});
                            }}>
                            <Entypo name="check" size={28} color="black" style={{alignSelf: 'center'}}/>
                        </TouchableOpacity> 
                        <TouchableOpacity
                            style={[styles.contenedorAcciones, {backgroundColor: 'red', marginTop: 15, marginLeft: 50}]}
                            onPress={()=>{
                                setFotoTomada(false);
                                setCapturedPhoto(null);
                                //    takePick();
                            }}>
                            <Iconos name="borrar" size={45} color="white" style={{alignSelf: 'center', marginTop: -5}}/>
                        </TouchableOpacity> 
                    </View>
            </View>
        </Camera>
    );
}

export default Camara;

const styles = StyleSheet.create({
    contenedorAcciones: {
        backgroundColor: 'white', 
        height: 70, 
        width: 70, 
        justifyContent: 'center', 
        paddingVertical: 20, 
        // marginBottom: 40, 
        borderRadius: 50,
    },
    imagenPrevia: {
        width: 100, 
        height: 100, 
        marginBottom: 50,
        borderRadius: 10
    }
});
