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

const Miscelaneos = (props) => {
  // console.log(props.route.params.tipoFolio);
  const folio = props.route.params.folio;
  const lista = props.route.params.lista;
  const tipoFolio = props.route.params.tipoFolio;
  const [materiales, setMateriales] = useState(new Array());
  const [index, setIndex] = useState(0);
  const db = getDatabase();
  const auth = getAuth();

  const cargarMateriales = useCallback(async()=>{
      let x = 0;
      const variables = await get(child(ref(db), `folios/correctivos/${tipoFolio}/${folio}/materialesUsados/miscelaneos`))
          .then((snapshot) => {
            // console.log(index);
            snapshot.forEach((element) => {
                materiales.push({
                  key: x,
                  titulo: element.key,
                  cantidad: element.val().toString()
                });
                x = x + 1;
            });
              setIndex(x);
          }).catch(function (err) {
            console.log(err);
          });
        });
        
        useEffect(()=> {
          cargarMateriales();
        }, []);
        
        // console.log(index);
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
        <ListaMateriales 
          folio={folio} 
          tipoMaterial={1} 
          lista={lista} 
          materiales={materiales} 
          tamanio={index} 
          tipoFolio={tipoFolio}
        ></ListaMateriales>
    </View>
  );
};

export default Miscelaneos;

const styles = StyleSheet.create({
  contenedorPrincipal: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    // paddingTop: 20,
  },
});
