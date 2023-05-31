import React, { useState, useEffect} from 'react';
import '../css/dataTablePopUp.css';

const DataTablePopupComponent = ({onClose, onRemoveTable, selectedNodeId,onValueSubmit, 
  nodes, setNodes, droppedNodes,setDroppedNodes, 
  nodeName, selectedOption, dropdownPopupDataTableValues,
  handleDatabaseChange,
  handleTableChange,
  renderDatabaseOptions,
  renderTableOptions,
}) => {
console.log(renderTableOptions+"renderTableOptions");
console.log(selectedOption+"selectedOptionselectedOption");
  const [name, setName] = useState(nodeName);
  const [dropDownOption, setDropdownOption] = useState(selectedOption);
  
  useEffect(() => {
    setName(nodeName);
    setDropdownOption(selectedOption);
  }, [nodeName, selectedOption]);

  console.log(selectedNodeId+"selectedNodeId");
  const handleNodesUpdate = () => {
    const updatedNodes = [...nodes]; // Create a copy of the nodes array
    // Update the nodes array as needed
    // ...

    setNodes(updatedNodes); // Call the setNodes function to update the nodes in the parent component
  };
 // Example usage: Handle dropped nodes and update the state
 const handleDrop = (droppedNodes) => {
  // Perform any necessary operations with the dropped nodes
  // ...
  setDroppedNodes(droppedNodes); // Call the setDroppedNodes function to update the dropped nodes in the parent component
};

  const handleRemoveTable = () => {
    // Call the onRemoveTable callback function
    if (onRemoveTable) {
      onRemoveTable();
    }
    // Close the popup
    onClose(nodes);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    
    onValueSubmit(selectedNodeId, name, dropDownOption);
  };


  const [dynamicValue, setDynamicValue] = useState('');

  // Function to update the dynamic value
  const handleNameChange = (event) => {
   
    setName(event.target.value);
  };

  const handleOptionChange = (event) => {
    setDropdownOption(event.target.value);
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
          <label htmlFor="textbox">Name</label>
          <input type="text" value={name}
         className="form-control" onChange={handleNameChange}
           id="textbox" />
        </div>
     
    
    <div className="form-group">
          <label htmlFor="dropdown">Table</label>
          {/* <select id="dropdown" className="form-control"  onChange={handleOptionChange}>
            <option value="option1">Accounts</option>
            <option value="option2">Company</option>
            <option value="option3">Roles</option>
          </select> */}
          <select id="dropdown" className="form-control" value={dropDownOption} onChange={handleOptionChange}>
        {dropdownPopupDataTableValues.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>

      <select onChange={handleDatabaseChange}>
  {renderDatabaseOptions()}
</select>

<select onChange={handleTableChange}>
  {renderTableOptions()}
</select>

        </div>
        <button type='button' className='btn btn-primary'>REFRESH TABLES</button>
        </div>
        <div className="modal-footer">
                        <button type='button' onClick={handleRemoveTable} class='btn btn-danger remove'>Remove Tool</button>
                        <button type='button' className='btn btn-primary ok'   onClick={handleSubmit} >OK</button>
                    </div>
    </div>
    </div>
    </div>
  );
};

export default DataTablePopupComponent;
