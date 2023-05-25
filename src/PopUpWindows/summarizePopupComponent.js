
import React, { useState } from 'react';
import '../css/dataTablePopUp.css';

const SummarizePopupComponent = ({onClose, onRemoveTable, label}) => {
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
          <input type="text"  value={label} className="form-control" id="textbox" />
        </div>
     
    
    <div className="form-group">
          <label htmlFor="dropdown">Calculate the</label>
          <select id="dropdown" className="form-control" value="Number of Rows">
            <option value="option1">Total</option>
           
            <option value="option2">Minimum</option>
            <option value="option3">Maximum</option>
            <option value="option4">Average</option>
            <option value="option5">Median</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="dropdown">Of Column</label>
          <select id="dropdown" className="form-control" value="Number of Rows">
            <option value="option1">Total</option>
           
            <option value="option2">Minimum</option>
            <option value="option3">Maximum</option>
            <option value="option4">Average</option>
            <option value="option5">Median</option>
          </select>
        </div>

     <div>
        <button type='button' className='btn btn-default'>ADD</button>
        <button type='button' className='btn btn-primary'>BREAKDOWN SETTINGS</button>
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

export default SummarizePopupComponent;
