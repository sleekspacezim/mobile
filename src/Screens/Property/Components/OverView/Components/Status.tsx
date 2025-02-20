import React from 'react'
import { AntDesign } from '@expo/vector-icons'

import IconContainer from '@/src/Components/IconContainer/IconContainer'
import Row from '@/src/Components/Row/Row'
import ThemedText from '@/src/Components/ThemedText/ThemedText'
import { IStatus } from '@/src/GlobalTypes/Property/Common'
import { primary } from '@/src/Theme/Colors'
import { rowContainerStyles, iconSize } from '../../Shared/Styles'
import RegularText from '@/src/Components/RegularText/RegularText'

type Props = {
  status:IStatus
}

const Status: React.FC<Props> = ({ status }) => {
  return (
    <Row style={rowContainerStyles.rowContainer}>
      <IconContainer>
      <AntDesign name="questioncircleo" size={iconSize} color={primary} />
      </IconContainer>
      <Row style={{ gap: 5 }}>
        <ThemedText type="subHeader">Status:</ThemedText>
        <RegularText style={{ marginTop: 2 }}>{status}</RegularText>
      </Row>
    </Row>
  )
}

export default Status