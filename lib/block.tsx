import * as React from 'react'
import {DragSource, DropTarget, DropTargetMonitor} from 'react-dnd'
import {compose} from "recompose"
import {TARGET} from "./const"
import {Block as SlateBlock} from "slate"

const style = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move'
};

const cardSource = {
    beginDrag(props : any, monitor : any, component : any) {
        console.log('beginDrag', props);
        return {key: props.children.key}
    },
    endDrag(props : any, monitor : any, component : any){
        console.log('endDrag', props);
        return {
            key: props.children.key
        }
    }
};

const getIndex = (nodes : any, val : any) : number => {

    for (let i : number = 0; i < nodes.length; i++) {

        if (val == nodes[i].key) {
            return i;
        }
    }

    return -1;
};

let changing : boolean = false;
//let lastHoverIndex : number;

const cardTarget = {
    canDrop(){
        return true;
    },
    drop(props : any, monitor : any, component : any){
        console.log('drop',props,monitor,component);
    },
    hover(props : any, monitor : any, component : any) {

        if (changing) {
            return;
        }

        const hoverIndex = getIndex(props.editor.state.value.document.nodes._tail.array, props.children.key);

        //console.log('hoverIndex', hoverIndex);

        if (hoverIndex === -1) {
            console.log('hoverIndex === -1');
            return;
        }

        const item = monitor.getItem();

        changing = true;

        if (!item.key) {

            changing = true;

            props
                .editor
                .change((change : any) => {

                    let parent = change
                        .value
                        .document
                        .getParent(props.children.key);

                    console.log('insert', parent, hoverIndex);

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
                    changing = false;

                    return item;

                });

        } else {

            if (props.children.key === item.key){
                changing = false;
                return
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
    children : any
}

class Block extends React.Component < BlockProps, {} > {
    render() {
        const {connectDragSource, connectDropTarget, isDragging, children} = this.props;
        const opacity = isDragging
            ? 0
            : 1;
        return connectDragSource(connectDropTarget(
            <div style={{
                ...style,
                opacity
            }}>{children}</div>
        ));
    }
}

export default compose < BlockProps, {editor: any} > (DropTarget(TARGET, cardTarget, connect => ({
    connectDropTarget: connect.dropTarget()
})), DragSource(TARGET, cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
})))(Block)