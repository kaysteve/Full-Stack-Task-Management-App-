import React, { useState } from 'react';
import Task from './Task';
import { useDrag, useDrop } from 'react-dnd';

const Board = ({ board, socket }) => {
  const [tasks, setTasks] = useState(board.tasks);

  const moveTask = (taskId, newStatus) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
    socket.emit('update-task', { taskId, newStatus });
  };

  return (
    <div className="board">
      <h2>{board.name}</h2>
      <div className="columns">
        {['To Do', 'In Progress', 'Done'].map(status => (
          <div className="column" key={status}>
            <h3>{status}</h3>
            {tasks
              .filter(task => task.status === status)
              .map((task) => (
                <Task key={task.id} task={task} moveTask={moveTask} />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
