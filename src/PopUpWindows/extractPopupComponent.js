
import React, { useState } from 'react';
import '../css/dataTablePopUp.css';

const ExtractPopupComponent = ({onClose, onRemoveTable}) => {
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
          <label htmlFor="textbox">Name </label>
          <input type="text"  value="Extract 1" className="form-control" id="textbox" />
        </div>
     
    
    <div className="form-group">
          <label htmlFor="dropdown">Source Column</label>
          <select id="dropdown" className="form-control">
            <option value="option1">Id</option>
            <option value="option2">Address</option>
            <option value="option3">Age</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="textbox">New Column Name</label>
          <input type="text"  value="" className="form-control" id="textbox" />
        </div>
        <div className="form-group">
          <label htmlFor="dropdown">Start</label>
          <select id="dropdown" className="form-control">
            <option value="option1">The Beginning</option>
            <option value="option2">At a specific position</option>
            <option value="option3">At the first occurence of</option>
            <option value="option3">After the first occurence of</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="textbox">End</label>
          <input type="text"  value="" className="form-control" id="textbox" />
        </div>
        <div className="form-group">
          <label htmlFor="dropdown">The End</label>
          <select id="dropdown" className="form-control">
            <option value="option1">The End</option>
            <option value="option2">At a specific position</option>
            <option value="option3">At a specific length</option>
            <option value="option3">At the next occurrence of...</option>
            <option value="option3">After the next occurrence of...</option>
          </select>
        </div>
        <div className="form-group toolHelpLink">
        <a href="https://example.com" target="_blank"   onClick={handleLinkClick}>
             How does this tool work?
            </a>
            </div>
        </div>
        <div className="modal-footer">
                        <button type='button' onClick={handleRemoveTable} class='btn btn-danger remove'>REMOVE TOOL</button>
                        <button type='button' className='btn btn-primary ok'  onClick={onClose}>OK</button>
                    </div>
    </div>
    </div>
    </div>
  );
};

export default ExtractPopupComponent;
