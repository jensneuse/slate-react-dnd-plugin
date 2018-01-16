import * as React from "react"
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import {compose} from "recompose"
import {Editor} from 'slate-react'

export interface ContainerProps {
    editor: Editor
}

class Container extends React.Component {
    render(){
        return this.props.children;
    }
}

export default compose<{},{}>(
    DragDropContext(HTML5Backend)
)(Container)