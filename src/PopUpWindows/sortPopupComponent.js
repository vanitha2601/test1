
import React, { useState, useEffect } from 'react';
import '../css/dataTablePopUp.css';

const SortPopupComponent = ({onClose, onRemoveTable, nodeName,selectedNodeId,onValueSubmit,
   nodes, setNodes, droppedNodes,setDroppedNodes,  data, 
  //  firstColumn,
   columns,}) => {
  const [isChecked, setIsChecked] = useState(false);

  const [name, setName] = useState(nodeName);
 
  useEffect(() => {
  
    setName(nodeName);
  }, [nodeName]);

  const handleRemoveTable = () => {
    // Call the onRemoveTable callback function
    if (onRemoveTable) {
      onRemoveTable();
    }
    // Close the popup
    onClose();
  };

  const handleSubmit = () => {
    onValueSubmit(selectedNodeId,name);
  };

  

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
   // Function to update the dynamic value
   const handleNameChange = (event) => {
   
    setName(event.target.value);
  };

  // const handleOptionChange = (event) => {
  //   setDropdownOption(event.target.value);
  // };

  const handleLinkClick = () => {
    // Perform any actions when the link is clicked
    // ...
  };
  const renderColumnOptions = () => {
    return columns.map((column) => (
      <option key={column} value={column}>
        {column}
      </option>
    ));
  };

  return (
    <div className = "overlay">
      
    <div className="popup-datatable">
    <div className="popup-header">
    <h4 class='modal-title'>Tool Options</h4>
        <button className="close-button" onClick={onClose}>
        
        <span>&times;</span>
          </button>
      </div>
       <div className="datatable-content">
     <div className="modal-body">
      <div className="form-group">
          <label htmlFor="textbox">Name </label>
          <input type="text" value={name}
         className="form-control" 
         onChange={handleNameChange}
           id="textbox" />
        </div>
     
    
    <div className="form-group">
          <label htmlFor="dropdown">Sort By</label>
          
        
        <select
              id="dropdown"
              className="form-control"
              value={columns}
              // onChange={handleOptionChange}
            >
              {renderColumnOptions()}
            </select>
     
        </div>

        <div className="checkbox-container">
        <label>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
         Descending
        </label>
      </div>
     
        <button type='button' className='btn btn-primary'>ADD ANOTHER</button>
        <div className="form-group toolHelpLink">
        <a href="https://example.com" target="_blank"   onClick={handleLinkClick}>
             How does this tool work?
            </a>
            </div>
        </div>
        <div className="modal-footer">
                        <button type='button' onClick={handleRemoveTable} class='btn btn-danger remove'>REMOVE TOOL</button>
                        <button type='button' className='btn btn-primary ok'  onClick={handleSubmit}>OK</button>
                    </div>
    </div>
    </div>
    </div>
  );
};

export default SortPopupComponent;
