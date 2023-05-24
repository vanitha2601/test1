import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
// import  Column  from './PopUpWindows/Column';

 import  ColumnList  from './ColumnList';
 
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


const initialColumns = [
  { id: 1, title: 'Column 1' },
  { id: 2, title: 'Column 2' },
  { id: 3, title: 'Column 3' },
];
const ColumnDragDrop = ({onClose, onRemoveTable}) => {
// const ColumnDragDrop = () => {
  // State to hold the columns
  const [columns, setColumns] = useState(initialColumns);

  // Function to handle column drag and drop
  const handleColumnDragDrop = (dragIndex, hoverIndex) => {
    const draggedColumn = columns[dragIndex];

    setColumns((prevColumns) => {
      const updatedColumns = [...prevColumns];
      updatedColumns.splice(dragIndex, 1);
      updatedColumns.splice(hoverIndex, 0, draggedColumn);
      return updatedColumns;
    });
  };

  // Function to handle column removal
  const handleColumnRemove = (columnId) => {
    setColumns((prevColumns) =>
      prevColumns.filter((column) => column.id !== columnId)
    );
  };

  return (
    <div>
      
      <ColumnList
        columns={columns}
        onColumnDragDrop={handleColumnDragDrop}
        onColumnRemove={handleColumnRemove}
      />
      
    </div>
  );
};

export default ColumnDragDrop;
