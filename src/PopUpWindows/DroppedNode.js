import React from 'react';
const DroppedNode = ({ label }) => {
    return (
      <div>
        {/* Render the dropped node content */}
        <p>Node Content</p>
  
        {/* Render the label at the bottom of the dropped node */}
        <div>{label}</div>
      </div>
    );
  };
  export default DroppedNode;