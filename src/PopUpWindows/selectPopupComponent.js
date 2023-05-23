
import React, { useState } from 'react';
import '../css/dataTablePopUp.css';
import '../css/draggableColumn.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';



const ColumnItem = ({ column, index }) => {
    return (
        <Draggable key={column.id} draggableId={column.id.toString()} index={index}>
            {(provided) => (
                <li
                    className="column-item"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    {column.name}
                </li>
            )}
        </Draggable>
    );
};

const LeftList = ({ columns, handleAddAll }) => {
    return (
        <div className="column-list">
            <h2 className="list-title">Left List</h2>
            <ul className="column-items">
                {columns.map((column) => (
                    <li key={column.id} className="column-item">
                        {column.name}
                    </li>
                ))}
            </ul>
            <button className="add-all-button" onClick={handleAddAll}>
                Add All
            </button>
        </div>
    );
};

const RightList = ({ selectedColumns, handleRemoveAll }) => {
    return (
        <div className="column-list">
            <h2 className="list-title">Right List</h2>
            <ul className="column-items">
                {selectedColumns.map((column) => (
                    <li key={column.id} className="column-item">
                        {column.name}
                    </li>
                ))}
            </ul>
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
        if (!result.destination) return;

        const { source, destination } = result;

        if (source.droppableId === destination.droppableId) {
            // Reorder columns within the same list
            const updatedColumns = [...selectedColumns];
            const [draggedColumn] = updatedColumns.splice(source.index, 1);
            updatedColumns.splice(destination.index, 0, draggedColumn);
            setSelectedColumns(updatedColumns);
        } else {
            // Move column from left list to right list
            const updatedSelectedColumns = [...selectedColumns];
            const [draggedColumn] = updatedSelectedColumns.splice(source.index, 1);
            updatedSelectedColumns.splice(destination.index, 0, draggedColumn);
            setSelectedColumns(updatedSelectedColumns);
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
    };
    const handleAddColumn = (column) => {
        setSelectedColumns([...selectedColumns, column]);
        setColumns(columns.filter((col) => col.id !== column.id));
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

                        <div className="list-container">
                            <LeftList columns={columns} handleAddAll={handleAddAll} handleAddColumn={handleAddColumn} />
                            <RightList selectedColumns={selectedColumns} handleRemoveAll={handleRemoveAll} handleRemoveColumn={handleRemoveColumn} />

                        </div>

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
