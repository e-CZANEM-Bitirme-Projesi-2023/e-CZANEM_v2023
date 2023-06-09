import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { Icon } from "react-native-elements";
import medicineCard from "../assets/component/medicineCard";
import window from "../assets/controller/window";
import AppContext from "../assets/globals/appContext";
import globalStyles from "../assets/styles/globalStyles";

export default function Favorites({ navigation, route }) {
  const favorites = useContext(AppContext);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    get2globalArray(favorites.medicinesP);
  }, [favorites.medicinesP]);

  useEffect(() => {
    setTotalPrice(getTotalPrice);
  }, [favorites.medicinesP]);

  function get2globalArray(favorites) {
    for (let i = 0; i < favorites.length; i++) {
      let newProduct = {
        id: favorites[i].T1.id,
        price: favorites[i].T1.price,
        count: 1,
        pharmacyid: favorites[i].T2.pharmacyid,
      };
      let isFound = false;
      global.items.forEach((element) => {
        if (element.id == newProduct.id) {
          isFound = true;
        }
      });
      if (!isFound) {
        global.items.push(newProduct);
        console.log(
          `Eklendi ${newProduct.id} ${newProduct.count} ${newProduct.price}`
        );
        setTotalPrice(getTotalPrice);
      }
    }
    compareArraysAndDelete(favorites, global.items);
  }

  function compareArraysAndDelete(arr1, arr2) {
    arr2.forEach((item, i) => {
      if (!arr1.some((el) => el.T1.id === item.id)) {
        console.log(`Silindi ${item.id} ${item.price} ${item.count}`);
        setTotalPrice(getTotalPrice);
        arr2.splice(i, 1);
      }
    });
  }

  function getTotalPrice() {
    var result = 0;
    global.items.forEach((element) => {
      result = result + parseFloat(element.price) * element.count;
    });
    return result;
  }

  return (
    <View style={globalStyles.screen}>
      <View>
        {favorites?.medicinesP.length <= 0 ? (
          <View style={styles.emptyContainer}>
            <Icon
              type="ionicon"
              name="basket-outline" // degisecek logo
              size={window.width / 3 > 240 ? 240 : window.width / 3}
              color="#bbb"
            />
            <View style={styles.emptyLabelContainer}>
              <Text style={styles.emptyLabel}>Henüz Ürün Eklenmedi</Text>
              <Text style={styles.emptyLabelDetails}>
                Sepetinizde ürün bulunmuyor. Lütfen devam edebilmek için ürün
                ekleyin.
              </Text>
            </View>
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={favorites.medicinesP}
            ListHeaderComponent={() => (
              <View
                style={{
                  height: 12,
                }}
              ></View>
            )}
            ListFooterComponent={() => (
              <View
                style={{
                  height: 12,
                }}
              ></View>
            )}
            keyExtractor={(item) => item.T1.id}
            renderItem={({ item }) => (
              <medicineCard
                navigation={navigation}
                route={route}
                medicineP={item.T1}
                isSearch={false}
                setTotalPrice={setTotalPrice}
              />
            )}
          />
        )}
      </View>
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          if (global.items.length > 0) {
            console.log("Butona Basildi Sepet Dolu");
            navigation.push("AdressForm", global.items);
          }
          else(
            console.log("Butona Basildi Sepet Bos")
          )
        }}
      >
        <Text style={{ fontWeight: "bold", color: "white" }}>
          Toplam Fiyat:
        </Text>
        <Text style={{ fontWeight: "bold", color: "black", marginLeft: 5 }}>
          { // Kontrol et duzgun calisior mu?
          (Math.round(totalPrice * 100) / 100).toFixed(2)}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    padding: 32,
    height: window.height / 3 + 16,
    maxHeight: 480,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyLabelContainer: {
    marginVertical: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyLabel: {
    fontSize: window.width / 20 > 32 ? 32 : window.width / 20,
    fontWeight: "bold",
    color: "#888",
  },
  emptyLabelDetails: {
    textAlign: "center",
    marginVertical: 8,
    color: "#aaa",
    fontSize: window.width / 32 > 24 ? 24 : window.width / 32,
    width: window.width / 1.5,
    maxWidth: 480,
  },
  card: {
    backgroundColor: "#197A6C",
    borderRadius: 10,
    padding: 10,
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
    flexDirection: "row",
  },
});
