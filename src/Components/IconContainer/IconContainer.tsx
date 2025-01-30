import { StyleSheet, View } from 'react-native'
import React from 'react'

type Props = {
  children: React.ReactNode
}

const IconContainer:React.FC<Props> = ({children}) => {
  return (
    <View style={styles.container}>
      {children}
    </View>
  )
}

export default IconContainer

const styles = StyleSheet.create({
  container:{
    width:30,
    height:30,
    borderRadius:15,
    backgroundColor: "rgba(71,91,232,0.2)",
    alignItems:"center",
    justifyContent:"center"
  }
})