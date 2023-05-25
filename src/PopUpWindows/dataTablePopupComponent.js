import React from 'react';
import '../css/dataTablePopUp.css';

const dataTablePopupComponent = ({onClose, onRemoveTable, label}) => {

  const handleRemoveTable = () => {
    // Call the onRemoveTable callback function
    if (onRemoveTable) {
      onRemoveTable();
    }
    // Close the popup
    onClose();
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
          <input type="text"  value={label} className="form-control" id="textbox" />
        </div>
     
    
    <div className="form-group">
          <label htmlFor="dropdown">Table</label>
          <select id="dropdown" className="form-control">
            <option value="option1">Accounts</option>
            <option value="option2">Company</option>
            <option value="option3">Roles</option>
          </select>
        </div>
        <button type='button' className='btn btn-primary'>REFRESH TABLES</button>
        </div>
        <div className="modal-footer">
                        <button type='button' onClick={handleRemoveTable} class='btn btn-danger remove'>Remove Tool</button>
                        <button type='button' className='btn btn-primary ok'  onClick={onClose}>OK</button>
                    </div>
    </div>
    </div>
    </div>
  );
};

export default dataTablePopupComponent;
