import * as React from "react"
import {DragSource,ConnectDragSource,ConnectDragPreview} from "react-dnd"
import {compose} from "recompose"

import {TARGET} from "./const"

const style = {
	backgroundColor: 'white',
	cursor: 'move',
}

export interface DragPreviewBlockProps {
    connectDragSource: ConnectDragSource,
    connectDragPreview: ConnectDragPreview,
    isDragging: boolean,
    renderPreview?: () => React.ReactElement<any>
}

export interface DragPreviewBlockExternalProps {
    renderPreview?: () => React.ReactElement<any>
}

interface DragPreviewBlockState {}

const DragPreviewBlockSource = {
    beginDrag(props:any,monitor:any,component:any){
        return {}
    },
    endDrag(props : any, monitor : any, component : any){
        console.log('endDragPreview', props);
        return {
            key: props.children.key
        }
    }
}

class DragPreviewBlock extends React.Component<DragPreviewBlockProps,DragPreviewBlockState> {

    componentDidMount(){
        if (this.props.renderPreview){
            this.props.connectDragPreview(this.props.renderPreview());
        }
    }

    render(){
        const { isDragging, connectDragSource, children } = this.props
		const opacity = isDragging ? 0.4 : 1

		return connectDragSource(
			<div style={{ ...style, opacity }}>{children}</div>,
		)
    }
}

export default compose<DragPreviewBlockProps,DragPreviewBlockExternalProps>(
    DragSource(TARGET,DragPreviewBlockSource,(connect,monitor) => ({
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging(),
})))(DragPreviewBlock)