import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

const InfiniteScroll = ({
  contentArr,
  loadContentHandler,
  contentIsLoading,
  size = 10,
  children,
  isReverseDirection = false,
  throttleDelay = 3000,
  scrollContainerStyles,
  isLastPage = false
}) => {
  const [ furtherDownloadIsBlocked, setFurtherDownloadBlocked ] = useState(false)
  const page = Math.floor(contentArr.length / size)
  let scrolledFromBottom = useRef(0)

  useEffect(() => {
    if (isReverseDirection) {
      const element = InfiniteScroll.scrollDiv
      element.scrollTop = element.scrollHeight - scrolledFromBottom.current
    }
  })

  const handleInfiniteScroll = () => {
    const element = InfiniteScroll.scrollDiv

    const scrolled = isReverseDirection
      ? element.scrollTop === 0
      : element.scrollHeight - element.offsetHeight - element.scrollTop < 100

    if (scrolled &&
    !furtherDownloadIsBlocked &&
    !contentIsLoading &&
    !isLastPage) {
      setFurtherDownloadBlocked(true)
      scrolledFromBottom.current = element.scrollHeight
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
  scrollContainerStyles: PropTypes.object.isRequired,
  isLastPage: PropTypes.bool
}

export default InfiniteScroll
