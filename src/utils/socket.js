/**
 * https://socket.io/docs/v4/emit-cheatsheet/
 * https://socket.io/docs/v4/rooms/
 */
let io;
module.exports.init = (socketIo) => {
	if (!io) {
		io = socketIo;
	}
	io.on('connection', (socket) => {
		socket.on('join', (data) => {
			socket.join(data.room);
		});

		socket.on('leave', () => {
		});
	});
};

module.exports.getIo = () => {
	return io;
};
