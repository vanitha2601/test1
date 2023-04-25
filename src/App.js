import BarChart from './components/BarChart';
import LineChart from './components/LineChart';
import PieChart from './components/PieChart';
import DoughnutChart from './components/DoughnutChart';
import './App.css';
import 'chart.js/auto';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import React, { useState } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider, useDrag, useDrop, DragPreviewImage } from 'react-dnd';

function App() {

  const [isDragging, setIsDragging] = useState(false);
  const [boxes, setBoxes] = useState([
    { id: 1, type: 'Bar', component: <BarChart /> },
    { id: 2, type: 'Line', component: <LineChart /> },
    { id: 3, type: 'Pie', component: <PieChart /> },
    { id: 4, type: 'Doughnut', component: <DoughnutChart /> },
  ]);

  const handleDrag = (dragId, dropId) => {
    const dragIndex = boxes.findIndex(box => box.id === dragId);
    const dropIndex = boxes.findIndex(box => box.id === dropId);
    if (dragIndex !== dropIndex) {
      const newBoxes = [...boxes];
      newBoxes.splice(dropIndex, 0, newBoxes.splice(dragIndex, 1)[0]);
      setBoxes(newBoxes);
    }
  };
  const handleDrop = (dragId, dropId) => {
    const dragIndex = boxes.findIndex(box => box.id === dragId);
    const dropIndex = boxes.findIndex(box => box.id === dropId);
    if (dragIndex !== -1 && dropIndex !== -1) {
      const newBoxes = [...boxes];
      const dragBox = newBoxes[dragIndex];
      newBoxes[dragIndex] = newBoxes[dropIndex];
      newBoxes[dropIndex] = dragBox;
      setBoxes(newBoxes);
    }

  };
  return (
    <div className="grid-container">

      <DndProvider backend={HTML5Backend}>
        {boxes.map((box, index) => (
          <Box key={box.id} id={box.id} type={box.type} component={box.component} index={index} handleDrag={handleDrag}
            handleDrop={handleDrop} />
        ))}
      </DndProvider>
    </div>

  );
}

function Box({ id, type, component, index, handleDrag, handleDrop }) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = event => {
    setIsDragging(true);
    event.dataTransfer.setData('text/plain', id);
  };

  const handleDragOver = event => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const handleBoxDrop = event => {
    event.preventDefault();
    const dragId = parseInt(event.dataTransfer.getData('text/plain'));
    handleDrop(dragId, id);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleBoxDrop}
    >
      {component}
    </div>
  );
}




export default App;


