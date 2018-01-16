import * as React from "react"

import DnDBlock,{BlockProps} from "./block"
import Container from "./container"
import {Editor} from "slate-react"

export interface Options {
    renderNodeBlock: (props: any) => React.ReactNode,
    renderNode?: (props:any) => React.Component<BlockProps,{}>
}

export interface Plugin {
    renderNode: (props: any) => React.ReactNode,
    plugins: [
        {
            renderEditor: (props: any,editor: Editor) => React.ReactNode
        }
    ]
}

export const ReactDnDPlugin = function (options: Options): Plugin {
    return {
        renderNode: (props: any) => {

            if (options.renderNode){
                return options.renderNode(props);
            }

            return <DnDBlock editor={props.editor} >{options.renderNodeBlock(props)}</DnDBlock>
        },
        plugins: [
            {
                renderEditor: (props:any,editor: Editor) => {
                    return <Container editor={editor} {...props} />
                }
            }
        ]
    }
}