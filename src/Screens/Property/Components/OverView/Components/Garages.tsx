import React from 'react'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'

import IconContainer from '@/src/Components/IconContainer/IconContainer'
import RegularText from '@/src/Components/RegularText/RegularText'
import Row from '@/src/Components/Row/Row'
import ThemedText from '@/src/Components/ThemedText/ThemedText'
import { primary, red } from '@/src/Theme/Colors'
import { rowContainerStyles, iconSize } from '../../Shared/Styles'

type Props = {
  garageNumber:number
}

const Garages:React.FC<Props> = ({garageNumber}) => {
  return (
    <Row style={rowContainerStyles.rowContainer}>
      <IconContainer>
      <MaterialCommunityIcons name="garage-variant" size={iconSize} color={primary} />
      </IconContainer>
      <Row style={{ gap: 5 }}>
        <ThemedText type="subHeader">Garage:</ThemedText>
        {garageNumber>1?<RegularText>{garageNumber}</RegularText>:<FontAwesome name="remove" size={21} color={red} />}
      </Row>
    </Row>
  )
}

export default Garages