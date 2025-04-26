const Task = require('./models/Task');

const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('join', (userId) => {
      console.log(`${userId} joined`);
    });

    socket.on('leave', (userId) => {
      console.log(`${userId} left`);
    });

    socket.on('update-task', async ({ taskId, newStatus }) => {
      const task = await Task.findByIdAndUpdate(taskId, { status: newStatus }, { new: true });
      io.emit('update-board', task);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};

module.exports = socketHandler;
