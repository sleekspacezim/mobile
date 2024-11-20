import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { IResidentialPropertyForSale } from '@/src/GlobalTypes/Property/Residential/ForSaleTypes'

type Props = {
  property:IResidentialPropertyForSale
}

const ResidentialForSaleInformation:React.FC<Props> = ({property}) => {
  return (
    <View>
      <Text>ResidentialForSale</Text>
    </View>
  )
}

export default ResidentialForSaleInformation

const styles = StyleSheet.create({})