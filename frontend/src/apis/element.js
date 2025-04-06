import { httpDelete, httpGet, httpPost } from './base';

export const searchElement = (projectId, keyword) => {
  return httpGet('/element/search', { projectId, keyword });
};

export const createChildElement = (data) => {
  return httpPost('/element/createElementTo', data);
};

export const deleteElement = (projectId, pageName, id) => {
  return httpDelete('/element/delete', { projectId, pageName, id });
};

export const updateElementConfig = (
  projectId,
  pageName,
  id,
  configName,
  value,
) => {
  return httpPost('/element/update', {
    projectId,
    pageName,
    id,
    configName,
    value,
  });
};
