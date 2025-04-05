import { httpGet, httpPost } from './base';

export const searchElement = (projectId, keyword) => {
  return httpGet('/element/search', { projectId, keyword });
};

export const createChildElemet = (data) => {
  return httpPost('/element/createElementTo', data);
};
