const express = require('express');

const router = express.Router();
const chat = require('./chat/chat.controller');
const error = require('./error/error.controller');

router.route('/').get(chat.login);
router.route('/users/:userId').get(chat.chat);
router.route('/users/:userId/chat/:receiverId').get(chat.message);
router.route('/chats').post(chat.sendChat);

router.route('/404').get(error.notFound);
router.route('/500').get(error.internalError);

module.exports = router;
