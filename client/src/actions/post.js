/* global FormData */
import {
  POSTS_END_LOADING,
  POSTS_RECEIVED,
  POSTS_START_LOADING,
  COMMENT_ADDED,
  LIKES_UPDATED,
  COMMENT_REMOVED,
  POST_DELETED
} from '../utils/constants/actionsName'
import apiRequest from '../utils/helpers/apiRequest'

export const uploadSingleImage = image => {
  const configMultipart = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  const formData = new FormData()
  formData.append('file', image.file)
  return apiRequest.post('/storage/upload', formData, configMultipart)
}

export const uploadImages = images => {
  const uploadImageRequests = images.map((img, i) => uploadSingleImage(img)
    .catch(() => { images[i].uploadError = true }))

  return Promise.all(uploadImageRequests)
    .then(resArr => {
      if (images.some(img => img.uploadError === true)) {
        return Promise.reject(images)
      }
      return Promise.resolve(resArr)
    })
}

export const createPost = (message, images, isShownToEveryone) => {
  const body = {
    message,
    image: images[0],
    showEveryone: isShownToEveryone
  }

  return apiRequest.post('/posts/profile', body)
    .then(() => window.location.reload())
}

export const getPostsForHomePage = () => async dispatch => {
  dispatch({
    type: POSTS_START_LOADING
  })

  try {
    const posts = await apiRequest.get('/posts')
    dispatch({
      type: POSTS_RECEIVED,
      payload: posts
    })
  } catch (e) {
    dispatch({
      type: POSTS_END_LOADING
    })
  }
}

export const getPostsForProfile = () => async dispatch => {
  dispatch({
    type: POSTS_START_LOADING
  })
  try {
    const posts = await apiRequest.get('/posts/profile')
    dispatch({
      type: POSTS_RECEIVED,
      payload: posts
    })
  } catch (e) {
    dispatch({
      type: POSTS_END_LOADING
    })
  }
}

export const deletePost = (postId) => async dispatch => {
  try {
    const post = await apiRequest.delete('/posts/' + postId)
    dispatch({
      type: POST_DELETED,
      payload: { postId, post }
    })
  } catch (e) {
    console.log(e)
  }
}

export const updateLikes = (postId) => async dispatch => {
  try {
    const post = await apiRequest.put('/posts/' + postId + '/like')
    dispatch({
      type: LIKES_UPDATED,
      payload: { postId, post }
    })
  } catch (e) {
    console.log(e)
  }
}

export const createComment = (postId, comment) => async dispatch => {
  const body = {
    message: comment
  }

  try {
    const post = await apiRequest.post('/posts/' + postId + '/comment', body)
    dispatch({
      type: COMMENT_ADDED,
      payload: { postId, post }
    })
  } catch (e) {
    console.log(e)
  }
}

export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    const post = await apiRequest.delete('/posts/' + postId + '/comment/' + commentId)
    console.log(postId)
    dispatch({
      type: COMMENT_REMOVED,
      payload: { postId, post }
    })
  } catch (e) {
    console.log(e)
  }
}
