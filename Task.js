import React from 'react';
import { useDrag } from 'react-dnd';

const Task = ({ task, moveTask }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: task.id, currentStatus: task.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className="task"
      style={{ opacity: isDragging ? 0.5 : 1 }}
      onClick={() => moveTask(task.id, task.status === 'To Do' ? 'In Progress' : 'Done')}
    >
      {task.name}
    </div>
  );
};

export default Task;
