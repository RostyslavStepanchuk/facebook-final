import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const PAGE_SIZE = 10

const InfiniteScroll = ({ contentArr, loadContent, contentIsLoading, children }) => {
  const [ furtherDownloadIsBlocked, setFurtherDownloadBlocked ] = useState(false)
  const page = Math.floor(contentArr.length / PAGE_SIZE)

  useEffect(() => {
    loadContent(0, PAGE_SIZE, true)
  }, [ loadContent ])

  const handleInfiniteScroll = () => {
    const element = InfiniteScroll.scrollDiv
    const scrolledDown = element.scrollHeight - element.offsetHeight - element.scrollTop < 100

    if (scrolledDown && !furtherDownloadIsBlocked && !contentIsLoading) {
      setFurtherDownloadBlocked(true)
      loadContent(page, PAGE_SIZE)
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
  loadContent: PropTypes.func.isRequired,
  contentIsLoading: PropTypes.bool.isRequired,
  children: PropTypes.object
}

export default InfiniteScroll
