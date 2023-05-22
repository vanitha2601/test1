
import React, { useState } from 'react';
import '../css/dataTablePopUp.css';
import '../css/draggableColumn.css';



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
            <div>
            <button className="add-all-button" onClick={handleAddAll}>
                Add All
            </button>
            </div>
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


    const [selectedColumns, setSelectedColumns] = useState([]);

    const columns = [
        { id: 1, name: 'Column 1' },
        { id: 2, name: 'Column 2' },
        { id: 3, name: 'Column 3' },
        // ...other columns
    ];

    const handleAddAll = () => {
        setSelectedColumns(columns);
    };

    const handleRemoveAll = () => {
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

                        <div className="list-container">
                            <LeftList columns={columns} handleAddAll={handleAddAll} />
                            <RightList selectedColumns={selectedColumns} handleRemoveAll={handleRemoveAll} />
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
