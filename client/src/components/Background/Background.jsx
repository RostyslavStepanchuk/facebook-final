import React from 'react'
import PropTypes from 'prop-types'
import { BACKGROUND_COLOR } from '../../utils/constants/styleConstants'

const Background = ({ children }) => {
  return (
    <div style={{
      backgroundColor: BACKGROUND_COLOR,
      minHeight: 'calc(100vh - 100px)'
    }}>
      {children}
    </div>
  )
}

Background.propTypes = {
  children: PropTypes.array
}

export default Background
