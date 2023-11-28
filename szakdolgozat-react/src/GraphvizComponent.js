import React, { Component } from "react";
import { graphviz } from "d3-graphviz";

class Dot extends Component {
  constructor(props) {
    super(props);
    this.draw = this.draw.bind(this);
  }

  componentDidMount() {
    this.draw();
  }

  componentDidUpdate(prevProps) {
    // Check if the dotSource prop has changed
    console.log("update");
      this.draw();
    
  }

  draw() {
    console.log("draw");
    // Use the updated dotSource pro
    const dotSource = this.props.dotSource || "digraph{a->b}";
    graphviz(`#graph-body`).renderDot(dotSource);
  }

  render() {
    return (
      <div id="graph-body">
        {/* Render any additional content or components here */}
      </div>
    );
  }
}

export default Dot;
