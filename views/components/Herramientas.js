import {
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback,
    TextInput,
  } from "react-native";
  import { useState } from "react";
  import { useFonts as Fuentes } from "expo-font";
  import { createIconSetFromIcoMoon } from "@expo/vector-icons";
  import AppLoading from "expo-app-loading";
  import { useNavigation } from "@react-navigation/native";
  import { useFonts, Urbanist_400Regular } from "@expo-google-fonts/urbanist";
  import { getDatabase, child, get, ref, limitToFirst } from "firebase/database";
  import DateTimePicker from "react-native-modal-datetime-picker";
  
  const Herramientas = (props) => {
    const navigation = useNavigation();
    const [potenciaInicial, setPotenciaInicial] = useState('');
    const [potenciaFinal, setPotenciaFinal] = useState('');
    const [horario, setHorario] = useState(new Date());
    const [horarioText, setHorarioText] = useState('-- : --');
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    // console.log(selectorFecha);
    const showMode = (currentMode) =>{
      setShow(true);
      // setMode(currentMode);
    }

    const closeDatetimePicker = () => {
      setShow(false);
    };
  
    const handleSelectDate = (date) => {
      setHorario(date);
      // console.log(date.getMinutes());
      if (date.getMinutes() > 9) {
        setHorarioText(
          date.getHours().toString() +
            " : " +
            date.getMinutes().toString()
        );
      } else {
        setHorarioText(
          date.getHours().toString() +
            " : 0" +
            date.getMinutes().toString()
        );
      }
      closeDatetimePicker();
    };
  

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
      <View style={styles.contenedorHerramientas}>
        <View style={{ marginBottom: '5%' }}>
            <Text style={{ color: '#9DA9BB', fontWeight: 'bold', letterSpacing: 1, fontSize: 15, alignSelf: 'center' }}> 
                Herramientas del técnico
            </Text>
        </View>
        <View style={{ flexDirection: 'row', width: '100%', alignContent: 'center' }}>
            <View style={{ width: '50%', flexDirection: 'row', alignContent: 'center' }}>
                <View style={{ width: '52%', justifyContent:"center", paddingLeft: '5%' }}>
                    <Text style={{fontSize: 14}}>Potencia inicial</Text>
                </View>
                <View style={{ width: '48%' }}>
                    <TextInput
                        style={[styles.inputCustomizedInfo, {alignSelf: 'flex-start'}]}
                        underlineColor="transparent"
                        outlineColor="transparent"
                        activeOutlineColor="transparent"
                        selectionColor="transparent"
                        keyboardType="numeric"
                        autoFocus={false}
                        onChangeText={ (potenciaInicial) => setPotenciaInicial(potenciaInicial) }
                        value={potenciaInicial}
                        
                    ></TextInput>
                </View>
            </View>
            <View style={{ width: '50%', flexDirection: 'row' }}>
                <View style={{ width: '52%', justifyContent:"center" }}>
                    <Text style={{fontSize: 14, alignSelf: 'center'}}>Potencia final</Text>
                </View>
                <View style={{ width: '48%' }}>
                    <TextInput
                        style={[styles.inputCustomizedInfo]}
                        underlineColor="transparent"
                        outlineColor="transparent"
                        activeOutlineColor="transparent"
                        selectionColor="transparent"
                        keyboardType="numeric"
                        autoFocus={false}
                        onChangeText={ (potenciaFinal) => setPotenciaFinal(potenciaFinal) }
                        value={potenciaFinal}
                    ></TextInput>
                </View>
            </View>
        </View>
        <View style={{ flexDirection: 'row', width: '100%', alignContent: 'center', marginTop: '5%' }}>
          <View style={{ width: '50%' }}>
            <Text>Hora de la primera medición</Text>
          </View>
          <View style={{ width: '50%' }}>
            <TouchableWithoutFeedback
              onPress={() => {
                showMode('time');
                setHorario(new Date());
              }} 
            >
              <View style={ styles.contenedorBotonTimePicker }>
                <View style={{ width: '70%', alignItems: "center" }}>
                  <Text style={{ fontSize: 16 }}>
                    {horarioText}
                  </Text>
                </View>
                <View style={{ width: '30%' }}>
                  <Iconos name='reloj' size={38} style={ styles.iconoBoton }></Iconos>
                </View>
              </View>
            </TouchableWithoutFeedback>
            <DateTimePicker
              date={horario}
              isVisible={show}
              mode={'time'}
              is24Hour={true}
              timePickerModeAndroid={'spinner'}
              // locale="en_GB"
              onConfirm={handleSelectDate}
              // onChange={ (event, date) => {
              //   console.log('cambiaste hora');
              //   setHorario(date);
              // }}
              onCancel={() => {closeDatetimePicker(horario)}}
            />
          </View>
        </View>
      </View>
    );
  };
  
  export default Herramientas;
  
  const styles = StyleSheet.create({
    contenedorHerramientas: {
      width: "85%",
      marginTop: 20,
      marginBottom: 5,
      flex: 0,
    //   alignItems: "center",
      alignSelf: "center",
      backgroundColor: "white",
      borderRadius: 10,
    },
    inputCustomizedInfo: {
        height: 45,
        width: '85%',
        backgroundColor: '#EDF2F9',
        alignSelf: 'flex-end',
        fontSize: 15,
        borderRadius: 10,
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        borderBottomLeftRadius: 10,
        flex: 0,
        color: 'black',
        textAlign: "center",
    },
    iconoBoton: {
      color:'black',
      flex: 0, 
    },
    contenedorBotonTimePicker: {
      height: 45,
      width: '100%',
      alignItems: "center",
      flexDirection: 'row',
      backgroundColor: '#EDF2F9',
      borderRadius: 10
    },
  });
  