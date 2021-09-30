import axios from "axios"
import { methodsObj } from "@/utils/api"
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  withCredentials: false,
  timeout: 100000
})
service.interceptors.request.use(
  config => {
    const { method, params } = config
    if (typeof data === "undefined") {
      config.data = {}
    }
    const data = {
      id: 1,
      jsonrpc: "2.0",
      params: params || [],
      method: `filscan.${methodsObj()[method]}`
    }
    config.data = data
    config.method = "post"
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const data = response.data
    if (response.status && response.status === 200) {
      if (data.result !== null) {
        const { code } = data.result
        if(code===9){
            window.location.href = '/account?key=login'
        }
        return Promise.resolve(response.data.result)
      }
      if (data.error) {
        Promise.reject(data.error.message)
      }
    }
    return Promise.reject(data || "error")
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
