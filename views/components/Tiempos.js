import {
    StyleSheet,
    View,
    Text,
  } from "react-native";
  import { HelperText, TextInput as Paper } from "react-native-paper";
  import { useFonts as Fuentes } from "expo-font";
  import { createIconSetFromIcoMoon } from "@expo/vector-icons";
  import AppLoading from "expo-app-loading";
  import { useNavigation } from '@react-navigation/native';
  import { useFonts,Urbanist_400Regular } from "@expo-google-fonts/urbanist";
  
  const Tiempos = (props) => {

    const navigation = useNavigation();

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
      <View style={styles.infoTiempos}>
        <View style={styles.grayContainer}>
          <View style={{ alignItems: "center" }}>
            <HelperText style={styles.helperHoraInicio}>
              { props.data }
            </HelperText>
            <Text style={{ fontSize: 16 }}>{props.fecha}</Text>
          </View>
          <View style={{ justifyContent: "flex-end" }}>
            <Text style={{ fontSize: 16 }}>{props.hora}</Text>
          </View>
          <View style={{ justifyContent: "flex-end" }}>
            <Iconos name="calendario" size={40}></Iconos>
          </View>
        </View>
      </View>
    );

};

export default Tiempos;

const styles = StyleSheet.create({
    contenedorPrincipal: {
        width: "100%",
        height: "100%",
        fontFamily: 'Urbanist_400Regular',
        backgroundColor: 'white'
    },
    infoTiempos: {
        width: '85%', 
        backgroundColor: 'white', 
        elevation: 6, 
        alignSelf: "center", 
        padding: 7, 
        marginBottom: 10,
        borderRadius: 10,
        shadowColor: 'rgba(0, 0, 0, 0.4)',
        shadowOffset: {
            height: 8
        }
    },
    grayContainer:{
        backgroundColor: '#EDF2F9',
        paddingLeft: 4,
        paddingRight: 4,
        paddingTop: 3,
        paddingBottom: 5,
        // alignContent: 'space-between',
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    helperHoraInicio:{
        fontSize: 10,
        fontWeight: 'bold',
        // alignSelf: 'flex-start',
        alignItems:'flex-start',
        // alignSelf:'flex-start',
        justifyContent: 'flex-start',
    },  
});