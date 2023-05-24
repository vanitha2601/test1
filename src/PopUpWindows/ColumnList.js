
import  Column from './Column';

const ColumnList = ({ columns, onColumnDragDrop, onColumnRemove }) => {
    return (
      <div>
        <h3>Drag columns into the list on the right:</h3>
        <div className="column-list">
          {columns.map((column, index) => (
            <Column
              key={column.id}
              column={column}
              index={index}
              onColumnDragDrop={onColumnDragDrop}
              onColumnRemove={onColumnRemove}
            />
          ))}
        </div>
      </div>
    );
  };
  export default ColumnList;