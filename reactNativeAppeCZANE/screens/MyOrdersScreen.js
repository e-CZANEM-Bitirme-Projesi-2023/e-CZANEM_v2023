import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, TextInput } from "react-native";
import MyOrdersCard from "../assets/component/MyOrdersCard";
import getRequest from "../assets/component/getRequest";
import "../assets/globals/priceBasket";
const MyOrdersScreen = ({ navigation, routes }) => {
  const [searchText, setSearchText] = useState("");
  const [ordersDB, setOrdersDB] = useState();

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const fetchOrders = async () => {
    let url =
      "http://eczanev2-dev.eu-central-1.elasticbeanstalk.com/api/getOrdersForUsers?userid=" +
      global.userid;
    const getOrders = await getRequest(url);
    if (getOrders) {
      setOrdersDB(getOrders);
      return getOrders;
    }
  };

  useEffect(() => {
    //Ilk acildiginda istek at
    fetchOrders().catch((error) => {
      alert(error);
    });
  }, []);

  useEffect(() => {
    if (ordersDB) {
      fetchOrders().then((item) => {
        const filteredOrders = item.filter((order) =>
          order.orderid.toString().includes(searchText)
        );
        setOrdersDB(filteredOrders);
      });
    }
  }, [searchText]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Sipariş numarası ile ara"
          onChangeText={handleSearch}
          value={searchText}
        />
      </View>
      <FlatList
        data={ordersDB}
        keyExtractor={(item) => item.orderid}
        renderItem={(renderItem) => <MyOrdersCard navigation={navigation} route={routes} params={renderItem} />}
        style={styles.flatlist}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: -10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

export default MyOrdersScreen;
