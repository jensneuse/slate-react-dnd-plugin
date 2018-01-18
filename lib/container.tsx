import * as React from "react"
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import {compose} from "recompose"
import {Editor} from 'slate-react'

export interface ContainerProps {
    children: React.ReactElement<any>
}

class Container extends React.Component<ContainerProps> {
    render(){
        return React.cloneElement(this.props.children,{...this.props})
    }
}

export default compose<ContainerProps,{}>(
    DragDropContext(HTML5Backend)
)(Container)