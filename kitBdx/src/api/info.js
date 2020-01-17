import request from '@/util/request'
const group_name='v5'
const api_name='info'
export function findAllInfoList(currentPage) {
    return request({
        url: `/${group_name}/${api_name}/findAllInfo/${currentPage}`,
        method: 'post'
      })
  }

  export function findInfoDeatil(id) {
    return request({
        url: `/${group_name}/${api_name}/findInfoById/${id}`,
        method: 'post'
      })
  }