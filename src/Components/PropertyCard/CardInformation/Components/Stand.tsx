import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { IStandProperty } from '@/src/GlobalTypes/Property/Stand/StandTypes'

type Props = {
  property:IStandProperty
}

const StandInformation:React.FC<Props> = ({property}) => {
  return (
    <View>
      <Text>Stand</Text>
    </View>
  )
}

export default StandInformation

const styles = StyleSheet.create({})