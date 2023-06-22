import React, { useState, createContext, useContext } from 'react';
import { BaseEdge, EdgeLabelRenderer, getBezierPath } from 'reactflow';
import './index.css';

// Create a Context
export const EdgeContext = createContext();

// Create a provider which will keep the state
export function EdgeProvider({ children }) {
  const [edgeStates, setEdgeStates] = useState({});

  const toggleEdge = id => {
    setEdgeStates(edgeStates => ({
      ...edgeStates,
      //  [id]: !edgeStates[id]

      [id]: edgeStates[id] === 'AND' ? 'OR' : 'AND'
    }));
    console.log(JSON.stringify(edgeStates) + "edgeStates");
  };

  return (
    <EdgeContext.Provider value={{ edgeStates, toggleEdge }}>
      {children}
    </EdgeContext.Provider>
  );
}

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  onButtonValueChange
}) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const { edgeStates, toggleEdge } = useContext(EdgeContext);
  
  const onEdgeClick = (event) => {
    event.stopPropagation();
    // const newToggleState = !toggleState;
    const newToggleState = edgeStates[id] === 'AND' ? 'OR' : 'AND';
    console.log(JSON.stringify(newToggleState) + "newToggleState");
    toggleEdge(id);
    //setToggleState(newToggleState);
    // alert(JSON.stringify(toggleState)+"toggleState");
    // alert(JSON.stringify(edgeStates)+"edgeStates");
    // alert(JSON.stringify(toggleEdge)+"toggleEdge");
    //  console.log(JSON.stringify(toggleState)+"toggleState");
    console.log(JSON.stringify(edgeStates) + "edgeStates");
    console.log(JSON.stringify(toggleEdge) + "toggleEdge");
    // console.log(JSON.stringify(toggleState)+"toggleState");
    onButtonValueChange(id, newToggleState); // Invoke the prop with button value and edge ID
  };


  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
        >
          <button type="button" className="toggleButton" onClick={onEdgeClick}>
            {/* {edgeStates[id] ? 'AND' : 'OR'} */}
            {edgeStates[id] || 'OR'}
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
