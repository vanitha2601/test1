import React, { useState, useEffect } from 'react';
import '../css/dataTablePopUp.css';

const DataTablePopupComponent = ({ onClose, onRemoveTable, selectedNodeId, onValueSubmit,
  nodes, setNodes, droppedNodes, setDroppedNodes,
  nodeName,
  data,
}) => {

  const [name, setName] = useState(nodeName);
  const [selectedDatabase, setSelectedDatabase] = useState(data.databases[0]);
  const [selectedTable, setSelectedTable] = useState(selectedDatabase.tables[0]);
  const [selectedTableColumns, setSelectedTableColumns] = useState([]);

  const handleDatabaseChange = (event) => {
    const selectedDatabaseName = event.target.value;
    const selectedDatabase = data.databases.find(
      (database) => database.name === selectedDatabaseName
    );

    setSelectedDatabase(selectedDatabase);
    // Find the corresponding table for the selected database
    const selectedTable = selectedDatabase.tables[0]; // Change this logic based on your requirements
    setSelectedTable(selectedTable);

    alert(JSON.stringify(selectedTable) + "selectedTableselectedTable");

    if (selectedTable) {
      const columns = selectedTable.columns;
      setSelectedTableColumns(columns);
      alert(JSON.stringify(selectedTableColumns));
    }

  };


  const handleTableChange = (event, selectedDatabase) => {
    const selectedTableName = event.target.value;
    let selectedTable = null;
    let columns = [];
    if (selectedDatabase) {
      // Find the selected table based on the selectedTableName within the selected database
      selectedTable = selectedDatabase.tables.find(
        (table) => table.name === selectedTableName
      );
    }
    if (selectedTable) {
      columns = selectedTable.columns;
    }
    setSelectedTable({
      name: selectedTableName,
      columns: columns,
    });
    alert(JSON.stringify(selectedTableName));

    setSelectedTableColumns(columns);
  };

  const renderDatabaseOptions = () => {
    return data.databases.map((database, index) => (
      <option key={index} value={database.name}>
        {database.name}
      </option>
    ));
  };

  const renderTableOptions = () => {
    const selectedDatabaseObj = data.databases.find(database => database.name === selectedDatabase.name);
    if (selectedDatabaseObj && selectedDatabaseObj.tables.length > 0) {
      return selectedDatabaseObj.tables.map((table) => (
        <option key={table.name} value={table.name}>
          {table.name}
        </option>
      ));
    } else {
      return null;
    }
  };


  useEffect(() => {

    setName(nodeName);
    setSelectedTable(selectedTable);
    setSelectedTableColumns(selectedTableColumns);
    // Find the selected node based on the selectedNodeId

    const selectedNode = nodes.find((node) => node.id === selectedNodeId);

    if (selectedNode) {
      // Update the selectedDatabase and selectedTable states based on the selected node's values
      setSelectedDatabase(selectedNode.data.selectedDatabase);
      setSelectedTable(selectedNode.data.selectedTable);
      setSelectedTableColumns(selectedNode.data.selectedTable.columns);
    }
  }, [nodeName], [selectedNodeId], [nodes]);


  console.log(selectedNodeId + "selectedNodeId");
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
    console.log(JSON.stringify(selectedDatabase) + "selectedDatabase");
    console.log(JSON.stringify(selectedTable) + "selectedTable");
    console.log(JSON.stringify(selectedTableColumns) + "selectedTableColumns");
    onValueSubmit(selectedNodeId, name, selectedDatabase, selectedTable, selectedTableColumns);
  };


  const [dynamicValue, setDynamicValue] = useState('');

  // Function to update the dynamic value
  const handleNameChange = (event) => {

    setName(event.target.value);
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
              <label htmlFor="textbox">Name</label>
              <input type="text" value={name}
                className="form-control" onChange={handleNameChange}
                id="textbox" />
            </div>


            <div className="form-group">
              <label htmlFor="dropdown">List of Database </label>


              <select id="database" className="form-control"
                value={selectedDatabase.name}
                onChange={handleDatabaseChange}
              >
                {renderDatabaseOptions()}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="dropdown">List of Table</label>

              <select id="table" className="form-control" value={selectedTable.name}
                onChange={(event) => handleTableChange(event, selectedDatabase)}

              >
                {renderTableOptions()}
              </select>

            </div>
            <button type='button' className='btn btn-primary'>REFRESH TABLES</button>
          </div>
          <div className="modal-footer">
            <button type='button' onClick={handleRemoveTable} class='btn btn-danger remove'>Remove Tool</button>
            <button type='button' className='btn btn-primary ok' onClick={handleSubmit} >OK</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTablePopupComponent;
