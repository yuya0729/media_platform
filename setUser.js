const setUser = (req, res, next) => {
  const userName = req.session.userName;
  if(userName) {
    console.log('ok');
  }
  next();
}

module.exports = setUser;