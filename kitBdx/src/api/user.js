import request from '@/util/request'
const group_name='v2'
const api_name='user'
 export function login(username, password) {
    return request({
      url: `/${group_name}/${api_name}/login`,
      method: 'post',
      data: {
        username,
        password
      }
    })
  }

  export function codeLogin(username, logincode) {
    return request({
      url: `/${group_name}/${api_name}/codeLogin`,
      method: 'post',
      data: {
        username,
        logincode
      }
    })
  }

 export function logout() {
    return request({
      url: `/${group_name}/${api_name}/logout`,
      method: 'post',
    })
  }

 export function sendsms(phone) {
    return request({
      url: `/${group_name}/${api_name}/sendsms`,
      method: 'post',
      data: {
        phone
      }
    })
  }

  export function sendloginsms(phone) {
    return request({
      url: `/${group_name}/${api_name}/sendloginsms`,
      method: 'post',
      data: {
        phone
      }
    })
  }

  
  export function register(userPhone, password, messageCode) {
    return request({
      url: `/${group_name}/${api_name}/register`,
      method: 'post',
      data: {
        userPhone,
        password,
        messageCode
      }
    })
  }

  export function findUcComplete() {
    return request({
      url: `/${group_name}/${api_name}/findUcComplete`,
      method: 'post'
    })
  }
  