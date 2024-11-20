import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ICommercialRentalProperty } from '@/src/GlobalTypes/Property/Commercial/RentalTypes'

type Props = {
  property: ICommercialRentalProperty
}

const CommercialRentalsInformation:React.FC<Props> = ({property}) => {
  return (
    <View>
      <Text>CommercialRentals</Text>
    </View>
  )
}

export default CommercialRentalsInformation

const styles = StyleSheet.create({})