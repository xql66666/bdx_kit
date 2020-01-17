import axios from 'axios';
import { Message, MessageBox } from 'element-ui';
import store from '../store';
import { getToken } from '@/util/auth';
import router from "../router";
import signMd5Utils from './signMd5Utils';
import aes from './aes';
const service = axios.create({
    baseURL: 'http://127.0.0.1:9020', // api的base_url
    //baseURL: 'http://120.79.247.154:9020', // api的base_url
    timeout: 30000 // 请求超时时间
  })

//请求拦截器
service.interceptors.request.use(config => {

    
    config.headers['Timestamp'] = aes.encrypt(new Date().getTime())
    
    // if(config.data !== undefined) {
    //     let sign = signMd5Utils.getSign(config.baseURL + config.url, config.data)
    //     //config.url = config.url + "?sign=" + sign
    //     config.headers['Sign'] = aes.encrypt(sign)
    // }
    
    if (store.getters.token) {
        config.headers['Authorization'] = 'Bearer ' + getToken()
        
    }
    return config
}, error => {
    console.log(error) 
    Promise.reject(error)
})

//response拦截器
service.interceptors.response.use(
    response => {
        const res = response.data
       // const rescode = response.code
        

        if (res.code === 200) {
            
            return response.data
        }else {
            Message({
                message: res.msg,
                type: 'error',
                duration: 5 * 1000
            })

            if (res.code === 702) {
                Message({
                    message: '请求已过期，检查本地时间是否正确或者网络延迟较高！',
                    type: 'error',
                    duration: 5 * 1000
                })
                router.go(-1);
            }
    
            if (res.code === 700 || res.code === 600) {
                store.dispatch('FedLogOut').then(() => {
                    Message({
                        message: '登录信息失效，请重新登录!',
                        type: 'error',
                        duration: 10 * 1000
                    })
                     location.reload()
    
                })
                router.push({ path: '/login' })
            }
            //loadingInstance.close();
            return Promise.reject('error')
            
        }
            
        
    },
    error => {
        console.log('err' + error)
        Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service
