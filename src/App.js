import BarChart from './components/BarChart';
import LineChart from './components/LineChart';
import PieChart from './components/PieChart';
import DoughnutChart from './components/DoughnutChart';
import './App.css';
import 'chart.js/auto';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Box from './Box';


function App() {


  const options = {
    indexAxis: 'x',
    elements: {
      Bar: {
        borderWidth: 1,
      },
      Line: {
        borderWidth: 2,
      },
      Pie: {
        borderWidth: 3,
      },
      BDoughnut: {
        borderWidth: 4,
      },

    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Dynamic Bar chart',
      },
    },
  };


  const [isDragging, setIsDragging] = useState(false);
  const [boxes, setBoxes] = useState([

    { id: 1, type: 'Bar', component: <BarChart /> },
    { id: 2, type: 'Line', component: <LineChart /> },
    { id: 3, type: 'Pie', component: <PieChart /> },
    { id: 4, type: 'Doughnut', component: <DoughnutChart /> },

  ]);

  function handleDragStart(event, boxId) {
    event.dataTransfer.setData("text/plain", boxId);
    setIsDragging(true);
  }

  function handleDragEnd() {
    setIsDragging(false);
  }

  function handleDrop(event, dropIndex) {
    event.preventDefault();
    const boxId = event.dataTransfer.getData("text/plain");
    const dragIndex = boxes.findIndex((box) => box.id === parseInt(boxId));
    alert(dragIndex);

    const newBoxes = [...boxes];
    newBoxes.splice(dragIndex, 1);
    newBoxes.splice(dropIndex, 0, boxes[dragIndex]);
    console.log("dragIndex" + dragIndex + "dropIndex:" + dropIndex);
    console.log(newBoxes);
    setBoxes(newBoxes);
  }

  return (
    <div className="grid-container">

      <DndProvider backend={HTML5Backend}>
        {/* {boxes.map((box) => (
        <Box key={box.id} id={box.id} type={box.type} component={box.component}  */}

        {boxes.map((box, index) => (
          <div
            key={box.id}
            className={`box ${isDragging ? "dragging" : ""}`}
            draggable="true"
            onDragStart={(event) => handleDragStart(event, box.id)}
            onDragEnd={handleDragEnd}
            onDrop={(event) => handleDrop(event, index)}
            onDragOver={(event) => event.preventDefault()}
          >

            <div key={box.id} className={`chart ${box.type}`}>
              {box.component}
            </div>

            {/* <div className="chart"> {box.component} </div>  */}

            {/* <div  className="container">
  <div id="div1">{box.component}</div>
   </div> */}

          </div>
        ))}

      </DndProvider>
    </div>
  );
}


export default App;


