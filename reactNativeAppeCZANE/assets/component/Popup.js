import React from "react";
import { View, Text, Button } from "react-native";
import Modal from "react-native-modal";

const Popup = ({ isVisible, onClose, infoMessage }) => {
  return (
    <Modal isVisible={isVisible}>
      <View style={{ backgroundColor: "#fff", padding: 20 }}>
        <Text style={{ marginBottom: 5 }}>{infoMessage}</Text>
        <Button style={{}} color={"#197A6C"} title="Kapat ve Yeniden Dene" onPress={onClose} />
      </View>
    </Modal>
  );
};

export default Popup;
