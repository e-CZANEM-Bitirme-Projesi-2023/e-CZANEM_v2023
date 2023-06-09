import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Image } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { useContext } from "react";
import globalStyles from "../assets/styles/globalStyles";
import window from "../assets/controller/window";
import { ScrollView } from "react-native";
import medicineViewType from "../assets/component/medicineViewType";
import medicineRecipe from "../assets/component/medicineRecipe";
import FavoriteButton from "../assets/component/favoriteButton";
import medicineInformation from "../assets/component/medicineInformation";
import AppContext from "../assets/globals/appContext";
import ComboBoxExample from "../assets/component/ComboBox";
import "../assets/globals/priceBasket";

function compareStrings(a, b) {
  a = a.toLowerCase();
  b = b.toLowerCase();

  return (a < b) ? -1 : (a > b) ? 1 : 0;
}
var baseUrlString = 'https://drive.google.com/uc?export=view&id='; 

export default function medicineView({ navigation, route }) {
  const [medicineP, setmedicine] = useState(route.params);
  const [medicineType, setmedicineType] = useState(medicineP.type);
  const [selectedPharmacy, setSelectedPharmacy] = useState(-1);
  const [isEnabledCombo, setIsEnabledCombo] = useState(true);
  const favorites = useContext(AppContext);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: medicineP.name,
    });
  }, [navigation, medicineP]);

  medicineType.sort(function(a, b) {
    return compareStrings(a, b);
  });
  useEffect(() => 
  {
    if(favorites?.favs.find((item) => item.T1.id == medicineP.id)){setIsEnabledCombo(false)}
    else{setIsEnabledCombo(true)}
  }, [favorites.favs]);

  return (
    <ScrollView style={ globalStyles.screen }>
      <View>
        <Image source={{uri: baseUrlString + medicineP.image1}} style={ styles.image } />
        {(selectedPharmacy != -1) || (favorites?.favs.find((item) => item.T1.id == medicineP.id)) ? ( //todoB burasi onemli
          <View style={ styles.favoriteButtonContainer }>
          <FavoriteButton productid={ medicineP.id } pharmacyId={selectedPharmacy} userid={global.userid}/>
          </View>
        ) : (null)}        
        <View style={ styles.comboBoxContainer }>
            <ComboBoxExample isEnabledCombo={isEnabledCombo} setSelected={setSelectedPharmacy} medicineId={(medicineP.id).toString()}></ComboBoxExample>
        </View>
      </View>
      <View style={ styles.articleContainer }>
        <View style={ styles.article }>
          <View style={ styles.medicineHeaderContainer }>
            <View style={ styles.medicineNameContainer }>
              <Text style={ styles.medicineName }>{ medicineP.name }</Text>
              <Text style={ styles.medicineTagalog }>({ medicineP.tagalog })</Text>
              <Text style={ [styles.medicineTagalog, {marginTop: 5}] }>{`${medicineP.price} TL`}</Text>
            </View>
          </View>
          <View style={ styles.divider }></View>
          <View style={ styles.medicineDescriptionContainer }>
            <Text style={ styles.medicineDescription }>{ medicineP.description }</Text>
            {medicineP.information != null ? (
              <View style={ styles.medicineInformationWrapper }>
                {medicineP.information.map((information, index) => {
                  return(
                    <medicineInformation key={ index } information={ information }/>
                  );
                })}
              </View>
            ) : (
              null
            )}
          </View>
          <View style={ styles.divider }></View>
          <Text style={ styles.medicineAuthor }>Uretici Firma: { medicineP.author }</Text>
          <View style={ styles.divider }></View>
          <ScrollView
            horizontal={ true }
            style={ styles.medicineTypesContainer }
            showsHorizontalScrollIndicator={ false }
          >
            <View style={{
              width: 16,
            }}></View>
            { medicineType.map((type, index) => {
              return(
                <medicineViewType key={ index } navigation={ navigation } route={ route } medicineType={ type }/>
              )
            })}
            <View style={{
              width: 16,
            }}></View>
          </ScrollView>
          <medicineRecipe recipe={ medicineP.recipe }/>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    height: window.width / 1.5,
    width: window.width,
    maxHeight: window.height / 2,
    resizeMode: "cover",
  },
  favoriteButtonContainer: {
    position: "absolute",
    backgroundColor: '#fff',
    padding: 6,
    elevation: 16,
    right: 12,
    bottom: 105,
    borderRadius: 100,
    aspectRatio: 1,
  },
  comboBoxContainer: {
    width:230,
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 100,
    right: 12,
    bottom: 44,
    elevation: 16,
  },
  articleContainer: {
    marginTop: -64,
    paddingTop: 32,
    flex: 1,
  },
  article: {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    backgroundColor: "#fff",
    elevation: 32,
    flex: 1,
    paddingBottom: window.height/4,
  },
  medicineHeaderContainer: {
    flexDirection: "row",
  }, 
  medicineNameContainer: {
    flex: 1,
    paddingHorizontal: 4,
    marginBottom: 8,
    marginTop: 8,
  },
  medicineName: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "#222",
  },
  medicineTagalog: {
    fontSize: 16,
    fontStyle: "italic",
    textAlign: "center",
    marginTop: -4,
    color: "#444",
  },
  medicineDescriptionContainer: {
    marginVertical: 12,
  },
  medicineDescription: {
    textAlign: "justify",
    fontSize: 16,
    paddingHorizontal: 16,
  },
  divider: {
    backgroundColor: "#0002",
    height: 1,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  medicineInformationWrapper: {
    marginTop: 12
  },
  medicineSocials: {
    marginHorizontal: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    margin: 8,
  },
  medicineSocialLogo: {
    marginHorizontal: 12,
  },
  medicineAuthor: {
    marginHorizontal: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 12,
    fontStyle: 'italic',
    color: "#444",
    fontWeight: 'bold',
  },
  medicineTypesContainer: {
    marginVertical: 0,
  },
});
