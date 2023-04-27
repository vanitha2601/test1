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
import selecticon from './images/select.png';
import appendicon from './images/append.png';
import extracticon from './images/extract.png';
import linecharticon from './images/linechart.png';
import barcharticon from './images/barchart.png';
import piecharticon from './images/piechart.png';




  

 function QueryTree() {
  const canvasRef = useRef(null);

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
    };
    imageDatabase.src = databaseicon; // set the image source

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
     
    };
    imagepiechart.src = piecharticon;


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
      <canvas id="my-canvas" ref={canvasRef} className="canvas-image"  width="800" height="650">
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