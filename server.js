const express = require('express');
const mongoose = require('mongoose');
const socketIO = require('socket.io');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const socketHandler = require('./socket');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/taskManagement', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/tasks', taskRoutes);

const server = app.listen(5000, () => {
  console.log('Server running on port 5000');
});

const io = socketIO(server);
socketHandler(io);
