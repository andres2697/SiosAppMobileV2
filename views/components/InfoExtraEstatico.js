import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    ActivityIndicator,
    ToastAndroid,
    TouchableWithoutFeedback,
    Animated,
    TextInput,
    ScrollView
  } from "react-native";
  import { useEffect, useState } from "react";
  import { HelperText, TextInput as Paper } from "react-native-paper";
  import { useFonts as Fuentes } from "expo-font";
  import { createIconSetFromIcoMoon } from "@expo/vector-icons";
  import AppLoading from "expo-app-loading";
  import { signInWithEmailAndPassword } from "firebase/auth";
  import Toast from 'react-native-root-toast';
  import { useNavigation } from '@react-navigation/native';
  import { useFonts,Urbanist_400Regular } from "@expo-google-fonts/urbanist";

  
  const InfoExtraEstatico = (props) => {

    const navigation = useNavigation();
    const [infoData, setInfoData] = useState(props.infoData);

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

    useEffect(()=>{
      return ()=> {}
    }, [infoData]);
    
    if (!iconsLoaded || !fontsLoaded) {
        return <AppLoading />;
    }
    
    return (
      <View style={styles.contenedorComponente}>
        <View style={styles.contenedorInfo}>
          <View style={styles.contenedorInfoInterno}>
            <View style={styles.subtituloVerticalCenter}>
              <Text style={styles.subtitulo}>Folio</Text>
            </View>
            <View>
              <Paper
                style={styles.inputCustomized}
                underlineColor="transparent"
                autoFocus={false}
                onChangeText={() => {}}
                value={infoData.folio}
                editable={false}
              ></Paper>
            </View>
            <View style={styles.subtituloVerticalCenter}>
              <Text style={styles.subtitulo}>Tipo</Text>
            </View>
            <View>
              <Paper
                style={styles.inputCustomized}
                underlineColor="transparent"
                autoFocus={false}
                onChangeText={() => {}}
                value={infoData.tipoFolio}
                editable={false}
              ></Paper>
            </View>
          </View>
        </View>

        <View>
          <View
            style={{height: 238}}
          >
            <View style={styles.infoExtra}>
              {/* <Text> Componente </Text> */}
              <View style={styles.columnas}>
                <HelperText style={styles.helper}>Distrito</HelperText>
                <TextInput
                  style={[styles.inputCustomizedInfo, { marginBottom: "2%" }]}
                  underlineColor="transparent"
                  outlineColor="transparent"
                  activeOutlineColor="transparent"
                  selectionColor="transparent"
                  autoFocus={false}
                  onChangeText={() => {}}
                  value={infoData.distrito}
                  editable={false}
                  multiline={true}
                ></TextInput>
                <HelperText style={styles.helper}>Falla</HelperText>
                <TextInput
                  style={[styles.inputCustomizedInfo, { marginBottom: "2%" }]}
                  underlineColor="transparent"
                  outlineColor="transparent"
                  activeOutlineColor="transparent"
                  selectionColor="transparent"
                  autoFocus={false}
                  onChangeText={() => {}}
                  value={infoData.falla}
                  editable={false}
                  multiline={true}
                ></TextInput>
                <HelperText style={styles.helper}>Clientes afectados</HelperText>
                <TextInput
                  style={[styles.inputCustomizedInfo]}
                  underlineColor="transparent"
                  outlineColor="transparent"
                  activeOutlineColor="transparent"
                  selectionColor="transparent"
                  autoFocus={false}
                  onChangeText={() => {}}
                  value={infoData.clientesAfectados.toString()}
                  editable={false}
                  multiline={true}
                ></TextInput>
              </View>
              <View style={styles.columnas}>
                <HelperText style={styles.helper}>Cluster</HelperText>
                <TextInput
                  style={[styles.inputCustomizedInfo, { marginBottom: "2%" }]}
                  underlineColor="transparent"
                  outlineColor="transparent"
                  activeOutlineColor="transparent"
                  selectionColor="transparent"
                  autoFocus={false}
                  onChangeText={() => {}}
                  value={infoData.cluster}
                  editable={false}
                  multiline={true}
                ></TextInput>
                <HelperText style={styles.helper}>Causa/afectación</HelperText>
                <TextInput
                  style={[styles.inputCustomizedInfo]}
                  underlineColor="transparent"
                  outlineColor="transparent"
                  activeOutlineColor="transparent"
                  selectionColor="transparent"
                  autoFocus={false}
                  onChangeText={() => {}}
                  value={infoData.causa}
                  editable={false}
                  multiline={true}
                ></TextInput>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }

export default InfoExtraEstatico;

const styles = StyleSheet.create({
    contenedorComponente: {
        width:'85%',
        // height: '',
        justifyContent: 'flex-start',
        alignSelf: "center"
    },
    contenedorInfo:{
        width: '100%',
        alignSelf: "center",
        backgroundColor: 'white',
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 10,
        marginTop: '5%',
        elevation: 3,
        zIndex:90
    },
    contenedorInfoInterno:{
        width: '90%',
        alignSelf: "center",
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    subtitulo:{
        fontSize: 16
    },
    inputCustomized: {
        height: 20,
        width: '100%',
        backgroundColor: '#EDF2F9',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: '1%',
        paddingRight: '1%',
        borderRadius: 10,
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
    },
    subtituloVerticalCenter: {
        flexDirection: 'column',
        alignSelf: "center"
    },
    contenedorExpandirMas: {
        width: '20%', 
        height: 35,
        backgroundColor: 'white', 
        flexDirection: "column",
        alignItems: 'center',
        alignSelf: 'center',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        elevation: 3,
        zIndex: 1
    },
    infoExtra: {
        width: '100%',
        height: '100%',
        elevation: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 15,
        paddingLeft: '5%',
        paddingRight: '5%',
        paddingBottom: '5%',
        paddingTop: '3%',
        justifyContent: 'space-between',
    },
    columnas: {
        width: '47%',
        height: '100%',
    },
    inputCustomizedInfo: {
        height: 55,
        width: '100%',
        backgroundColor: 'rgba(157, 169, 187, 0.2)',
        marginTop: '-9%',
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 10,
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        borderBottomLeftRadius: 10,
        flex: 0,
        color: 'black',
        textAlign: "center",
        // letterSpacing: 0.5
    },
    helper: {
        fontWeight: "bold",
        color: 'black',
        fontSize: 11
    },
    contenedorTitulo: {    
      width: '100%',
      paddingTop: '5%',
      width:'85%',
      // height: '',
      justifyContent: 'flex-start',
      alignSelf: "flex-start"
  },
  titulo:{
    fontSize: 20,
    fontWeight: "bold",
  },
});