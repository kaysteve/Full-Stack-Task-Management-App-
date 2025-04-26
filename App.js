import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import Navbar from './components/Navbar';
import { useAuth } from './hooks/useAuth';
import io from 'socket.io-client';
import './styles.css';

const socket = io('http://localhost:5000');

const App = () => {
  const { user, login } = useAuth();
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    if (user) {
      socket.emit('join', user.id);
      socket.on('update-board', (updatedBoard) => {
        setBoards((prevBoards) => {
          return prevBoards.map(board =>
            board.id === updatedBoard.id ? updatedBoard : board
          );
        });
      });
    }

    return () => {
      if (user) socket.emit('leave', user.id);
    };
  }, [user]);

  return (
    <div className="App">
      <Navbar user={user} login={login} />
      <div className="boards">
        {boards.map((board) => (
          <Board key={board.id} board={board} socket={socket} />
        ))}
      </div>
    </div>
  );
};

export default App;
