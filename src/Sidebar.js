import React from 'react';
import databaseIcon from './images/db.png';
import sortIcon from './images/sort.png';
import filterIcon from './images/filter.png';
import Navbar from './components/Navbar';
import Draggable from './Draggable';
import databaseicon from './images/db.png';
import sorticon from './images/sort.png';
import filtericon from './images/filter.png';
import joinicon from './images/join.png';
import summarizeicon from './images/summarize.png';
import selecticon from './images/select.png';
import appendicon from './images/append.png';
import extracticon from './images/extract.png';
import linecharticon from './images/linechart.png';
import barcharticon from './images/barchart.png';
import piecharticon from './images/piechart.png';

const type = 'newNodeType';
const icon = <img src={databaseIcon} alt="icon" />;
console.log(JSON.stringify(icon));

const nodeTypes = [
    { type: 'datatable', icon: databaseIcon },
    { type: 'sort', icon: sortIcon },
    { type: 'filter', icon: filterIcon },
    { type: 'join', icon: joinicon },
    { type: 'summarize', icon: summarizeicon },
    { type: 'select', icon: selecticon },
    { type: 'append', icon: appendicon },
    { type: 'extract', icon: extracticon },
    { type: 'linechart', icon: linecharticon },
    { type: 'barchart', icon: barcharticon },
    { type: 'piechart', icon: piecharticon },
  ];



const Sidebar = () => {
    const onDragStart = (event, nodeType, iconUrl) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.setData('image/icon', iconUrl);
        event.dataTransfer.effectAllowed = 'move';
      };

    return (
        <aside>
            
          
            {/* <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'datatable')} draggable>
                <img src={databaseIcon} alt="database icon" />

            </div>
            <div className="dndnode" onDragStart={(event) => onDragStart(event, 'sort')} draggable>
                <img src={sortIcon} alt="sort icon" />

            </div>
            <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'filter')} draggable>
                <img src={filterIcon} alt="filter icon" />
            </div>
            <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'join')} draggable>
                <img src={joinicon} alt="database icon" />

            </div>
            <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'summarize')} draggable>
                <img src={summarizeicon} alt="database icon" />

            </div>
            <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'select')} draggable>
                <img src={selecticon} alt="database icon" />

            </div>
            <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'append')} draggable>
                <img src={appendicon} alt="database icon" />

            </div>
            <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'extract')} draggable>
                <img src={extracticon} alt="database icon" />

            </div>
            <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'linechart')} draggable>
                <img src={linecharticon} alt="database icon" />

            </div>
            <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'barchart')} draggable>
                <img src={barcharticon} alt="database icon" />

            </div>
            <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'piechart')} draggable>
                <img src={piecharticon} alt="database icon" /> 


</div> */}

{nodeTypes.map((nodeType) => (
        <div
          key={nodeType.type}
          className={`dndnode ${nodeType.type}`}
          onDragStart={(event) =>
            onDragStart(event, nodeType.type, nodeType.icon)
          }
          draggable
        >
          <img src={nodeType.icon} alt={`${nodeType.type} icon`} />
        </div>
      ))}

        </aside>
    );
};

export default Sidebar;