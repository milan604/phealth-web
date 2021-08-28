import axios from 'axios'
import { baseURL } from '../constants/backendserver.constant.js'
import { error } from '../helpers/Notification'
import Cookie from "js.cookie";

let customHttp = axios.create({
  baseURL: `${baseURL.URL}`,
  validateStatus: function (status) {
    
    return status // default
  }
})

export default customHttp
