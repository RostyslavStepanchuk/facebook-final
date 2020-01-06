import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import useStyles from './postsListStyles'

import PostAuthor from './PostAuthor/PostAuthor'
import PostComments from './PostComments/PostComments'
import { loadPosts } from '../../actions/auth'

const PostsList = ({ posts, loadPosts }) =>  {
  useEffect(()=> loadPosts(), [ loadPosts ])

  const classes = useStyles()

  const postsArray = posts.map(post =>
    <div key={post.id} className={classes.posts_item}>
      <PostAuthor author={post.author} />
      <img src={post.image} className={classes.post_img} alt='Post' />
      <PostComments comments={post.comments} />
    </div>
  )

  return (
    <Fragment className={classes.posts}>
      {postsArray}
    </Fragment>
  )
}

PostsList.propTypes = {
  posts: PropTypes.array,
  loadPosts: PropTypes.func
}

const mapStateToProps = state => ({
  posts: state.auth.posts,
})

const mapDispatchToProps = dispatch => {
  return {
    loadPosts: ()=>dispatch(loadPosts()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList)