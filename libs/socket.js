const socketIO = require('socket.io');

module.exports = {
  io: null,

  set(server) {
    this.io = socketIO(server);
  }
};
