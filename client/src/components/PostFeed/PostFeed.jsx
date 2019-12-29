import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPostsForHomePage, getPostsForProfile } from '../../actions/post'
import Post from '../Post/Post'
import Preloader from '../Preloader/Preloader'

class PostFeed extends Component {

  componentDidMount () {
    switch (this.props.origin) {
      case 'homepage':
        this.props.loadPostsHomePage()
        break;
      case 'profile':
        this.props.loadPostsProfile()
        break;
      default:
        throw new Error("PostFeed origin is not defined")
    }
  }


  render() {

    const { posts, loading } = this.props
    const postComponents = posts.map(post => <Post post={post} key={post.id}/>);
    const content = loading ? <Preloader/> : postComponents;

    return (
      <div>
        {content}
      </div>
    )
  }
}

PostFeed.propTypes = {
  loadPostsHomePage: PropTypes.func.isRequired,
  loadPostsProfile: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  origin: PropTypes.oneOf(['profile', 'homepage']).isRequired
}

const mapStateToProps = state => ({
  posts: state.newsFeed.posts,
  loading: state.newsFeed.loading
})

const mapDispatchToProps = dispatch => {
  return {
    loadPostsHomePage: () => dispatch(getPostsForHomePage()),
    loadPostsProfile: () => dispatch(getPostsForProfile())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostFeed)