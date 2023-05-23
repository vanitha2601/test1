import React from 'react';
import '../css/dataTablePopUp.css';

const PieChartPopupComponent = ({onClose, onRemoveTable}) => {
    const handleLinkClick = () => {
        // Perform any actions when the link is clicked
        // ...
    };
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
          <input type="text"  value="Pie Chart 2" className="form-control" id="textbox" />
        </div>
     
    
    <div className="form-group">
          <label htmlFor="dropdown">Label</label>
          <select id="dropdown" className="form-control">
            <option value="option1">Accounts</option>
            <option value="option2">Company</option>
            <option value="option3">Roles</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="dropdown">Value</label>
          <select id="dropdown" className="form-control">
            <option value="option1">Accounts</option>
            <option value="option2">Company</option>
            <option value="option3">Roles</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="dropdown">Label Type</label>
          <select id="dropdown" className="form-control">
            <option value="option1">Name Only</option>
            <option value="option2">Name and Value</option>
            <option value="option3">Name and Percentage</option>
          </select>
        </div>
        <div className="form-group toolHelpLink">
                            <a href="https://example.com" target="_blank" onClick={handleLinkClick}>
                                How does this tool work?
                            </a>
                        </div>
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

export default PieChartPopupComponent;
