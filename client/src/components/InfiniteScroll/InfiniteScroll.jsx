import React, { useState } from 'react'
import PropTypes from 'prop-types'

const PAGE_SIZE = 10

const InfiniteScroll = ({
  contentArr,
  loadContentHandler,
  contentIsLoading,
  children }) => {
  const [ furtherDownloadIsBlocked, setFurtherDownloadBlocked ] = useState(false)
  const page = Math.floor(contentArr.length / PAGE_SIZE)

  const handleInfiniteScroll = () => {
    const element = InfiniteScroll.scrollDiv
    const scrolledDown = element.scrollHeight - element.offsetHeight - element.scrollTop < 100

    if (scrolledDown && !furtherDownloadIsBlocked && !contentIsLoading) {
      setFurtherDownloadBlocked(true)
      loadContentHandler(page, PAGE_SIZE, false)
      setTimeout(() => {
        setFurtherDownloadBlocked(false)
      }, 3000)
    }
  }

  return (
    <div
      ref={input => {
        InfiniteScroll.scrollDiv = input
      }}
      onScroll={handleInfiniteScroll}
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        overflowX: 'hidden',
        overflowY: 'scroll'
      }}
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
  userId: PropTypes.string
}

export default InfiniteScroll
