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
import Node from './Node';
import CustomNode from './CustomNode';
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    Controls, Handle,
    ArrowHeadType, Position, removeElements, useStoreState, useStoreActions
} from 'reactflow';





const nodeTypes = [
    {
        id: 'dataTable', type: 'input', data: { label: 'Data Table' }, icon: databaseIcon, edges: ['right']
    },
    {
        id: 'sort',   type: 'customNode', component: CustomNode,  data: {label: 'Sort'}, icon: sortIcon, edges: ['right', 'left']
    },
    {
        id: 'filter', type: 'default',  data: {label: 'Filter'}, icon: filterIcon,edges: ['right', 'left']
    },
    {
        id: 'join', type: 'default',  data: {label:  'Join'}, icon: joinicon, edges: ['right', 'left']
    },
    { id: 'summarize', type: 'default',  data: {label: 'Summarize'}, icon: summarizeicon, edges: ['right', 'left'] },
    { id: 'select', type: 'default',  data: {label: 'Select'}, icon: selecticon, edges: ['right', 'left'] },
    { id: 'append', type: 'default',  data: {label: 'Append'}, icon: appendicon, edges: ['right', 'left'] },
    { id: 'extract', type: 'default',  data: {label: 'Extract'}, icon: extracticon, edges: ['right', 'left'] },
    { id: 'line', type: 'output',  data: {label: 'Line Chart'}, icon: linecharticon, edges: ['left'] },
    { id: 'bar', type: 'output',  data: {label: 'Bar Chart'}, icon: barcharticon, edges: ['left'] },
    { id: 'pie', type: 'output',  data: {label: 'Pie Chart'}, icon: piecharticon, edges: ['left'] },
];



const Sidebar = () => {
    const onDragStart = (event, id, nodeType,  component, iconUrl, edges) => {

        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.setData('image/icon', iconUrl);
        event.dataTransfer.setData('id', id);
        event.dataTransfer.effectAllowed = 'move';
        // event.dataTransfer.setData('positionSource', sourcePos);
        // event.dataTransfer.setData('positionTarget', targetPos);
        event.dataTransfer.setData('component', component);
        event.dataTransfer.setData('edges', edges);
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
                        onDragStart(event, nodeType.id, nodeType.type,  nodeType.component, nodeType.icon, nodeType.edges)}
                    draggable
                >
                    
                    <img src={nodeType.icon} label={nodeType.data.label} id={nodeType.id} />


                </div>
            ))}


        </aside>
    );
};

export default Sidebar;