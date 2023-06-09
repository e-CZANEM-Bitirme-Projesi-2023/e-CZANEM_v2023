import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DiscoverStack from "./DiscoverStack";
import { useState, useEffect } from "react";
import AppContext from "../assets/globals/appContext";
import CategoriesStack from "./CategoriesStack";
import SearchStack from "./SearchStack";
import FavoritesStack from "./FavoritesStack";
import SettingsStack from "./SettingsStack";
import MapStack from "./MapStack";
import { Icon } from "react-native-elements";
import getRequest from "../assets/component/getRequest";
import { postRequest } from "../assets/component/postRequest";
import BarcodeStack from "./BarcodeStack";
import axios from "axios";

const Tab = createBottomTabNavigator();

export default function BottomNavigator({ route }) {
  const [favs, setFavs] = useState();
  const [medicinesP, setMedicinesP] = useState();
  const [userInfo, setUserInfo] = useState(route.params[0]);
  //console.log(`Kullanici adi: ${route.params["param1"]}`); //giris sayfasindan gelen veriler buraya aktarilacak
  const getData = async () => {
    try {
      let urlRequest =
        "http://eczanev2-dev.eu-central-1.elasticbeanstalk.com/api/getFavoritesProducts?id=" +
        userInfo.id;
      const value = await getRequest(urlRequest);
      return value != null ? value : [];
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    //--------------User Global Values--------------
    global.userid = userInfo.id;
    global.name = userInfo.name;
    global.surname = userInfo.surname;
    global.tc = userInfo.tc;
    global.adress = userInfo.address;
    global.password = userInfo.password;
    global.email =userInfo.email;
    global.phonenumber = userInfo.phonenumber;
    global.hastaliklar = userInfo.hastaliklar;
    var dateParts = userInfo.bdate.split("/");
    global.gun = dateParts[0];
    global.ay = dateParts[1];
    global.yil = dateParts[2];
    var candcParts = userInfo.candc.split("/");
    global.sehir = candcParts[0];
    global.ulke = candcParts[1];

    //--------------User Global Values End--------------
    getData()
      .then((data) => {
        setFavs(data != null ? data : []);
        setMedicinesP(data != null ? data : []);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  const addFavorites = (productid, pharmacyId, userid) => {
    try {
      const value = postRequest(
        "http://eczanev2-dev.eu-central-1.elasticbeanstalk.com/api/addNewFavoriteProduct", // gondermeden once kontrol edicek
        userid,
        productid,
        pharmacyId
      );
    } catch (e) {
      alert(e);
    }

    getData()
      .then((data) => {
        setFavs(data != null ? data : []);
        setMedicinesP(data != null ? data : []);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const clearFavorites = () => {
    getData()
      .then((data) => {
        setFavs(data != null ? data : []);
        setMedicinesP(data != null ? data : []);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const deleteFavorites = (productid, pharmacyId, userid) => {
    try {
      const value = postRequest(
        "http://eczanev2-dev.eu-central-1.elasticbeanstalk.com/api/deleteFavoriteProduct",
        userid,
        productid,
        pharmacyId
      );
    } catch (e) {
      alert(e);
    }

    getData()
      .then((data) => {
        setFavs(data != null ? data : []);
        setMedicinesP(data != null ? data : []);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const deleteAllFavoritesGivenUser = (userid) => {
    try {
      let url =
        "http://eczanev2-dev.eu-central-1.elasticbeanstalk.com/api/deleteAllFavoriteProduct?userid=" +
        userid;
      const value = getRequest(url);
    } catch (e) {
      alert(e);
    }
    getData()
      .then((data) => {
        setFavs(data != null ? data : []);
        setMedicinesP(data != null ? data : []);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const favorites = {
    favs: favs,
    medicinesP: medicinesP,
    addFavorites,
    clearFavorites,
    deleteFavorites,
    deleteAllFavoritesGivenUser,
  };

  return (
    <AppContext.Provider value={favorites}>
      <Tab.Navigator
        initialRouteName="DiscoverStack"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#36C464",
          tabBarActiveBackgroundColor: "#0801",
          tabBarStyle: {
            height: 70,
          },
          tabBarItemStyle: {
            paddingVertical: 12,
          },
        }}
      >
        <Tab.Screen
          name="DiscoverStack"
          component={DiscoverStack}
          options={{
            title: "Ürünler",
            tabBarIcon: (props) => (
              <Icon type="ionicon" name="bandage-outline" color={props.color} />
            ),
          }}
        />
        <Tab.Screen
          name="CategoriesStack"
          component={CategoriesStack}
          options={{
            title: "Kategoriler",
            tabBarIcon: (props) => (
              <Icon type="ionicon" name="grid-outline" color={props.color} />
            ),
          }}
        />
        <Tab.Screen
          name="BarcodeStack"
          component={BarcodeStack}
          options={{
            title: "Reçeteli Ürün Satışı",
            tabBarIcon: (props) => (
              <Icon type="ionicon" name="barcode-outline" color={props.color} />
            ),
          }}
        />
        <Tab.Screen
          name="SearchStack"
          component={SearchStack}
          options={{
            title: "Arama",
            tabBarIcon: (props) => (
              <Icon type="material-icons" name="search" color={props.color} />
            ),
          }}
        />
        <Tab.Screen
          name="FavoritesStack"
          component={FavoritesStack}
          options={{
            title: "Sepet",
            tabBarIcon: (props) => (
              <Icon type="ionicon" name="basket-outline" color={props.color} />
            ),
          }}
        />
        <Tab.Screen
          name="MapStack"
          component={MapStack}
          options={{
            title: "Harita",
            tabBarIcon: (props) => (
              <Icon type="material-icons" name="map" color={props.color} />
            ),
          }}
        />
        {<Tab.Screen
          name="SettingsStack"
          component={SettingsStack}
          options={{
            title: "Hesabım",
            tabBarIcon: (props) => (
              <Icon type="ionicon" name="person-circle-outline" color={props.color} />
            ),
          }}
        />}
      </Tab.Navigator>
    </AppContext.Provider>
  );
}
