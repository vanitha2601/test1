import React, { useState, useRef, useEffect, useCallback } from 'react';
import CustomEdge, { EdgeProvider } from './CustomEdge';

import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls, Handle,
  ArrowHeadType, Position,
  removeElements, useStoreState,
  useStoreActions, useReactFlow,
  getConnectedEdges, Background, MarkerType,
  EdgeTypes
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
  // const [selectedOption, setSelectedOption] = useState('');
  // const [dropdownPopupDataTableValues, setDropdownPopupDataTableValues] = useState(['Accounts', 'Company', 'Roles']);
  // const [accountSortColumns, setAccountSortColumns] = useState([]);

  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedNodeId, setSelectedNodeId] = useState(null);



  let nodeId = 0; // Initialize the node ID counter


  const nodesTypesRightContainer = [
    {
      id: 'dataTable',
      type: 'input',
      alt: 'dataTable',
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

      alt: 'sort',
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
      alt: 'filter',
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

  const [sqlArray, setSqlArray] = useState([]);
  const [edgeTypeButton, setEdgeTypesButton] = useState('AND');

  const [data, setData] = useState({
    connection: {
      url: 'https://example.com',
    },
    databases: [
      {
        name: 'Employee Database',
        tables: [
          {
            name: 'Accounts Table',
            columns: ['id', 'name', 'age', 'salary', 'address'],

          },
          {
            name: 'Employee Table',
            columns: ['employee_id', 'employee_name', 'employee_age', 'employee_salary', 'employee_address'],

          },
        ],
      },
      {
        name: 'Company Database',
        tables: [
          {
            name: 'Boolean Table',
            columns: ['company_id', 'Company_name', 'Company_address'],

          },
          {
            name: 'Simons Table',
            columns: ['company_id', 'Company_name', 'Company_address'],

          },
          {
            name: 'Products Table',
            columns: ['product_id', 'product_name', 'Price', 'quantity'],

          },
        ],
      },
      {
        name: 'public',
        tables: [
          {
            name: 'roles',
            // columns: ['role_id', 'role_name', 'gender', 'roles', 'yearsofexperionce'],
            columns: ['role_id', 'role_name'],
          },
          {
            name: 'company',
            // columns: ['role_id', 'role_name', 'gender', 'roles', 'yearsofexperionce'],
            columns: ['id', 'name', 'age', 'address', 'salary', 'join_date'],
          },
          {
            name: 'Senior Table',
            columns: ['id', 'name', 'roles', 'yearsofexperionce'],
          },
        ],
      },
    ],
  });
  const [selectedDatabase, setSelectedDatabase] = useState('');
  const [selectedTable, setSelectedTable] = useState('');
  const [selectedColumn, setSelectedColumn] = useState('');
  const [popupDropdownValues, setPopupDropdownValues] = useState([]);
  const [elements, setElements] = useState([]);

  const [toggleStates, setToggleStates] = useState({});


  const handleToggleValue = (edgeId, newState) => {
    const updatedToggleStates = {
      ...toggleStates,
      [edgeId]: newState,
    };

    setToggleStates(updatedToggleStates);

    // Rest of the code...
  };

  const [edgeButtonValues, setEdgeButtonValues] = useState({});

  const handleButtonValueChange = (edgeId, value) => {

    setEdgeButtonValues((prevValues) => ({
      ...prevValues,
      [edgeId]: value,
    }));
    console.log(JSON.stringify(edgeButtonValues) + "edgeButtonValues");
  };


  const getDropdownValues = (selectedNode) => {
    let dropdownValues = {};
    console.log(JSON.stringify(selectedNode));
    if ((selectedNode.id).match(/^dataTable/)) {
      // Get the selected database and table names
      const selectedDatabaseName = selectedNode.data.database;
      const selectedTableName = selectedNode.data.table;
      // Find the selected database from the data
      const selectedDatabase = data.databases.find((db) => db.name === selectedDatabaseName);

      if (selectedDatabase) {
        // Find the selected table from the selected database
        const selectedTable = selectedDatabase.tables.find((table) => table.name === selectedTableName);

        if (selectedTable) {
          // Extract the columns of the selected table
          const columns = selectedTable.columns;

          // Add the database name, table name, and columns to the dropdown values
          dropdownValues.database = selectedDatabaseName;
          dropdownValues.table = selectedTableName;
          dropdownValues.columns = columns;
        }
      }
    }

    return dropdownValues;
  };






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



  const handleDataTableSubmit = (selectedNodeId, name, selectedDatabase, selectedTable, columns) => {

    setNodes((nodes) => {
      // Map over the nodes array and update the label for the desired node
      const updatedNodes = nodes.map((node) => {
        if (node.id === selectedNodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              label: name,
              selectedDatabase: selectedDatabase,
              selectedTable: selectedTable,
              columns: columns


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
        selectedDatabase,
        selectedTable,
        columns
      },
    }));

    setShowPopup(false);
  };

  const handleSortSubmit = (selectedNodeId, name, buildOrderBy, selectedTable, selectedColumns, isChecked,
    thenByIsChecked,
    selectedThenByColumns, showAdditionalinputlength) => {
    console.log(showAdditionalinputlength + "showAdditionalinputlength");
    console.log(JSON.stringify(selectedColumns) + "selectedColumnsSORTSUBMIT");
    console.log(selectedColumns + "selectedColumns" + selectedThenByColumns + "--selectedThenByColumns");
    setNodes((nodes) => {
      // Map over the nodes array and update the label for the desired node
      const updatedNodes = nodes.map((node) => {
        if (node.id === selectedNodeId) {
          //   const buildOrderBy = [selectedColumns,selectedThenByColumns];
          // alert(JSON.stringify(buildOrderBy)+"buildOrderBySORTSUBMIT");
          return {
            ...node,
            data: {
              ...node.data,
              label: name,

              // selectedDatabase: node.data.selectedDatabase, // Maintain the selectedDatabase value
              // selectedTable: node.data.selectedTable,
              buildOrderBy,
              selectedTable,
              selectedColumns,
              isChecked,
              thenByIsChecked,
              selectedThenByColumns,
              showAdditionalinputlength
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
        buildOrderBy,
        selectedTable,
        selectedColumns,
        isChecked,
        thenByIsChecked,
        selectedThenByColumns,
        showAdditionalinputlength
        //   selectedDatabase: node.data.selectedDatabase, // Maintain the selectedDatabase value
        // selectedTable: node.data.selectedTable,
      },
    }));

    setShowPopup(false);
  };

  const handleFilterSubmit = (selectedNodeId, name, compareType, selectedTable,
    selectedFilterColumns, enterValue, additionalTextboxValues, selectedGroupColumns, additionalCompareType,
    showAdditionalinputGrouplength, additionalLogicalOperators, dataFilterJson) => {

    setNodes((nodes) => {
      // Map over the nodes array and update the label for the desired node
      const updatedNodes = nodes.map((node) => {
        if (node.id === selectedNodeId) {
          //   const buildOrderBy = [selectedColumns,selectedThenByColumns];
          // alert(JSON.stringify(buildOrderBy)+"buildOrderBySORTSUBMIT");
          return {
            ...node,
            data: {
              ...node.data,
              label: name,
              compareType,
              selectedTable,
              selectedFilterColumns,
              selectedGroupColumns,
              additionalCompareType,
              showAdditionalinputGrouplength,
              enterValue,
              additionalTextboxValues,
              additionalLogicalOperators,
              dataFilterJson
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
        compareType,
        selectedTable,
        selectedFilterColumns,
        additionalCompareType,
        showAdditionalinputGrouplength,
        selectedGroupColumns,
        enterValue,
        additionalTextboxValues,
        additionalLogicalOperators,
        dataFilterJson
      },
    }));

    setShowPopup(false);
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

        const isSourceFilterNode = sourceNode.alt === 'filter';
        const isTargetFilterNode = targetNode.alt === 'filter';
        alert(JSON.stringify(isSourceFilterNode) + "---" + JSON.stringify(isTargetFilterNode));

        let edgeType = 'defaultEdge';
        let buttonValue = '';
        if (isSourceFilterNode && isTargetFilterNode) {
          edgeType = 'customEdge';
          // buttonValue = 'AND';
        }


        const newEdge = {
          id: `e${source}-${target}`, // a unique ID for the edge
          source,
          sourceHandle: 'right', // you can set this if you have multiple source handles
          target,
          targetHandle: 'left', // you can set this if you have multiple target handles
          type: edgeType, // set your own custom edge type if needed
          animated: true, // set to false if you don't want the edge to animate
          // set the label for the edge
          style: { stroke: '#ccc', strokeWidth: 2 }, // set the style for the edge
          // set the arrowhead type for the edge
          sourcePosition: 'right',
          targetPosition: 'left',
          markerEnd: {
            type: MarkerType.Arrow,
          },
          //  buttonValue: 'AND', 
          initialEdgeType: 'AND',

          onToggle: handleToggleValue,

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

      //  const selectedDatabaseName = selectedDatabase ? selectedDatabase.name : '';
      //  const selectedTableName = selectedTable ? selectedTable.name : '';

      // Extract the database names from the data object
      const selectedDatabaseNames = data.databases.map((db) => db.name);

      // Extract the table names from the data object
      const selectedTableNames = data.databases.reduce((acc, db) => {
        const names = db.tables.map((table) => table.name);
        return [...acc, ...names];
      }, []);

      // Get the initial database and table values
      const initialDatabase = data.databases[0];
      const initialTable = initialDatabase.tables[0];
      const initialColumn = initialTable.columns[0];
      const generatedEachNodeId = getId(selectedEachNodeId);
      const newNode = {
        id: generatedEachNodeId,
        type: selectedNodeType.type,
        position,
        icon,
        alt: selectedNodeType.alt,
        data: {
          // label: `${selectedNodeType.label} `,
          label: `${generatedEachNodeId} `,
          labelPosition: 'bottom', // set the label position to bottom
          labelBgPadding: [6, 6], // set the padding for the label background
          labelStyle: { fontSize: '12px' },
          url: iconUrl,
          // set the font size for the label
          database: selectedDatabaseNames, // Set the selected database name
          table: selectedTableNames,
          // selectedDatabase: initialDatabase,
          // selectedTable: initialTable,
          // buildOrderBy:initialColumn,
          // isChecked:'false',
          // selectedThenByColumns:[]
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
      if (newNode.alt === 'dataTable') {
        // newNode.data.selectedDatabase = initialDatabase;
        // newNode.data.buildOrderBy = initialColumn;
        newNode.data.selectedDatabase = initialDatabase;
        newNode.data.selectedTable = initialTable;
        newNode.data.selectedColumns = initialColumn;
      }
      else if (newNode.alt === 'sort') {

        newNode.data.buildOrderBy = initialColumn;
        newNode.data.selectedColumns = initialColumn;
        newNode.data.isChecked = false;
        newNode.data.thenByIsChecked = false;
        newNode.data.selectedThenByColumns = [];
      } else if (newNode.alt === 'filter') {
        newNode.data.jsonFilterData = [];
        newNode.data.selectedGroupColumns = [];
        newNode.data.additionalCompareType = [];
        newNode.data.enterValue = '';
        newNode.data.additionalLogicalOperators = [];

      }
      // Update the selectedDatabase and selectedTable states in the parent component
      setSelectedDatabase(initialDatabase);
      setSelectedTable(initialTable);
      setSelectedColumn(initialColumn);
      setNodes((nodes) => nodes.concat(newNode));
      // Update the droppedNodes array with the new node
      // setDroppedNodes((prevDroppedNodes) => [...prevDroppedNodes, newNode.id]);
      setDroppedNodes((droppedNodes) => droppedNodes.concat(newNode.id));
      // Update the droppedNodes state by adding the new node
      // setDroppedNodes((droppedNodes) => [...droppedNodes, newNode]);

      let popupContent;
      let selectedNodeData;


      // Get the first option value from the dropdown
      //  const firstOption = dropdownPopupDataTableValues[0];

      // Update the nodeData state with the default name

      if ((newNode.id).match(/^dataTable/)) {


        if ((newNode.id) in nodeData) {
          selectedNodeData = nodeData[newNode.id];
        }
        popupContent = <DataTablePopupComponent onClose={closePopup} // Pass droppedNodes when calling onClose
          onRemoveTable={handleRemoveTable}
          selectedNodeId={newNode.id}
          nodeName={newNode.id}

          onValueSubmit={handleDataTableSubmit}
          setNodes={setNodes} // Pass the callback function as a prop
          nodes={nodes} // Pass the nodes array as a prop
          droppedNodes={droppedNodes} // Pass the droppedNodes as a prop
          setDroppedNodes={setDroppedNodes}

          data={data}

        />

        setShowPopup(true);
        setPopupContent(popupContent);
      } else if ((newNode.id).match(/^sort/)) {


        if ((newNode.id) in nodeData) {
          selectedNodeData = nodeData[newNode.id];
        }
        console.log(JSON.stringify(selectedNodeData));


        popupContent = <SortPopupComponent onClose={closePopup} // Pass droppedNodes when calling onClose
          onRemoveTable={handleRemoveTable}
          selectedNodeId={newNode.id}
          nodeName={newNode.id}


          onValueSubmit={handleSortSubmit}
          setNodes={setNodes} // Pass the callback function as a prop
          nodes={nodes} // Pass the nodes array as a prop
          droppedNodes={droppedNodes} // Pass the droppedNodes as a prop
          setDroppedNodes={setDroppedNodes}
          data={data}
        />;

      } else if ((newNode.id).match(/^filter/)) {


        if ((newNode.id) in nodeData) {
          selectedNodeData = nodeData[newNode.id];
        }
        console.log(JSON.stringify(selectedNodeData));


        popupContent = <FilterPopupComponent onClose={closePopup} // Pass droppedNodes when calling onClose
          onRemoveTable={handleRemoveTable}
          selectedNodeId={newNode.id}
          nodeName={newNode.id}


          onValueSubmit={handleFilterSubmit}
          setNodes={setNodes} // Pass the callback function as a prop
          nodes={nodes} // Pass the nodes array as a prop
          droppedNodes={droppedNodes} // Pass the droppedNodes as a prop
          setDroppedNodes={setDroppedNodes}
          data={data}
        />;

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
    console.log(JSON.stringify(selectedNode.data.selectedTable) + "selectedNode");

    const selectedNodeId = selectedNode.id;
    setSelectedNodeId(selectedNodeId);
    // Extract the selected values from the node
    const selectedDatabase = node.data.selectedDatabase;
    const selectedTable = node.data.selectedTable;
    const selectedColumns = node.data.selectedColumns;
    console.log(JSON.stringify(selectedTable) + "*********888INIALNODEDOUBLECLICK");

    const selectedDatabaseSort = data.databases.find((database) => database.name === selectedDatabase);

    // Extract the columns from the selected database or provide an empty array if not available
    const columns = selectedDatabaseSort?.tables.flatMap((table) => table.columns) || [];


    console.log(JSON.stringify(selectedDatabase) + "selectedDatabaseselectedDatabase");
    // const dropdownValues = getDropdownValues(node);

    // Do something with the dropdownValues
    // console.log(JSON.stringify(dropdownValues)+"dropdownValues");

    let selectedNodeData;
    let popupContent;



    if ((selectedNodeId).match(/^dataTable/)) {

      popupContent = <DataTablePopupComponent onClose={closePopup} // Pass droppedNodes when calling onClose
        onRemoveTable={handleRemoveTable}
        selectedNodeId={selectedNodeId}
        nodeName={node.data.label}
        onValueSubmit={handleDataTableSubmit}
        setNodes={setNodes} // Pass the callback function as a prop
        nodes={nodes} // Pass the nodes array as a prop
        droppedNodes={droppedNodes} // Pass the droppedNodes as a prop
        setDroppedNodes={setDroppedNodes}

        data={data}
      />
    } else if ((selectedNodeId).match(/^sort/)) {
      console.log(JSON.stringify(node.data.selectedTable) + "node.data.selectedTable");
      console.log(JSON.stringify(selectedColumns) + "node.data.selectedColumnsINSIDESORT");
      const isChecked = node.data.isChecked;
      console.log(JSON.stringify(isChecked) + "isChecked");
      // Check if the Sort node is connected to a DataTable node
      const connectedDataTable = edges.some((edge) => {
        const isTargetMatch = edge.target === selectedNodeId;
        console.log('Edge target:', edge.target);
        const sourceNode = nodes.find((n) => n.id === edge.source);
        const isDataTableSource = sourceNode && sourceNode.alt === 'dataTable';
        console.log('Node source:', sourceNode);
        console.log('Alt:', sourceNode.alt);
        return isTargetMatch && isDataTableSource;
      });
      if (connectedDataTable) {
        // Sort node is connected to a DataTable node
        // Perform your desired actions here
        console.log('Sort node is connected to a DataTable node');

        // Access the DataTable node data if needed
        const dataTableNode = edges.find(
          (edge) => {
            const isTargetMatch = edge.target === node.id;
            const sourceNode = nodes.find((n) => n.id === edge.source);
            const isDataTableSource = sourceNode && sourceNode.alt === 'dataTable';
            console.log('edge.target:', edge.target);
            console.log('nodes[]:', nodes);
            return isTargetMatch && isDataTableSource;

          });

        console.log(JSON.stringify(dataTableNode) + "dataTableNode");

        const targetId = dataTableNode.target;
        const sortNodeData = nodeData[targetId];
        const sourceId = dataTableNode.source;
        const dataTableNodeData = nodeData[sourceId];
        console.log(JSON.stringify(dataTableNodeData) + "dataTableNodeData");
        // alert(JSON.stringify(sortNodeData)+"sortNodeData");
        const selectedTable = dataTableNodeData.selectedTable;
        const columns = dataTableNodeData.selectedTable.columns;
        console.log(JSON.stringify(columns) + "COLUMSN**************");
        // let selectedColumns;
        // if(columns.length>0){
        //    selectedColumns = columns[0];
        // }else{
        //   selectedColumns = '';
        // }

        console.log(JSON.stringify(node.data.selectedTable) + "----CHECK------" + JSON.stringify(dataTableNodeData.selectedTable));


        console.log(JSON.stringify(node.data.selectedThenByColumns) + "node.data.selectedThenByColumns");
        console.log(JSON.stringify(node.data.showAdditionalinputlength) + "length");
        // Handle the popup window for sort nodes
        popupContent = <SortPopupComponent onClose={closePopup} // Pass droppedNodes when calling onClose
          onRemoveTable={handleRemoveTable}
          selectedNodeId={selectedNodeId}
          nodeName={node.data.label}
          onValueSubmit={handleSortSubmit}
          setNodes={setNodes} // Pass the callback function as a prop
          nodes={nodes} // Pass the nodes array as a prop
          droppedNodes={droppedNodes} // Pass the droppedNodes as a prop
          setDroppedNodes={setDroppedNodes}
          edges={edges}
          setEdges={setEdges}
          selectedPreviousTable={node.data.selectedTable}
          selectedCurrentTable={selectedTable}
          columns={columns}
          firstColumn={node.data.selectedColumns}
          isCheckedValue={node.data.isChecked}
          thenByIsCheckedValue={node.data.thenByIsChecked}
          selectedThenByColumnValue={node.data.selectedThenByColumns}
          showAdditionalinputlength={node.data.showAdditionalinputlength}
        />;
      } else {
        // Sort node is not connected to a DataTable node
        console.log('Sort node is not connected to a DataTable node');

        // Handle the popup window for sort nodes with empty columns
        popupContent = (
          <SortPopupComponent
            onClose={closePopup}
            onRemoveTable={handleRemoveTable}
            selectedNodeId={selectedNodeId}
            nodeName={node.data.label}
            onValueSubmit={handleSortSubmit}
            setNodes={setNodes}
            nodes={nodes}
            droppedNodes={droppedNodes}
            setDroppedNodes={setDroppedNodes}
            edges={edges}
            setEdges={setEdges}
            columns={[]} // Empty columns array
            firstColumn={''}
            isCheckedValue={false}
            thenByIsCheckedValue={false}
            selectedThenByColumnValue={[]}
            showAdditionalinputlength={0}
          //  isCheckedValue={false}
          />
        );
      }

    } else if ((selectedNodeId).match(/^filter/)) {
      console.log(JSON.stringify(node.data.selectedTable) + "node.data.selectedTable");
      console.log(JSON.stringify(selectedNodeId) + "selectedNodeId");







      // const connectedDataTable = edges.some((edge) => {
      //   const isTargetMatch = edge.target === selectedNodeId;
      //   console.log('Edge target:', edge.target);
      //   const sourceNode = nodes.find((n) => n.id === edge.source);
      //   const isDataTableSource = sourceNode && sourceNode.alt === 'dataTable';

      //   console.log('Node source:', sourceNode);
      //   console.log('Alt:', sourceNode.alt);
      //   return isTargetMatch && isDataTableSource;

      // });


      const connectedToSource = edges.some((edge) => {
        const isTargetMatch = edge.target === selectedNodeId;
        const sourceNode = nodes.find((n) => n.id === edge.source);
        console.log(JSON.stringify(sourceNode) + "sourceNode");
        return isTargetMatch && sourceNode;
      });



      if (connectedToSource) {
        alert("COnnected with any node");
        // Execute your logic here if the selected node is connected to a source node
        console.log('Selected node is connected to a source node');
      } else {
        alert("not connected");
        console.log('Selected node is not connected to a source node');
      }


      // if (connectedDataTable ) {


      //   // Access the DataTable node data if needed
      //   const dataTableNode = edges.find(
      //     (edge) => {
      //       const isTargetMatch = edge.target === selectedNodeId;
      //       const sourceNode = nodes.find((n) => n.id === edge.source);
      //       const isDataTableSource = sourceNode && sourceNode.alt === 'dataTable';
      //       console.log('edge.target:', edge.target);
      //       console.log('nodes[]:', nodes);
      //       return isTargetMatch && isDataTableSource;

      //     });








      //   console.log(JSON.stringify(node.data.selectedColumns) + "node.data.selectedColumns");


      //   const sourceId = dataTableNode.source;
      //   const dataTableNodeData = nodeData[sourceId];
      //   console.log(JSON.stringify(dataTableNodeData) + "dataTableNodeDataFORFILTER");
      //   const selectedTable = dataTableNodeData.selectedTable;
      //   const filterColumns = dataTableNodeData.selectedTable.columns;

      //   // Handle the popup window for filter nodes
      //   popupContent = <FilterPopupComponent onClose={closePopup}
      //     onRemoveTable={handleRemoveTable}
      //     selectedNodeId={selectedNodeId}
      //     nodeName={node.data.label}

      //     onValueSubmit={handleFilterSubmit}
      //     setNodes={setNodes} // Pass the callback function as a prop
      //     nodes={nodes} // Pass the nodes array as a prop
      //     droppedNodes={droppedNodes} // Pass the droppedNodes as a prop
      //     setDroppedNodes={setDroppedNodes}
      //     selectedCurrentTable={selectedTable}
      //     firstColumn={node.data.selectedFilterColumns}
      //     firstCompareToValue={node.data.compareType}
      //     selectedGroupColumnValue={node.data.selectedGroupColumns}
      //     connectionValue={connectedDataTable}
      //     showAdditionalinputGrouplength={node.data.showAdditionalinputGrouplength}
      //     selectedPreviousTable={node.data.selectedTable}
      //     columns={columns}
      //     additionalCompareTypeValues={node.data.additionalCompareType}
      //     firstEnterValue={node.data.enterValue}
      //     groupEnterValue={node.data.additionalTextboxValues}
      //     additionalLogicalOperatorsValue={node.data.additionalLogicalOperators}
      //   />;

      // } 
      if (connectedToSource) {
        console.log('Edge type:', edgeTypeButton);
        const dataTableNode = nodes.find((node) => node.alt === 'dataTable');
        const sortNode = nodes.find((node) => node.alt === 'sort');
        // const dataTableNode = nodes.find((node) => node.alt === 'dataTable');

        if (dataTableNode) {
          alert(edgeTypeButton);
          alert(JSON.stringify(edgeButtonValues) + "edgeButtonValues");

          const edgeConnectionId = edges.find(edge => edge.source === selectedNodeId || edge.target === selectedNodeId)?.id;

          edges.find(edge => {
            console.log('Edge:', edge);
            console.log('Is edge.source matching selectedNodeId:', edge.source === selectedNodeId);
            console.log('Is edge.source matching selectedNodeId:', edge.target === selectedNodeId);

          });

          alert(JSON.stringify(edgeConnectionId) + "edgeConnectionId");
          alert(JSON.stringify(edgeButtonValues[edgeConnectionId]) + "edgeButtonValues[edgeConnectionId]");
          let edgeValue = edgeButtonValues[edgeConnectionId];

          if (edgeValue) {
            // Perform the comparison or further processing based on the edge value
            console.log('Edge Connection ID:', edgeConnectionId);
            console.log('Edge Button Value:', edgeValue);
          } else {
            edgeValue = '';
          }


          const selectedTable = dataTableNode.data.selectedTable;
          const filterColumns = selectedTable.columns;

          popupContent = <FilterPopupComponent onClose={closePopup}
            onRemoveTable={handleRemoveTable}
            selectedNodeId={selectedNodeId}
            nodeName={node.data.label}

            onValueSubmit={handleFilterSubmit}
            setNodes={setNodes} // Pass the callback function as a prop
            nodes={nodes} // Pass the nodes array as a prop
            droppedNodes={droppedNodes} // Pass the droppedNodes as a prop
            setDroppedNodes={setDroppedNodes}
            selectedCurrentTable={dataTableNode.data.selectedTable}
            firstCompareToValue={node.data.compareType}
            connectionValue={true}
            selectedGroupColumnValue={node.data.selectedGroupColumns}
            showAdditionalinputGrouplength={node.data.showAdditionalinputGrouplength}

            selectedPreviousTable={node.data.selectedTable}
            columns={columns}
            additionalCompareTypeValues={node.data.additionalCompareType}
            firstEnterValue={node.data.enterValue}
            firstColumn={node.data.selectedFilterColumns}
            groupEnterValue={node.data.additionalTextboxValues}
            additionalLogicalOperatorsValue={node.data.additionalLogicalOperators}
            buttonValue={edgeValue}
          />;

          // Continue with your logic using the selectedTable and filterColumns
        } else {

          // Handle the case when the DataTable node is not found
          // Handle the popup window for filter nodes
          popupContent = <FilterPopupComponent onClose={closePopup}
            onRemoveTable={handleRemoveTable}
            selectedNodeId={selectedNodeId}
            nodeName={node.data.label}

            onValueSubmit={handleFilterSubmit}
            setNodes={setNodes} // Pass the callback function as a prop
            nodes={nodes} // Pass the nodes array as a prop
            droppedNodes={droppedNodes} // Pass the droppedNodes as a prop
            setDroppedNodes={setDroppedNodes}

            connectionValue={false}
            selectedCurrentTable={''}
            firstCompareToValue={[]}
            selectedGroupColumnValue={''}
            showAdditionalinputGrouplength={0}
            selectedPreviousTable={''}
            columns={[]}
            additionalCompareTypeValues={[]}
            firstEnterValue={''}
            firstColumn={[]}
            groupEnterValue={[]}
            additionalLogicalOperatorsValue={[]}
          />;
        }


        // if (dataTableNode && sortNode) {
        //   const isDataTableToSortConnected =
        //     edges.some((edge) => edge.source === dataTableNode.id && edge.target === sortNode.id);

        //   const isSortToFilterConnected =
        //     edges.some((edge) => edge.source === sortNode.id && edge.target === selectedNodeId);

        //   if ((isDataTableToSortConnected && isSortToFilterConnected)) {



        // Find the sort node connected to the filter node
        // const sortToFilterNode = edges.find((edge) => {
        //   const isFilterTargetMatch = edge.target === selectedNodeId;
        //   const sourceNode = nodes.find((n) => n.id === edge.source);
        //   const isSortSource = sourceNode && (sourceNode.alt === 'sort' || sourceNode.alt === 'filter') ;
        //   return isFilterTargetMatch && isSortSource;
        // });


        // const dataTableToSortNodeConn = edges.find(
        //   (edge) => {
        //     const isTargetMatch = edge.target === sortToFilterNode.source;
        //     const sourceNode = nodes.find((n) => n.id === edge.source);
        //     const isSortSource = sourceNode && sourceNode.alt === 'dataTable';
        //     console.log('edge.target:', edge.target);
        //     console.log('nodes[]:', nodes);
        //     return isTargetMatch && isSortSource;

        //   });
        // console.log(JSON.stringify(node.data.selectedColumns) + "node.data.selectedColumns");

        // const sourceId = dataTableToSortNodeConn.source;

        // const sortNodeDataValue = nodes.find((n) => n.id === sourceId)?.data;

        // //   const sortNodeData = sortNodeConn[sourceId];
        // //  alert(JSON.stringify(sortNodeData) + "sortNodeDataFORFILTER");
        // const selectedTable = sortNodeDataValue.selectedTable;
        // const filterColumns = sortNodeDataValue.selectedTable.columns;
        // // Handle the popup window for filter nodes
        // popupContent = <FilterPopupComponent onClose={closePopup}
        //   onRemoveTable={handleRemoveTable}
        //   selectedNodeId={selectedNodeId}
        //   nodeName={node.data.label}

        //   onValueSubmit={handleFilterSubmit}
        //   setNodes={setNodes} // Pass the callback function as a prop
        //   nodes={nodes} // Pass the nodes array as a prop
        //   droppedNodes={droppedNodes} // Pass the droppedNodes as a prop
        //   setDroppedNodes={setDroppedNodes}
        //   selectedCurrentTable={selectedTable}
        //   firstCompareToValue={node.data.compareType}
        //   connectionValue={true}
        //   selectedGroupColumnValue={node.data.selectedGroupColumns}
        //   showAdditionalinputGrouplength={node.data.showAdditionalinputGrouplength}

        //   selectedPreviousTable={node.data.selectedTable}
        //   columns={columns}
        //   additionalCompareTypeValues={node.data.additionalCompareType}
        //   firstEnterValue={node.data.enterValue}
        //   firstColumn={node.data.selectedFilterColumns}
        //   groupEnterValue={node.data.additionalTextboxValues}
        //   additionalLogicalOperatorsValue={node.data.additionalLogicalOperators}

        // />;


        // }
        //  }


      } else {
        // alert("else");
        // // Handle the popup window for filter nodes
        // popupContent = <FilterPopupComponent onClose={closePopup}
        //   onRemoveTable={handleRemoveTable}
        //   selectedNodeId={selectedNodeId}
        //   nodeName={node.data.label}

        //   onValueSubmit={handleFilterSubmit}
        //   setNodes={setNodes} // Pass the callback function as a prop
        //   nodes={nodes} // Pass the nodes array as a prop
        //   droppedNodes={droppedNodes} // Pass the droppedNodes as a prop
        //   setDroppedNodes={setDroppedNodes}
        //   selectedCurrentTable={''}
        //   connectionValue={connectedDataTable}
        // />;
      }
    } else if ((selectedNodeId).match(/^join/)) {
      // Handle the popup window for filter nodes
      popupContent = <JoinPopupComponent onClose={closePopup}
        onRemoveTable={handleRemoveTable}
        selectedNodeId={selectedNodeId}
        nodeName={selectedNodeData?.name || ''}
        // nodeName={nodeName}
        // selectedOption={selectedOption}
        selectedOption={selectedNodeData?.option || ''}
        onValueSubmit={handlePopupSubmit}
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
        onValueSubmit={handlePopupSubmit}
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
        onValueSubmit={handlePopupSubmit}
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
        onValueSubmit={handlePopupSubmit}
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
        onValueSubmit={handlePopupSubmit}
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
        onValueSubmit={handlePopupSubmit}
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
        onValueSubmit={handlePopupSubmit}
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
        onValueSubmit={handlePopupSubmit}
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
    setDroppedNodes(updatedNodes);
    setEdges(updatedEdges);
  };

  // const handleElementsRemove = (selectedNodeIds) => {
  //   const selectedNodes = selectedNodeIds.filter((el) => el.id === 'dataTable');
  //   console.log('Selected nodes:', selectedNodes);
  // };
  const handleElementsRemove = (elementsToRemove) => {

    const removeElementIds = elementsToRemove.map((element) => element.id);
    setNodes((prevNodes) => prevNodes.filter((node) => !removeElementIds.includes(node.id)));
    setEdges((prevEdges) => prevEdges.filter((edge) => !removeElementIds.includes(edge.id)));
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

  const handleCreate = async (e) => {
    e.preventDefault();




    const sqlArray = [
      { buildSelect: '*' },
    ];
    const orderByArray = [];
    const buildWhereArray = [];

    droppedNodes.forEach((droppedNodeId) => {
      const droppedNode = nodes.find((node) => node.id === droppedNodeId);

      if (droppedNode) {
        if (droppedNode.data.selectedDatabase && droppedNode.data.selectedTable) {
          sqlArray.push({ buildTableName: `${droppedNode.data.selectedDatabase.name}.${droppedNode.data.selectedTable.name}` });
        }

        const { dataFilterJson } = droppedNode.data;
        if (dataFilterJson !== undefined) {
          buildWhereArray.push(dataFilterJson);
        }
        const { buildOrderBy } = droppedNode.data;
        console.log(JSON.stringify(buildOrderBy) + "buildOrderBy");
        if (buildOrderBy) {
          orderByArray.push({ buildOrderBy: buildOrderBy });
        }
      }
    });
    alert(JSON.stringify(buildWhereArray) + "1buildWhereArray");

    // AND or OR iniitial groupseparator sep empty string condition
    // updateGroupSeparatorSep(buildWhereArray);

    // function updateGroupSeparatorSep(buildWhereArray) {
    //   // for (let i = 0; i < buildWhereArray.length; i++) {
    //   //   alert(JSON.stringify(buildWhereArray[i].groupSeparator)+"buildWhereArray[i].groupSeparator");
    //   //   const groupSeparator = buildWhereArray[i].groupSeparator;
    //   //   if (groupSeparator && groupSeparator.length  0) {
    //   //     groupSeparator[0].sep = '';
    //   //   }
    //   // }
    // }
    // alert(JSON.stringify(buildWhereArray) + "2buildWhereArray");


    const dataFilterJson1 = {
      buildWhere: JSON.stringify(buildWhereArray)
    };
    sqlArray.push(dataFilterJson1);
    alert(JSON.stringify(dataFilterJson1) + "dataFilterJson1");

    sqlArray.push(...orderByArray);
    console.log(JSON.stringify(sqlArray) + "firstsqlArray");
    alert(JSON.stringify(sqlArray) + "sqlArray");




    const requestBody = {
      organisation: 'boolean',
      email: 'vasistabhargava@gmail.com',
      password: 'panjas-80'
    };

    fetch('http://localhost:8000/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify(requestBody)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Request failed');
        }
        return response.json();
      })
      .then(data => {
        // Handle the response data
        console.log(data);

        // Handle the response data and extract the token
        const token = data.token;
        alert(token + "token");
        fetch('http://localhost:8000/generateSql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          },
          body: JSON.stringify(sqlArray)
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Request failed');
            }
            return response;
          })
          .then(data => {
            // Handle the response data
            console.log(data);
          })
          .catch(error => {
            // Handle any errors
            console.error(error);
          });




      })
      .catch(error => {
        // Handle any errors
        console.error(error);
      });


    // TO generate the SQL (POST REQUEST)



    console.log(JSON.stringify(droppedNodes) + "droppednodesid");
    console.log(JSON.stringify(nodes) + "nodes");



  }


  const handleEdgeClick = (edgeId) => {
    // Find the clicked edge by its ID
    const clickedEdge = edges.find((edge) => edge.id === edgeId);

    // Perform any actions or update the state based on the clicked edge
    if (clickedEdge) {
      // Example action: Toggle the status of the clicked edge
      const updatedEdges = edges.map((edge) => {
        if (edge.id === edgeId) {
          return {
            ...edge,
            status: edge.status === 'on' ? 'off' : 'on',
          };
        }
        return edge;
      });

      setEdges(updatedEdges);
    }
  };



  const handleCancel = () => {
    // Reset the newArray to an empty array
    // setNewArray([]);
  };
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

  const edgeTypes = {

    customEdge: (props) => <CustomEdge {...props} initialEdgeType={props.initialEdgeType}
      onToggle={handleToggleValue} key={id} id={props.id} onButtonValueChange={handleButtonValueChange}
    // initialEdgeType={toggleStates} 
    // initialEdgeType={props.initialEdgeType}
    />, // Pass the handleToggle function as onToggle prop

  };
  // const edgeTypes = {
  //   customEdge:CustomEdge
  // };

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
                <EdgeProvider>
                  <div className="reactflow-wrapper" ref={reactFlowWrapper}>

                    <ReactFlow
                      onNodeDoubleClick={handleNodeDoubleClick}
                      edgeTypes={edgeTypes}
                      nodes={nodes}
                      edges={edges}
                      setNodes={setNodes}
                      setEdges={setEdges}
                      onNodesChange={onNodesChange}
                      onEdgesChange={onEdgesChange}
                      onConnect={onConnect}
                      onInit={setReactFlowInstance}
                      onDrop={onDrop}
                      onDragOver={onDragOver}
                      elements={elements} // Pass the `elements` state to ReactFlow
                      onElementsRemove={handleElementsRemove}

                      onNodeClick={handleNodeClick}
                      nodeData={nodeData}
                      setNodeData={setNodeData}
                      droppedNodes={droppedNodes}
                      setDroppedNodes={setDroppedNodes}
                      //  initialEdgeType="AND"
                      fitView

                    >

                      {/* {edges.map((connection) => (
    <CustomEdge
      key={connection.id}
      id={connection.id}
      initialEdgeType={connection.initialEdgeType}
      onToggle={handleToggleValue}
      onButtonValueChange={handleButtonValueChange}
      // Pass the edgeTypes prop to CustomEdge
    />
  ))} */}

                      {/* <CustomEdge onToggle={handleToggleValue} /> */}
                      {/* <div>
      {edges.map((edge) => (
        <CustomEdge
          key={edge.id}
          connectionId={edge.id}
          buttonValue={edge.buttonValue}
          toggleState={toggleStates[edge.id]}
          sourcePosition={edge.sourcePosition}
    targetPosition={edge.targetPosition}
          onToggle={handleToggleValue}
        />
      ))}
     
    </div> */}
                    </ReactFlow>

                    {showPopup && popupContent}

                  </div>
                </EdgeProvider>
              </ReactFlowProvider>
            </div>

          </div>
          <div className="create-cancel">
            <button className="btn btn-success" type="button" onClick={handleCreate}>Create</button>
            <button className="btn btn-default" type="button" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
};



export default DnDFlow;

