import { httpGet } from "./base"

export const getProjectList = () => {
  return httpGet("/project/list")
}

export const getProjectDetail = (id) => {
  return httpGet(`/project/detail/${id}`)
}