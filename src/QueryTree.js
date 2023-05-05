import './App.css';
import './css/QueryTree.css';
import Navbar from './components/Navbar';
import Draggable from './Draggable';
import React, { useRef, useEffect, useState } from 'react';
import querytree_logo from './components/querytree_logo.png';
import databaseicon from './images/db.png';
import sorticon from './images/sort.png';
import filtericon from './images/filter.png';
import joinicon from './images/join.png';
import summarizeicon from './images/summarize.png';
import selecticon from './images/select.png';
import appendicon from './images/append.png';
import extracticon from './images/extract.png';
import linecharticon from './images/linechart.png';
import barcharticon from './images/barchart.png';
import piecharticon from './images/piechart.png';






function QueryTree(props) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [data, setData] = useState(null);
  const imgRef = useRef(null);


  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!canvas) return;


    const imageDatabase = new Image();
    imageDatabase.onload = () => {
      ctx.drawImage(imageDatabase, 0, 0,);
      ctx.fillText('Data Table', 0, imageDatabase.height + 15);
      ctx.font = "12px sans-srif";
      ctx.fillStyle = "#D9D9D9";
      // Draw border around image
  ctx.strokeStyle = "#001";
  ctx.strokeRect(0, 0, imageDatabase.width, imageDatabase.height);

      
    };
    imageDatabase.src = databaseicon; // set the image source
// Add event listeners for drag and drop


// const dataURL = canvas.toDataURL();
// imgRef.current.src = dataURL;


// Variables to track mouse movement
let isDragging = false;
let startX = 0;
let startY = 0;

// Event listener for mousedown event
canvas.addEventListener("mousedown", (e) => {
  const rect = canvas.getBoundingClientRect();
  startX = e.clientX - rect.left;
  startY = e.clientY - rect.top;
  isDragging = true;
});

// Event listener for mousemove event
canvas.addEventListener("mousemove", (e) => {
  if (isDragging) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left - startX;
    const y = e.clientY - rect.top - startY;

    // Clear canvas and redraw image at new position
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imageDatabase, x, y);

    // Draw border around image
    ctx.strokeStyle = "#000";
    ctx.strokeRect(x, y, imageDatabase.width, imageDatabase.height);

    ctx.fillText("Data Table", x, imageDatabase.height + 15);
    ctx.font = "12px sans-serif";
    ctx.fillStyle = "#D9D9D9";
  }
});

// Event listener for mouseup event
canvas.addEventListener("mouseup", () => {
  isDragging = false;
});



    const imageSort = new Image();
    imageSort.onload = () => {
      ctx.drawImage(imageSort, 0, imageDatabase.height + 30);
      ctx.fillText('Sort', 0, imageSort.height + 75);
      ctx.font = "12px sans-srif";
      ctx.fillStyle = "#D9D9D9";
    };
    imageSort.src = sorticon;

    const imagefilter = new Image();
    imagefilter.onload = () => {
      ctx.drawImage(imagefilter, 0, imageSort.height + 90);
      ctx.fillText('Filter', 0, imagefilter.height + 135);
      ctx.font = "12px sans-srif";
      ctx.fillStyle = "#D9D9D9";
    };
    imagefilter.src = filtericon;

    const imagejoin = new Image();
    imagejoin.onload = () => {
      ctx.drawImage(imagejoin, 0, imagefilter.height + 145);
      ctx.fillText('Join', 0, imagejoin.height + 190);
      ctx.font = "12px sans-srif";
      ctx.fillStyle = "#D9D9D9";
    };
    imagejoin.src = joinicon;

    const imagesummarize = new Image();
    imagesummarize.onload = () => {
      ctx.drawImage(imagesummarize, 0, imagejoin.height + 205);
      ctx.fillText('Summarize', 0, imagesummarize.height + 250);
      ctx.font = "12px sans-srif";
      ctx.fillStyle = "#D9D9D9";
    };
    imagesummarize.src = summarizeicon;

    const imageselect = new Image();
    imageselect.onload = () => {
      ctx.drawImage(imageselect, 0, imagesummarize.height + 265);
      ctx.fillText('Select', 0, imageselect.height + 310);
      ctx.font = "12px sans-srif";
      ctx.fillStyle = "#D9D9D9";
    };
    imageselect.src = selecticon;

    const imageappend = new Image();
    imageappend.onload = () => {
      ctx.drawImage(imageappend, 0, imageselect.height + 325);
      ctx.fillText('Append', 0, imageappend.height + 370);
      ctx.font = "12px sans-srif";
      ctx.fillStyle = "#D9D9D9";
    };
    imageappend.src = appendicon;


    const imageextract = new Image();
    imageextract.onload = () => {
      ctx.drawImage(imageextract, 0, imageappend.height + 385);
      ctx.fillText('Extract', 0, imageextract.height + 430);
      ctx.font = "12px sans-srif";
      ctx.fillStyle = "#D9D9D9";
    };
    imageextract.src = extracticon;


    const imagelinechart = new Image();
    imagelinechart.onload = () => {
      ctx.drawImage(imagelinechart, 0, imageextract.height + 445);
      ctx.fillText('Line', 0, imagesummarize.height + 490);
      ctx.font = "12px sans-srif";
      ctx.fillStyle = "#D9D9D9";
    };
    imagelinechart.src = linecharticon;

    const imagebarchart = new Image();
    imagebarchart.onload = () => {
      ctx.drawImage(imagebarchart, 0, imagelinechart.height + 505);
      ctx.fillText('Bar', 0, imagesummarize.height + 550);
      ctx.font = "12px sans-srif";
      ctx.fillStyle = "#D9D9D9";
    };
    imagebarchart.src = barcharticon;

    const imagepiechart = new Image();
    imagepiechart.onload = () => {
      ctx.drawImage(imagepiechart, 0, imagebarchart.height + 565);
      ctx.fillText('Pie', 0, imagesummarize.height + 610);
      ctx.font = "12px sans-srif";
      ctx.fillStyle = "#D9D9D9";
      canvas.addEventListener('dragstart', handleDragStart);
      canvas.addEventListener('dragend', handleDragEnd);
    };
    imagepiechart.src = piecharticon;

//   canvas.addEventListener('dragstart', handleDragStart);
// canvas.addEventListener('dragend', handleDragEnd);

// return () => {
//    canvas.removeEventListener('dragstart', handleDragStart);
//    canvas.removeEventListener('dragend', handleDragEnd);
// };
   }


    , []);

    // Handler for drag start event on the canvas
  const handleDragStart = (event) => {
    const canvas = canvasRef.current;

    // Set the data being dragged to the ID of the canvas
    //event.dataTransfer.setData('text/plain', canvas.id);
    event.dataTransfer.setData("text/plain", event.target.alt);

    // Change the appearance of the dragged item
    event.currentTarget.style.opacity = '0.4';
  };

  // Handler for drag end event on the canvas
  const handleDragEnd = (event) => {
    // Reset the appearance of the dragged item
    event.currentTarget.style.opacity = '1';
  };

  // Handler for drag over event on the div
  const handleDragOver = (event) => {
    event.target.classList.add("drag-over");
    // Prevent default behavior to allow drop
    event.preventDefault();
  };
  function handleDragEnter(event) {
    event.preventDefault();
    event.target.classList.add("drag-over");
  }
  
  function handleDragLeave(event) {
    event.target.classList.remove("drag-over");
  }
  // Handler for drop event on the div
  const handleDrop = (event,icon) =>{
    event.preventDefault();
    
    const data = event.dataTransfer.getData("text/plain");
    event.target.classList.remove("drag-over");
    console.log(data);
    
    console.log("Drop data:", data);
    const droppedElement = document.getElementById(data);
    console.log(droppedElement+"droppedElement");
    canvasRef.current.appendChild(databaseicon);
    if(droppedElement !== null){
      canvasRef.current.appendChild(databaseicon);
    }
    
 
  };
 

  return (
    <div >
      <h1>Create Report</h1>
      <div className="textdiv">
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
          <div className="container" ref={containerRef} onDragOver={handleDragOver} onDrop={handleDrop}>
          <div className="left-container" >
              <canvas id="my-canvas" ref={canvasRef} className="canvas-image" width="80" height="650" draggable={true}
              > </canvas>
  {/* <img ref={imgRef} alt="Data Table" src={databaseicon} />   */}

{/* <div className="container">
      <div className="left-container" onDrop={(event) => handleDrop(event, leftIcons)} onDragOver={handleDragOver}>
        {leftIcons.map((icon, index) => (
          <img key={index} src={icon.src} alt={`Icon ${index}`} draggable onDragStart={(event) => handleDragStart(event, index)} />

        ))}
      </div>

      <div  id="right-container"  className="right-container"  
      onDrop={(event) => handleDrop(event, rightIcons)} 
      onDragOver={handleDragOver}
      >
        {rightIcons.map((icon, index) => (
            // <div key={index} className="right-icon">
            <img 
            key={icon.id}
            src={icon.src}
            alt={icon.alt}
            draggable={true}  
            // alt={`Icon ${index}`} 
          //  draggable
             onDragStart={(event) => handleDragStart(event, index)}
            onDrop={(event) => handleDrop(event, index)}/>
            //  <button onClick={() => handleRemove(index)}>Remove</button> 
            // </div>
        ))}
      </div>
    </div>
  ); */}

  {/* <img ref={imgRef}
                src={databaseicon}
                alt="Data Table"
                draggable={true} 
              />
              <img ref={imgRef}
                src={sorticon}
                alt="Data Table"
                
              />
              <img ref={imgRef}
                src={filtericon}
                alt="Data Table"
                
              />
              <img ref={imgRef}
                src={joinicon}
                alt="Data Table"
                draggable={true}
                onDragStart={handleDragStart}
              />
              <img ref={imgRef}
                src={summarizeicon}
                alt="Data Table"
                draggable={true}
                onDragStart={handleDragStart}
              />
              <img ref={imgRef}
                src={selecticon}
                alt="Data Table"
                draggable={true}
                onDragStart={handleDragStart}
              />
              <img ref={imgRef}
                src={appendicon}
                alt="Data Table"
                draggable={true}
                onDragStart={handleDragStart}
              />
              <img ref={imgRef}
                src={extracticon}
                alt="Data Table"
                draggable={true}
                onDragStart={handleDragStart}
              />
               <img ref={imgRef}
                src={linecharticon}
                alt="Data Table"
                draggable={true}
                onDragStart={handleDragStart}
              />
               <img ref={imgRef}
                src={barcharticon}
                alt="Data Table"
                draggable={true}
                onDragStart={handleDragStart}
              />
               <img ref={imgRef}
                src={piecharticon}
                alt="Data Table"
                draggable={true}
                onDragStart={handleDragStart}
              />  */}

            </div>
           
          </div>
          

        </form>
      </div>
    </div>
  );

}

export default QueryTree