import React, { useState } from 'react'
import PropTypes from 'prop-types'

const InfiniteScroll = ({
  contentArr,
  loadContentHandler,
  contentIsLoading,
  size = 10,
  children,
  isReverseDirection = false,
  throttleDelay = 3000,
  scrollContainerStyles
}) => {
  const [ furtherDownloadIsBlocked, setFurtherDownloadBlocked ] = useState(false)
  const page = Math.floor(contentArr.length / size)
  let prev = 0

  let scrollDirection = null
  const handleInfiniteScroll = () => {
    const element = InfiniteScroll.scrollDiv
    if (prev > element.scrollTop) {
      scrollDirection = 'UP'
    } else {
      scrollDirection = 'DOWN'
    }

    prev = element.scrollTop
    const scrolled = isReverseDirection
      ? element.scrollTop < 50
      : element.scrollHeight - element.offsetHeight - element.scrollTop < 100

    const isRightDirection = isReverseDirection
      ? scrollDirection === 'UP'
      : true

    if (scrolled &&
    !furtherDownloadIsBlocked &&
    !contentIsLoading &&
    isRightDirection) {
      setFurtherDownloadBlocked(true)
      loadContentHandler(page, size, false)
      setTimeout(() => {
        setFurtherDownloadBlocked(false)
      }, throttleDelay)
    }
  }

  return (
    <div
      ref={input => {
        InfiniteScroll.scrollDiv = input
      }}
      onScroll={handleInfiniteScroll}
      style={scrollContainerStyles}
    >
      {children}
    </div>
  )
}

InfiniteScroll.propTypes = {
  contentArr: PropTypes.array.isRequired,
  loadContentHandler: PropTypes.func.isRequired,
  contentIsLoading: PropTypes.bool.isRequired,
  children: PropTypes.object,
  isOwnProfileViewMode: PropTypes.bool,
  userId: PropTypes.string,
  size: PropTypes.number,
  isReverseDirection: PropTypes.bool,
  throttleDelay: PropTypes.number,
  scrollContainerStyles: PropTypes.object.isRequired
}

export default InfiniteScroll
