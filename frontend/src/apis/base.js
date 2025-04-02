import axios from 'axios'

const BASE_URL = "/api"


export const httpPost = async (path, data = {}) => {
  const response = await axios.post(BASE_URL+path,data = {})
  return response.data
}

export const httpGet = async (path, params = {}) => {
  const response = await axios.get(BASE_URL+path,{params})
  return response.data
}

export const requireData = (request) => {
  return new Promise((resolve, reject) => {
    return request.then((res) => {
      if(res.code === 200){
        resolve(res.data);
      }else{
        reject(res)
      }
    })
  })
}