import React from "react";
import LoginMainScreen from "./loginProject/loginMainScreen";
import { NavigationContainer } from "@react-navigation/native";
import KuryeCard from "./assets/component/KuryeCard";
import OrdersScreen from "./screens/KuryeAnaEkran";
import { LoginScreen, StartScreen } from "./src/screens";

//-------Login Icin Gerekli Olanlar----------------

export default function App() {
  //       <BottomNavigator />  eklenicek ama nasil bakalim...
  //<AppContext.Provider value={favorites} >

  //</AppContext.Provider>
  return (
    //<HelloWorldApp></HelloWorldApp>
    <NavigationContainer>
      <LoginMainScreen></LoginMainScreen>
    </NavigationContainer>
    //<AddressForm></AddressForm>
  );
}
