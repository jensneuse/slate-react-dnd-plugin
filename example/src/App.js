import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import StoryEditor from "./StoryEditor"
import DragPreviewBlock from "../../dist/drag-preview-block"
import DragDropContainer from "../../dist/container"

class DragNode extends Component {
  render() {
    return this.props.children;
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <DragDropContainer>
          <div className="wrapper">
            <div className="editor">
              <StoryEditor/>
            </div>
            <div className="rightMenu">
              <DragPreviewBlock className="rightMenu">
                <DragNode name="dragNode" >
                  <div className="dragItem"/>
                </DragNode>
              </DragPreviewBlock>
            </div>
          </div>
        </DragDropContainer>
      </div>
    );
  }
}

export default App;
