/// <reference types="react" />
import * as React from "react";
import { Editor } from "slate-react";
export interface Options {
    renderNodeBlock: (props: any) => React.ReactElement<any>;
}
export interface Plugin {
    renderNode: (props: any) => React.ReactElement<any>;
    plugins: [{
        renderEditor: (props: any, editor: Editor) => React.ReactElement<any>;
    }];
}
export declare const ReactDnDPlugin: (options: Options) => Plugin;
