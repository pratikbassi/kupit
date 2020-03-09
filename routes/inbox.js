const express = require("express");
const router = express.Router();
//const checkAdmin = require("./middlewares/checkAdmin");
const checkLogin = require("./middlewares/checkLogin");
const {user_data_search, user_message_list, user_message} = require('../db/db_scripts/user_page_funcs')




module.exports = db => {

  router.get('/user', checkLogin, (req, res) => {
    let user = req.session.userID
    user_data_search(user).then((data) => {
      console.log(data)
    })
  })

  return router;
}
