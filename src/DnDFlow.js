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

import DroppedNode from './PopUpWindows/DroppedNode';
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
  const [nodeName, setNodeName] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
    const [dropdownPopupDataTableValues, setDropdownPopupDataTableValues] = useState(['Accounts', 'Company', 'Roles']);
    const [accountSortColumns, setAccountSortColumns] = useState([]);

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
  const [droppedNodes, setDroppedNodes] = useState([]);
  const [nodeData, setNodeData] = useState({}); // State to store individual node data


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

  const [submittedValue, setSubmittedValue] = useState('');




  //   const updateNodeLabel = (nodeId, newLabel) => {

  //     setNodes((nodes) => {
  //       // Update the label of the new node
  //       const newNode = {
  //         ...nodes,
  //         label: 'New Label', // Set the desired label for the new node
  //       };

  //       // Append the updated new node to the array
  //       return nodes.concat(newNode);


  //    // setNodes(updatedNodes);
  //   });
  // };

  const handleValueSubmit = (selectedNodeId,  name, option) => {
   console.log(name+"----"+option);

    setNodes((nodes) => {
      // Map over the nodes array and update the label for the desired node
      const updatedNodes = nodes.map((node) => {
        if (node.id === selectedNodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              label: name,
            },
            // Set the desired label for the node
          };
        }
        return node;
      });

      return updatedNodes;
      setNodes((nodes) => nodes.concat(updatedNodes));
    }, [reactFlowInstance]);
    
    // setNodeName(name);
    // setSelectedOption(option);

    setNodeData((prevNodeData) => ({
          ...prevNodeData,
          [selectedNodeId]: {
            name,
            option,
          },
        }));

    setShowPopup(false);
  };
  // const handleValueSubmit = (selectedNodeId,  name, option) => {
  //   // Update the node data in the state with the submitted values
  //   setNodeData((prevNodeData) => ({
  //     ...prevNodeData,
  //     [selectedNodeId]: {
  //       name,
  //       option,
  //     },
  //   }));
  // };

  // const handleValueSubmit = (value) => {
  //   alert(JSON.stringify(value)+"handlevaluesubmit");

  //     setSubmittedValue(value);

  //     setShowPopup(false);
  // };

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

 
  // Callback function to update nodes in the parent component
  const updateNodes = (updatedNodes) => {
    setNodes(updatedNodes);
  };

  // Callback function to update dropped nodes in the parent component
  const updateDroppedNodes = (droppedNodes) => {
    setDroppedNodes(droppedNodes);
  };


  const idCounters = {}; // Object to store separate counters for each node type
  let id = 1;
  const getId = (selectedEachNodeType) => {
    if (!idCounters[selectedEachNodeType]) {
      idCounters[selectedEachNodeType] = 1; // Initialize the counter if it doesn't exist
    }
    // const id = `${selectedEachNodeType}_${idCounters[selectedNodeType]++}`;
    // return id;
    return `${selectedEachNodeType}_${idCounters[selectedEachNodeType]++}`;
  };

  const onDrop = useCallback(
    (event, selectedEachNodeType) => {


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
      const selectedEachNodeId = selectedNodeType.id;
     // const getId = (selectedEachNodeType) => `${selectedNodeType.id}_${id++}`;

      

      const newNode = {
        id: getId(selectedEachNodeId),
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
      // Update the droppedNodes array with the new node
      //setDroppedNodes((prevDroppedNodes) => [...prevDroppedNodes, newNode]);
      setDroppedNodes((droppedNodes) => droppedNodes.concat(newNode));
      // Update the droppedNodes state by adding the new node
      // setDroppedNodes((droppedNodes) => [...droppedNodes, newNode]);

      let popupContent;
      let selectedNodeData;


// Get the first option value from the dropdown
const firstOption = dropdownPopupDataTableValues[0];

// Update the nodeData state with the default name


      if ((newNode.id).match(/^dataTable/)) {

        setNodeData((prevNodeData) => ({
          ...prevNodeData,
          [newNode.id]: {
            name: firstOption,
            option: '',
          },
        }));
       
        if ((newNode.id) in nodeData) {
          selectedNodeData = nodeData[newNode.id];
        }
        popupContent = <DataTablePopupComponent onClose={closePopup} // Pass droppedNodes when calling onClose
          onRemoveTable={handleRemoveTable}
          selectedNodeId={newNode.id}
          nodeName={newNode.id}
          selectedOption={selectedNodeData?.option || ''}
          dropdownPopupDataTableValues={dropdownPopupDataTableValues}
          onValueSubmit={handleValueSubmit}
          setNodes={setNodes} // Pass the callback function as a prop
          nodes={nodes} // Pass the nodes array as a prop
          droppedNodes={droppedNodes} // Pass the droppedNodes as a prop
          setDroppedNodes={setDroppedNodes} // Pass the setDroppedNodes function as a prop
        />

        setShowPopup(true);
        setPopupContent(popupContent);
      } else if ((newNode.id).match(/^sort/)) {
        

        // if ((newNode.id) in nodeData) {
        //   selectedNodeData = nodeData[newNode.id];
        // }
        // alert(JSON.stringify(selectedNodeData));

       
        // Handle the popup window for datatable nodes
        // if (selectedNodeId in nodeData) {
        //   selectedNodeData = nodeData[selectedNodeId];
        // }
        // Handle the popup window for sort nodes
        popupContent = <SortPopupComponent onClose={closePopup} // Pass droppedNodes when calling onClose
          onRemoveTable={handleRemoveTable}
          selectedNodeId={newNode.id}
          nodeName={newNode.id}
         // nodeName={selectedNodeData?.name || ''}
          // nodeName={nodeName}
          // selectedOption={selectedOption}
          selectedOption={selectedNodeData?.option || ''}
          dropdownPopupDataTableValues={dropdownPopupDataTableValues}
          onValueSubmit={handleValueSubmit}
          setNodes={setNodes} // Pass the callback function as a prop
          nodes={nodes} // Pass the nodes array as a prop
          droppedNodes={droppedNodes} // Pass the droppedNodes as a prop
          setDroppedNodes={setDroppedNodes} />;
  
      }



      // Show the popup window and set the popup content 
      // setShowPopup(true);
      setPopupContent(popupContent);


    },
    [reactFlowInstance, setNodes, setDroppedNodes]
  );

  // Function to close the popup window
  const closePopup = (value) => {
    setSubmittedValue(value);

    setShowPopup(false);
  };
  const handleRemoveTable = () => {
    // Close the popup
    closePopup();
  };

  const handlePopupSubmit = (selectedNodeId, name, dropdownValue) => {

    // Check if the selected node exists in the nodeData
  if (selectedNodeId in nodeData) {
    // Node already exists, no need to set the name and dropdownValue again
    return;
  }
    // Update the node data in the state with the submitted values
    setNodeData((prevNodeData) => ({
      ...prevNodeData,
      [selectedNodeId]: {
        name,
        dropdownValue,
      },
    }));
  };

  const handleNodeDoubleClick = (event, node) => {
    // Open the popup when a node is double-clicked
    const selectedNode = node;
   
    // alert(JSON.stringify(selectedNodeId.id));
     const selectedNodeId = selectedNode.id;
     setSelectedNodeId(selectedNodeId);
    // Check if the data for the selected node exists in the state
    // if (selectedNodeId in nodeData) {
    //   // If the data exists, retrieve it
    //   const selectedNodeData = nodeData[selectedNodeId];
    //   // Use the data as needed
    //   console.log(selectedNodeData+"selectednodedata");
    // }

let selectedNodeData;
    let popupContent;
    if ((selectedNodeId).match(/^dataTable/)) {
      // Handle the popup window for datatable nodes
      if (selectedNodeId in nodeData) {
        selectedNodeData = nodeData[selectedNodeId];
      }

      popupContent = <DataTablePopupComponent onClose={closePopup} // Pass droppedNodes when calling onClose
        onRemoveTable={handleRemoveTable}
        selectedNodeId={selectedNodeId}
        nodeName={selectedNodeData?.name || ''}
        // nodeName={nodeName}
        // selectedOption={selectedOption}
        selectedOption={selectedNodeData?.option || ''}
        dropdownPopupDataTableValues={dropdownPopupDataTableValues}
        onValueSubmit={handleValueSubmit}
        setNodes={setNodes} // Pass the callback function as a prop
        nodes={nodes} // Pass the nodes array as a prop
        droppedNodes={droppedNodes} // Pass the droppedNodes as a prop
        setDroppedNodes={setDroppedNodes} // Pass the setDroppedNodes function as a prop
      />
    } else if ((selectedNodeId).match(/^sort/)) {
// Handle the popup window for sort nodes
let selectedNodeData = {};
     // Handle the popup window for datatable nodes
      if (selectedNodeId in nodeData) {
        selectedNodeData = nodeData[selectedNodeId];
      }
console.log(JSON.stringify(selectedNodeData)+"sortnode");
      // Handle the popup window for sort nodes
      popupContent = <SortPopupComponent onClose={closePopup} // Pass droppedNodes when calling onClose
        onRemoveTable={handleRemoveTable}
        selectedNodeId={selectedNodeId}
        nodeName={selectedNodeData?.name || ''}
        // nodeName={nodeName}
        // selectedOption={selectedOption}
        selectedOption={selectedNodeData?.option || ''}
        dropdownPopupDataTableValues={dropdownPopupDataTableValues}
        onValueSubmit={handleValueSubmit}
        setNodes={setNodes} // Pass the callback function as a prop
        nodes={nodes} // Pass the nodes array as a prop
        droppedNodes={droppedNodes} // Pass the droppedNodes as a prop
        setDroppedNodes={setDroppedNodes} />;

    } else if ((selectedNodeId).match(/^filter/)) {
      // Handle the popup window for filter nodes
      popupContent = <FilterPopupComponent onClose={closePopup}
        onRemoveTable={handleRemoveTable}
        selectedNodeId={selectedNodeId}
        nodeName={selectedNodeData?.name || ''}
        // nodeName={nodeName}
        // selectedOption={selectedOption}
        selectedOption={selectedNodeData?.option || ''}
        onValueSubmit={handleValueSubmit}
        setNodes={setNodes} // Pass the callback function as a prop
        nodes={nodes} // Pass the nodes array as a prop
        droppedNodes={droppedNodes} // Pass the droppedNodes as a prop
        setDroppedNodes={setDroppedNodes} />;
    } else if ((selectedNodeId).match(/^join/)) {
      // Handle the popup window for filter nodes
      popupContent = <JoinPopupComponent onClose={closePopup}
        onRemoveTable={handleRemoveTable}
        selectedNodeId={selectedNodeId}
        nodeName={selectedNodeData?.name || ''}
        // nodeName={nodeName}
        // selectedOption={selectedOption}
        selectedOption={selectedNodeData?.option || ''}
        onValueSubmit={handleValueSubmit}
        setNodes={setNodes} // Pass the callback function as a prop
        nodes={nodes} // Pass the nodes array as a prop
        droppedNodes={droppedNodes} // Pass the droppedNodes as a prop
        setDroppedNodes={setDroppedNodes} />;
    } else if ((selectedNodeId).match(/^summarize/)) {
      // Handle the popup window for filter nodes
      popupContent = <JoinPopupComponent onClose={closePopup}
        onRemoveTable={handleRemoveTable}
        selectedNodeId={selectedNodeId}
        nodeName={selectedNodeData?.name || ''}
        // nodeName={nodeName}
        // selectedOption={selectedOption}
        selectedOption={selectedNodeData?.option || ''}
        onValueSubmit={handleValueSubmit}
        setNodes={setNodes} // Pass the callback function as a prop
        nodes={nodes} // Pass the nodes array as a prop
        droppedNodes={droppedNodes} // Pass the droppedNodes as a prop
        setDroppedNodes={setDroppedNodes} />;
    } else if ((selectedNodeId).match(/^select/)) {
      // Handle the popup window for filter nodes
      popupContent = <SelectPopupComponent onClose={closePopup}
        onRemoveTable={handleRemoveTable}
        selectedNodeId={selectedNodeId}
        nodeName={selectedNodeData?.name || ''}
        // nodeName={nodeName}
        // selectedOption={selectedOption}
        selectedOption={selectedNodeData?.option || ''}
        onValueSubmit={handleValueSubmit}
        setNodes={setNodes} // Pass the callback function as a prop
        nodes={nodes} // Pass the nodes array as a prop
        droppedNodes={droppedNodes} // Pass the droppedNodes as a prop
        setDroppedNodes={setDroppedNodes} />;
    } else if ((selectedNodeId).match(/^append/)) {
      // Handle the popup window for filter nodes
      popupContent = <AppendPopupComponent onClose={closePopup}
        onRemoveTable={handleRemoveTable}
        selectedNodeId={selectedNodeId}
        nodeName={selectedNodeData?.name || ''}
        // nodeName={nodeName}
        // selectedOption={selectedOption}
        selectedOption={selectedNodeData?.option || ''}
        onValueSubmit={handleValueSubmit}
        setNodes={setNodes} // Pass the callback function as a prop
        nodes={nodes} // Pass the nodes array as a prop
        droppedNodes={droppedNodes} // Pass the droppedNodes as a prop
        setDroppedNodes={setDroppedNodes} />;
    } else if ((selectedNodeId).match(/^extract/)) {
      // Handle the popup window for filter nodes
      popupContent = <ExtractPopupComponent onClose={closePopup}
        onRemoveTable={handleRemoveTable}
        selectedNodeId={selectedNodeId}
        nodeName={selectedNodeData?.name || ''}
        // nodeName={nodeName}
        // selectedOption={selectedOption}
        selectedOption={selectedNodeData?.option || ''}
        onValueSubmit={handleValueSubmit}
        setNodes={setNodes} // Pass the callback function as a prop
        nodes={nodes} // Pass the nodes array as a prop
        droppedNodes={droppedNodes} // Pass the droppedNodes as a prop
        setDroppedNodes={setDroppedNodes} />;
    } else if ((selectedNodeId).match(/^line/)) {
      // Handle the popup window for filter nodes
      popupContent = <LineChartPopupComponent onClose={closePopup}
        onRemoveTable={handleRemoveTable}
        selectedNodeId={selectedNodeId}
        nodeName={selectedNodeData?.name || ''}
        // nodeName={nodeName}
        // selectedOption={selectedOption}
        selectedOption={selectedNodeData?.option || ''}
        onValueSubmit={handleValueSubmit}
        setNodes={setNodes} // Pass the callback function as a prop
        nodes={nodes} // Pass the nodes array as a prop
        droppedNodes={droppedNodes} // Pass the droppedNodes as a prop
        setDroppedNodes={setDroppedNodes} />;
    } else if ((selectedNodeId).match(/^bar/)) {
      // Handle the popup window for filter nodes
      popupContent = <BarChartPopupComponent onClose={closePopup}
        onRemoveTable={handleRemoveTable}
        selectedNodeId={selectedNodeId}
        nodeName={selectedNodeData?.name || ''}
        // nodeName={nodeName}
        // selectedOption={selectedOption}
        selectedOption={selectedNodeData?.option || ''}
        onValueSubmit={handleValueSubmit}
        setNodes={setNodes} // Pass the callback function as a prop
        nodes={nodes} // Pass the nodes array as a prop
        droppedNodes={droppedNodes} // Pass the droppedNodes as a prop
        setDroppedNodes={setDroppedNodes} />;
    } else if ((selectedNodeId).match(/^pie/)) {
      // Handle the popup window for filter nodes
      popupContent = <PieChartPopupComponent onClose={closePopup}
        onRemoveTable={handleRemoveTable}
        selectedNodeId={selectedNodeId}
        nodeName={selectedNodeData?.name || ''}
        // nodeName={nodeName}
        // selectedOption={selectedOption}
        selectedOption={selectedNodeData?.option || ''}
        onValueSubmit={handleValueSubmit}
        setNodes={setNodes} // Pass the callback function as a prop
        nodes={nodes} // Pass the nodes array as a prop
        droppedNodes={droppedNodes} // Pass the droppedNodes as a prop
        setDroppedNodes={setDroppedNodes} />;
    }
    setShowPopup(true);
    setPopupContent(popupContent);

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

