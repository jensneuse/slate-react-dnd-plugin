import * as React from "react"

import DnDBlock, { BlockProps } from "./block"
import Container from "./container"
import { Editor } from "slate-react"

export interface Options {
    //renderNodeBlock: (props: any) => React.ReactNode,
    renderNode?: (props: any) => React.Component<BlockProps, {}>,
    renderNodeFunctions?: [(props:any) => React.ReactNode]
}

export interface Plugin {
    renderNode: (props: any) => React.ReactNode,
    /*plugins: [
        {
            renderEditor: (props: any, editor: Editor) => React.ReactNode
        }
    ]*/
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
                        return <DnDBlock editor={props.editor} >{rendered}</DnDBlock>
                    }
                }
            }

            console.log('renderNode fn missing for type: ',props.node.type);
        }/*,
        plugins: [
            {
                renderEditor: (props: any, editor: Editor) => {
                    return (<Container editor={editor} {...props} />)
                }
            }
        ]*/
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

    return [dndPlugin,...plugins]
}