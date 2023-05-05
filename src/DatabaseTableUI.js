import React, { useState, useRef } from 'react';
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

  const [leftIcons, setLeftIcons] = useState([
    { id: 'db', src: databaseIconSrc, alt: 'Database Table' },
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
  const [draggedIcon, setDraggedIcon] = useState(null);
  const [dropLocation, setDropLocation] = useState(null);

  const handleDragStart = (event, id) => {
    event.dataTransfer.setData('text/plain', id);
    event.dataTransfer.dropEffect = 'move';
    event.target.style.opacity = "0.5";
  };


  const handleDragEnd = (event) => {
    event.target.style.opacity = "1";
  };

  const handleDragOver = (event, containerRef) => {
    event.preventDefault();
    const x = event.clientX - event.currentTarget.offsetLeft;
    const y = event.clientY - event.currentTarget.offsetTop;
    setDropLocation({ x, y });
  };


  const handleDropRight = (event) => {

    event.preventDefault();
    const idValue = event.dataTransfer.getData("text/plain");
    const leftIcon = leftIcons[idValue];
    if (leftIcon) {
      const newIcon = {
        id: Date.now(),
        src: leftIcon.src,
        alt: leftIcon.alt,
        x: event.clientX,
        y: event.clientY,
      };
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

  // function handleDragOver(event) {
  //   event.preventDefault();
  //   const targetContainer = event.target.closest('.container');
  //   if (targetContainer) {
  //     targetContainer.classList.add('drag-over');
  //   }
  // }

  function handleDragLeave(event) {
    const targetContainer = event.target.closest('.container');
    if (targetContainer) {
      targetContainer.classList.remove('drag-over');
      event.target.classList.remove('drag-over');
    }
  }


  // const handleRemove = (index) => {
  //   const newIcons = rightIcons.filter((icon, i) => i !== index);
  //   setRightIcons(newIcons);
  // };

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
              />
            ))}
          </div>

          <div id="right-container" className="right-container"
            onDragLeave={handleDragLeave} onDragOver={handleDragOver}
            onDrop={(event) => handleDropRight(event)}

          >
            {rightIcons.map((icon) => (
              // <div key={index} className="right-icon">
              <img
                className="right-icon"
                key={icon.id}
                src={icon.src}
                alt={icon.alt}
                style={{ position: "absolute", left: icon.x, top: icon.y }}
                draggable onDragStart={(event) => handleDragStart(event, icon.id)}
                onDrop={(event) => handleDropRight(event)}
              />
              //  <button onClick={() => handleRemove(index)}>Remove</button> 
              // </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}

export default DatabaseTableUI;
