import Aes from '@/util/aes'
import { login, logout, codeLogin } from '@/api/user'
import { getToken, getName, setUser, removeUser, getHeadImg } from '@/util/auth'

const user = {
  state: {
    token: getToken(),
    name: getName(),
    headimg: getHeadImg(),
    //roles: []
    //phone: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_HEADIMG: (state, headimg) => {
      state.headimg = headimg
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
    // SET_PHONE: (state, phone) => {
    //   state.phone = phone
    // }
  },

  actions: {
        //登录
        Login({ commit }, loginUser) {
            return new Promise((resolve, reject) => {
                login(Aes.encrypt(loginUser.username.trim()), Aes.encrypt(loginUser.password.trim())).then(response => {
                    const data = response.data
              
                    setUser(data.token, data.nickname, data.headImg)
                    
                    commit('SET_TOKEN', data.token)
                    commit('SET_HEADIMG', data.headImg)
                    commit('SET_NAME', data.nickname)
                    //setUser(data.token, data.nickname, data.headImg)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        //免密登录
        CodeLogin({ commit }, loginUser) {
            return new Promise((resolve, reject) => {
              codeLogin(Aes.encrypt(loginUser.username.trim()), loginUser.logincode.trim()).then(response => {
                    const data = response.data
                    
                    setUser(data.token, data.nickname, data.headImg)
                    
                    commit('SET_TOKEN', data.token)
                    commit('SET_HEADIMG', data.headImg)
                    commit('SET_NAME', data.nickname)
                    //setUser(data.token, data.nickname, data.headImg)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 登出
        LogOut({ commit }) {
          return new Promise((resolve, reject) => {
            logout().then(() => {
              commit('SET_TOKEN', '')
              commit('SET_HEADIMG', '')
              commit('SET_NAME', '')
              removeUser()
              resolve()
            }).catch(error => {
              reject(error)
            })
          })
        },

        // 前端 登出
        FedLogOut({ commit }) {
          return new Promise(resolve => {
            commit('SET_TOKEN', '')
            commit('SET_HEADIMG', '')
            commit('SET_NAME', '')
            removeUser()
            resolve()
            this.$router.push("/login")
          })
        }
  }
}
export default user