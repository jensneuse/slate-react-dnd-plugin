/// <reference types="react" />
import * as React from "react";
import { BlockProps } from "./block";
import { Editor } from "slate-react";
export interface Options {
    renderNodeBlock: (props: any) => React.ReactNode;
    renderNode?: (props: any) => React.Component<BlockProps, {}>;
}
export interface Plugin {
    renderNode: (props: any) => React.ReactNode;
    plugins: [{
        renderEditor: (props: any, editor: Editor) => React.ReactNode;
    }];
}
export declare const ReactDnDPlugin: (options: Options) => Plugin;
