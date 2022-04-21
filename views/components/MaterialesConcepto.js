  import {
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback,
    TextInput,
  } from "react-native";
  import React, { useEffect, useState, useRef } from 'react';
  import { useFonts as Fuentes } from "expo-font";
  import { createIconSetFromIcoMoon } from "@expo/vector-icons";
  import AppLoading from "expo-app-loading";
  import { useFonts, Urbanist_400Regular } from "@expo-google-fonts/urbanist";
  import { useNavigation, NavigationAction } from '@react-navigation/native';
  import { NavigationActions } from 'react-navigation';  
  
  const MaterialesConcepto = (props) => {
    const navigation = useNavigation();
    const folio = props.folio;

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
  
    if (!iconsLoaded || !fontsLoaded) {
      return <AppLoading />;
    }

      return (
        <View style={styles.contenedorMaterialesConcepto}>
          <View style={styles.contenedorSegmentos}>
            <View style={styles.contenedorGris}>
              <TouchableWithoutFeedback
                onPress={() => {
                  navigation.navigate('Miscelaneos', {
                    folio: folio
                  });
                }}
                style={{ width: "65%" }}
              >
                <View style={styles.contenedorBlanco}>
                  <Iconos name="miscelaneos" size={32}></Iconos>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.contenedorTexto}>
              <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                Miscelaneos
              </Text>
            </View>
          </View>
  
          <View style={styles.contenedorSegmentos}>
            <View style={styles.contenedorGris}>
              <TouchableWithoutFeedback
                onPress={() => {
                  console.log("tocaste el ícono");
                  navigation.navigate('MaterialesTP', {
                    folio: folio
                  });
                }}
                style={{ width: "65%" }}
              >
                <View style={styles.contenedorBlanco}>
                  <Iconos
                    name="materiales"
                    size={32}
                    style={{ paddingRight: "10%" }}
                  ></Iconos>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.contenedorTexto}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 15,
                  paddingLeft: "8%",
                }}
              >
                Materiales TP
              </Text>
            </View>
          </View>
  
          <View style={styles.contenedorSegmentos}>
            <View style={styles.contenedorGris}>
              <TouchableWithoutFeedback
                onPress={() => {
                  navigation.navigate('Conceptos', {
                    folio: folio
                  });
                }}
                style={{ width: "65%" }}
              >
                <View style={styles.contenedorBlanco}>
                  <Iconos name="conceptos" size={32}></Iconos>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.contenedorTexto}>
              <Text style={{ fontWeight: "bold", fontSize: 15 }}>Conceptos</Text>
            </View>
          </View>
        </View>
      );  
  };
  
  export default MaterialesConcepto;
  
  const styles = StyleSheet.create({
    contenedorMaterialesConcepto: {
        width: '85%',
        flexDirection: 'row',
        alignSelf:  "center",
        marginTop: 25,
        marginBottom: 35
    },
    contenedorSegmentos: {
        width: '33.33%',
        // backgroundColor: 'red',
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
    },
    contenedorGris:{
        backgroundColor: '#EDF2F9',
        width: '65%',
        paddingTop: '10%',
        paddingBottom: '10%',
        alignSelf: "center",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        elevation: 4,
        marginBottom: 12,
        fontFamily: 'Urbanist_400Regular'
    },
    contenedorBlanco: {
        backgroundColor: 'white',
        width: '70%',
        paddingTop: '15%',
        paddingBottom: '15%',
        alignSelf: "center",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        elevation: 1,
    },
    contenedorTexto: {
        width: '100%', 
        alignItems: "center"
    }
  });
  