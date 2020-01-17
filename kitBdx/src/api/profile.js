import request from '@/util/request'
import { setName } from '@/util/auth'
const group_name='v2'
const api_name='user'
 export function userInfo() {
    return request({
      url: `/${group_name}/${api_name}/userInfo`,
      method: 'post',
    })
  }
  export function updateuserInfo(info) {
    setName(info.nickname)
    return request({
      url: `/${group_name}/${api_name}/updateUcInfo`,
      method: 'post',
      data: info
    })
  }
  export function uploadImg(formData) {
    return request({
      url: `/${group_name}/${api_name}/uploadHeadImg`,
      method: 'post',
      data: formData
    })
  }

  export function findUserHeadImg() {
    return request({
      url: `/${group_name}/${api_name}/findUserHeadImg`,
      method: 'post'
    })
  }

  export function accountPass(pass) {
    return request({
      url: `/${group_name}/${api_name}/updateUserPassword`,
      method: 'post',
      data: {
        pass
      }
    })
  }