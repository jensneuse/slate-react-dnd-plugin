import * as React from 'react'
import { DragSource, DropTarget } from 'react-dnd'
import {compose} from "recompose"

const TARGET: string = 'DND_BLOCK';

const style = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move',
};

const cardSource = {
    beginDrag() {
        return {
        }
    },
};

const getIndex = (nodes: any,val:any):number => {

    for (let i:number = 0;i<nodes.length;i++){

        if (val == nodes[i].key){
            return i;
        }
    }

    return -1;
};

let changing: boolean = false;
let lastHoverIndex: number;
let lastKey: any;

const cardTarget = {
    hover(props: any, monitor: any, component: any) {

        if (changing){
            return;
        }

        if (lastKey === props.children.key){
            return;
        }

        lastKey = props.children.key;

        const hoverIndex = getIndex(props.editor.state.value.document.nodes._tail.array,props.children.key);

        if (hoverIndex === -1){
            return;
        }

        if (lastHoverIndex === hoverIndex){
            return;
        }

        lastHoverIndex = hoverIndex;

        const dragIndex = monitor.getItem().index;

        if (dragIndex !== hoverIndex){
            changing = true;

            props.editor.change((change: any) => {

                change.value.blocks.some((block: any) => {

                    let parent = change.value.document.getParent(block.key);

                    change.moveNodeByKey(block.key, parent.key, hoverIndex);
                    changing = false;
                });
            });
        }
    },
};

export interface BlockProps {
    connectDragSource: (arg: any) => React.ReactElement<any>,
    connectDropTarget: (arg: any) => React.ReactElement<any>,
    isDragging: boolean,
    moveCard: ()=>{},
    editor: any,
    children:any,
}

class Block extends React.Component<BlockProps,{}> {
    render(){
        const {connectDragSource,connectDropTarget,isDragging,children} = this.props;
        const opacity = isDragging ? 0 : 1;
        return connectDragSource(connectDropTarget(<div style={{...style,opacity}}>{children}</div>));
    }
}

export default compose<BlockProps,{}>(
    DropTarget(TARGET, cardTarget, connect => ({
        connectDropTarget: connect.dropTarget(),
    })),
    DragSource(TARGET, cardSource, (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }))
)(Block)