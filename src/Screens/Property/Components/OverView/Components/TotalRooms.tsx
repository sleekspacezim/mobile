import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'

import IconContainer from '@/src/Components/IconContainer/IconContainer'
import RegularText from '@/src/Components/RegularText/RegularText'
import Row from '@/src/Components/Row/Row'
import ThemedText from '@/src/Components/ThemedText/ThemedText'
import { primary } from '@/src/Theme/Colors'
import { rowContainerStyles, iconSize } from '../../Shared/Styles'

type Props = {
  rooms:number
}

const TotalRooms:React.FC<Props> = ({rooms}) => {
  return (
    <Row style={rowContainerStyles.rowContainer}>
      <IconContainer>
        <MaterialIcons name="meeting-room" size={iconSize} color={primary} />
      </IconContainer>
      <Row style={{ gap: 5 }}>
        <ThemedText type="subHeader">Total rooms:</ThemedText>
        <RegularText style={{marginTop:2}}>{rooms}</RegularText>
      </Row>
    </Row>
  )
}

export default TotalRooms