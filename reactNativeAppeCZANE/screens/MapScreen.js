import React, { useState, useEffect } from "react";
import MapView, { Marker, Callout} from "react-native-maps";
import { StyleSheet, View, Dimensions, Text, Button, Image, TouchableOpacity } from "react-native";
import * as Location from 'expo-location';
import getRequest from "../assets/component/getRequest";



const Maps = () => {
    const [mapRegion, setMapRegion] = useState(null);
    const [plocations, setPharmacyLocations] = useState([]);
    const [address, setAddress] = useState([]);

    function stringAdress(item) {
        if (item != undefined) {
            return `${item.district} mah. ${item.street} cd. \nNo:${item.streetNumber} ${item.subregion}/${item.region}`;
        }
        else {
            return "Bilgi Bulunamadı";
        }
    }

    const userLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied.')
        }
        let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
        setMapRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        });
        console.log(location);
        const reverseGeocode = async () => {
            const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
                longitude: location.coords.longitude,
                latitude: location.coords.latitude
            });
            setAddress(reverseGeocodedAddress);
        };
        reverseGeocode();
    }

    // const handleMarkerPress = () => {
    //     console.log("anammmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm");
    //     const url = `https://www.google.com/maps/dir/?api=1&destination=${markerCoordinate.latitude},${markerCoordinate.longitude}`;
    //     Linking.openURL(url);
    //   };

    // function getAdressOfPharmacy(item){
    //     if (item != undefined || item !=null) {
    //         var reverseGeocodedAddress1 =  Location.reverseGeocodeAsync({
    //             longitude: item.longitude,
    //             latitude: item.latitude
    //         });
    //         return reverseGeocodedAddress1;
    //     }
    //     else {
    //         return undefined;
    //     }
    // }
    const handlePress = () => {
        console.log('Dairesel butona tıklandı!');
        userLocation();
      };
    
    useEffect(() => {
        const fetchPosts = async () => {
            const postsData = await getRequest('http://eczanev2-dev.eu-central-1.elasticbeanstalk.com/api/getAllocation'); // url gelecek
              if (postsData) {
                setPharmacyLocations(postsData);
              }
            };
        fetchPosts();
        userLocation();
    }, []);
    return (
        <View style={styles.container}>
            {/* <Button title='Get Location' style={{height:'300px', width: '100%'}} onPress={userLocation}></Button>  */}
            
            <MapView
                region={mapRegion}
                style={styles.map} initialRegion={{
                    latitude: 39.931533237686864,
                    longitude:  32.84678169173862,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}>
                 {mapRegion && <Marker coordinate={mapRegion}>
                 <Image source={require('../assets/homeLogo.png')} style={{height: 70, width:50 }} /> 
                     <Callout style={{height: 100, width:250}}>                        
                            <View>
                                <View>
                                    <Text style={{fontWeight: "bold"}}>{"Konum Bilgilerim"}</Text>
                                    <Text>{stringAdress(address[0])}</Text>
                                </View>
                            </View>
                     </Callout>    
                </Marker>}
                {plocations && plocations.map(item =>
                        <Marker key={item.latitude} coordinate={item}>
                            <Image source={require('../assets/pharmacyLogo.png')} style={{height: 50, width:50 }} />
                                <Callout style={{height: 100, width:250}}>
                                    <View>
                                        <View>
                                            <Text style={{fontWeight: "bold"}}>{item.eczaneismi}</Text>
                                            <Text>Telefon: {item.eczanetelefon}</Text>
                                            <Text>{item.eczaneadress}</Text>                                           
                                        </View>                                 
                                    </View>
                                </Callout>    
                        </Marker>  
                    )}                   
            </MapView>
            <TouchableOpacity style={styles.button} onPress={handlePress}>
                <Text style={styles.buttonText}>Konum Güncelle</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
    button: {
        width: 150,
        height: 40,
        borderRadius: 25,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        left: 20,
      },
      buttonText: {
        fontSize: 13,
        fontWeight: 'bold',
      },
});

export default Maps;