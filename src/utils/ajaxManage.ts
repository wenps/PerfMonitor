import { axios } from './axios'


//post
export const postAction = (url, parameter) => {
  return axios({
    url: url,
    method: 'post',
    data: parameter
  })
}

/**
 * post method= {post | put}
**/
export function httpAction(method, url, parameter){
  return axios({
    url: url,
    method: method,
    data: parameter
  })
}

/**
 * put
 */
export function putAction(url, parameter) {
  return axios({
    url: url,
    method: 'put',
    data: parameter
  })
}

/**
 * 
 * get
 */
export function getAction(url, parameter) {
  return axios({
    url: url,
    method: 'get',
    params: parameter
  })
}

/**
 * 
 *deleteAction
 */
export function deleteAction(url, parameter) {
  return axios({
    url: url,
    method: 'delete',
    params: parameter
  })
}
