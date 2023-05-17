import React from 'react';
import { Handle, Position} from 'reactflow';

const CustomNode = ({ data }) => {
  const { id, alt, icon } = data;

  return (
    <div className="nodetype">
      <Handle id="target" type="target" position={Position.Left} isConnectable={false} />
      <img src={icon} alt="Datatable" />
      <Handle id = "source" type="source" position={Position.Right} isConnectable={true} />
    </div>
  );
};

// const CustomNode = ({ data }) => (
 
//   <>
  
//      <Handle type="target" position={Position.Left} /> 
//     <div>{id}</div>
//      <Handle type="source" position={Position.Right} isConnectable={false}/>
//   </>
// );

export default CustomNode;