import axios from 'axios'
import { Toastr } from '../utils/toastr/Toastr'
import { POSTS_END_LOADING, POSTS_RECEIVED, POSTS_START_LOADING } from '../utils/constants/actionsName'

export const uploadImages = images => {

  const configMultipart = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }

  const uploadImageRequests = images.map((img, i) => {
    const formData = new FormData()
    formData.append("file", img.file)
    return axios.post('/api/v1/storage/fake_upload', formData, configMultipart)
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

  const configJson = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = {
    message,
    image: images[0],
    showEveryone: isShownToEveryone
  }

  return axios.post('/api/v1/posts', body, configJson)
    .then(()=> window.location.reload(),
      ()=> Toastr.error("Error while creating post"))
}

export const getPostsForHomePage = () => async dispatch => {

  dispatch({
    type: POSTS_START_LOADING
  })

  try {
    const posts = await axios.get('/api/v1/posts')

    dispatch({
      type: POSTS_RECEIVED,
      payload: posts.data
    })

  } catch (e) {
    console.error(e.message)
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
    const posts = await axios.get('/api/v1/posts')

    dispatch({
      type: POSTS_RECEIVED,
      payload: posts.data
    })

  } catch (e) {
    console.error(e.message)
    dispatch({
      type: POSTS_END_LOADING
    })
  }
}