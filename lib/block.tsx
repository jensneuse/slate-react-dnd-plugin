import * as React from 'react'
import {DragSource, DropTarget, DropTargetMonitor} from 'react-dnd'
import {compose} from "recompose"
import {Block as SlateBlock} from "slate"
import {findDOMNode} from 'react-dom'

import {TARGET} from "./const"

const cardSource = {
    beginDrag(props : any, monitor : any, component : any) {
        return {key: props.children.key}
    },
    endDrag(props : any, monitor : any, component : any) {
        return {key: props.children.key}
    }
};

const getIndex = (nodes : any, val : any) : number => {

    if (!val) {
        return -1;
    }

    if (nodes && nodes.length) {
        for (let i : number = 0; i < nodes.length; i++) {

            if (nodes[i] && nodes[i].key && val == nodes[i].key) {
                return i;
            }
        }
    }

    return -1;
};

let changing : boolean = false;
//let lastHoverIndex : number;

const cardTarget = {
    hover(props : any, monitor : any, component : any) {

        if (changing || !props.children || !props.children.key) {
            return;
        }

        const hoverIndex = getIndex(props.editor.state.value.document.nodes._tail.array, props.children.key);

        if (hoverIndex === -1) {
            return;
        }

        const item = monitor.getItem();

        changing = true;

        if (!item.key && item.onHover) {

            changing = true;

            props
                .editor
                .change((change : any) => {

                    let parent = change
                        .value
                        .document
                        .getParent(props.children.key);

                    item.onHover(hoverIndex, item, parent, change);

                    changing = false;

                });

        } else {

            if (props.children.key === item.key) {
                changing = false;
                return
            }

            const dragIndex = getIndex(props.editor.state.value.document.nodes._tail.array, item.key);

            // Determine rectangle on screen
            const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

            // Get vertical middle
            //const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            // Determine mouse position
            const clientOffset = monitor.getClientOffset();

            //console.log(dragIndex,hoverIndex,hoverBoundingRect,clientOffset);

            const offset = hoverBoundingRect.height * 0.25;
            const windowTop = hoverBoundingRect.top + offset;
            const windowBottom = hoverBoundingRect.bottom - offset;

            console.log('hover',windowTop,windowBottom,offset,clientOffset.y,dragIndex,hoverIndex);

            if (clientOffset.y > windowTop && clientOffset.y < windowBottom){
                changing = false;
                return;
            }

            props
                .editor
                .change((change : any) => {

                    let parent = change
                        .value
                        .document
                        .getParent(item.key);

                    change.moveNodeByKey(item.key, parent.key, hoverIndex);

                    changing = false;

                });
        }
    }
};

export interface BlockProps {
    connectDragSource : (arg : any) => React.ReactNode,
    connectDropTarget : (arg : any) => React.ReactNode,
    isDragging : boolean,
    moveCard : () => {},
    editor : any,
    children : any,
    renderBlock : (isDragging : boolean, children : any) => React.ReactNode
}

export interface ExternalBlockProps {
    editor : any,
    renderBlock : (isDragging : boolean, children : any) => React.ReactNode
}

class Block extends React.Component < BlockProps, {} > {
    render() {
        const {connectDragSource, connectDropTarget, isDragging, children, renderBlock} = this.props;
        return connectDragSource(connectDropTarget(renderBlock(isDragging, children)));
    }
}

export default compose < BlockProps,
ExternalBlockProps > (DropTarget(TARGET, cardTarget, connect => ({
    connectDropTarget: connect.dropTarget()
})), DragSource(TARGET, cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
})))(Block)