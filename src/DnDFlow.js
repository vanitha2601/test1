import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  ArrowHeadType, Position, removeElements
} from 'reactflow';
import 'reactflow/dist/style.css';



import Sidebar from './Sidebar';
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
import Node from './CustomNode';
import './index.css';
import CustomNode from './CustomNode';


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
let nodeId = 1;

const iconSources = [
  databaseIconSrc, sortIconSrc, filterIconSrc, joinIconSrc, summarizeIconSrc,
  selectIconSrc, appendIconSrc, extractIconSrc, linechartIconSrc, barchartIconSrc,
  piechartIconSrc
];

const nodeTypes = {
  customNode: CustomNode,
};



let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState([]);

  // const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);
  const onConnect = (params) => {
    const { source, target, sourceHandle, targetHandle } = params;
    const newEdge = {
      id: `e${source}-${target}`, // a unique ID for the edge
      source,
      sourceHandle: sourceHandle, // you can set this if you have multiple source handles
      target,
      targetHandle: targetHandle, // you can set this if you have multiple target handles
      type: 'custom-edge-type', // set your own custom edge type if needed
      animated: false, // set to false if you don't want the edge to animate
      // set the label for the edge
      style: { stroke: '#ccc', strokeWidth: 2 }, // set the style for the edge
      // set the arrowhead type for the edge
      sourcePosition: 'right', // set the source position to the right
      targetPosition: 'left', // set the target position to the left
    };

    setEdges([...edges, newEdge]);

  };



  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      const icon = event.dataTransfer.getData('image/icon');
      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const nodeType = event.dataTransfer.getData('application/reactflow');
      const iconUrl = event.dataTransfer.getData('image/icon');

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      // const icon = event.dataTransfer.getData('image/icon');

      // const iconUrl = databaseIconSrc;
      // const nodeId = getId();
      const newNode = {
        id: getId(),
        type: nodeType,
        position,
        icon,
        data: {
          label: `${type} node`,
          labelPosition: 'bottom', // set the label position to bottom
          labelBgPadding: [6, 6], // set the padding for the label background
          labelStyle: { fontSize: '12px' },
          url: iconUrl, // set the font size for the label
        },

        style: {
          backgroundImage: `url(${iconUrl})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain', // set the size of the image
          backgroundPosition: 'center', // position the image at the center of the node
        },
        sourcePosition: 'right',
        targetPosition: 'left',
        handles: {
          left: {
            position: 'left',
            type: 'source',
          },
          right: {
            position: 'right',
            type: 'target',
          },
        },
      };
      setNodes((nodes) => nodes.concat(newNode));
    },
    [reactFlowInstance]
  );

  return (
    <form>
      <div className="dndflow">

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
          <div className="left-container">
            <Sidebar />
          </div>

          <div className="right-container">
            <ReactFlowProvider>
              <div className="reactflow-wrapper" ref={reactFlowWrapper}>

                <ReactFlow nodeTypes={nodeTypes}
                  nodes={nodes}
                  edges={edges}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  onConnect={onConnect}
                  onInit={setReactFlowInstance}
                  onDrop={onDrop}
                  onDragOver={onDragOver}

                  fitView
                >

                </ReactFlow>
              </div>
              {/* <Sidebar /> */}
            </ReactFlowProvider>
          </div>

        </div>

      </div>
    </form>
  );
};

export default DnDFlow;
