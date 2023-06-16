import React from 'react';

const CustomEdge = ({ edge, onClick }) => {
  const { id, source, target } = edge;
  const lineId = `line-${id}`;
  const buttonId = `button-${id}`;

  // Calculate the middle point between source and target nodes
  const middleX = (source.x + target.x) / 2;
  const middleY = (source.y + target.y) / 2;

  return (
    <>
      <line id={lineId} /* other line properties */ />
      <circle id={buttonId} className="custom-edge-button" cx={middleX} cy={middleY} onClick={() => onClick(edge)} />
    </>
  );
};

export default CustomEdge;
