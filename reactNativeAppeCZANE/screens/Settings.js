import React, { useContext } from "react";
import { useState } from "react";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { Icon } from "react-native-elements";
import globalStyles from "../assets/styles/globalStyles";
import AppContext from "../assets/globals/appContext";

export default function Settings({ navigation, routes }) {
  const favorites = useContext(AppContext);
  const [clearFavoritesModal, setClearFavoritesModal] = useState(false);
  
  return(
    <ScrollView style={ globalStyles.screen }>
      <View style={ styles.settingsContainer }>

      <TouchableOpacity
          activeOpacity={ 0.75 }
          style={ styles.settingContainer }
          onPress={() => navigation.push("Info")}
        >
          <View style={ styles.settingIconContainer }>
            <Icon
              type="ionicon"
              name="body-outline"
              color="#444"
            />
          </View>
          <Text style={ styles.settingLabel }>Bilgilerim</Text>
        </TouchableOpacity>

      <TouchableOpacity
          activeOpacity={ 0.75 }
          style={ styles.settingContainer }
          onPress={() => navigation.push("MyOrdersScreen")}
        >
          <View style={ styles.settingIconContainer }>
            <Icon
              type="ionicon"
              name="receipt-outline"
              color="#444"
            />
          </View>
          <Text style={ styles.settingLabel }>Siparişlerim</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={ 0.75 }
          style={ styles.settingContainer }
          onPress={() => navigation.push("ChangePassScreen")}
        >
          <View style={ styles.settingIconContainer }>
            <Icon
              type="ionicon"
              name="key-outline"
              color="#444"
            />
          </View>
          <Text style={ styles.settingLabel }>Şifreyi Değiştir</Text>
        </TouchableOpacity>


        <TouchableOpacity 
          activeOpacity={ 0.75 }
          style={ styles.settingContainer }
          onPress={() => navigation.push("About")}
        >
          <View style={ styles.settingIconContainer }>
            <Icon
              type="material-icons"
              name="info-outline"
              color="#444"
            />
          </View>
          <Text style={ styles.settingLabel }>Hakkımızda</Text>
        </TouchableOpacity>



      </View>
    
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  settingsContainer: {
    margin: 8,
    marginTop: -10
  },
  settingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#2222',
    paddingVertical: 4,
    marginVertical: 4,
  },
  settingIconContainer: {
    padding: 4,
    paddingRight: 16,
  },
  settingLabel: {
    fontSize: 16,
    color: '#222',
  },
});