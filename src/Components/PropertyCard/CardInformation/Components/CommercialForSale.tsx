import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ICommercialPropertyForSale } from '@/src/GlobalTypes/Property/Commercial/ForSaleTypes'

type Props = {
  property: ICommercialPropertyForSale
}

const CommercialForSaleInformation:React.FC<Props> = ({property}) => {
  return (
    <View>
      <Text>CommercialForSale</Text>
    </View>
  )
}

export default CommercialForSaleInformation

const styles = StyleSheet.create({})