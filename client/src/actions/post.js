/* global FormData */
import {
  COMMENT_ADDED,
  COMMENT_REMOVED,
  LIKES_UPDATED,
  POST_DELETED,
  POSTS_END_LOADING,
  POSTS_RECEIVED,
  POSTS_START_LOADING,
  RESET_RECEIVED_POSTS
} from '../utils/constants/actionsName'
import { Toastr } from '../utils/toastr/Toastr'
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

export const getPostsForHomePage = (page, size, isInitialRequest) => dispatch => {
  return getPosts(dispatch, '/posts', { page, size }, isInitialRequest)
}

export const getPostsForOwnProfile = (page, size, isInitialRequest) => dispatch => {
  return getPosts(dispatch, '/posts/profile', { page, size }, isInitialRequest)
}

export const getPosts = async (dispatch, url, params, isInitialRequest) => {
  dispatch({
    type: POSTS_START_LOADING
  })

  if (isInitialRequest) {
    dispatch({
      type: RESET_RECEIVED_POSTS
    })
  }

  try {
    const posts = await apiRequest.get(url, { params })
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
    Toastr.error('Something goes wrong! Please try again later')
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
    Toastr.error('Something goes wrong! Please try again later')
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
    Toastr.error('Something goes wrong! Please try again later')
  }
}

export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    const post = await apiRequest.delete('/posts/' + postId + '/comment/' + commentId)
    dispatch({
      type: COMMENT_REMOVED,
      payload: { postId, post }
    })
  } catch (e) {
    Toastr.error('Something goes wrong! Please try again later')
  }
}
