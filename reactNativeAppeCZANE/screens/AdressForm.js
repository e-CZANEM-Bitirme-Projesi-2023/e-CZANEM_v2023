import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Logo2PNG from "../assets/component/LogoPNG";
import CustomButton from "../assets/component/CustomButton";
import * as Location from "expo-location";
import Background from "../src/components/Background";
import Popup from "../assets/component/Popup";
import { Alert } from "react-native";


const { height } = Dimensions.get("window");

export default function AddressForm({ navigation, route }) {
  const [sepet, setSepet] = useState(route.params);
  const [neighborhood, setNeighborhood] = useState("");
  const [street, setStreet] = useState("");
  const [buildingNumber, setBuildingNumber] = useState("");
  const [floorNumber, setFloorNumber] = useState("");
  const [doorNumber, setDoorNumber] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [lat,setLat] = useState("");
  const [longt,setLongt] = useState("");
  const [address, setAddress] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const openPopup = () => {
    setIsVisible(true);
  };

  const closePopup = () => {
    setIsVisible(false);
    !stringAdress(address[0]);
  };
  const errorMessage =
    "Adres Bilgisi Bulunamadı, Butona Tekrardan Basabilir Veya Eliniz İle Adres Bilgisini Girebilirsiniz.";

  const handleSubmit = () => {
    if(city != "" && district !="" && neighborhood != "" && street !="" && buildingNumber !="" && floorNumber !="" && doorNumber !="" && phoneNumber !="")
    {
      console.log("Butona Basildi - Odeme Sayfasina Geciliyor");
      let adressString = `Kapı No:${doorNumber} Kat:${floorNumber} Bina No:${buildingNumber} ${street} ${neighborhood} ${district} ${city}`;
      const AdressAndBasketInfo ={
        urunler: sepet,
        adress: adressString,
        phonenumber: phoneNumber,
        lat: lat,
        longt: longt
      }
      navigation.push("PaymentScreen",AdressAndBasketInfo); // odeme ekranina kisinin bilgisi gonderilecek...
    }  
    else
    {
      Alert.alert('Bilgilendirme', 'Lütfen Tüm Alanları Doldurunuz !', [{ text: 'Tamam' }]);;
    }
  };

  function stringAdress(item) {
    if (item != undefined) {
      console.log(
        `${item.district} mah. ${item.street} cd. \nNo:${item.streetNumber} ${item.subregion}/${item.region}`
      );
      setDistrict(item.subregion);
      setStreet(item.street);
      setBuildingNumber(item.streetNumber);
      setCity(item.region);
      setNeighborhood(item.district);
      //counter = 0;
      return true;
    } else {
      openPopup();
      //Alert.alert(); //  alert olarak ekrana basilacak.
      return false;
    }
  }

  const userLocation = async () => {
    console.log("Butona Basildi, Adres bilgisi getiriliyor...");
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied.");
    }
    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });
    setLongt(location.coords.longitude);
    setLat(location.coords.latitude);
    //console.log(location);
    const reverseGeocode = async () => {
      const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,        
      });
      setAddress(reverseGeocodedAddress);
    };
    await reverseGeocode();
    // await new Promise(resolve => setTimeout(resolve, 4000)); //4 saniye beklet
    stringAdress(address[0]);
  };

  return (
    <ScrollView style={styles.containerDeneme}>
      <View style={{ height: height - 120, flex: 1 }}>
        <Background>
          <Popup
            isVisible={isVisible}
            onClose={closePopup}
            infoMessage={errorMessage}
          />

          <View
            style={{ flexDirection: "row", marginBottom: 20, marginTop: -50 }}
          >
            <Logo2PNG />
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.heading}>Adres Bilgilerini Giriniz</Text>
              <CustomButton
                title={"Adres Bilgimi Getir"}
                onPress={userLocation}
              ></CustomButton>
            </View>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Şehir"
            value={city}
            onChangeText={setCity}
          />
          <TextInput
            style={styles.input}
            placeholder="İlçe"
            value={district}
            onChangeText={setDistrict}
          />
          <TextInput
            style={styles.input}
            placeholder="Mahalle"
            value={neighborhood}
            onChangeText={setNeighborhood}
          />
          <TextInput
            style={styles.input}
            placeholder="Cadde"
            value={street}
            onChangeText={setStreet}
          />
          <TextInput
            style={styles.input}
            placeholder="Bina Numarası"
            value={buildingNumber}
            onChangeText={setBuildingNumber}
          />
          <TextInput
            style={styles.input}
            placeholder="Kat Numarası"
            value={floorNumber}
            onChangeText={setFloorNumber}
          />
          <TextInput
            style={styles.input}
            placeholder="Kapı Numarası"
            value={doorNumber}
            onChangeText={setDoorNumber}
          />
          <TextInput
            style={styles.input}
            placeholder="Telefon Numarası"
            value={phoneNumber}
            keyboardType="numeric"
            onChangeText={setPhoneNumber}
          />

          <TouchableOpacity style={styles.card} onPress={handleSubmit}>
            <Text style={{ fontWeight: "bold", color: "white" }}>
              Ödeme Ekranına Geç
            </Text>
          </TouchableOpacity>
        </Background>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#197A6C",
    marginBottom: 10,
    marginLeft: 10,
  },
  input: {
    height: 40,
    width: "80%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 4,
    elevation: 3,
  },
  card: {
    backgroundColor: "#197A6C",
    borderRadius: 20,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    position: "absolute",
    bottom: 5,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  containerDeneme: {
    flex: 1,
  },
});
