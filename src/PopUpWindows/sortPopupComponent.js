
import React, { useState, useEffect } from 'react';
import '../css/dataTablePopUp.css';

const SortPopupComponent = ({ onClose, onRemoveTable, nodeName, selectedNodeId, onValueSubmit,
  nodes, setNodes, droppedNodes, setDroppedNodes, data, selectedPreviousTable,
  selectedCurrentTable, firstColumn,
  columns, isCheckedValue, thenByIsCheckedValue,
  selectedThenByColumnValue, showAdditionalinputlength
}) => {
  console.log(JSON.stringify(selectedPreviousTable) + "selectedPreviousTable");
  console.log(JSON.stringify(showAdditionalinputlength) + "showAdditionalInputs.length");
  console.log(JSON.stringify(selectedCurrentTable) + "selectedCurrentTable");
  console.log(JSON.stringify(firstColumn) + "firstColumn");
  console.log(JSON.stringify(columns[0]) + "columns[]0");
  const [isChecked, setIsChecked] = useState(isCheckedValue);
  const [thenByIsChecked, setThenByIsChecked] = useState(thenByIsCheckedValue);
  const [selectedColumns, setSelectedColumns] = useState(firstColumn);
  const [selectedThenByColumns, setSelectedThenByColumns] = useState(
    selectedThenByColumnValue.length > 0 ? selectedThenByColumnValue : ['']
  );
  // const [selectedThenByColumns, setSelectedThenByColumns] = useState([selectedThenByColumnValue]);
  const [showAdditionalInputs, setShowAdditionalInputs] = useState([]);


  const [name, setName] = useState(nodeName);

  useEffect(() => {
    // setShowAdditionalInputs(showAdditionalinputlength > 0 ? [{}] : []);

    setName(nodeName);
    setSelectedColumns(firstColumn);
    setIsChecked(isCheckedValue);
    setThenByIsChecked(thenByIsCheckedValue);
    setSelectedThenByColumns(selectedThenByColumnValue);

    if (
      selectedCurrentTable &&
      selectedPreviousTable &&
      selectedCurrentTable.name !== selectedPreviousTable.name
    ) {
      setShowAdditionalInputs([]);
      setSelectedThenByColumns([]);
      setIsChecked(false);
      setThenByIsChecked(false);
    } else {
      setShowAdditionalInputs(showAdditionalinputlength > 0 ? [{}] : []);
    }

    //  setShowAdditionalInputs(showAdditionalinputlength);
  }, [nodeName, selectedCurrentTable, selectedPreviousTable, firstColumn, isCheckedValue, thenByIsCheckedValue, selectedThenByColumnValue, showAdditionalinputlength]
  );



  const renderAdditionalInputs = () => {
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
                checked={thenByIsChecked[index]}
                onChange={(event) => handleThenByCheckboxChange(event, index)}
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
    console.log(JSON.stringify(firstColumn) + "firstColumn");
    console.log(JSON.stringify(selectedColumns) + "selectedColumns");

    //  firstColumn = selectedColumns;
    let buildOrderBy = selectedColumns;
    const showAdditionalinputlength = showAdditionalInputs.length;


    buildOrderBy += isChecked ? ' DESC' : '';

    if (selectedThenByColumns.length > 0) {
      buildOrderBy += ',' + selectedThenByColumns.join(',');
    }

    buildOrderBy += thenByIsChecked ? ' DESC' : '';

    console.log(buildOrderBy);

    onValueSubmit(selectedNodeId, name, buildOrderBy, selectedCurrentTable, selectedColumns,
      isChecked, thenByIsChecked, selectedThenByColumns, showAdditionalinputlength);
    // Perform the submit action with the formData
    // ...


  };



  const handleThenByColumnChange = (event, index) => {
    const { value } = event.target;

    // Update the selectedThenByColumns state with the selected value
    const updatedColumns = [...selectedThenByColumns];
    updatedColumns[index] = value;
    setSelectedThenByColumns(updatedColumns);
  };


  const handleColumnChange = (event) => {
    const selectedColumnName = event.target.value;
    setSelectedColumns(selectedColumnName);
  };


  // Function to update the dynamic value
  const handleNameChange = (event) => {

    setName(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setIsChecked(isChecked);
  };

  const handleThenByCheckboxChange = (event, index) => {
    const isChecked = event.target.checked;
    setThenByIsChecked((prevIsChecked) => ({
      ...prevIsChecked,
      [index]: isChecked,
    }));
  };


  const handleLinkClick = () => {
    // Perform any actions when the link is clicked
    // ...
  };
  // const renderColumnOptions = () => {
  //   return columns.map((column) => (
  //     <option key={column} value={column}>
  //       {column}
  //     </option>
  //   ));
  // };

  const renderColumnOptions = () => {
    if (selectedCurrentTable) {
      return selectedCurrentTable.columns.map((column) => (
        <option key={column} value={column}>
          {column}
        </option>
      ));
    }
    return null;
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
