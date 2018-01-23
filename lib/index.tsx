import * as React from "react"
import * as PropTypes from "prop-types"
import { Editor } from "slate-react"

import DnDBlock, { BlockProps } from "./block"
import Container from "./container"

import DragPreviewBlock from "./drag-preview-block"
import DragDropContainer from "./container"
import DropBlock from "./drop-block"
import { DropTargetMonitor, DragSourceMonitor } from "react-dnd";

export {
    DragPreviewBlock,
    DragDropContainer,
    DropBlock,
}

/* export interface Events {
    onDrop?(props: any, monitor?: DropTargetMonitor, component?: React.Component<any>): Object|void;
    onHover?(props: any, monitor?: DropTargetMonitor, component?: React.Component<any>): void;
    onBeginDrag?(props: any, monitor?: DragSourceMonitor, component?: React.Component<any>): Object;
    onEndDrag?(props: any, monitor?: DragSourceMonitor, component?: React.Component<any>): void;
} */

export interface Options {
    renderNode?: (props: any) => React.Component<BlockProps, {}>,
    renderNodeFunctions?: [(props:any) => React.ReactNode],
    renderBlock: (isDragging:boolean,children: any) => React.ReactNode,
}

export interface Plugin {
    renderNode: (props: any) => React.ReactNode
    plugins: [
        {
            renderEditor: (props: any, editor: Editor) => React.ReactNode
        }
    ]
}

interface EditorSetterProps {
    editor: any
}

interface EditorSetterState {}

class DnDProvider extends React.Component<EditorSetterProps,EditorSetterState> {

    static contextTypes = {
        setEditor: PropTypes.func
    }

    componentDidMount(){
        this.context.setEditor(this.props.editor);
    }

    render(){
        return this.props.children;
    }
}

export const ReactDnDPlugin = function (options: Options): Plugin {
    return {
        renderNode: (props: any) => {

            if (options.renderNode) {
                return options.renderNode(props);
            }
            
            if (options.renderNodeFunctions && options.renderNodeFunctions.length){
                for (var i=0;i<options.renderNodeFunctions.length;i++){
                    let rendered = options.renderNodeFunctions[i](props);
                    if (rendered){
                        return <DnDBlock renderBlock={options.renderBlock} editor={props.editor} >{rendered}</DnDBlock>
                    }
                }
            }
            
            console.log('renderNode fn missing for type: ',props.node.type);
        },
        plugins: [
            {
                renderEditor: (props: any, editor: Editor) => {
                    return <DnDProvider editor={editor}>{props.children}</DnDProvider>;
                }
            }
        ]
    }
}

export const inject = (plugins: [any],options: Options) => {

    const appendRenderNodeFuntion = (fn: any) => {
        if (!options.renderNodeFunctions){
            options.renderNodeFunctions = [fn];
        } else {
            options.renderNodeFunctions[options.renderNodeFunctions.length +1] = fn
        }
    }

    for (var i=0;i<plugins.length;i++){
        if (plugins[i].renderNode){

            appendRenderNodeFuntion(plugins[i].renderNode);

            if (plugins[i].plugins){
                for (var k=0;k<plugins[i].plugins.length;k++){
                    appendRenderNodeFuntion(plugins[i].renderNode);
                }
            }
        }
    }

    const dndPlugin = ReactDnDPlugin(options);

    return [dndPlugin,...dndPlugin.plugins,...plugins]
}