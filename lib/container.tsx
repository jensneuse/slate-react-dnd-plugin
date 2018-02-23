import * as React from "react"
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import {compose} from "recompose"
import {Editor} from 'slate-react'
import * as PropTypes from "prop-types"

export interface ContainerProps {
    children: React.ReactElement<any>
}

export interface ContainerState {
    editor: any
}

export class Container extends React.Component<ContainerProps,ContainerState> {

    state = {
        editor: null
    }

    static childContextTypes = {
        setEditor: PropTypes.func,
        getEditor: PropTypes.func
    }

    getChildContext(){

        const that = this;

        return {
            getEditor: () => {
                return that.state.editor;
            },
            setEditor: (editor: any) => {
                that.setState({editor});
            }
        }
    }

    render(){
        return this.props.children;
    }
}

export default compose<ContainerProps,{}>(
    DragDropContext(HTML5Backend)
)(Container)
