
import React, { useState, useEffect } from 'react';
import '../css/dataTablePopUp.css';

const SortPopupComponent = ({onClose, onRemoveTable, nodeName,selectedNodeId,onValueSubmit,
   nodes, setNodes, droppedNodes,setDroppedNodes,  data, 
    firstColumn,
   columns,isCheckedValue}) => {
   
  const [isChecked, setIsChecked] = useState(isCheckedValue);
  const [selectedColumns, setSelectedColumns] = useState(firstColumn);
  const [selectedThenByColumns, setSelectedThenByColumns] = useState(firstColumn);
  const [showAdditionalInputs, setShowAdditionalInputs] = useState(false);


  const [name, setName] = useState(nodeName);
 
  useEffect(() => {
  
    setName(nodeName);
    setSelectedColumns(selectedColumns);
    setIsChecked(isChecked);
  }, [nodeName],[selectedColumns],[isChecked]);


  const handleAddAnotherClick = () => {
    setShowAdditionalInputs(!showAdditionalInputs);
  };

  const handleRemoveTable = () => {
    // Call the onRemoveTable callback function
    if (onRemoveTable) {
      onRemoveTable();
    }
    // Close the popup
    onClose();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
   
 const buildOrderBy = selectedColumns;
 alert(JSON.stringify(isChecked)+"isChecked");
 alert(JSON.stringify(selectedColumns)+"selectedColumns");
 onValueSubmit(selectedNodeId,name, selectedColumns, isChecked);
 // Perform the submit action with the formData
 // ...


  };

  // const handleColumnChange = (event) => {
    
  //     const selectedColumnName = event.target.value;
  //     setSelectedColumns(selectedColumnName);
      
  // };

  const handleThenByColumnChange = (event)=>{
    const selectedColumnName = event.target.value;
    setSelectedThenByColumns(selectedColumnName);
    alert(selectedColumnName);
  }

  const handleColumnChange = (event) => {
    const selectedColumnName = event.target.value;
    setSelectedColumns(selectedColumnName);
    alert(selectedColumnName);
    // // Find the selected column based on the selectedColumnName
    // const selectedColumn = columns.find((column) => column.name === selectedColumnName);
    // alert(JSON.stringify(selectedColumn)+"selectedColumn");
    // setSelectedColumns([selectedColumn]);
    // alert(JSON.stringify([selectedColumn])+"without oncheck");
    // if (selectedColumn && isChecked) {
    //   const reversedData = selectedColumn.data.slice().reverse();
      
    //   // Update the data of the selected column with the reversed values
    //   selectedColumn.data = reversedData;
    //   alert(JSON.stringify(reversedData)+"reversedData");
    //    // Sort the data in descending order
    // selectedColumn.data.sort((a, b) => b - a);
    //   // Update the state to trigger a re-render
    //   setSelectedColumns([...columns]);
    // }
  };
  

   // Function to update the dynamic value
   const handleNameChange = (event) => {
   
    setName(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setIsChecked(isChecked);
//setIsChecked(!isChecked);
  alert(JSON.stringify(selectedColumns)+"selectedColumns");
  setSelectedColumns(selectedColumns);
  alert(JSON.stringify(selectedColumns)+"selectedColumns");
  if(isChecked){
    setIsChecked("DESC");
  }else{
    setIsChecked("ASC");
  }
  
  };

  const handleThenByCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setIsChecked(isChecked);
//setIsChecked(!isChecked);
  alert(JSON.stringify(selectedThenByColumns)+"selectedColumns");
  setSelectedThenByColumns(selectedThenByColumns);
  alert(JSON.stringify(selectedThenByColumns)+"selectedColumns");
  if(isChecked){
    setIsChecked("DESC");
  }else{
    setIsChecked("ASC");
  }
  
  };
  

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
           
              value={selectedColumns} 
               onChange={handleColumnChange}
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
     
      {showAdditionalInputs && (
          <div>
        <div className="form-group">
          <label htmlFor="dropdown">Then By</label>
          
        
        <select
              id="dropdown"
              className="form-control"
           
              value={selectedColumns} 
               onChange={handleThenByColumnChange}
            >
              {renderColumnOptions()}
            </select>
     
        </div>
        <div className="checkbox-container">
        <label>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleThenByCheckboxChange}
          />
         Descending
        </label>
      </div>  
      </div>
        )}

<button type='button' className='btn btn-primary' onClick={handleAddAnotherClick}>
{showAdditionalInputs ? 'HIDE' : 'ADD ANOTHER'}
  </button>
       
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
