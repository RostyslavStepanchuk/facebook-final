import {
  POSTS_END_LOADING,
  POSTS_RECEIVED,
  POSTS_START_LOADING,
  ADD_COMMENT,
  UPDATE_LIKES,
  REMOVE_COMMENT,
  DELETE_POST
} from '../utils/constants/actionsName'
import apiRequest from '../utils/helpers/apiRequest'

export const uploadImages = images => {

  const configMultipart = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }

  const uploadImageRequests = images.map((img, i) => {
    const formData = new FormData()
    formData.append("file", img.file)
    return apiRequest.post('/storage/fake_upload', formData, configMultipart)
      .catch(()=> {
        images[i].uploadError = true
      })
  })

  return Promise.all(uploadImageRequests)
    .then(resArr => {
      if (images.some(img => img.uploadError === true)){
        return Promise.reject(images)
      }
      return Promise.resolve(resArr.map(res => res.data))
    })
}

export const createPost = (message, images, isShownToEveryone) => {

  const body = {
    message,
    image: images[0],
    showEveryone: isShownToEveryone
  }

  return apiRequest.post('/posts/profile', body)
    .then(()=> window.location.reload())
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

export const deletePost = (postId) => async dispatch =>  {
  try {
    const posts = await apiRequest.delete('/posts/' + postId)
    dispatch({
      type: DELETE_POST,
      payload: posts
    })
  } catch (e) {
    console.log(e)
  }
}

export const updateLikes = (postId) => async dispatch =>  {
  try {
    const post = await apiRequest.put('/posts/' + postId + '/like')
    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, post }
    })
  } catch (e) {
    console.log(e)
  }
}

export const createComment = (postId, comment) => async dispatch => {
  const body = {
    message: comment,
  }

  try {
    const post = await apiRequest.post('/posts/' + postId + '/comment', body)
    dispatch({
      type: ADD_COMMENT,
      payload: { postId, post }
    })
  } catch (e) {
    console.log(e)
  }
}

export const deleteComment = (postId, commentId) => async dispatch => {
  console.log(postId)
  console.log(commentId)
  try {
    const post = await apiRequest.delete('/posts/' + postId + '/comment/'+ commentId)
    console.log(postId)
    dispatch({
      type: REMOVE_COMMENT,
      payload: { postId, post }
    })
  } catch (e) {
    console.log(e)
  }
}
