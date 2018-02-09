import * as React from 'react'
import {DragSource, DropTarget, DropTargetMonitor} from 'react-dnd'
import {compose} from "recompose"
import {Block as SlateBlock} from "slate"
import {findDOMNode} from 'react-dom'

import {TARGET} from "./const"

const dragSource = {
    beginDrag(props : any, monitor : any, component : any) {
        return {key: props.children.key}
    },
    endDrag(props : any, monitor : any, component : any) {
        return {key: props.children.key}
    },
    canDrag(props : any, monitor : any){
        const template = props.children.type.PLUGIN_DEFAULT_TEMPLATE;
        const draggable = template.draggable;
        const removable = template.removable;
        return !(draggable === false || removable === false);
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

const dragTarget = {
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

            const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
            const clientOffset = monitor.getClientOffset();
            const middle = hoverBoundingRect.bottom - (hoverBoundingRect.height / 2);
            const mouseY = clientOffset.y;

            // if moving upwards and mouse position > 1/2 * height -> return ||
            // if moving downwards and mouse position < 1/2 * height -> return
            // this prevents large blocks from 'hopping' up and down
            if (dragIndex > hoverIndex && mouseY > middle || dragIndex < hoverIndex && mouseY < middle){
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
ExternalBlockProps > (DropTarget(TARGET, dragTarget, connect => ({
    connectDropTarget: connect.dropTarget()
})), DragSource(TARGET, dragSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
})))(Block)
