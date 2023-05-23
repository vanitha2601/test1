
import React, { useState } from 'react';
import '../css/dataTablePopUp.css';

const AppendPopupComponent = ({onClose, onRemoveTable}) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (event) => {
      setIsChecked(event.target.checked);
    };
  
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
          <input type="text"  value="Append 1" className="form-control" id="textbox" />
        </div>
     
        <div className="checkbox-container">
        <label>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
         Include Non-matched Columns
        </label>
      </div>
      <div className="form-group toolHelpLink">
        <a href="https://example.com" target="_blank"   onClick={handleLinkClick}>
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

export default AppendPopupComponent;
