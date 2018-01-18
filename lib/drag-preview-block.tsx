import * as React from "react"
import {DragSource,ConnectDragSource,ConnectDragPreview} from "react-dnd"
import {compose} from "recompose"

import {TARGET} from "./const"

export interface DragPreviewBlockProps {
    connectDragSource: ConnectDragSource,
    connectDragPreview: ConnectDragPreview,
    isDragging: boolean,
    renderPreview?: (props:any,connectDragPreview: ConnectDragPreview) => any,
    renderBlock: (isDragging: boolean,children:any) => any
}

export interface DragPreviewBlockExternalProps {
    renderPreview?: (props:any,connectDragPreview: ConnectDragPreview) => React.ReactElement<any>,
    onHover: (hoverIndex: number,item:any,parent:any, change:any) => {},
    renderBlock: (isDragging: boolean,children:any) => any
}

interface DragPreviewBlockState {}

const DragPreviewBlockSource = {
    beginDrag(props:DragPreviewBlockExternalProps,monitor:any,component:any){
        return {
            onHover: props.onHover
        }
    },
    endDrag(props : any, monitor : any, component : any){
        return {
            key: props.children.key
        }
    }
}

class DragPreviewBlock extends React.Component<DragPreviewBlockProps,DragPreviewBlockState> {

    componentDidMount() {
		if (this.props.renderPreview){
            this.props.renderPreview(this.props,this.props.connectDragPreview);
        }
	}

    render(){
        const { isDragging, connectDragSource, children } = this.props
        const opacity = isDragging ? 0.4 : 1
        
        return connectDragSource(this.props.renderBlock(isDragging,children));
    }
}

export default compose<DragPreviewBlockProps,DragPreviewBlockExternalProps>(
    DragSource(TARGET,DragPreviewBlockSource,(connect,monitor) => ({
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging(),
})))(DragPreviewBlock)