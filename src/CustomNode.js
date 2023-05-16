import React from 'react';
import { Handle, Position} from 'react-flow-renderer';

const CustomNode = ({ data }) => {
  const { id, alt, icon } = data;

  return (
    <div className="nodetype">
      <Handle id="target" type="target" position={Position.Left} isConnectableStart={false} />
      <img src={icon} alt="Datatable" />
      <Handle id = "source" type="source" position={Position.Right} isConnectableStart={true} />
    </div>
  );
};


export default CustomNode;