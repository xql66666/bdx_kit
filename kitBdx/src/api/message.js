import request from '@/util/request'
const group_name='v3'
const api_name='message'
 export function addMessage(message) {
    return request({
      url: `/${group_name}/${api_name}/addmessage`,
      method: 'post',
      data: message
    })
  }
  export function findMessageList(page) {
    return request({
      url: `/${group_name}/${api_name}/findallmessage/${page}`,
      method: 'post'
    })
  }
 