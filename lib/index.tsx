import * as React from "react"

import DnDBlock from "./block"
import Container from "./container"
import {Editor} from "slate-react"

export interface Options {
    renderNodeBlock: (props: any) => React.ReactElement<any>
}

export interface Plugin {
    renderNode: (props: any) => React.ReactElement<any>,
    plugins: [
        {
            renderEditor: (props: any,editor: Editor) => React.ReactElement<any>
        }
    ]
}

export const ReactDnDPlugin = function (options: Options): Plugin {
    return {
        renderNode: (props: any) => {
            return <DnDBlock >{options.renderNodeBlock(props)}</DnDBlock>
        },
        plugins: [
            {
                renderEditor: (props:any,editor:Editor) => {
                    return <Container {...props} editor={editor} />
                }
            }
        ]
    }
}