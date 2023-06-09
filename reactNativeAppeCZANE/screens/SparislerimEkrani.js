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
import medicineCardForOrders from "../assets/component/medicineCardForOrders";
import { createIconSetFromFontello } from "react-native-vector-icons";
import getRequest from "../assets/component/getRequest";

export default function SparislerimEkrani({ navigation, route, params }) {
  const [medicines, setMedicines] = useState(route.params[0]);
  const [total, setTotal] = useState(route.params[1]);
  const [posts, setPosts] = useState([]);
  const [dataFiltered, setDataFiltered] = useState();

  const fetchPosts = async () => {
    const postsData = await getRequest(
      "http://eczanev2-dev.eu-central-1.elasticbeanstalk.com/api/getAllProducts"
    ); // url gelecek
    if (postsData) {
      doFilter(postsData, medicines);
      setPosts(postsData);
    }
  };
  useEffect(() => {
    console.log("Filreleme Yapilmasi Icin Istek Atti");
    fetchPosts();
  }, []);

  function doFilter(_posts, _medicines) {
    var newModelArr = [];
    var arrOfMedicinesId = [];
    _medicines.forEach((element) => {
      arrOfMedicinesId.push(element.id);
    });
    var filteredPost = _posts.filter((item) =>
      arrOfMedicinesId.includes(item.id)
    );
    filteredPost.map((obj1) => {
      var matchingObj = _medicines.find((obj2) => obj2.id === obj1.id);
      let tempResult = {
        medicines: obj1,
        count: matchingObj.count,
        pharmacyid: matchingObj.pharmacyid,
      };
      newModelArr.push(tempResult);
    });
    console.log(newModelArr);
    console.log(filteredPost);
    setDataFiltered(newModelArr);
  }
  return (
    <View style={globalStyles.screen}>
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={dataFiltered}
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
          renderItem={({ item }) => (
            <medicineCardForOrders
              navigation={navigation}
              route={route}
              params={item}
            />
          )}
        />
      </View>
      <TouchableOpacity style={styles.card}>
        <Text style={{ fontWeight: "bold", color: "white" }}>
          Toplam Fiyat:
        </Text>
        <Text style={{ fontWeight: "bold", color: "black", marginLeft: 5 }}>
          {total}
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
    borderRadius: 0,
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
