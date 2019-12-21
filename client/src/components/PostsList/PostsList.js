import React, { Component, Fragment} from 'react'
import { connect } from 'react-redux'
import PostAuthor from './PostAuthor/PostAuthor'
import PostComments from './PostComments/PostComments'
import useStyles from './postsListStyles'

// https://s3.us-west-2.amazonaws.com/fs-8/1576923750814-avatar.jpg
// https://s3.us-west-2.amazonaws.com/fs-8/1576923813421-avatar-bg.jpg
// https://s3.us-west-2.amazonaws.com/fs-8/1576923867246-christian.jpg
// https://s3.us-west-2.amazonaws.com/fs-8/1576923900764-kendall.jpg
// https://s3.us-west-2.amazonaws.com/fs-8/1576923927251-bg.jpg

const PostsList = () =>  {
  const classes = useStyles()

  return (
    <Fragment className={classes.posts}>
      <div key={1} className={classes.posts_item}>
        <div className={classes.user}>
          <img className={classes.user_photo} src='https://s3.us-west-2.amazonaws.com/fs-8/1576923750814-avatar.jpg' alt='User' />
          <div className={classes.user_name}>
            <p className={classes.user_fullname}>user_fullname</p>
            <p className={classes.post_date}>post_date</p>
          </div>
        </div>
        <img src='https://s3.us-west-2.amazonaws.com/fs-8/1576923927251-bg.jpg' className={classes.post_img} alt='Post' />
        <div className={classes.comments}>
          <div className={classes.comment}>
            <p className={classes.comment_text}><span className={classes.comment_author}>comment_author</span>comment_text</p>
            <p className={classes.comment_date}>comment_date</p>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default PostsList

//
// class PostsList extends Component {
//   render() {
//     const { userPosts } = this.props
//
//     const posts = userPosts.map(post =>
//       <div key={post.author + post.date} className='posts_item'>
//         <PostAuthor author={post.author} />
//         <img src={post.src} className='post_img' alt='Post' />
//         <PostComments post={post} />
//       </div>
//     )
//     return (
//       <div className='posts'>
//         {posts}
//       </div>
//     )
//   }
// }
//
// const mapStateToProps = (state) => {
//   return {
//     userPosts: state.userPosts,
//   }
// }
//
// const mapDispatchToProps = (dispatch) => {
//   return {
//
//   }
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(PostsList)



