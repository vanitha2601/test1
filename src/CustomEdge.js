import React, { useState, useEffect } from 'react';
import { BaseEdge, EdgeLabelRenderer, getBezierPath } from 'reactflow';

import './index.css';

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
  initialEdgeType,
  onToggle,
}) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  console.log(initialEdgeType+"initialEdgeType");
  const [toggleState, setToggleState] = useState(initialEdgeType);

  const handleToggle = () => {
    const currentState = toggleState;
    const newState = currentState === 'AND' ? 'OR' : 'AND';
    setToggleState(newState);
    //onToggle(id, newState);
    console.log(JSON.stringify(toggleState)+"toggleState");
  };

  useEffect(() => {
    setToggleState(initialEdgeType);
  }, [initialEdgeType]);

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
          id={id}
        >
          <button type="button" className="toggleButton" onClick={handleToggle}>
          {toggleState || initialEdgeType}
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
