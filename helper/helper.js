function responseLogin(message, result, code) {
    this.data = {
        message : 'GET',
        result : result,
        code : code,
    }
  }


  function responseGetUser(message, result, code) {
      const c = result.filter(user => {
          return user
      })
    this.data = {
        data : c,
    }
  }


  module.exports = {
    responseLogin,
    responseGetUser
  };