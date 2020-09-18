import Draggable from "react-draggable";
import React, { PureComponent } from "react";
import "./chatElement.css";



class Chat extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      backGroundColor: "transparent",
      width: this.props.width,
      height: this.props.height,
     
    };
  }

  

  render() {
    

    const onDragWindow = () => {
      this.setState({
        backGroundColor: "transparent",
      });
    };
    const onStartWindow = () => {
      this.setState({
        backGroundColor: "transparent",
      });
    };
    const onStopWindow = () => {
      this.setState({
        backGroundColor: "transparent",
      });
    };
    const onMouseDownWindow = () => {
      this.setState({
        backGroundColor: "transparent",
      });
    };

    return (
      <Draggable
        onDrag={onDragWindow}
        onStart={onStartWindow}
        onStop={onStopWindow}
        onMouseDown={onMouseDownWindow}
      >
    
        <div
          style={{
            width: this.state.width,
            height: this.state.height,
            backgroundColor: this.state.backGroundColor,
          }}
          className="chatContainer"
        >
          {this.props.children}
        </div>
      </Draggable>
    );
  }
}

export default Chat;
