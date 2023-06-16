
import React, { useState, useEffect } from 'react';
import '../css/dataTablePopUp.css';

const FilterPopupComponent = ({ onClose, onRemoveTable, nodeName, selectedNodeId, onValueSubmit,
  nodes, setNodes, droppedNodes, setDroppedNodes, data, selectedPreviousTable,
  selectedCurrentTable, firstColumn, firstCompareToValue,
  columns,
  connectionValue,
  firstEnterValue,
  groupEnterValue,
  selectedGroupColumnValue, additionalCompareTypeValues,
  showAdditionalinputGrouplength, additionalLogicalOperatorsValue
}) => {

  console.log(JSON.stringify(selectedPreviousTable) + "selectedPreviousTable");
  console.log(JSON.stringify(showAdditionalinputGrouplength) + "showAdditionalInputs.length");
  console.log(JSON.stringify(selectedCurrentTable) + "selectedCurrentTable");
  console.log(JSON.stringify(firstColumn) + "firstColumn");
  console.log(JSON.stringify(columns[0]) + "columns[]0");

  const [isChecked, setIsChecked] = useState(false);


  const [name, setName] = useState(nodeName);
  const [enterValue, setEnterValue] = useState(firstEnterValue);
  const [selectedFilterColumns, setSelectedFilterColumns] = useState(firstColumn || '');

  const [compareType, setCompareType] = useState(firstCompareToValue);
  const [isConnectionMade, setIsConnectionMade] = useState(connectionValue);

  const [selectedGroupColumns, setSelectedGroupColumns] = useState(

    selectedGroupColumnValue.length > 0 ? selectedGroupColumnValue : ['']
  );

  const [additionalCompareType, setAdditionalCompareType] = useState(
    additionalCompareTypeValues && additionalCompareTypeValues.length > 0 ? additionalCompareTypeValues : ['']
  );
  const [showAdditionalGroupInputs, setShowAdditionalGroupInputs] = useState([]);
  const [additionalTextboxValues, setAdditionalTextboxValues] = useState([]);
  const [additionalLogicalOperators, setAdditionalLogicalOperators] = useState(
    additionalLogicalOperatorsValue && additionalLogicalOperatorsValue.length > 0 ? additionalLogicalOperatorsValue : ['']

  );



  useEffect(() => {
    setName(nodeName);
    setSelectedFilterColumns(firstColumn);
    setCompareType(firstCompareToValue);
    setEnterValue(firstEnterValue);
    // setAdditionalTextboxValues();
    setIsConnectionMade(connectionValue);
    setSelectedGroupColumns(selectedGroupColumnValue);


    if (
      selectedCurrentTable &&
      selectedPreviousTable &&
      selectedCurrentTable.name !== selectedPreviousTable.name
    ) {
      setShowAdditionalGroupInputs([]);
      setSelectedGroupColumns([]);

    } else {

      setShowAdditionalGroupInputs(showAdditionalinputGrouplength > 0 ? [{}] : []);

      setAdditionalCompareType(additionalCompareTypeValues);
      setAdditionalTextboxValues(groupEnterValue || []);
      setAdditionalLogicalOperators(additionalLogicalOperatorsValue);
    }


    // setShowAdditionalGroupInputs(showAdditionalinputGrouplength > 0 ? [{}] : []);
  }, [nodeName, firstColumn, firstCompareToValue, firstEnterValue,
    connectionValue,
    selectedGroupColumnValue, showAdditionalinputGrouplength, additionalCompareTypeValues,
    groupEnterValue, additionalLogicalOperatorsValue]
  );

  const renderAdditionalGroupInputs = () => {
    if (showAdditionalGroupInputs.length > 0) {
      return selectedGroupColumns.map((column, index) => (
        //return showAdditionalGroupInputs.map((input, index) => (
        //  return selectedGroupColumns.map((column, index) => (
        <div key={index} className="additional-input">
          {/* Render your additional inputs here */}
          <div className="form-group">
            <label htmlFor={`dropdown-${index}`}>Group Separator</label>
            <select
              id={`dropdown-${index}`}
              className="form-control"
              value={additionalLogicalOperators[index]}
              onChange={(event) => handleLogicalOperatorChange(event, index)}
            >
              <option value="and">AND</option>
              <option value="or">OR</option>
            </select>
          </div>


          <div className="form-group">
            <label htmlFor={`dropdown-${index}`}>Column</label>
            <select
              id={`dropdown-${index}`}
              className="form-control"

              value={selectedGroupColumns[index]}
              onChange={(event) => handleGroupColumnChange(event, index)}

            >
              {renderColumnOptions()}
            </select>

          </div>
          <div className="form-group">
            <label htmlFor={`dropdown-${index}`}>Compare Type</label>

            <select id={`dropdown-${index}`} className="form-control"
              value={additionalCompareType[index]}
              onChange={(event) => handleFilterGroupChange(event, index)}>
              {dropdownCompareToOptions.map((option) => (
                <option key={option.value} value={option.symbol}>
                  {option.label}
                </option>
              ))}
            </select>

          </div>
          <div className="form-group">

            <input type="text" value={additionalTextboxValues[index]}
              className="form-control" id={`textbox-${index}`}
              onChange={(event) => handleTextboxChange(event, index)} />
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

  const handleSubmit = (event) => {
    event.preventDefault();

    // Add the first column of selectFiltercolumns to selectGroupColumns
    const combinedFilterColumns = [selectedFilterColumns, ...selectedGroupColumns];

    const combinedCompareType = [compareType, ...additionalCompareType];


    const combinedEntervalues = [enterValue, ...additionalTextboxValues];


    const logicalOperators = ['', ...additionalLogicalOperators];

    alert(JSON.stringify(combinedFilterColumns) + "combinedFilterColumns");
    // Example dynamic column values
    // const columns = ['testCol', 'testCol2', 'testCol3', 'testCol4', 'testCol5'];
    // const comparisonOperators = ['=', '!=', '==', '>', 'LIKE'];
    // const values = ['2', "'testVal'", '1234', '10', "'%keyword%'"];

    // Build the JSON object dynamically
    const buildWhere = {
      groupSeparator: [{ sep: '' }],
      group: []
    };

    for (let i = 0; i < combinedFilterColumns.length; i++) {
      const combinedFilterColumn = combinedFilterColumns[i];
      const comparisonOperator = combinedCompareType[i];
      const value = combinedEntervalues[i];

      const columnData = {
        logicalOperator: i > 0 ? logicalOperators[i] : '', // Use the logical operator based on the index
        column: combinedFilterColumn,
        comparisionOperator: comparisonOperator,
        value: `'${value}'`
      };

      buildWhere.group.push(columnData);
      // Check if it's not the first iteration and a new groupSeparator is needed
      // if (i > 0 && shouldAddGroupSeparator()) {
      //   buildWhere.groupSeparator.push({ sep: 'AND' });
      // }
    }

    alert(buildWhere);



    const data = [{ buildWhere: JSON.stringify(buildWhere) }];
    const jsonString = JSON.stringify(data);
    console.log(jsonString + "jsonString--------");
    // Convert the JSON object to string
    const jsonFilterData = JSON.stringify({ buildWhere });

    console.log(jsonFilterData);

    const dataFilterJson =
      { groupSeparator: buildWhere.groupSeparator, group: buildWhere.group }
      ;

    console.log(JSON.stringify(dataFilterJson) + "dataFilterJson");



    const showAdditionalinputGrouplength = showAdditionalGroupInputs.length;
    onValueSubmit(selectedNodeId, name, compareType, selectedCurrentTable,
      selectedFilterColumns, enterValue, additionalTextboxValues,
      selectedGroupColumns, additionalCompareType, showAdditionalinputGrouplength,
      additionalLogicalOperators, dataFilterJson
    );
  };

  const handleRemoveTable = () => {
    // Call the onRemoveTable callback function
    if (onRemoveTable) {
      onRemoveTable();
    }
    // Close the popup
    onClose();
  };
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleLinkClick = () => {
    // Perform any actions when the link is clicked
    // ...
  };
  // Function to update the dynamic value
  const handleNameChange = (event) => {

    setName(event.target.value);

  };

  // Function to update the dynamic value
  const handleEnterValue = (event) => {

    setEnterValue(event.target.value);

  };

  const handleTextboxChange = (event, index) => {
    const { value } = event.target;

    setAdditionalTextboxValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[index] = value;
      return updatedValues;
    });
  };


  const handleFilterChange = (event) => {
    setCompareType(event.target.value);
  };

  const handleFilterGroupChange = (event, index) => {
    const { value } = event.target;

    setAdditionalCompareType((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[index] = value;
      return updatedValues;
    });
  };


  const dropdownCompareToOptions = [
    { value: 'EqualTo', label: 'is equal to', symbol: '=' },
    { value: 'DoesNotEqual', label: 'is not equal to', symbol: '!=' },
    { value: 'GreaterThan', label: 'is greater than', symbol: '>' },
    { value: 'GreaterThanOrEqualTo', label: 'is greater than or equal to', symbol: '>=' },
    { value: 'LessThan', label: 'is less than', symbol: '<' },
    { value: 'LessThanOrEqualTo', label: 'is less than or equal to', symbol: '<=' },
    { value: 'IsEmpty', label: 'is empty', symbol: '' },
    { value: 'IsNotEmpty', label: 'is not empty', symbol: '' },
  ];



  const renderColumnOptions = () => {
    if (selectedCurrentTable && selectedCurrentTable.columns) {
      return selectedCurrentTable.columns.map((column) => (
        <option key={column} value={column}>
          {column}
        </option>
      ));
    }
    return null;
  };







  const handleAddAnotherClick = () => {
    // setSelectedThenByColumns([]);
    // setSelectedGroupColumns((prevColumns) => [...prevColumns, '']);
    //setShowAdditionalGroupInputs((prevInputs) => [...prevInputs, {}]);
    setSelectedGroupColumns([...selectedGroupColumns, '']);
    setAdditionalTextboxValues([...additionalTextboxValues, '']);
    setShowAdditionalGroupInputs([...showAdditionalGroupInputs, {}]);
  };


  const handleRemoveClick = (index) => {
    setSelectedGroupColumns((prevColumns) => {
      const updatedColumns = [...prevColumns];
      updatedColumns.splice(index, 1);
      return updatedColumns;
    });


  };

  const handleColumnChange = (event) => {
    const selectedColumnName = event.target.value;

    setSelectedFilterColumns(selectedColumnName);
  };



  const handleGroupColumnChange = (event, index) => {

    const { value } = event.target;

    // Update the selectedThenByColumns state with the selected value
    const updatedColumns = [...selectedGroupColumns];
    updatedColumns[index] = value;
    setSelectedGroupColumns(updatedColumns);
  };
  const handleLogicalOperatorChange = (event, index) => {
    const updatedOperators = [...additionalLogicalOperators];
    updatedOperators[index] = event.target.value;
    setAdditionalLogicalOperators(updatedOperators);
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
              <label htmlFor="textbox">Filter </label>
              <input type="text" value={name} onChange={handleNameChange}
                className="form-control" id="textbox" />
            </div>

            <div className="form-group">
              <label htmlFor="dropdown">Column</label>
              <select
                id="dropdown"
                className="form-control"

                value={selectedFilterColumns}
                onChange={handleColumnChange}
              >
                {renderColumnOptions()}
              </select>

            </div>
            <div className="form-group">
              <label htmlFor="dropdown">Compare Type</label>

              <select id="filterDropdown" className="form-control"
                value={compareType} onChange={handleFilterChange}>
                {dropdownCompareToOptions.map((option) => (
                  <option key={option.value} value={option.symbol}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            {isConnectionMade && (
              <>
                <div className="form-group">
                  <label htmlFor="dropdown">Compare Value</label>

                  <div className="form-group">

                    <input type="text" value={enterValue} onChange={handleEnterValue}
                      className="form-control" id="textbox" />
                  </div>
                </div>
                {renderAdditionalGroupInputs()}
                <div className="form-group">
                  <button type='button' className='btn btn-primary' onClick={handleAddAnotherClick}>
                    Add Another
                  </button>
                </div>

              </>

            )}
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

export default FilterPopupComponent;
