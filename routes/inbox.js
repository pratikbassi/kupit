const express = require("express");
const router = express.Router();
//const checkAdmin = require("./middlewares/checkAdmin");
const checkLogin = require("./middlewares/checkLogin");
const {user_data_search, user_message_list, user_message, submit_message, get_item_by_id} = require('../db/db_scripts/user_page_funcs')
const dbParams = require("../lib/db.js");

const client = require('twilio')(dbParams.accountSid, dbParams.authToken);
const DOMAIN = 'sandbox9929a9ef0bcf4d75b0f3a2a7a04dccbe.mailgun.org';

const mailgun = require("mailgun-js")({apiKey: dbParams.mailgunAPI, domain: DOMAIN});
const mg = mailgun;



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
    .then(data2 => {

      let data = {
        from: `${userID}@sandbox9929a9ef0bcf4d75b0f3a2a7a04dccbe.mailgun.org`,
        to: `${data2.email}`,
        subject: `You got a message on Kupit! The sender's userID is in the 'from' of this email!`,
        text: `Respond to this message on Kupit! \n
        \n
        ${req.body.text}`
      };
      mg.messages().send(data, function (error, body) { //sends an email
        console.log(data);
        console.log(body);
      });


      client.messages
      .create({ //sends a text
        body: `${req.body.text}`,
        from: '+13346506231',
        to: `${data2.phone_number.replace(/\-/g, '')}`
      }).then(message => console.log(message, 'message'))
    })
    .then(data => res.sendStatus(201))
    .catch(err => err)
  })

  router.get('/item', (req, res) => {
    get_item_by_id(req.query.item_id)
    .then((data) => {
      res.send(data)
    })
  })





  return router;

  }



