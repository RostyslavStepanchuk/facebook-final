import React from 'react'
import { BACKGROUND_COLOR } from '../../utils/constants/styleConstants'

const Background = (props) => {
  return (
    <div style={{
      backgroundColor: BACKGROUND_COLOR,
      minHeight: 'calc(100vh - 100px)'
    }}>
      {props.children}
    </div>
  )
}

export default Background
