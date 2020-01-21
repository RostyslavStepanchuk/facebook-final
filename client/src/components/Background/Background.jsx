import React from 'react'
import PropTypes from 'prop-types'
import { BACKGROUND_COLOR } from '../../utils/constants/styleConstants'

const Background = ({ children }) => {
  return (
    <div style={{
      backgroundColor: BACKGROUND_COLOR,
      minHeight: 'calc(100vh - 65px)',
      position: 'relative'
    }}>
      {children}
    </div>
  )
}

Background.propTypes = {
  children: PropTypes.object
}

export default Background
