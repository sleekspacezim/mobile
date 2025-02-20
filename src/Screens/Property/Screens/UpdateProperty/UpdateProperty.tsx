import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';
import Screen from '@/src/Components/ScreenWrapper/Screen';

const UpdateProperty = () => {
  const { id } = useLocalSearchParams<{ id:string }>();
  return (
    <Screen>
      <Text>update</Text>
      <Text>{id}</Text>
    </Screen>
  )
}

export default UpdateProperty