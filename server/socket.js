let io;

module.exports = {
  init: (server) => {
    io = require('socket.io')(server, {
      cors: require('./config/corsOptions')
    });

    io.on('connection', (socket) => {
      console.log('user connected');

      socket.on('join', (userId) => {
        socket.join(userId);
      });

      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    });

    return io;
  },
  getIO: () => {
    if (!io) throw new Error('Socket.io not initialized!');
    return io;
  }
};
