import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import KuryeAnaEkran from "../screens/KuryeAnaEkran";

const Stack = createNativeStackNavigator();

const KuryeStack = () => (
  <Stack.Navigator
    initialRouteName="KuryeAnaEkran"
    screenOptions = {{
      headerShown: true,
      headerTitleStyle: {
        fontWeight: "bold",
        textTransform: 'uppercase',
        color: '#444',
      },
    }}
  >
    <Stack.Screen
      name="KuryeAnaEkran"
      options={({ navigation, route }) => ({
        title: "Siparişler",
      })}
    >
      {(props) => <KuryeAnaEkran {...props}/>}
    </Stack.Screen>
    
  </Stack.Navigator>
);

export default KuryeStack;