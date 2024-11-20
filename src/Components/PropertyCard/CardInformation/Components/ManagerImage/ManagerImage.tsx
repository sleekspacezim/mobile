import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { imageBlurhash } from '@/src/Utils/Constants'

type Props = {
  uri:string
}

const ManagerImage:React.FC<Props> = ({uri}) => {
  return (
    <Image source={
      uri
        ? { uri: uri }
        : require("../../../../../../assets/images/emptyProfile.jpg")
    }
    placeholder={{ blurhash: imageBlurhash }}
    style={styles.container}
    />
  )
}

export default ManagerImage

const styles = StyleSheet.create({
  container:{
    width:50,
    height:50,
    borderRadius:25
  }
})