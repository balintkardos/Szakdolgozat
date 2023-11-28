import React, { Component } from "react";
import { graphviz } from "d3-graphviz";

class Dot extends Component {
  constructor(props) {
    super(props);
    this.draw = this.draw.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.dotString !== prevProps.dotString) {
      this.draw();
    }
  }

  componentDidMount() {
    this.draw();
  }

  draw() {
    console.log("draw");
    const dotSource = this.props.dotString || "digraph{a->b}";
    graphviz(`#graph-body`).renderDot(dotSource);
  }

  render() {
    return (
      <div id="graph-body">
      </div>
    );
  }
}

export default Dot;
