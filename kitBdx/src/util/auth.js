import Cookies from 'js-cookie'

const TokenKey = 'User-token'
const NameKey = 'User-Name'
const HeadImgKey = 'User-Head'

export function setUser(token,nickname,headImg) {
    Cookies.set(TokenKey, token, {expires: 1})
    Cookies.set(NameKey,nickname, {expires: 1})
    Cookies.set(HeadImgKey,headImg, {expires: 1})
}

export function getUser() {
    return {
        token: Cookies.get(TokenKey),
        nickname: Cookies.get(NameKey),
        headImg: Cookies.get(HeadImgKey)
    }
}

export function removeUser() {
    Cookies.remove(TokenKey)
    Cookies.remove(NameKey)
    Cookies.remove(HeadImgKey)
}

export function getToken() {
  return Cookies.get(TokenKey)
}

export function getName() {
  return Cookies.get(NameKey)
}

export function setName(name) {
  return Cookies.set(NameKey, name, {expires: 1})
}

export function getHeadImg() {
  return Cookies.get(HeadImgKey)
}

export function setHeadImg(HeadImg) {
  return Cookies.set(HeadImgKey, HeadImg, {expires: 1})
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, {expires: 1})
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
