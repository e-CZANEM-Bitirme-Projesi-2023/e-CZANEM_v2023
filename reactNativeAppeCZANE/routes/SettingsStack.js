import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Settings from "../screens/Settings";
import About from "../screens/About";
import ChangePassword from "../screens/ChangePassword";
import MyOrdersScreen from "../screens/MyOrdersScreen";
import Info from "../screens/Info";
import SparislerimEkrani from "../screens/SparislerimEkrani";

const Stack = createNativeStackNavigator();

const SettingsStack = () => (
  <Stack.Navigator
    initialRouteName="Settings"
    screenOptions = {{
      headerShown: true,
      headerTitleStyle: {
        fontWeight: "bold",
        textTransform: 'uppercase',
        color: '#444',
      },
      headerShadowVisible: false,
      animation:"fade"
    }}
  >
    <Stack.Screen
      name="Settings"
      options={({ navigation, route }) => ({
        title: "Hesabım",
      })}
    >
      {(props) => <Settings {...props}/>}
    </Stack.Screen>
    <Stack.Screen
      name="About"
      options={({ navigation, route }) => ({
        title: "Hakkımızda",
      })}
    >
      {(props) => <About {...props}/>}
    </Stack.Screen>


    <Stack.Screen
      name="ChangePassScreen"
      options={({ navigation, route }) => ({
        title: "Şifre Değiştir",
      })}
    >
      {(props) => <ChangePassword {...props}/>}
    </Stack.Screen>

    <Stack.Screen
      name="MyOrdersScreen"
      options={({ navigation, route }) => ({
        title: "Siparişlerim",
      })}
    >
      {(props) => <MyOrdersScreen {...props}/>}
    </Stack.Screen>
    
    <Stack.Screen
      name="SparislerimEkrani"
      options={({ navigation, route }) => ({
        title: "Siparişlerim ~Detay",
      })}
    >
      {(props) => <SparislerimEkrani {...props}/>}
    </Stack.Screen>
    
    <Stack.Screen
      name="Info"
      options={({ navigation, route }) => ({
        title: "Bilgilerim",
      })}
    >
      {(props) => <Info {...props}/>}
    </Stack.Screen>

  </Stack.Navigator>
);

export default SettingsStack;