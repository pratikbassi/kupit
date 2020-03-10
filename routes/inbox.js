const express = require("express");
const router = express.Router();
//const checkAdmin = require("./middlewares/checkAdmin");
const checkLogin = require("./middlewares/checkLogin");
const {user_data_search, user_message_list, user_message, submit_message} = require('../db/db_scripts/user_page_funcs')



const gather_data = async (user_id) => {
  let user_obj = await user_data_search(user_id)
  let route_arr = []

  for (let item in user_obj) {
    route_arr.push(user_obj[item])
  }


  return route_arr
}


module.exports = db => {

  router.get('/user',  (req, res) => {
    let userID = req.session.user.id

    console.log(userID)
    gather_data(userID).then((data) => {
      console.log(data)
      user = userID
      res.render('messages', {data , user})
    })
  })
  router.get('/messages', (req, res) => {
    let userID = req.session.user.id

    user_message_list(userID).then((data) => {
      res.send(data)
    })
  })
  router.post('/messages', (req, res) => {
    console.log(req.body)
    submit_message(parseFloat(req.body.sender), parseFloat(req.body.reciever), req.body.text, parseFloat(req.body.item_id))
    .then(data => res.send(201))
    .catch(err => err)
  })






  return router;

  }
