# slate-react-dnd-plugin

Add react-dnd to slatejs.

## TOS

- [Installation](#installation)
- [Usage](#usage)

## Installation 

```sh
npm install slate-react-dnd-plugin --save
yarn add slate-react-dnd-plugin
bower install slate-react-dnd-plugin --save
```

## Usage

```ts
import * as React from 'react'
import {Editor} from 'slate-react'
import {Value} from 'slate'

import {inject} from "slate-react-dnd-plugin"
//import {inject} from "../../dist/index"

const initialValue = Value.fromJSON({
    document: {
        nodes: [
            {
                object: 'block',
                type: 'paragraph',
                nodes: [
                    {
                        object: 'text',
                        leaves: [
                            {
                                text: 'A line of text in a paragraph.'
                            }
                        ]
                    }
                ]
            }
        ]
    }
});

class ParagraphNode extends React.Component {
    render(){
        return (<p {...this.props.attributes} >{this.props.children}</p>)
    }
}

const blockStyle = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move'
};

const plugins = inject([
    {
        renderNode: (props) => {
            switch (props.node.type) {
                case 'paragraph':
                    return <ParagraphNode {...props} />;
                default:
                    return null;
            }
        }
    }
],{
    renderBlock: (isDragging,children) => {

        const opacity = isDragging? 0 : 1;

        return <div style={{
            ...blockStyle,
            opacity
        }}>{children}</div>
    }
});

class StoryEditor extends React.Component {

    state = {
        value: initialValue
    };

    onChange({value}){
        this.setState({value})
    }

    render(){
        return (
            <Editor
                value={this.state.value}
                plugins={plugins}
                onChange={this.onChange.bind(this)}/>
        )
    }
}

export default StoryEditor;
```

```ts
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import StoryEditor from "./StoryEditor"

import {DragPreviewBlock} from "slate-react-dnd-plugin"
import {DragDropContainer} from "slate-react-dnd-plugin"
import {DropBlock} from "slate-react-dnd-plugin"
import {EditorProvider} from "slate-react-dnd-plugin"

/*import DragPreviewBlock from "../../dist/drag-preview-block"
import DragDropContainer from "../../dist/container"
import DropBlock from "../../dist/drop-block"
import EdititorProvider from "../../dist/editor-provider"*/

const insertBlockFn = (hoverIndex, item, parent, change) => {

  const result = change.insertNodeByKey(parent.key, hoverIndex, {
    object: 'block',
    type: 'paragraph',
    nodes: [
      {
        object: 'text',
        leaves: [
          {
            text: 'A new Block via drag&drop'
          }
        ]
      }
    ]
  });

  item.key = result.value.document.nodes._tail.array[hoverIndex].key;

}

const canDrop = (props, monitor) => {
  return true;
}

const onDrop = (item, parent, change) => {
  console.log('onDrop', item, parent, change);
  change.removeNodeByKey(item.key);
};

const previewBlockStyle = {
	backgroundColor: 'white',
	cursor: 'move',
}

const renderPreviewBlock = (isDragging,children) => {
  const opacity = isDragging ? 0.4 : 1
  return <div style={{ ...previewBlockStyle, opacity }}>{children}</div>
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <DragDropContainer>
          <EditorProvider>
            <div className="wrapper">
              <div className="editor">
                <StoryEditor/>
              </div>
              <div className="rightMenu">
                <DragPreviewBlock className="rightMenu" onHover={insertBlockFn} renderBlock={renderPreviewBlock} >
                  <div className="dragItem">
                    <p>Insert paragraph from here.</p>
                  </div>
                </DragPreviewBlock>
                <DropBlock canDrop={canDrop} onDrop={onDrop}>
                  <div className="dustbin">
                    <p>Drop paragraph here to delete it.</p>
                  </div>
                </DropBlock>
              </div>
            </div>
          </EditorProvider>
        </DragDropContainer>
      </div>
    );
  }
}

export default App;
```
