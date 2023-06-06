
import React, { useState, useEffect } from 'react';
import '../css/dataTablePopUp.css';

const SortPopupComponent = ({ onClose, onRemoveTable, nodeName, selectedNodeId, onValueSubmit,
  nodes, setNodes, droppedNodes, setDroppedNodes, data,
  firstColumn,
  columns, isCheckedValue,
  selectedThenByColumnValue, showAdditionalinputlength
}) => {

  alert(showAdditionalinputlength + "showAdditionalinputlength");
  const [isChecked, setIsChecked] = useState(isCheckedValue);
  const [selectedColumns, setSelectedColumns] = useState(firstColumn);
  const [selectedThenByColumns, setSelectedThenByColumns] = useState(
    selectedThenByColumnValue.length > 0 ? selectedThenByColumnValue : ['']
  );
  // const [selectedThenByColumns, setSelectedThenByColumns] = useState([selectedThenByColumnValue]);
  const [showAdditionalInputs, setShowAdditionalInputs] = useState([]);


  const [name, setName] = useState(nodeName);

  useEffect(() => {
    setShowAdditionalInputs(showAdditionalinputlength > 0 ? [{}] : []);

    alert(JSON.stringify(selectedThenByColumnValue) + "selectedThenByColumnValue");
    setName(nodeName);
    setSelectedColumns(selectedColumns);
    setIsChecked(isChecked);
    setSelectedThenByColumns(selectedThenByColumnValue);
    //  setShowAdditionalInputs(showAdditionalinputlength);
  }, [nodeName, selectedColumns, isChecked, selectedThenByColumnValue, showAdditionalinputlength]
  );



  const renderAdditionalInputs = () => {
    alert(JSON.stringify(showAdditionalinputlength) + "showAdditionalinputlength**********");
    if (showAdditionalInputs.length > 0) {
      return selectedThenByColumns.map((column, index) => (
        <div key={index}>
          {/* Render your additional inputs here */}
          <div className="form-group">
            <label htmlFor={`dropdown-${index}`}>Sort By</label>
            <select
              id={`dropdown-${index}`}
              className="form-control"
              value={selectedThenByColumns[index]}
              onChange={(event) => handleThenByColumnChange(event, index)}
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
          <div className="form-group">
            <button
              id="addanother"
              type="button"
              className="btn btn-warning"
              onClick={() => handleRemoveClick(index)}
            >
              Remove
            </button>
          </div>
        </div>
      ));
    }
    return null;
  };


  const handleAddAnotherClick = () => {
    // setSelectedThenByColumns([]);
    setSelectedThenByColumns([...selectedThenByColumns, '']);
    setShowAdditionalInputs([...showAdditionalInputs, {}]);
  };

  const handleRemoveClick = (index) => {
    setSelectedThenByColumns((prevColumns) => {
      const updatedColumns = [...prevColumns];
      updatedColumns.splice(index, 1);
      return updatedColumns;
    });
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
    alert(showAdditionalInputs.length);

    alert('showAdditionalInputs:', showAdditionalInputs.length);

    const buildOrderBy = selectedColumns;
    alert(JSON.stringify(isChecked) + "isChecked");
    alert(JSON.stringify(selectedColumns) + "selectedColumns");
    const showAdditionalinputlength = showAdditionalInputs.length;
    // setShowAdditionalInputs(true);
    onValueSubmit(selectedNodeId, name, selectedColumns, isChecked, selectedThenByColumns, showAdditionalinputlength);
    // Perform the submit action with the formData
    // ...


  };

  // const handleColumnChange = (event) => {

  //     const selectedColumnName = event.target.value;
  //     setSelectedColumns(selectedColumnName);

  // };
  // const handleThenByColumnChange = (event) => {
  //   const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
  //   setSelectedThenByColumns(selectedOptions);
  // };
  // const handleThenByColumnChange = (event, index) => {
  //   const selectedValue = event.target.value;
  //   setSelectedThenByColumns((prevSelectedColumns) => {
  //     const updatedColumns = [...prevSelectedColumns];
  //     updatedColumns[index] = selectedValue;
  //     return updatedColumns;
  //   });
  // };
  // Handler for selecting a column in the sort popup
  // const handleThenByColumnChange = (event, index) => {
  //   const { value } = event.target;
  //   setSelectedThenByColumns((prevColumns) => {
  //     const updatedColumns = [...prevColumns];
  //     updatedColumns[index] = value;
  //     return updatedColumns;
  //   });
  //  // setShowAdditionalInputs(true);
  // };

  const handleThenByColumnChange = (event, index) => {
    const { value } = event.target;

    // Update the selectedThenByColumns state with the selected value
    const updatedColumns = [...selectedThenByColumns];
    updatedColumns[index] = value;
    setSelectedThenByColumns(updatedColumns);
  };

  // const handleThenByColumnChange = (event, index) => {
  //   const { value } = event.target;

  //   // Update the selectedThenByColumns state with the selected value
  //   const updatedColumns = [...selectedThenByColumns];
  //   updatedColumns[index] = value;
  //   setSelectedThenByColumns(updatedColumns);

  //   // Set showAdditionalInputs to true to show the additional inputs
  //   setShowAdditionalInputs(true);
  // };

  const handleColumnChange = (event) => {
    const selectedColumnName = event.target.value;
    setSelectedColumns(selectedColumnName);
    alert(selectedColumnName);

  };


  // Function to update the dynamic value
  const handleNameChange = (event) => {

    setName(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setIsChecked(isChecked);
    //setIsChecked(!isChecked);
    alert(JSON.stringify(selectedColumns) + "selectedColumns");
    setSelectedColumns(selectedColumns);
    alert(JSON.stringify(selectedColumns) + "selectedColumns");
    if (isChecked) {
      setIsChecked("DESC");
    } else {
      setIsChecked("ASC");
    }

  };

  const handleThenByCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setIsChecked(isChecked);
    //setIsChecked(!isChecked);
    alert(JSON.stringify(selectedThenByColumns) + "selectedColumns");
    setSelectedThenByColumns(selectedThenByColumns);
    alert(JSON.stringify(selectedThenByColumns) + "selectedColumns");
    if (isChecked) {
      setIsChecked("DESC");
    } else {
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
    <div className="overlay">

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

            {/* <div>
      {renderAdditionalInputs()}
    </div> */}

            {/* {showAdditionalInputs && (
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
        )} */}

            {/* <button type='button' className='btn btn-primary' onClick={handleAddAnotherClick}>
{showAdditionalInputs ? 'HIDE' : 'ADD ANOTHER'}
  </button> */}

            {/* {showAdditionalInputs.length > 0  && (
  <div>
    
    {renderAdditionalInputs()}
  </div>
)}  */}

            {/* {showAdditionalInputs.length > 0 && renderAdditionalInputs()} */}
            {renderAdditionalInputs()}
            <div className="form-group">
              <button type='button' className='btn btn-primary' onClick={handleAddAnotherClick}>
                Add Another
              </button>
            </div>

            <div className="form-group toolHelpLink">
              <a href="https://example.com" target="_blank" onClick={handleLinkClick}>
                How does this tool work?
              </a>
            </div>
          </div>
          <div className="modal-footer">
            <button type='button' onClick={handleRemoveTable} class='btn btn-danger remove'>REMOVE TOOL</button>
            <button type='button' className='btn btn-primary ok' onClick={handleSubmit}>OK</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortPopupComponent;
