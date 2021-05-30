const socketIO = require('socket.io');

const Session = require('../src/models/Session');

const socket = server => {
  const io = socketIO(server,  {
    cors: {
      origin: "*",
    },
  });

  io.use(async (socket, next) => {
    const token = socket.handshake.auth.token;

    if (token) {
      let session;
      try {
        session = await Session.findOne({token}).populate('User');
      } catch (err) {
        return next(new Error('Find session error'));
      }

      if (!session) {
        return next(new Error('wrong or expired session token'));
      }

      session.lastVisit = new Date();
      await session.save();

      socket.user = session.user;
    } else {
      next(new Error('anonymous sessions are not allowed'));
    }

    next();
  })

  io.on('connection', socket => {
    // socket.join(socket.user);
    console.log('connection', socket.user)
    // socket.join('room');

    socket.on('join_room', async ({user}) => {
      socket.join(user);
      console.log('JOIN', user)
    })

    socket.on('private_message', async ({content, to, from}) => {
      // socket.join(to);
      // console.log(io.sockets.adapter.rooms
      console.log(socket.user)
      socket.to(to).to(from).emit('private_message', {
        content,
        from,
      });
    })

    socket.on('disconnect', async () => {
      console.log('disconnect');
    })
  })

  return io;
}

module.exports = socket;
