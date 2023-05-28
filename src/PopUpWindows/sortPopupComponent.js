
import React, { useState } from 'react';
import '../css/dataTablePopUp.css';

const SortPopupComponent = ({onClose, onRemoveTable, selectedNodeId,onValueSubmit, nodes, setNodes, droppedNodes,setDroppedNodes}) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleRemoveTable = () => {
    // Call the onRemoveTable callback function
    if (onRemoveTable) {
      onRemoveTable();
    }
    // Close the popup
    onClose();
  };

  const handleSubmit = () => {
    onValueSubmit(selectedNodeId,dynamicValue);
  };


  const [dynamicValue, setDynamicValue] = useState('');

  // Function to update the dynamic value
  const handleDynamicValueChange = (event) => {
   
    setDynamicValue(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleLinkClick = () => {
    // Perform any actions when the link is clicked
    // ...
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
          <label htmlFor="textbox">Sort </label>
          <input type="text" value={dynamicValue}
         className="form-control" onChange={handleDynamicValueChange}
           id="textbox" />
        </div>
     
    
    <div className="form-group">
          <label htmlFor="dropdown">Sort By</label>
          <select id="dropdown" className="form-control">
            <option value="option1">Accounts</option>
            <option value="option2">Company</option>
            <option value="option3">Roles</option>
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
