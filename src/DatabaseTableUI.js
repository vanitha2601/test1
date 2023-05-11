import React, { useState, useRef, useEffect, useCallback } from 'react';
import './css/QueryTree.css';
import Navbar from './components/Navbar';
import Draggable from './Draggable';
import databaseicon from './images/db.png';
import databaseicondrop from './images/datatablerightcontainer.png';
import sortIconDrop from './images/sortright.png';
import sorticon from './images/sort.png';
import filtericon from './images/filter.png';
import filterIconDrop from './images/filterRight.png';
import joinicon from './images/join.png';
import summarizeicon from './images/summarize.png';
import selecticon from './images/select.png';
import appendicon from './images/append.png';
import extracticon from './images/extract.png';
import linecharticon from './images/linechart.png';
import barcharticon from './images/barchart.png';
import piecharticon from './images/piechart.png';
import { Handle, Position, NodeToolbar } from 'reactflow';


import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
 
} from 'reactflow';
import 'reactflow/dist/style.css';

import Node from './CustomNode'; 


function DatabaseTableUI() {
  const rightDiv = useRef(null);
  const ICON_SIZE = 40;



  const databaseIconSrc = require('./images/db.png');

  const sortIconSrc = require('./images/sort.png');
  const filterIconSrc = require('./images/filter.png');
  const joinIconSrc = require('./images/join.png');
  const summarizeIconSrc = require('./images/summarize.png');
  const selectIconSrc = require('./images/select.png');
  const appendIconSrc = require('./images/append.png');
  const extractIconSrc = require('./images/extract.png');
  const linechartIconSrc = require('./images/linechart.png');
  const barchartIconSrc = require('./images/barchart.png');
  const piechartIconSrc = require('./images/piechart.png');


  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);

  

  const [leftIcons, setLeftIcons] = useState([
   
    { id: 'db', src: databaseIconSrc, alt: 'Database Table',
    style: { border: '1px solid #ddd', padding: '20px 40px' },
    position: { x: 200, y: 200 } },
    { id: 'sort', src: sortIconSrc, alt: 'Sort Icon' },
    { id: 'filter', src: filterIconSrc, alt: 'Filter Icon' },
    { id: 'join', src: joinIconSrc, alt: 'Join Icon' },
    { id: 'summarize', src: summarizeIconSrc, alt: 'Summarize Icon' },
    { id: 'select', src: selectIconSrc, alt: 'Select Icon' },
    { id: 'append', src: appendIconSrc, alt: 'Append Icon' },
    { id: 'extract', src: extractIconSrc, alt: 'Extract Icon' },
    { id: 'line', src: linechartIconSrc, alt: 'LineChart Icon' },
    { id: 'bar', src: barchartIconSrc, alt: 'BarChart Icon' },
    { id: 'pie', src: piechartIconSrc, alt: 'PieChart Icon' },
  ]);
  const [droppedIcons, setDroppedIcons] = useState([
    { id: 'db', src: databaseicondrop, alt: 'Database Table' },
    { id: 'sort', src: sortIconDrop, alt: 'Database Table' },
    { id: 'filter', src: filterIconDrop, alt: 'Database Table' },
  ]);
  const iconSources = [
    databaseicon, sorticon, filtericon, joinicon, summarizeicon,
    selecticon, appendicon, extracticon, linecharticon, barcharticon,
    piecharticon
  ];
  const [rightIcons, setRightIcons] = useState([]);

  const [draggedIconId, setDraggedIconId] = useState(null);
  const [draggedIconPosition, setDraggedIconPosition] = useState({ x: 0, y: 0 });
  

  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState();
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const canvasRef = useRef(null);
 
  const containerRef = useRef(null);


  

 
 
  

  const handleDragStart = (event, id) => {
    event.dataTransfer.setData('text/plain', id);
    event.dataTransfer.dropEffect = 'move';
     event.target.style.opacity = "0.5";

  };

  const handleDragEnd = (event) => {
    event.target.style.opacity = "0.5";
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setDraggedIconId(null);
  };
  

  const handleDragOver = (event) => {
    event.preventDefault();
   // const rect = containerRef.current.getBoundingClientRect();
    // const x = event.clientX - event.currentTarget.offsetLeft;
    // const y = event.clientY - event.currentTarget.offsetTop;
    // setDropLocation({ x, y });
  };

  const handleDropRight = (event) => {

    event.preventDefault();
    
    
    const idValue = event.dataTransfer.getData("text/plain");
    const dropTarget = event.target.closest(".right-container");
    const leftIcon = leftIcons[idValue];
 


    if (leftIcon) {
     
   

      const newIcon = {
        
        id: Date.now(),
        src: leftIcon.src,
        alt: leftIcon.alt,
        x: event.clientX,
        y: event.clientY,
        
      };
    //  setNodes((nds) => nds.concat(newIcon));
      setRightIcons((nds) => nds.concat(newIcon));
      setRightIcons([...rightIcons, newIcon]);
     
    }

    //For Icon position is changing 
    const idValueInt = parseInt(idValue);
    const iconIndex = rightIcons.findIndex((icon) => icon.id === idValueInt);
    if (iconIndex !== -1) {
      setRightIcons((icons) => {
        const newIcons = [...icons];
        newIcons[iconIndex] = {
          ...newIcons[iconIndex],
          x: event.clientX,
          y: event.clientY
        };
        console.log('newIcons:', newIcons);

        // Redraw all lines after icon position has changed

        return newIcons;
      });
    }
  };



  

  const handleDrop = (event, id) => {

    event.preventDefault();
    console.log(event + "event");
    const sourceIndex = event.dataTransfer.getData("text/plain");
    console.log(sourceIndex + "sourceIndex");
    const draggedIcon = leftIcons[sourceIndex] || rightIcons[sourceIndex];
    const targetId = event.target.id;


    // Get the current mouse position and the offset of the right container
    const x = event.clientX - event.currentTarget.getBoundingClientRect().left;
    const y = event.clientY - event.currentTarget.getBoundingClientRect().top;


    if (targetId === "right-container") {
      // Make a copy of the rightIcons array
      const rightIconsCopy = [...rightIcons];
      console.log(JSON.stringify(rightIconsCopy));
      // Add the dragged icon to the rightIcons array

      rightIconsCopy.push({
        id: sourceIndex,
        src: leftIcons[sourceIndex].src,
        alt: leftIcons[sourceIndex].alt,
        x: event.clientX - event.currentTarget.offsetLeft,
        y: event.clientY - event.currentTarget.offsetTop
      });
      console.log(JSON.stringify(rightIconsCopy) + "rightIconsCopyrightIconsCopy");
      // Remove the dragged icon from the leftIcons array

      setRightIcons(rightIconsCopy);

      //const iconIndex = parseInt(sourceIndex, 10);

      const newIcon = {
        id: Date.now(),
        src: leftIcons[sourceIndex].src,
        alt: leftIcons[sourceIndex].alt,
        x: event.clientX, // or event.pageX
        y: event.clientY // or event.pageY
      };
      event.dataTransfer.clearData();
      setRightIcons([...rightIcons, newIcon]);
    }
  };

  function handleDragLeave(event) {
    const targetContainer = event.target.closest('.container');
    if (targetContainer) {
      targetContainer.classList.remove('drag-over');
      event.target.classList.remove('drag-over');
    }
  }

  const handleIconClick = (event, id) => {
  //  setSelectedIconId(id);
  // const icon = rightIcons.find((icon) => icon.id === id);
  // setIconPositions((prev) => ({ ...prev, selected: { x: icon.x + icon.width / 2, y: icon.y + icon.height / 2 } }));

    // switch (icon) {
    //   case "database":
    //     console.log("Database icon clicked!");
    //     // add functionality for database icon
    //     break;
    //   case "sort":
    //     console.log("Sort icon clicked!");
    //     // add functionality for sort icon
    //     break;
    //   case "filter":
    //     console.log("Filter icon clicked!");
    //     // add functionality for filter icon
    //     break;
    //   // add cases for other icons as needed
    //   default:
    //     console.log("Unknown icon clicked!");
    // }
  };

  const handleMouseMove = (event) => {
    if (draggedIconId) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.moveTo(draggedIconPosition.x, draggedIconPosition.y);
      ctx.lineTo(event.clientX, event.clientY);
      ctx.stroke();
    }
  };

  

  return (

    <div >

      <Navbar></Navbar>
      <form>
        <div>
          <label className="my-label">
            Name:

          </label>
          <input type="text" className="my-input form-control" />
        </div>
        <div >
          <label className="my-label">
            Description:

          </label>
          <textarea className="my-input form-control"

          />
        </div>
        <div className="container">

          <div className="left-container"
            onDragLeave={handleDragLeave} onDragOver={handleDragOver}>
            {leftIcons.map((icon, index) => (
              <img key={index} src={icon.src} alt={icon.alt} title={icon.alt}
                draggable onDragStart={(event) => handleDragStart(event, index)}
                onClick={() => handleIconClick(icon)}
              />
            ))}
          </div>

          <div id="right-container" className="right-container"
            onDragLeave={handleDragLeave} onDragOver={handleDragOver}
            onDrop={(event) => handleDropRight(event)}
            onClick={(event) => handleIconClick(event)}>
  
            {rightIcons.map((icon) => (
              <div className="right-icondb" style={{ position: "absolute", left: icon.x, top: icon.y }}
                draggable onDragStart={(event) => handleDragStart(event, icon.id)}
                onDrop={(event) => handleDropRight(event)}
                onClick={(event) => handleIconClick(event, icon.id)}>
<Handle type="source" position={Position.Right} />
                <img

                  key={icon.id}
                  src={icon.src}
                  alt={icon.alt} className={`right-icon ${draggedIconId === icon.id ? "dragging" : ""}`}

                />
                <Handle type="target" position={Position.Left} />
              </div>
            ))} 
 


          </div>
        </div>
      </form>
    </div>
   
  );
}

export default DatabaseTableUI;
