import React from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls, Handle, 
  ArrowHeadType, Position, removeElements, useStoreState, useStoreActions
} from 'reactflow';



// const Node = ({ data }) => {
//   return (
//     <div>
//       <img src={data.icon} alt={data.alt} />
//     </div>
//   );
// };

const Node = ({ data: { id, type, alt, icon } }) => {
  return (
    <div className="nodetype">
    
      <img src={icon} alt={alt} id={id}/> 
      
    </div>
   
  );
};

export default Node;
