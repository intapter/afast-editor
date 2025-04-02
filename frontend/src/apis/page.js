import { httpGet } from "./base"

export const getPageDetail = (projectId, pageName) => {
  return httpGet('/page/detail',{projectId,pageName})
}