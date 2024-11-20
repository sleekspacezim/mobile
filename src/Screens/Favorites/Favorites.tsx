import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Screen from '@/src/Components/ScreenWrapper/Screen'
import ThemedText from '@/src/Components/ThemedText/ThemedText'

type Props = {}

const Favorites = (props: Props) => {
  return (
    <Screen>
      <ThemedText type='regular'>Favorites</ThemedText>
    </Screen>
  )
}

export default Favorites

const styles = StyleSheet.create({})