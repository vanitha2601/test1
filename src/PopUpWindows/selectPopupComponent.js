import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
} from 'reactflow';
import 'reactflow/dist/style.css';
import '../css/dataTablePopUp.css';

import '../css/draggableColumn.css';

const SelectPopupComponunt = ({ onClose, onRemoveTable }) => {
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [leftList, setLeftList] = useState([
    { id: 1, name: 'Column 1' },
    { id: 2, name: 'Column 2' },
    { id: 3, name: 'Column 3' },
    // ...other columns
  ]);
  const [rightList, setRightList] = useState([]);

  const handleRemoveTable = () => {
    if (onRemoveTable) {
      onRemoveTable();
    }
    onClose();
  };

  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onDrop = useCallback(
    (event, list) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const typeData = event.dataTransfer.getData('application/reactflow');
      const type = JSON.parse(typeData);

      if (!type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });


      if (list === 'left' && !leftList.find((column) => column.id === type.id)) {
        setRightList((columns) => columns.filter((column) => column.id !== type.id));
        setLeftList((columns) => [...columns, type]);
      }

      if (list === 'right' && !rightList.find((column) => column.id === type.id)) {
        setLeftList((columns) => columns.filter((column) => column.id !== type.id));
        setRightList((columns) => [...columns, type]);
      }
    },
    [reactFlowInstance, leftList, rightList]
  );


  const handleLinkClick = () => {
    // Perform any actions when the link is clicked
    // ...
  };

  const onDragStart = (event, column) => {

    event.dataTransfer.setData('application/reactflow', JSON.stringify(column));
    event.dataTransfer.effectAllowed = 'move';
  };
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);


  const handleDeleteColumn = (columnId) => {
    setRightList((columns) => columns.filter((column) => column.id !== columnId));
    setLeftList((columns) => {
      const existingColumn = rightList.find((column) => column.id === columnId);
      if (!existingColumn) {
        return [...columns];
      }
      return [...columns, existingColumn];
    });
  };

  const handleAddAll = () => {
    setRightList([...rightList, ...leftList]);
    setLeftList([]);
  };
  
  const handleRemoveAll = () => {
    setLeftList([...leftList, ...rightList]);
    setRightList([]);
  };


  return (
    <div className="overlay">
      <div className="popup-datatable">
        <div className="popup-header">
          <h4 className="modal-title">Tool Options</h4>
          <button className="close-button" onClick={onClose}>
            <span>&times;</span>
          </button>
        </div>
        <div className="datatable-content">
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="textbox">Name </label>
              <input type="text" value="Select 1" className="form-control" id="textbox" />
            </div>
            <h3>Select which columns to include</h3>
            <p className="helpText">Drag columns into the list on the right and reorder as required. Click the 'x' button to remove selected columns.
            </p>

            <div className="list-container">
              <div className="leftlist-container" onDragOver={onDragOver} onDrop={(event) => onDrop(event, 'left')} >

                <ul>
                  {leftList.map((column) => (
                    <li
                      key={column.id}
                      className="blockItem ui-draggable"
                      draggable
                      onDragStart={(event) => onDragStart(event, column)}
                    >
                      {column.name}
                    </li>
                  ))}
                </ul>
              </div>
             
              <ReactFlowProvider>
                <div className="" ref={reactFlowWrapper}>
                  <ReactFlow
                    onInit={setReactFlowInstance}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    fitView
                  >
                    <Controls />
                  </ReactFlow>
                </div>
              </ReactFlowProvider>
              <div className="rightlist-container" onDragOver={onDragOver} onDrop={(event) => onDrop(event, 'right')}>

                <ul>
                  {rightList.map((column) => (
                    <li key={column.id} className="blockItem ui-draggable" draggable
                      onDragStart={(event) => onDragStart(event, column)}>
                      {column.name}
                      <button className="crossmark-button" onClick={() => handleDeleteColumn(column.id)}>×</button>
                    </li>
                  ))}
                </ul>
              </div>
             
            </div>
<div className="add-remove">
            <button className="btn btn-add" onClick={handleAddAll}>
          Add All
        </button>
       
        
            <button className="btn btn-removeall" onClick={handleRemoveAll}>
          Remove All
        </button>
        </div>
          </div>
        </div>
        <div className="form-group toolHelpLink">
          <a href="https://example.com" target="_blank" onClick={handleLinkClick}>
            How does this tool work?
          </a>
        </div>
        <div className="modal-footer">
          <button className="btn btn-danger" onClick={handleRemoveTable}>
            Remove Table
          </button>
          <button type='button' className='btn btn-primary ok'  onClick={onClose}>OK</button>
                    
        </div>
      </div>
    </div>
  );
};

export default SelectPopupComponunt;
