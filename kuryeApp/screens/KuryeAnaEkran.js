import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import KuryeCard from "../assets/component/KuryeCard";
import { Icon } from "react-native-elements";
import getRequest from "../assets/component/getRequest";

const OrdersScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [ordersDB, setOrdersDB] = useState();

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const fetchOrders = async () => {
    let url =
      "http://eczanev2-dev.eu-central-1.elasticbeanstalk.com/api/getAllOrdersKurye";
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

  const handlePress = (orderNumber, delivered) => {
    console.log(`Order ${orderNumber} delivered`);
    console.log(delivered.toString());
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Sipariş numarası ile ara"
          onChangeText={handleSearch}
          value={searchText}
        />
        <TouchableOpacity activeOpacity={0.5} onPress={() => fetchOrders()}>
          <Icon
            type="ionicon"
            name="repeat" //facoriden cikarildiginida burasi
            color="black"
            size={35}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.line} />
      <Text style={styles.title}>Siparişler</Text>
      <FlatList
        data={ordersDB}
        keyExtractor={(item) => item.pkeys}
        renderItem={(renderItem) => <KuryeCard params={renderItem} />}
        style={styles.flatlist}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
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
  titleSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: "#fea11e",
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#197A6C",
    marginBottom: 10,
    marginLeft: 3,
  },
  itemContainer: {
    backgroundColor: "#ffce45",
    padding: 16,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  orderNumber: {
    fontWeight: "bold",
    marginBottom: 8,
    color: "#a0461b",
  },
  address: {
    marginBottom: 4,
    color: "#a0461b",
  },
  date: {
    fontStyle: "italic",
    marginBottom: 4,
    color: "#a0461b",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    marginTop: 12,
    borderTopColor: "rgba(255, 255, 255, 0.5)",
  },
  button: {
    backgroundColor: "#fea11e",
    marginTop: 20,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  addressButton: {
    backgroundColor: "#5ab779",
    marginTop: 20,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: "#fefff3",
    fontWeight: "bold",
  },
  buttonDisabled: {
    backgroundColor: "#dbcfbf",
  },
  buttonTextDisabled: {
    color: "#242424",
  },
});

export default OrdersScreen;
