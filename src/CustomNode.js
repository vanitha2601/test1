import React from 'react';
import { Handle } from 'react-flow-renderer';

const CustomNode = ({ data }) => {
  const { label, icon } = data;
  return (
    <div  className="dndnode input" >
      {icon}
      <div>{label}</div>
    </div>
  );
};

export default CustomNode;
