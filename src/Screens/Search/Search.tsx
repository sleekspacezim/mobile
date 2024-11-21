import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Screen from '@/src/Components/ScreenWrapper/Screen'
import ThemedText from '@/src/Components/ThemedText/ThemedText'
import { INoPropsReactComponent } from '@/src/GlobalTypes/Types'
import { useLocalSearchParams } from 'expo-router'
import { IPropertyType } from '@/src/GlobalTypes/Property/Common'

const Search:INoPropsReactComponent = () => {
  const {propertyType,location} = useLocalSearchParams<{propertyType:IPropertyType,location:string}>()
  return (
    <Screen>
      <ThemedText type='regular'>{propertyType+" "+location}</ThemedText>
    </Screen>
  )
}

export default Search

const styles = StyleSheet.create({})