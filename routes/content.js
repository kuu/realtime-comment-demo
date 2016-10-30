const express = require('express');
const debug = require('debug');
const config = require('config');

const socket = require('../libs/socket');

const router = express.Router();
const print = debug('comment');

const {pcode, playerBrandingId, version} = config.player;

router.get('/:id', (req, res) => {
  const embedCode = req.params.id;

  print(`/content/${embedCode} called.`);

  function onConnect(client) {
    print(`A client connected to the room #${embedCode}`);
    client.join(embedCode).on('comment', msg => {
      print(`A comment posted to the room #${msg.embedCode}`);
      print(`comment: ${msg.comment}`);
      // socket.broadcast.to(embedCode).emit('comment', msg);
      socket.io.to(embedCode).emit('comment', msg);
    });
    client.on('disconnect', () => {
      print(`A client left the room #${embedCode}`);
      socket.io.removeListener(onConnect);
      client.leave(embedCode);
    });
  }
  socket.io.on('connection', onConnect);

  res.render('content', {embedCode, pcode, playerBrandingId, version});
});

module.exports = router;
