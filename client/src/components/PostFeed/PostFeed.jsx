import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPostsForHomePage, getPostsForProfile } from '../../actions/post'
import Post from '../Post/Post'
import Preloader from '../Preloader/Preloader'

const PostFeed = ({ loadPostsHomePage, loadPostsProfile, loading, origin, posts }) => {
  useEffect(() => {
    switch (origin) {
      case 'homepage':
        loadPostsHomePage()
        break
      case 'profile':
        loadPostsProfile()
        break
      default:
        throw new Error('PostFeed origin is not defined')
    }
  }, [origin, loadPostsHomePage, loadPostsProfile])

  const postComponents = posts.map(post => <Post post={post} key={post.id} />)
  const content = loading ? <Preloader /> : postComponents

  return (
    <div>
      {content}
    </div>
  )
}

PostFeed.propTypes = {
  loadPostsHomePage: PropTypes.func.isRequired,
  loadPostsProfile: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  origin: PropTypes.oneOf(['profile', 'homepage']).isRequired,
  posts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  posts: state.posts.posts,
  loading: state.posts.loading
})

const mapDispatchToProps = dispatch => {
  return {
    loadPostsHomePage: () => dispatch(getPostsForHomePage()),
    loadPostsProfile: () => dispatch(getPostsForProfile())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostFeed)
