import React from 'react';

class Draggable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDragging: false,
      originalX: 0,
      originalY: 0,
      translateX: 0,
      translateY: 0,
    };
  }

  handleMouseDown = (event) => {
    const { clientX, clientY } = event;
    this.setState({
      originalX: clientX,
      originalY: clientY,
      isDragging: true,
    });
  };

  handleMouseMove = (event) => {
    if (this.state.isDragging) {
      const { clientX, clientY } = event;
      const { originalX, originalY } = this.state;
      const translateX = clientX - originalX;
      const translateY = clientY - originalY;
      this.setState({ translateX, translateY });
    }
  };

  handleMouseUp = () => {
    this.setState({ isDragging: false, originalX: 0, originalY: 0 });
  };

  render() {
    const { children } = this.props;
    const { translateX, translateY, isDragging } = this.state;

    return (
      <div
        style={{
          position: 'relative',
          transform: `translate(${translateX}px, ${translateY}px)`,
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        onMouseLeave={this.handleMouseUp}
      >
        {children}
      </div>
    );
  }
}

export default Draggable;
