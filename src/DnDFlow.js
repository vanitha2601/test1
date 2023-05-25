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
//import {useStoreState, removeElements } from 'react-flow-chart';

import 'reactflow/dist/style.css';
import DataTablePopupComponent from './PopUpWindows/dataTablePopupComponent';
import SortPopupComponent from './PopUpWindows/sortPopupComponent';
import FilterPopupComponent from './PopUpWindows/filterPopupComponent';
import JoinPopupComponent from './PopUpWindows/joinPopupComponent';
import SummarizePopupComponent from './PopUpWindows/summarizePopupComponent';
import SelectPopupComponent from './PopUpWindows/selectPopupComponent';
import AppendPopupComponent from './PopUpWindows/appendPopupComponent';
import ExtractPopupComponent from './PopUpWindows/extractPopupComponent';
import LineChartPopupComponent from './PopUpWindows/lineChartPopupComponent';
import BarChartPopupComponent from './PopUpWindows/barChartPopupComponent';
import PieChartPopupComponent from './PopUpWindows/pieChartPopupComponent';
// import ColumnDragDrop from './PopUpWindows/ColumnDragDrop';
// import Column from './PopUpWindows/Column';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


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

  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  let nodeId = 0; // Initialize the node ID counter


  const nodesTypesRightContainer = [
    {
      id: 'dataTable',
      type: 'input',
      alt: 'Data Table',
      icon: databaseicon,
      sourcePosition: 'right',
      label: 'Data Table',
      edges: ['right'],
      maxConnections: 2,
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
      type: 'customnode',

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
      sourcePosition: 'right',
      targetPosition: 'left',
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
      id: 'select',
      label: 'Select',
      type: 'default',
      alt: 'Select',
      icon: selecticon,
      edges: ['right', 'left'],
      maxConnections: 1,
      sourcePosition: 'right',
      targetPosition: 'left',
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
      id: 'append',
      label: 'Append',
      type: 'default',
      alt: 'Append',
      icon: appendicon,
      edges: ['right', 'left'],
      maxConnections: 1,
      sourcePosition: 'right',
      targetPosition: 'left',
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
      id: 'extract',
      label: 'Extract',
      type: 'default',
      alt: 'Extract',
      icon: extracticon,
      edges: ['right', 'left'],
      maxConnections: 1,
      sourcePosition: 'right',
      targetPosition: 'left',
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
      id: 'bar',
      label: 'Bar',
      type: 'default',
      alt: 'Bar',
      icon: barcharticon,
      edges: ['left'],
      maxConnections: 1,
      targetPosition: 'left',
      maxConnections: 1,
      sourceHandle: {
        id: 'sourceHandle',
        position: Position.Left,
      },
      targetHandle: {
        id: 'targetHandle',
        position: Position.Left,
      },
    },
    {
      id: 'line',
      label: 'Line',
      type: 'output',
      alt: 'Line Chart',
      icon: linecharticon,
      edges: ['left'],
      maxConnections: 1,
      targetPosition: 'left',
      maxConnections: 1,
      sourceHandle: {
        id: 'sourceHandle',
        position: Position.Left,
      },
      targetHandle: {
        id: 'targetHandle',
        position: Position.Left,
      },
    },
    {
      id: 'pie',
      label: 'Pie',
      type: 'output',
      alt: 'Pie Chart',
      icon: piecharticon,
      edges: ['left'],
      maxConnections: 1,
      targetPosition: 'left',
      sourceHandle: {
        id: 'sourceHandle',
        position: Position.Left,
      },
      targetHandle: {
        id: 'targetHandle',
        position: Position.Left,
      },
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
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState(false);




  const addConnection = (sourceNodeId, targetNodeId) => {
    const sourceNode = nodes.find((node) => node.id === sourceNodeId);
    const targetNode = nodes.find((node) => node.id === targetNodeId);

    if (sourceNode && targetNode) {
      if (!sourceNode.connections || !Array.isArray(sourceNode.connections)) {
        sourceNode.connections = []; // Initialize the connections array
      }
      if (!targetNode.connections || !Array.isArray(targetNode.connections)) {
        targetNode.connections = []; // Initialize the connections array
      }

      const existingSourceConnections = sourceNode.connections.length;
      const existingTargetConnections = targetNode.connections.length;

      // Check if the source node already has two connections
      // if (existingSourceConnections >= 2) {
      //   return; // Ignore the connection attempt
      // }

      const newConnection = {
        source: sourceNodeId,
        target: targetNodeId,
      };


      sourceNode.connections.push(newConnection);


      // Perform any other necessary actions when adding a connection

      console.log(`Connection added: ${JSON.stringify(newConnection)}`);
      console.log(`Total connections for source node: ${sourceNode.connections.length}`);
    }
  };



  const onNodeDoubleClick = (event, node) => {
    setSelectedNode(node);
  };

  function getConnectedEdgesCount(nodeId, edges) {
    return edges.filter((edge) => edge.source === nodeId || edge.target === nodeId).length;
  }

  const isJoinNode = (nodeId) => {
    return nodeId.startsWith('join');
  };

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

    console.log(JSON.stringify(sourceNode) + "sourceNode");
    console.log(JSON.stringify(targetNode) + "targetNode");

    const sourceNodeID = sourceNode.id;
    const sourceNodeIDSplit = sourceNodeID.split("_");
    const targetNodeID = targetNode.id;
    const targetNodeIDSplit = targetNodeID.split("_");

    // Check if the connection is valid
    if (source && target && source !== target) {
      // Call the addConnection function to add the connection
      addConnection(source, target);
    }

    // Extract source and target arrays
    const sourceArray = edges.map(connection => connection.source);
    const targetArray = edges.map(connection => connection.target);
    console.log(JSON.stringify(sourceArray) + "***********" + JSON.stringify(targetArray));


    const joinCount = targetArray.filter(target => target.includes("join")).length;
    console.log(joinCount);

    const isSourceConnected = edges.some((connection) => connection.source === source);
    const isTargetConnected = edges.some((connection) => connection.target === target);

    const requiredConnections = 2;
    const joinNodes = targetArray.filter(target => target.includes("join"));
    console.log(joinNodes, joinNodes);

    const joinNodeConnectionsCount = {};

    for (const joinNode of joinNodes) {
      const connectionsCount = targetArray.filter(target => target === joinNode).length;
      joinNodeConnectionsCount[joinNode] = connectionsCount;
    }

    const hasRequiredConnections = joinNodes.every(joinNode => joinNodeConnectionsCount[joinNode] >= requiredConnections);


    //const hasRequiredConnections = joinNodes.every(joinNode => targetArray.filter(target => target === joinNode).length >= requiredConnections);

    //const hasRequiredConnections = targetArray.filter(target => target === joinNode).length >= requiredConnections;

    console.log(isSourceConnected + "--" + isTargetConnected);
    if (isSourceConnected || isTargetConnected && hasRequiredConnections) {

      // Source node already has a connection, do not create a new connection
      return;
    } else {

      if (isTargetConnected && targetNodeIDSplit[0] !== "join") {
        return;
      } else {
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
      }




      // }
    }
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




      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      // Find the node type object from the nodeTypes array based on the nodeType value
      const selectedNodeType = nodesTypesRightContainer.find((node) => node.id === draggedId);
      console.log(JSON.stringify(draggedId) + "NODETYPES");
      console.log(JSON.stringify(selectedNodeType) + "selectedNodeType");
      const getId = () => `${selectedNodeType.id}_${id++}`;

      let popupContent;
      if (selectedNodeType.id === "dataTable") {
        popupContent = <DataTablePopupComponent onClose={closePopup}
         onRemoveTable={handleRemoveTable} label={selectedNodeType.label}/>;
        setShowPopup(true);
      }
      else if (selectedNodeType.id === "sort") {
        popupContent = <SortPopupComponent onClose={closePopup}
         onRemoveTable={handleRemoveTable}
         label={selectedNodeType.label} />;
      } else if (selectedNodeType.id === "filter") {
        popupContent = <FilterPopupComponent onClose={closePopup}
         onRemoveTable={handleRemoveTable} 
         label={selectedNodeType.label} />;
      } else if (selectedNodeType.id === "join") {
        popupContent = <JoinPopupComponent onClose={closePopup} 
        onRemoveTable={handleRemoveTable}
        label={selectedNodeType.label}  />;
      }else if (selectedNodeType.id === "summarize") {
        popupContent = <SummarizePopupComponent onClose={closePopup} 
        onRemoveTable={handleRemoveTable}
        label={selectedNodeType.label}  />;
      }else if (selectedNodeType.id === "select") {
        popupContent = <SelectPopupComponent onClose={closePopup} 
        onRemoveTable={handleRemoveTable}
        label={selectedNodeType.label}  />;
      }else if (selectedNodeType.id === "append") {
        popupContent = <AppendPopupComponent onClose={closePopup}
         onRemoveTable={handleRemoveTable} 
         label={selectedNodeType.label} />;
      }else if (selectedNodeType.id === "extract") {
        popupContent = <ExtractPopupComponent onClose={closePopup}
         onRemoveTable={handleRemoveTable} 
         label={selectedNodeType.label} />;
      }else if (selectedNodeType.id === "line") {
        popupContent = <LineChartPopupComponent onClose={closePopup}
         onRemoveTable={handleRemoveTable}
         label={selectedNodeType.label}  />;
      }else if (selectedNodeType.id === "bar") {
        popupContent = <BarChartPopupComponent onClose={closePopup} 
        label={selectedNodeType.label} 
        onRemoveTable={handleRemoveTable} />;
      }else if (selectedNodeType.id === "pie") {
        popupContent = <PieChartPopupComponent onClose={closePopup} 
        onRemoveTable={handleRemoveTable}
        label={selectedNodeType.label}  />;
      }
      
       
      // Show the popup window and set the popup content 
     // setShowPopup(true);
      setPopupContent(popupContent);

      const newNode = {
        id: getId(),
        type: selectedNodeType.type,
        position,
        icon,
        data: {
          label: `${selectedNodeType.label} `,
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
        // maxConnections: {
        //   left: selectedNodeType.type === 'join' ? 2 : 1,
        //   right: selectedNodeType.edges.includes('right') ? 1 : 0,
        // },
      };
      // Set the maxConnections property based on the node type
      switch (selectedNodeType.type) {
        case 'input':
          newNode.maxConnections = 2;
          break;
        case 'customNode':
          newNode.maxConnections = 1;
          break;
        case 'filter':
          newNode.maxConnections = 1;
          break;
        // Add cases for other node types and their respective maxConnections values
        default:
          newNode.maxConnections = Infinity; // Default to unlimited connections
          break;
      }
      setNodes((nodes) => nodes.concat(newNode));
    },
    [reactFlowInstance]
  );

  // Function to close the popup window
  const closePopup = () => {
    setShowPopup(false);
  };
  const handleRemoveTable = () => {
    // Close the popup
    closePopup();
  };

  const handleNodeDoubleClick = (event, node) => {
    // Open the popup when a node is double-clicked
    setShowPopup(true);
  };

  const handleDeleteSelectedNodes = (selectedNodeId) => {
    const updatedNodes = nodes.filter((node) => node.id !== selectedNodeId);
    const updatedEdges = edges.filter(
      (edge) => edge.source !== selectedNodeId && edge.target !== selectedNodeId
    );
    setNodes(updatedNodes);
    setEdges(updatedEdges);
  };

  const handleElementsRemove = (selectedNodeIds) => {
    const selectedNodes = selectedNodeIds.filter((el) => el.id === 'dataTable');
    console.log('Selected nodes:', selectedNodes);
  };

  const handleNodeClick = (event, nodeId) => {
    const selectedNodeId = nodeId;
    setSelectedNodeId(selectedNodeId.id);
  };


  useEffect(() => {
    const handleKeyDown = (event) => {

      const { source, target } = event;
      if (event.key === 'Delete' && selectedNodeId) {
        event.preventDefault();
        handleDeleteSelectedNodes(selectedNodeId);
        setSelectedNodeId(null);
      }

    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedNodeId]);


  
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

                  <ReactFlow
                    onNodeDoubleClick={handleNodeDoubleClick}
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onInit={setReactFlowInstance}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    onElementsRemove={handleElementsRemove}
                    onNodeClick={handleNodeClick}
                    // nodeTypes={nodesTypesRightContainer}
                    // nodeTypes={nodeTypes}
                    fitView


                  >
 

 
                  </ReactFlow>
                  {showPopup && popupContent}
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

