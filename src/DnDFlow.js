import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls, Handle,
  ArrowHeadType, Position,
  removeElements, useStoreState,
  useStoreActions, useReactFlow,
  getConnectedEdges, Background, MarkerType
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
import CustomNode from './CustomNode';

import './index.css';



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







const DnDFlow = () => {

  let nodeId = 0; // Initialize the node ID counter

  // Function to generate a unique node ID
  const generateNodeId = () => {
    nodeId++; // Increment the node ID counter
    return `node_${nodeId}`;
  };

  const nodesTypesRightContainer = [
    {
      id: 'dataTable',
      type: 'input',
      alt: 'Data Table',
      icon: databaseicon,
      sourcePosition: 'right',
      label: 'Data Table',
      edges: ['right'], maxConnections: 1,
      sourceHandle: {
        id: 'sourceHandle',
        position: Position.Right,
      },
      targetHandle: {
        id: 'targetHandle',
        position: Position.Right,
      },
    },
    {
      id: 'sort',
      label: 'Sort',
      type: 'customNode',
      component: CustomNode,
      alt: 'Sort',
      icon: sorticon,
      sourcePosition: 'right',
      targetPosition: 'left',
      edges: ['right', 'left'],
      maxConnections: 1,
      sourceHandle: {
        id: 'sourceHandle',
        position: Position.Right,
      },
      targetHandle: {
        id: 'targetHandle',
        position: Position.Left,
      },
    },
    {
      id: 'filter',
      label: 'Filter',
      type: 'default',
      alt: 'Filter',
      icon: filtericon,
      sourcePosition: 'right',
      targetPosition: 'left',
      edges: ['right', 'left'],
      maxConnections: 1,
      sourceHandle: {
        id: 'sourceHandle',
        position: Position.Right,
      },
      targetHandle: {
        id: 'targetHandle',
        position: Position.Left,
      },
    },

    {
      id: 'join',
      label: 'Join',
      type: 'default',
      alt: 'Join',
      icon: joinicon,
      sourcePosition: 'right',
      targetPosition: 'left',
      edges: ['right', 'left'],
      maxConnections: 2,
      sourceHandle: {
        id: 'sourceHandle',
        position: Position.Right,
      },
      targetHandle: {
        id: 'targetHandle',
        position: Position.Left,
      },
    },
    {
      id: 'summarize',
      label: 'Summarize',
      type: 'default',
      alt: 'Summarize',
      icon: summarizeicon,
      edges: ['right', 'left'],
      maxConnections: 1
    },
    {
      id: 'select',
      label: 'Select',
      type: 'default',
      alt: 'Select',
      icon: selecticon,
      edges: ['right', 'left'],
      maxConnections: 1
    },
    {
      id: 'append',
      label: 'Append',
      type: 'default',
      alt: 'Append',
      icon: appendicon,
      edges: ['right', 'left'],
      maxConnections: 1
    },
    {
      id: 'extract',
      label: 'Extract',
      type: 'default',
      alt: 'Extract',
      icon: extracticon,
      edges: ['right', 'left'],
      maxConnections: 1
    },

    {
      id: 'bar',
      label: 'Bar',
      type: 'default',
      alt: 'Bar',
      icon: barcharticon,
      edges: ['left'],
      maxConnections: 1
    },
    {
      id: 'line',
      label: 'Line',
      type: 'output',
      alt: 'Bar Chart',
      icon: linecharticon,
      edges: ['left'],
      maxConnections: 1
    },
    {
      id: 'pie',
      label: 'Pie',
      type: 'output',
      alt: 'Pie Chart',
      icon: piecharticon,
      edges: ['left'],
      maxConnections: 1
    },
    // Add more nodes with their respective edges
  ];


  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const [connections, setConnections] = useState([]); // Array to store connections
  const [sources, setSources] = useState([]); // Array to store source nodes
  const [targets, setTargets] = useState([]);

  const [rightSources, setRightSources] = useState([]);
  const [leftTargets, setLeftTargets] = useState([]);

  // Array to store connected nodes on the left edge
  const [rightTargets, setRightTargets] = useState([]);

  // const updatedNodes = nodes.map((node) => {
  //   const matchingNode = nodesTypesRightContainer.find((n) => n.id === node.id);
  //   console.log(matchingNode+"Matching node");
  //   if (matchingNode) {
  //     return {
  //       ...node,
  //       maxConnections: matchingNode.edges.includes('left') ? 1 : 2
  //     };
  //   }
  //   return node;
  // });
  // console.log(JSON.stringify(updatedNodes) + "updatednodes");
  // setNodes(updatedNodes);






  const onNodeDoubleClick = (event, node) => {
    setSelectedNode(node);
  };

  function getConnectedEdgesCount(nodeId, edges) {
    return edges.filter((edge) => edge.source === nodeId || edge.target === nodeId).length;
  }

  const [selectedNode, setSelectedNode] = useState(null);
  // const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);
  const onConnect = (event) => {
    const { source, target } = event;
    console.log(event);
    const sourceHandle = 'right';
    const targetHandle = 'left';
    const sourceId = event.source; // Extract the source ID
    const targetId = event.target; // Extract the target ID

    // Access the IDs as needed
    console.log('Source ID:', sourceId);
    console.log('Target ID:', targetId);


    const sourceNode = nodes.find((node) => node.id === source);
    const targetNode = nodes.find((node) => node.id === target);
    console.log(JSON.stringify(sourceNode.connections?.length) + "sourceNodemaxConnections");
    console.log(JSON.stringify(sourceNode) + "sourceNode");



    const connectionSourceCount = sourceNode.connections?.length || 0;
    console.log(connectionSourceCount + "-----connectionSourceCount");

    const connectionTargetCount = targetNode.connections?.length || 0;
    console.log(connectionTargetCount + "-----connectionTargetCount");


    const sourceNodeID = sourceNode.id;
    const sourceNodeIDSplit = sourceNodeID.split("_");
    alert(sourceNodeIDSplit[0]);
    if (sourceNodeIDSplit[0] === "dataTable") {
      const newEdge = {
        id: `e${source}-${target}`, // a unique ID for the edge
        source,
        sourceHandle: 'right', // you can set this if you have multiple source handles
        target,
        targetHandle: 'left', // you can set this if you have multiple target handles
        type: 'custom-edge-type', // set your own custom edge type if needed
        animated: true, // set to false if you don't want the edge to animate
        // set the label for the edge
        style: { stroke: '#ccc', strokeWidth: 2 }, // set the style for the edge
        // set the arrowhead type for the edge
        sourcePosition: 'right',
        targetPosition: 'left',
        markerEnd: {
          type: MarkerType.Arrow,
        },

      };

      console.log(JSON.stringify(newEdge));

      setEdges([...edges, newEdge]);
    } else {

      const isSourceConnected = edges.some((connection) => connection.source === source);
      const isTargetConnected = edges.some((connection) => connection.target === target);

      console.log(isSourceConnected + "***************" + isTargetConnected);
      if (isSourceConnected || isTargetConnected) {
        alert("else");
        // Source node already has a connection, do not create a new connection
        return;
      }
    }


    // if (connectionTargetCount >= sourceNode.maxConnections.left) {
    //   alert("1 connection");
    //   return; // Do not create the edge if the maximum connections are reached
    // }


    //    // Check if the source node already has a connection
    //   const isSourceConnected = edges.some((connection) => connection.source === source);
    //   const isTargetConnected = edges.some((connection) => connection.target === target);

    //   console.log(isSourceConnected + "***************"+isTargetConnected);
    //   if (isSourceConnected || isTargetConnected) {
    //     // Source node already has a connection, do not create a new connection
    //     return;
    //   } else {
    //     alert("new node else");


    //     //Check if the connection already exists
    //     // const isConnectionExists = connections.some(
    //     //   (connection) => connection.source === source && connection.target === target
    //     // );
    //     // alert(isConnectionExists);
    //     // if (isConnectionExists) {
    //     //   // Connection already exists, do not create a duplicate connection


    //     //   return;
    //     // }else{



    //     // Create the connection
    //     //const newConnection = { source, target };


    //     // Add the source and target to their respective arrays
    //     setSources((prevSources) => [...prevSources, source]);
    //     setTargets((prevTargets) => [...prevTargets, target]);

    //     // Get the source and target nodes based on their IDs
    //     // const sourceNode = nodes.find((node) => node.id === source);
    //     // const targetNode = nodes.find((node) => node.id === target);


    //     // Find the source handle position based on the source node ID
    //     // const sourceNode = nodes.find((node) => node.id === source);
    //     //const sourceHandle = sourceNode?.handles?.right?.position;
    //     // console.log(JSON.stringify(sourceNode)+"------------");
    //     // console.log(JSON.stringify(targetNode)+"**********");
    //     // console.log(sourceHandle);
    //     // Find the target handle position based on the target node ID
    //     // const targetNode = nodes.find((node) => node.id === target);
    //     // const targetHandle = targetNode?.handles?.left?.position;

    //     //   const sourceHandle = source.position === 'right' ? 'right' : 'left';
    //     // const targetHandle = target.position === 'left' ? 'left' : 'right';

    //     // console.log(JSON.stringify(sourceHandle)+"----"+JSON.stringify(targetHandle));

    //     // if (sourceHandle === 'right' && targetHandle === 'left') {
    //     const newEdge = {
    //       id: `e${source}-${target}`, // a unique ID for the edge
    //       source,
    //       sourceHandle: 'right', // you can set this if you have multiple source handles
    //       target,
    //       targetHandle: 'left', // you can set this if you have multiple target handles
    //       type: 'custom-edge-type', // set your own custom edge type if needed
    //       animated: true, // set to false if you don't want the edge to animate
    //       // set the label for the edge
    //       style: { stroke: '#ccc', strokeWidth: 2 }, // set the style for the edge
    //       // set the arrowhead type for the edge
    //       sourcePosition: 'right',
    //       targetPosition: 'left',
    //       markerEnd: {
    //         type: MarkerType.Arrow,
    //       },

    //     };

    //     console.log(JSON.stringify(newEdge));

    //     setEdges([...edges, newEdge]);


    //     //  }


    // }

  };



  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  let id = 0;


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
      const draggedId = event.dataTransfer.getData('id');
      const positionSourceNode = event.dataTransfer.getData('positionSource');
      const positionTargetNode = event.dataTransfer.getData('positionTarget');

      alert(JSON.stringify(positionSourceNode));



      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      // Find the node type object from the nodeTypes array based on the nodeType value
      const selectedNodeType = nodesTypesRightContainer.find((node) => node.id === draggedId);
      console.log(JSON.stringify(draggedId) + "NODETYPES");
      console.log(JSON.stringify(selectedNodeType) + "selectedNodeType");
      const getId = () => `${selectedNodeType.id}_${id++}`;

      const newNode = {
        id: getId(),
        type: selectedNodeType.type,
        position,
        icon,
        data: {
          label: `${type} `,
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
        sourcePosition: selectedNodeType.sourcePosition,
        targetPosition: selectedNodeType.targetPosition,
        handles: {
          left: {
            position: 'right',
            type: 'target',
            isConnectable: false,
            // id: `${getId()}-left`,
          },
          right: {
            position: 'left',
            type: 'source',
            isConnectable: true,
            // id: `${getId()}-right`,
          },
        },
        maxConnections: {
          left: selectedNodeType.type === 'join' ? 2 : 1,
          right: selectedNodeType.edges.includes('right') ? 1 : 0,
        },
      };
      setNodes((nodes) => nodes.concat(newNode));

    },
    [reactFlowInstance]
  );

  const NodePopup = () => {
    // Render the popup window with the details of the selectedNode
    // You can use any UI component or CSS for styling
    return (
      <div>
        <h2>{selectedNode ? selectedNode.data.label : ''}</h2>
        {/* Other node details */}
      </div>
    );
  };

  return (
    <div>
      <Navbar></Navbar>
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

                  <ReactFlow onNodeDoubleClick={onNodeDoubleClick}
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
                  {selectedNode && <NodePopup />}
                </div>

              </ReactFlowProvider>
            </div>

          </div>

        </div>
      </form>
    </div>
  );
};

export default DnDFlow;
