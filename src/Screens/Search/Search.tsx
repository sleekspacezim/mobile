import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Screen from '@/src/Components/ScreenWrapper/Screen'
import ThemedText from '@/src/Components/ThemedText/ThemedText'

type Props = {}

const Search = (props: Props) => {
  return (
    <Screen>
      <ThemedText type='regular'>Search</ThemedText>
    </Screen>
  )
}

export default Search

const styles = StyleSheet.create({})