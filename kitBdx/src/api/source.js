import request from '@/util/request'
const group_name='v4'
const api_name='source'
export function addSource(from) {
    return request({
      url: `/${group_name}/${api_name}/addSource`,
      method: 'post',
      data: from
    })
  }

  export function searchSource(currentPage,pageSize,searchMap) {
    return request({
      url: `/${group_name}/${api_name}/searchSource/${currentPage}/${pageSize}`,
      method: 'post',
      data: searchMap
    })
  }

  export function findMySourceList() {
    return request({
      url: `/${group_name}/${api_name}/searchMySource`,
      method: 'post'
    })
  }

  export function deleteTheSource(sourceId) {
    return request({
      url: `/${group_name}/${api_name}/deleteMySource/${sourceId}`,
      method: 'post'
    })
  }