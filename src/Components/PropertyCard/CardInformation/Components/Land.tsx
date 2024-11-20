import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { ILandProperty } from '@/src/GlobalTypes/Property/Land/LandTypes'

type Props = {
  property:ILandProperty
}

const LandInformation:React.FC<Props> = ({property}) => {
  return (
    <View>
      <Text>LandInformation</Text>
    </View>
  )
}

export default LandInformation

const styles = StyleSheet.create({})