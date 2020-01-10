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

const getCurrentUserName = () => JSON.parse(atob(localStorage.accessToken.split('.')[1])).sub

const tokenIsValid = () => {
  const expirationTime = JSON.parse(atob(localStorage.accessToken.split('.')[1])).exp * 1000
  return new Date().getTime() < expirationTime
}

const handleRequestError = error => {
  if (error.response) {
    if (error.response.status > 403) {
      Toastr.error("Error occurred during request to sever: " + error.response.statusText)
    }
    return error.response
  } else if (error.request) {
    Toastr.error("Application is not responding, check your network connection")
    return error.request
  } else {
    Toastr.error(error.message)
    return error.message
  }
}

class ApiRequest {
  constructor () {
    this.pendingTokenRequest = null;
  }

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

  rememberUser(accessToken) {
    localStorage.setItem('accessToken', accessToken)
  }

  forgetUser() {
    this.post('/auth/logout/' + getCurrentUserName())
      .then(() => {
        localStorage.removeItem('accessToken')
        window.location.reload()
      })
      .catch(() => {
        localStorage.removeItem('accessToken')
        window.location.reload()
      })
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
    setAuthToken(null) // Authorization header is deleted for basic request
    return this.sendBasicRequest(reqUrl, reqParams);

  }

  sendBasicRequest(url, reqParams) {
    return axios(url, reqParams)
      .then(res => res.data,
        err => Promise.reject(handleRequestError(err)))
  }

  sendAuthenticatedRequest(url, reqParams) {
    if (localStorage.accessToken) {
      setAuthToken(localStorage.accessToken)
    } else return Promise.reject('Authentication is required') // If there is no token authenticated request is not sent

    if (tokenIsValid()) {
      return this.sendBasicRequest(url, reqParams)
    } else { // if token is expired current api request is chained to getAccessToken request, existing or just created one
      const getTokenRequest = this.pendingTokenRequest || this.getNewAccessTokenFromServer();
      return getTokenRequest.then(()=>this.sendBasicRequest(url, reqParams))
    }
  }

  getNewAccessTokenFromServer() {
    setAuthToken(null)
    const req = axios.post(API_BASE_URL + '/auth/reissue-tokens/' + getCurrentUserName())
      .then(response => {
        setAuthToken(response.data.accessToken)
        localStorage.setItem('accessToken', response.data.accessToken)
        this.pendingTokenRequest = null;
      }).catch(()=>{
        this.pendingTokenRequest = null;
        window.location.reload()
        return Promise.reject({})
      })

    this.pendingTokenRequest = req;
    return req;
  }
}

export default new ApiRequest()