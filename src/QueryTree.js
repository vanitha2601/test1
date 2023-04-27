import './App.css';
import './css/QueryTree.css';

import Navbar from './components/Navbar';
import Draggable from './Draggable';
import React, { useRef, useEffect } from 'react';
import querytree_logo from './components/querytree_logo.png';
import databaseicon from './images/db.png';
import sorticon from './images/sort.png';
import filtericon from './images/filter.png';
import joinicon from './images/join.png';
import summarizeicon from './images/summarize.png';



  

 function QueryTree() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
  if (!canvas) return;
  
    const imageDatabase = new Image();
    imageDatabase.onload = () => {
      ctx.drawImage(imageDatabase, 0, 0,);
    };
    console.log(canvas); 
    imageDatabase.src = databaseicon; // set the image source

    const imageSort = new Image();
    imageSort.onload = () => {
      ctx.drawImage(imageSort, 0, imageDatabase.height + 20);
    };
    console.log(canvas); 
    imageSort.src = sorticon;

    const imagefilter = new Image();
    imagefilter.onload = () => {
      ctx.drawImage(imagefilter, 0, imageSort.height + 60);
    };
    console.log(canvas); 
    imagefilter.src = filtericon;

    const imagejoin = new Image();
    imagejoin.onload = () => {
      ctx.drawImage(imagejoin, 0, imagefilter.height + 100);
    };
    console.log(canvas); 
    imagejoin.src = joinicon;

    const imagesummarize = new Image();
    imagesummarize.onload = () => {
      ctx.drawImage(imagesummarize, 0, imagejoin.height + 140);
    };
    console.log(canvas); 
    imagesummarize.src = summarizeicon;

    


  }, []);



 
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
      <textarea className="my-input form-control" />
      </div>
      <div class="container">
      <div class="left-div">
      <canvas id="my-canvas" ref={canvasRef} className="canvas-image"  >
      </canvas>

  </div>
  <h1>My Website</h1>
  <p>Welcome to my website!</p>
</div>
    </form>
    </div>
    </div>
  )

 }

export default QueryTree