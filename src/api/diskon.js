import axios from 'axios'

export const api = axios.create({
  baseURL: ''
})

export const setApiUrl = (url) => {
  api.defaults.baseURL = url
}
