import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Logo2PNG() {
  return <Image source={require('../logoMedi.png')} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: 110,
    height: 110,
    marginBottom: 8,
    borderRadius:20,
  },
})
