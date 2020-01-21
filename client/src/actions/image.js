import { PHOTOS_END_LOADING, PHOTOS_START_LOADING, USER_PHOTOS_RECEIVED } from '../utils/constants/actionsName'
import apiRequest from '../utils/helpers/apiRequest'

export const getUserPhotosFromPosts = () => async dispatch => {
  dispatch({
    type: PHOTOS_START_LOADING
  })
  try {
    const photos = await apiRequest.get('/posts/photos')
    dispatch({
      type: USER_PHOTOS_RECEIVED,
      payload: photos
    })
  } catch (e) {
    dispatch({
      type: PHOTOS_END_LOADING
    })
  }
}
