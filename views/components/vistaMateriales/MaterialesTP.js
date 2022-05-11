  import {
    StyleSheet,
    View,
  } from "react-native";
  import { useFonts as Fuentes } from "expo-font";
  import { useState, useRef, useCallback, useEffect } from "react";
  import { createIconSetFromIcoMoon } from "@expo/vector-icons";
  import AppLoading from "expo-app-loading";
  import { useFonts, Urbanist_400Regular } from "@expo-google-fonts/urbanist";
  import ListaMateriales from "./Componentes/ListaMateriales";
  import { getAuth } from "firebase/auth";
  import {
    getDatabase,
    child,
    get,
    ref,
    set,
  } from "firebase/database";
  
  const MaterialesTP = (props) => {
    const folio = props.route.params.folio;
    const lista = props.route.params.lista;
    const [materiales, setMateriales] = useState(new Array());
    const [index, setIndex] = useState(0);
    const db = getDatabase();
    const auth = getAuth();

  const cargarMateriales = useCallback(async()=>{
        let x = 0;
        const variables = await get(child(ref(db), `foliosAsignados/${auth.currentUser.uid}/correctivo/activo/${folio}/materialesUsados/TP`))
        .then((snapshot) => {
          snapshot.forEach((element) => {
              materiales.push({
                key: x,
                titulo: element.key,
                cantidad: element.val().toString()
              });
            x = x + 1;
          });
          setIndex(x);
          // console.log('x: ' + x.toString());
          // console.log(index);
        }).catch(function (err) {
          console.log(err);
        });
    });

    useEffect(()=> {
      cargarMateriales();
    }, []);

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
      <View style={styles.contenedorPrincipal}>
        <ListaMateriales folio={folio} tipoMaterial={2} lista={lista} materiales={materiales} tamanio={index}></ListaMateriales>
      </View>
    );
  };
  
  export default MaterialesTP;
  
  const styles = StyleSheet.create({
    contenedorPrincipal: {
        backgroundColor: "white",
        width: "100%",
        height: "100%",
        paddingTop: 20,
      },
  });
  