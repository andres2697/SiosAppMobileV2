import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  TextInput,
  FlatList,
  // ScrollView
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import { useFonts as Fuentes } from "expo-font";
import { useState, useRef, useCallback, useEffect } from "react";

import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import { useFonts, Urbanist_400Regular } from "@expo-google-fonts/urbanist";
import EntradaConceptos from "./componentes/EntradaConceptos";
import Cab24 from "./componentes/Cab24";
import { getAuth } from "firebase/auth";
import { getDatabase, child, get, ref, set } from "firebase/database";

const Conceptos = (props) => {
  const folio = props.route.params.folio;
  let lista = props.route.params.lista;
  const [conceptos, setConceptos] = useState(new Array());
  const [listaConceptos, setListaConceptos] = useState(new Array());

  const [materialSeleccionado, setMaterialSeleccionado] = useState("default");
  const [habilitado, setHabilitado] = useState(true);
  // const [conceptosBD, setConceptosBD] = useState(new Array());
  const [index, setIndex] = useState(0);
  const db = getDatabase();
  const auth = getAuth();

  const cargarConceptos = useCallback(async()=>{
    let x = 0;
    // let lista = new Array();
    let i = 0;
    let arreglo2 = new Array();

    let consulta1 = await get(
      child(
        ref(db),
        `foliosAsignados/${auth.currentUser.uid}/correctivo/activo/${folio}/conceptosUsados`
      )
    )
      .then((snapshot) => {
        // console.log(snapshot);
        let i = 0;
        snapshot.forEach((element) => {
          // lista.push({title: element.key, id: i});
          // i = i + 1;
          if(element.key != 'CAB-024'){
            arreglo2.push({keyConceptos: i, titulo: element.key, cantidad: element.val()});
            i = i + 1;
          }
        });
      })
      .catch(function (err) {});

      // console.log(arreglo2);
      arreglo2.forEach((valor) => {
        lista = lista.filter((element)=>{
          // console.log('Lista: ');
          // console.log(lista);
          if(element.title != valor.titulo){
            return element;
          };
        });
      });

      setConceptos(arreglo2);
      setListaConceptos(lista);
  });

  useEffect(()=> {
    cargarConceptos();
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
    <ScrollView style={styles.contenedorPrincipal}>
      <View style={styles.contenedorPrincipal}>
        <View
          style={{
            paddingTop: 30,
            paddingBottom: 20,
            width: "85%",
            alignSelf: "center",
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "700" }}>
            Folio: {folio}
          </Text>
        </View>
        <View style={styles.contenedorCab24}>
          <Cab24 folio={folio}></Cab24>
        </View>
        <View>
          <EntradaConceptos
            folio={folio}
            lista={listaConceptos}
            conceptos={conceptos}
            // conceptosBD={conceptosBD}
            tamanio={index}
          ></EntradaConceptos>
        </View>
      </View>
    </ScrollView>
  );
};

export default Conceptos;

const styles = StyleSheet.create({
  contenedorConceptos: {
    width: "85%",
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 25,
    marginBottom: 35,
  },
  contenedorPrincipal: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    // paddingTop: 20,
    paddingBottom: "10%",
  },
  contenedorCab24: {
    width: "85%",
    flexDirection: "column",
    alignSelf: "flex-end",
    marginTop: 10,
    marginBottom: 15,
    marginRight: "7%",
  },
  contenedorMaterialesTP: {
    width: "85%",
    flexDirection: "column",
    alignSelf: "center",
    marginTop: 25,
    marginBottom: 35,
  },
});
