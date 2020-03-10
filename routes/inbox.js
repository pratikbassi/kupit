const express = require("express");
const router = express.Router();
//const checkAdmin = require("./middlewares/checkAdmin");
const checkLogin = require("./middlewares/checkLogin");
const {user_data_search, user_message_list, user_message} = require('../db/db_scripts/user_page_funcs')



const gather_data = async (user_id) => {
  let user_obj = await user_data_search(1)
  let route_arr = []

  for (let item in user_obj) {
    route_arr.push(user_obj[item])
  }


  return {route_arr, }
}

console.log(gather_data(1))

module.exports = db => {
  router.get('/user',  (req, res) => {
    let user = req.session.userID
    gather_data(1).then((data) => {
      console.log(data)
      res.render('messages', data)
    })
  })
  router.get('/messages', (req, res) => {
    user_message_list(1).then((data) => {
      res.send(data)
    })
  })







  return router;

  }
