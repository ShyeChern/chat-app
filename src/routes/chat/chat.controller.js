const Chat = require('./chat.model');
const User = require('../user/user.model');
const { getIo } = require('../../utils/socket');

module.exports.login = async (req, res, next) => {
	try {
		const users = await User.find().lean();
		res.render('chat/login', {
			title: 'Chat App',
			user: undefined,
			users,
		});
	} catch (err) {
		return next(err);
	}
};

module.exports.chat = async (req, res, next) => {
	try {
		const users = await User.find({ _id: { $ne: req.params.userId } }).lean();
		const user = await User.findOne({ _id: req.params.userId }).lean();
		res.render('chat/chat', {
			title: 'Chat App',
			user,
			users,
		});
	} catch (err) {
		return next(err);
	}
};

module.exports.message = async (req, res, next) => {
	try {
		const userId = req.params.userId;
		const receiverId = req.params.receiverId;
		let chat = await Chat.findOne({
			users: { $all: [userId, receiverId] },
		}).populate('users');
		// if chat not exist then create one
		if (!chat) {
			const [sender, receiver] = await Promise.all([
				User.exists({ _id: req.params.userId }),
				User.exists({ _id: req.params.receiverId }),
			]);
			if (sender && receiver) {
				chat = new Chat({
					users: [userId, receiverId],
					messages: [],
				});
				let result = await chat.save();
				chat = await result.populate('users').execPopulate();
			} else {
				res.redirect('/');
			}
		}
		res.render('chat/message', {
			title: 'Chat App',
			room: chat.id,
			user: chat.users.find((user) => user.id === userId),
			receiver: chat.users.find((user) => user.id !== userId),
			messages: chat.messages,
		});
	} catch (err) {
		return next(err);
	}
};

module.exports.sendChat = async (req, res, next) => {
	try {
		const message = { message: req.body.message, senderId: req.body.senderId };
		const sent = await Chat.findOneAndUpdate(
			{ users: { $all: [req.body.senderId, req.body.receiverId] } },
			{ $push: { messages: message } },
			{ new: true }
		);
		if (sent) {
			const io = getIo();
			io.to(sent.id).emit('message', { message: sent.messages[sent.messages.length - 1] });
		}
		res.send();
	} catch (err) {
		return next(err);
	}
};
