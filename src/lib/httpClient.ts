import axios from 'axios'

const httpClient = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true,
})

export default httpClient
