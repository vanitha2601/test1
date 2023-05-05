import React, { useState } from 'react';

const CreateTablePopup = ({ onClose, onSubmit }) => {
  const [tableName, setTableName] = useState('');
  const [tableType, setTableType] = useState('account');

  const handleTableNameChange = (e) => {
    setTableName(e.target.value);
  };

  const handleTableTypeChange = (e) => {
    setTableType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(tableName, tableType);
    onClose();
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h3>Create New Table</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="table-name">Table Name:</label>
            <input
              id="table-name"
              type="text"
              className="form-control"
              value={tableName}
              onChange={handleTableNameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="table-type">Table Type:</label>
            <select
              id="table-type"
              className="form-control"
              value={tableType}
              onChange={handleTableTypeChange}
            >
              <option value="account">Account</option>
              <option value="company">Company</option>
              <option value="roles">Roles</option>
            </select>
          </div>
          <div className="form-group text-right">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" onClick={onSubmit}>
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const DatabaseTable = () => {
  const [showCreateTablePopup, setShowCreateTablePopup] = useState(false);
  const [tableName, setTableName] = useState('');
  const [tableType, setTableType] = useState('account');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', 'table');
  };

  const handleCreateTableSubmit = (name, type) => {
    setTableName(name);
    setTableType(type);
  };

  const handleSortFieldChange = (e) => {
    setSortField(e.target.value);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const toggleCreateTablePopup = () => {
    setShowCreateTablePopup(!showCreateTablePopup);
  };

  return (
    <div>
      <h3>Database Table</h3>
      <div
        className="data-table"
        draggable="true"
        onDragStart={handleDragStart}
      >
        {tableName || 'No Table Selected'}
      </div>
      <div className="sort-list">
        <h4>Sort</h4>
        <div className="form-group">
          <label htmlFor="sort-field">Field:</label>
          <select
            id="sort-field"
            className="form-control"
            value={sortField}
            onChange={handleSortFieldChange}
          >
            <option value="">Select a Field</option>
            <option value="name">Name</option>
            <option value="date">Date</option>
            </select>
            </div>
            </div>
            </div>
  );
}
  export default CreateTablePopup;
