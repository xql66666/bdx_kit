const getters = {
    //sidebar: state => state.app.sidebar,
    token: state => state.user.token,
    //avatar: state => state.user.headimg,
    name: state => state.user.name,
    roles: state => state.user.roles,
    //phone: state => state.user.phone,
    headimg: state => state.user.headimg
  }
  export default getters