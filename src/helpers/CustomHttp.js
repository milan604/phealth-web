import axios from 'axios'
import { baseURL } from '../constants/backendserver.constant.js'
import { error } from '../helpers/Notification'
import Cookie from "js.cookie";

let customHttp = axios.create({
  baseURL: `${baseURL.URL}`,
  validateStatus: function (status) {
    if (status === 401) {
      Cookie.remove('accesstoken', { path: '/' })
      Cookie.remove('client', { path: '/' })
      Cookie.remove('expiry', { path: '/' })
      Cookie.remove('role', { path: '/' })
      Cookie.remove('name', { path: '/' })
      Cookie.remove('uid', { path: '/' })
      if (window.location.href.match(/\/login/)){
          error('Invalid Credentials. Please try again.')
      }else{
          window.location.href = '/login'
      }
    }
    return status // default
  }
})

export default customHttp
