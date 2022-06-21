import Cookies from 'js-cookie'

const TokenKey = 'token'

const auth = {
  getToken : () => {
    return Cookies.get(TokenKey)
  },
  setToken : (token) => {
    return Cookies.set(TokenKey,token)
  },
  removeToken : () => {
    return Cookies.set(TokenKey,'')
  },
}

export default auth