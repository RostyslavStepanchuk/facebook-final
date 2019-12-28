import axios from 'axios'
import { Toastr } from '../utils/toastr/Toastr'
import { POSTS_END_LOADING, POSTS_RECIEVED, POSTS_START_LOADING } from '../utils/constants/actionsName'

export const createPost = (uploadForm, setUploadForm) => {
  const configMultipart = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  const configJson = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const saveImgToStorageRequests = uploadForm.imagesToUpload.map((img, i) => {
      const formData = new FormData()
      formData.append("file", img.file)
      return axios.post('/api/v1/storage/fake_upload', formData, configMultipart)
        .catch(()=> {
          uploadForm.imagesToUpload[i].uploadError = true
          setUploadForm({...uploadForm})
          return Promise.reject('Error during image ' + i + ' uploading')
        })
  })

  Promise.all(saveImgToStorageRequests)
    .then(result => {

      const body = {
        message: uploadForm.textToUpload,
        image: result.map(response => response.data)[0],
        showEveryone: true
      }
        return axios.post('/api/v1/posts', body, configJson)

      },
      reason => {

      Toastr.error("One or more images were not uploaded")
        return Promise.reject(reason)

      })
    .then(()=> {

      setUploadForm({
        imagesToUpload: [],
        textToUpload: ''
      })
      Toastr.success("Your post was created")
    })
}

export const getPostsForHomePage = () => async dispatch => {

  dispatch({
    type: POSTS_START_LOADING
  })

  try {
    const posts = await axios.get('/api/v1/posts')

    dispatch({
      type: POSTS_RECIEVED,
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
  const posts = await axios.get('/api/v1/posts')

  dispatch({
    type: POSTS_RECIEVED,
    payload: posts.data
  })

  dispatch({
    type: POSTS_END_LOADING
  })

}