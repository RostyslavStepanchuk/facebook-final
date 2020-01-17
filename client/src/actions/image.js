import {
  PHOTOS_END_LOADING,
  USER_PHOTOS_RECEIVED,
  PHOTOS_START_LOADING,
} from '../utils/constants/actionsName'
import apiRequest from '../utils/helpers/apiRequest'

export const getUserPhotos = () => async dispatch => {
  dispatch({
    type: PHOTOS_START_LOADING
  })
  try {
    const photos = await apiRequest.get('/')
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