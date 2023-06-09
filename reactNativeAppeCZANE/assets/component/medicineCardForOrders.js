import React from "react";
import { useState } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import medicineCategory from "../medicinesDB/medicineCategories";
import { Ionicons } from "@expo/vector-icons";
import "../globals/priceBasket";

var baseUrlString = "https://drive.google.com/uc?export=view&id=";

export default function medicineCardForOrders({ navigation, route, params }) {
  const [medicineP, setmedicine] = useState(params.medicines);
  const [count, setCount] = useState(params.count);
  const [pharmacyId, setPharmacyId] = useState(params.pharmacyid);

  const backgroundColor = medicineP.isreceteli === "true" ? "#F38E78" : "white";
  medicineP.image = baseUrlString + medicineP?.image1;
  const [medicineColor, setMedicineColor] = useState(() => {
    let result = medicineCategory.filter(({ name }) => name == medicineP.type[0])[0];
    return result != null
      ? result.color != null
        ? result.color
        : `red`
      : `pink`;
  });

  return (
    <View style={styles.cardWrapper}>
      <TouchableOpacity activeOpacity={0.8} style={styles.cardContainer}>
        <View style={styles.cardImageContainer}>
          <Image style={styles.cardImage} source={{ uri: medicineP.image }} />
        </View>
        <View
          style={[
            styles.cardmedicineColor,
            {
              borderColor: medicineColor,
            },
          ]}
        ></View>
        <View style={[styles.cardDetailsContainer, { backgroundColor }]}>
          <Text style={{ color: "#333", fontWeight: "bold", fontSize: 16 }}>
            {medicineP.name}
          </Text>
          <Text
            style={{
              color: "#444",
              fontStyle: "italic",
              fontSize: 12,
              marginTop: -4,
            }}
          >
            {medicineP.tagalog}
          </Text>
          <View style={styles.medicineTypeContainer}>
            <View style={styles.medicineType}>
              <Text style={styles.medicineTypeLabel}>{medicineP.type[0]}</Text>
            </View>
            {medicineP.type.length > 1 ? (
              <Text style={styles.medicineTypesLabel}>+{medicineP.type.length - 1}</Text>
            ) : null}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 20,
              }}
            >
              <Text style={styles.medicineTypeLabel}>
                Adet: {count}
              </Text>
            </View>
          </View>
          <Text
            style={[styles.medicineTypeLabel, { marginTop: 5 }]}
          >{`${medicineP.price} TL`}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  cardContainer: {
    height: 96,
    backgroundColor: "white",
    flexDirection: "row",
    elevation: 2,
    overflow: "hidden",
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    // borderWidth: 1,
    // borderColor: '#2221',
    // shadowColor: '#0008',
  },
  cardImageContainer: {
    height: 96,
    aspectRatio: 5 / 4,
    borderRadius: 8,
    overflow: "hidden",
  },
  cardImage: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
  cardmedicineColor: {
    position: "absolute",
    height: "100%",
    width: "100%",
    borderRightWidth: 3,
  },
  cardDetailsContainer: {
    // kontrol
    paddingVertical: 4,
    paddingHorizontal: 8,
    height: "100%",
    flex: 1,
  },
  medicineTypeContainer: {
    flexDirection: "row",
    marginTop: 8,
    alignItems: "center",
  },
  medicineType: {
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 2,
    borderRadius: 6,
    borderColor: "#888",
  },
  medicineTypeLabel: {
    fontSize: 10,
    color: "#888",
    fontWeight: "bold",
  },
  medicineTypesLabel: {
    fontSize: 8,
    color: "#888",
    fontWeight: "bold",
    aspectRatio: 1,
    padding: 4,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "#888",
    marginLeft: 6,
  },
  favButtonContainer: {
    padding: 8,
  },
});
