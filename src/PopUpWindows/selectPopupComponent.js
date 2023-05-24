
import React, { useState } from 'react';
import '../css/dataTablePopUp.css';
import '../css/draggableColumn.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import 'react-beautiful-dnd/style.css';


const ColumnItem = ({ draggableId, column, index, handleAddColumn }) => {
    
    const handleDragStart = (e, draggableId) => {
        alert("move");
        alert(draggableId);
      e.dataTransfer.effectAllowed = 'move';
      // Add any other necessary logic for drag start
    };
  
    // const handleDragEnd = (result) => {
    //     alert("end");
    //   if (!result.destination) return;
    //   // Handle the drag end logic
    //   // ...
    // };
  
    return (
        <Draggable key={column.id.toString()} draggableId={column.id.toString()} index={index}>
        {(provided, snapshot) => (
          <li
            className={`blockItem ui-draggable ${snapshot.isDragging ? 'dragging' : ''}`}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onDragStart={(e) => handleDragStart(e, column.id.toString())}
            // onDragEnd={handleDragEnd}
            onClick={() => handleAddColumn(column)}
          >
            <span {...provided.dragHandleProps}>{column.name}</span>
          </li>
        )}
      </Draggable>
    );
  };

const LeftList = ({ columns, handleAddAll, handleAddColumn }) => {
    return (
      <div className="column-list">
        {/* <h2 className="list-title">Left List</h2> */}
        <Droppable droppableId="left-list">
      {(provided) => (
        <ul className="column-items" ref={provided.innerRef} {...provided.droppableProps} >
          {columns.map((column, index) => (
            <ColumnItem key={column.id.toString()} column={column} index={index} handleAddColumn={handleAddColumn} />
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
        <button className="add-all-button" onClick={handleAddAll}>
          Add All
        </button>
      </div>
    );
  };
  

  const RightList = ({ selectedColumns, handleRemoveAll, handleRemoveColumn, setSelectedColumns}) => {
    
    const handleDragStart = (e, column) => {
      e.dataTransfer.effectAllowed = 'move';
      // Add any other necessary logic for drag start
    };
  
    const handleDragEnd = (result) => {
     alert(JSON.stringify(result));
      if (!result.destination) return; // Item was dropped outside of a droppable area

      const sourceIndex = result.source.index;
      const destinationIndex = result.destination.index;
  
      // Reorder the selectedColumns array based on the drag and drop result
      const updatedColumns = Array.from(selectedColumns);
      const [draggedColumn] = updatedColumns.splice(sourceIndex, 1);
      updatedColumns.splice(destinationIndex, 0, draggedColumn);
  
      setSelectedColumns(updatedColumns);
    };
    const handleColumnRemove = (column) => {
        handleRemoveColumn(column);
      };
    return (
      <div className="column-list">
        {/* <h2 className="list-title">Right List</h2> */}
        <Droppable droppableId="right-list">
          {(provided) => (
            <ul className="column-items" ref={provided.innerRef} {...provided.droppableProps}>
              {selectedColumns.map((column, index) => (
                <Draggable
                  draggableId={column.id.toString()}
                  index={index}
                  key={column.id.toString()}
                  onDragStart={(e) => handleDragStart(e, column)}
                  onDragEnd={handleDragEnd}
                >
                  {(provided) => (
                    <li
                      className="blockItem ui-draggable"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {column.name}
                      <button className="remove-column" onClick={() => handleColumnRemove(column)}>
                      X
                    </button>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
        <button className="remove-all-button" onClick={handleRemoveAll}>
          Remove All
        </button>
      </div>
    );
  };
  





const SelectPopupComponent = ({ onClose, onRemoveTable }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState([]);

    const handleRemoveTable = () => {
        // Call the onRemoveTable callback function
        if (onRemoveTable) {
            onRemoveTable();
        }
        // Close the popup
        onClose();
    };

    const handleLinkClick = () => {
        // Perform any actions when the link is clicked
        // ...
    };

    const handleDragEnd = (result) => {
        alert("main");
        if (!result.destination) return;
    
        const { source, destination } = result;
    



        if (source.droppableId === 'left-list' && destination.droppableId === 'right-list') {
          const draggedColumn = columns[source.index];
          handleAddColumn(draggedColumn);
        } else if (source.droppableId === 'right-list' && destination.droppableId === 'left-list') {
          const draggedColumn = selectedColumns[source.index];
          handleRemoveColumn(draggedColumn);
        }
      };
    

    const [columns, setColumns] = useState([
        { id: 1, name: 'Column 1' },
        { id: 2, name: 'Column 2' },
        { id: 3, name: 'Column 3' },
        // ...other columns
    ]);

    



    const handleAddAll = () => {
        setSelectedColumns([...selectedColumns, ...columns]);
        setColumns([]);
    };
    const handleAddColumn = (column) => {
        //  // Check if the column is already present in selectedColumns
        //  const isColumnPresent = selectedColumns.some((col) => col.id === column.id);
        // if(isColumnPresent){
            setSelectedColumns([...selectedColumns, column]);
            setColumns(columns.filter((col) => col.id !== column.id));  
            
            
        // }
          };

   
    const handleRemoveColumn = (column) => {
        setSelectedColumns(selectedColumns.filter((col) => col.id !== column.id));
        setColumns([...columns, column]);
    };

    const handleRemoveAll = () => {
        setColumns([...columns, ...selectedColumns]);
        setSelectedColumns([]);
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
                            <input type="text" value="Select 1" className="form-control" id="textbox" />
                        </div>
                        <h3>Select which columns to include</h3>
                        <p className="helpText">Drag columns into the list on the right and reorder as required. Click the 'x' button to remove selected columns.
                        </p>
                        <DragDropContext onDragEnd={handleDragEnd}>

                        <div className="list-container">
                            <LeftList columns={columns} handleAddAll={handleAddAll} handleAddColumn={handleAddColumn} />
                            <RightList selectedColumns={selectedColumns} handleRemoveAll={handleRemoveAll} handleRemoveColumn={handleRemoveColumn} setSelectedColumns={setSelectedColumns}/>

                        </div>
                        </DragDropContext>
                        <div className="form-group toolHelpLink">
                            <a href="https://example.com" target="_blank" onClick={handleLinkClick}>
                                How does this tool work?
                            </a>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type='button' onClick={handleRemoveTable} class='btn btn-danger remove'>REMOVE TOOL</button>
                        <button type='button' className='btn btn-primary ok' onClick={onClose}>OK</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectPopupComponent;
