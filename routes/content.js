const express = require('express');
const debug = require('debug');
const config = require('config');

const socket = require('../libs/socket');

const router = express.Router();
const print = debug('comment');

const {pcode, playerBrandingId, version} = config.player;

const clients = new Map();

router.get('/:id', (req, res) => {
  const embedCode = req.params.id;

  print(`/content/${embedCode} called.`);

  socket.io.on('connection', client => {
    if (clients.get(client.id)) {
      // To brevent redundant connections
      return;
    }
    clients.set(client.id, client);
    print(`A client (id=${client.id}) connected to the room #${embedCode}`);
    client.join(embedCode).on('comment', msg => {
      print(`A comment posted to the room #${msg.embedCode}`);
      print(`\tcomment: ${msg.comment}`);
      // socket.broadcast.to(embedCode).emit('comment', msg);
      socket.io.to(embedCode).emit('comment', msg);
    });
    client.on('disconnect', () => {
      print(`A client (id=${client.id}) left the room #${embedCode}`);
      clients.delete(client.id);
      client.leave(embedCode);
    });
  });

  res.render('content', {embedCode, pcode, playerBrandingId, version});
});

module.exports = router;
