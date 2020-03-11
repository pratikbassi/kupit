const express = require("express");
const router = express.Router();
//const checkAdmin = require("./middlewares/checkAdmin");
const checkLogin = require("./middlewares/checkLogin");
const {user_data_search, user_message_list, user_message, submit_message} = require('../db/db_scripts/user_page_funcs')
const dbParams = require("../lib/db.js");

const client = require('twilio')(dbParams.accountSid, dbParams.authToken);






const gather_data = async (user_id) => {
  let user_obj = await user_data_search(user_id)
  let route_arr = []

  for (let item in user_obj) {
    route_arr.push(user_obj[item])
  }


  return route_arr
}


module.exports = db => {

  router.get('/user', checkLogin ,(req, res) => {
    let userID = req.session.user.id

    gather_data(userID).then((data) => {
      user = userID
      res.render('messages', {data , user})
    })
  })
  router.get('/messages', checkLogin , (req, res) => {
    let userID = req.session.user.id

    user_message_list(userID).then((data) => {
      res.send(data)
    })
  })
  router.post('/messages', checkLogin ,(req, res) => {
    let userID = req.session.user.id
    let recipient = 0;
    if (parseFloat(userID) === parseFloat(req.body.sender)) {
      recipient = req.body.reciever
    }
    else {
      recipient = req.body.sender
    }

    submit_message(parseFloat(req.body.sender), parseFloat(req.body.reciever), req.body.text, parseFloat(req.body.item_id))
    .then((data) => {return user_data_search(recipient)})
    .then(data => {
      client.messages
      .create({
        body: `${req.body.text}`,
        from: '+13346506231',
        to: `${data.phone_number.replace(/\-/g, '')}`
      }).then(message => console.log(message.sid))
    })
    .then(data => res.sendStatus(201))
    .catch(err => err)
  })






  return router;

  }



