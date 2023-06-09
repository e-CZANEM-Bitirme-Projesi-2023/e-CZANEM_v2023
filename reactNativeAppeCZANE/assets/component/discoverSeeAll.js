import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { Icon } from "react-native-elements";


export default function DiscoverSeeAll({ navigation, route, medicineType }){
  return(
    <View style={ styles.seeAllWrapper }>
      <TouchableOpacity
        style={ styles.seeAllContainer }
        activeOpacity={ 0.5 }
        onPress={() => navigation.push('medicineCategory', medicineType)}
      >
        <Text style={ styles.seeAllLabel }>Deneme</Text>
        <Icon
          type="material-icons"
          name="navigate-next"
          color="#ff4040"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  seeAllWrapper: {
  },
  seeAllContainer: {
    backgroundColor: "#808080",
    borderWidth: 0.5,
    borderColor: "#4441",
    borderRadius: 64,
    overflow: "hidden",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 2,
    paddingLeft: 8,
    elevation: 2,
  },
  seeAllLabel: {
    color: "white",
    fontWeight: "bold",
  },
});