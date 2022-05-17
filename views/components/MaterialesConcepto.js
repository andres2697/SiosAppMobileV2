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
  import {
    getDatabase,
    child,
    get,
    ref,
    limitToFirst,
    set,
  } from "firebase/database";
  import { getAuth } from "firebase/auth";
  
  
  const MaterialesConcepto = (props) => {
    const navigation = useNavigation();
    const auth = getAuth();
    const db = getDatabase();
    
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
                onPress={async() => {
                  let lista = new Array();
                  let i = 0;
                  let arreglo2 = new Array();

                  let consulta1 = await get(
                    child(
                      ref(db),
                      `foliosAsignados/${auth.currentUser.uid}/correctivo/activo/${folio}/materialesUsados/miscelaneos`
                    )
                  )
                    .then((snapshot) => {   
                      // console.log(snapshot);    
                      let x = 0;
                      snapshot.forEach(element => {
                        // lista.push({title: element.key, id: i});
                        // i = i + 1;
                        arreglo2[x] = element.key;
                        x = x + 1;
                      });
                    })
                    .catch(function (err) {});

                    // console.log(arreglo2);

                  await get(
                    child(
                      ref(db),
                      `inventario/materiales/miscelaneos`
                    )
                  )
                    .then((snapshot) => {   
                      // console.log(snapshot);    
                      snapshot.forEach(element => {
                        lista.push({title: element.key, id: i});
                        i = i + 1;
                        // console.log(element.key);
                      });
                    })
                    .catch(function (err) {});
                    // console.log(lista);

                  
                  arreglo2.forEach((valor) => {
                    lista = lista.filter((element)=>{
                      // console.log(valor);
                      if(element.title != valor){
                        return valor;
                      };
                    });
                  });

                  navigation.navigate('Miscelaneos', {
                    folio: folio, lista: lista
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
                onPress={async() => {
                  // console.log("tocaste el ícono");
                  let lista = new Array();
                  let i = 0;
                  let arreglo2 = new Array();

                  let consulta1 = await get(
                    child(
                      ref(db),
                      `foliosAsignados/${auth.currentUser.uid}/correctivo/activo/${folio}/materialesUsados/TP`
                    )
                  )
                    .then((snapshot) => {   
                      // console.log(snapshot);    
                      let x = 0;
                      snapshot.forEach(element => {
                        // lista.push({title: element.key, id: i});
                        // i = i + 1;
                        arreglo2[x] = element.key;
                        x = x + 1;
                      });
                    })
                    .catch(function (err) {});

                  await get(
                    child(
                      ref(db),
                      `inventario/materiales/TP`
                    )
                  )
                    .then((snapshot) => {   
                      // console.log(snapshot);    
                      snapshot.forEach(element => {
                        lista.push({title: element.key, id: i});
                        i = i + 1;
                        // console.log(element.key);
                      });
                    })
                    .catch(function (err) {});
                  // console.log(lista);

                  arreglo2.forEach((valor) => {
                    lista = lista.filter((element)=>{
                      // console.log(valor);
                      if(element.title != valor){
                        return valor;
                      };
                    });
                  });

                  navigation.navigate('MaterialesTP', {
                    folio: folio, lista: lista
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
                onPress={async() => {
                  let lista = new Array();
                  let i = 0;
                  await get(
                    child(
                      ref(db),
                      `conceptos`
                    )
                  )
                    .then((snapshot) => {   
                      // console.log(snapshot);    
                      snapshot.forEach(element => {
                        if(element.key !== 'CAB-024'){
                          lista.push({title: element.key, id: i});
                          i = i + 1;
                        }
                        // console.log(element.key);
                      });
                    })
                    .catch(function (err) {});
                  // console.log(lista);
                  navigation.navigate('Conceptos', {
                    folio: folio, lista: lista
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
  