import React from 'react';
import { useDrag } from 'react-dnd';

function Box({ id, type, component }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type,
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
    >
      {component}
    </div>
  );
}

export default Box;
