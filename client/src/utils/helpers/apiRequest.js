import axios from 'axios'
import { Toastr } from '../toastr/Toastr'

const METHOD_GET = 'get'
const METHOD_POST = 'post'
const METHOD_PUT = 'put'
const METHOD_DELETE = 'delete'
const API_BASE_URL = 'api/v1'

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}

const getNewAccessToken = () => {
  const username = JSON.parse(atob(localStorage.accessToken.split('.')[1])).sub
  return axios.post(API_BASE_URL + '/auth/reissue-tokens/' + username)
    .then(result => setAuthToken(result.data.accessToken))
}

const handleRequestError = error => {
  if (error.response) {
    if (error.response.status !== 403) {
      Toastr.error("Error occurred during request to sever")
    }
    return Promise.reject(error.response.data)
  } else if (error.request) {
    Toastr.error("Application is not responding, check your network connection")
    return Promise.reject(error.request)
  } else {
    Toastr.error(error.message)
    return Promise.reject(error.message)
  }
}

class ApiRequest {

  get(url, config, isAuthRequired = true) {
    return this.makeRequest(url, METHOD_GET, null,  config, isAuthRequired);
  }

  post(url, body, config, isAuthRequired = true) {
    return this.makeRequest(url, METHOD_POST, body,  config, isAuthRequired);
  }

  put(url, body, config, isAuthRequired = true) {
    return this.makeRequest(url, METHOD_PUT, body,  config, isAuthRequired);
  }

  delete(url, config, isAuthRequired = true) {
    return this.makeRequest(url, METHOD_DELETE, null,  config, isAuthRequired);
  }

  makeRequest(url, method = METHOD_GET, body = null, config = {}, isAuthRequired = true) {
    const reqUrl = API_BASE_URL + url
    const reqParams = {
      ...config,
      method,
      data: body
    }

    if ((method === METHOD_POST || method === METHOD_PUT)
      && !reqParams.headers) {
      reqParams.headers = {
        'Content-Type': 'application/json'
      }
    }

    if (isAuthRequired) {
      return this.sendAuthenticatedRequest(reqUrl, reqParams)
    }
    return this.sendBasicRequest(reqUrl, reqParams);

  }

  sendBasicRequest(url, reqParams) {
    return axios(url, reqParams)
      .then(res => res.data,
        err => handleRequestError(err))
  }

  sendAuthenticatedRequest(url, reqParams) {
    if (localStorage.accessToken) {
      setAuthToken(localStorage.accessToken)
    } else return Promise.reject('Authentication is required')

    return this.sendBasicRequest(url, reqParams)
      .catch(rejectResponse => {
        if (rejectResponse.status === 403) {
          return getNewAccessToken()
            .then(
              ()=> this.sendBasicRequest(url, reqParams),
              ()=> window.location.reload())
        } else {
          return Promise.reject(rejectResponse)
        }
      })
  }
}

export default new ApiRequest()