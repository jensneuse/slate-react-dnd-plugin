/// <reference types="react" />
import * as React from "react";
import { Editor } from "slate-react";
import { BlockProps } from "./block";
import DragPreviewBlock from "./drag-preview-block";
import DragDropContainer from "./container";
import DropBlock from "./drop-block";
export { DragPreviewBlock, DragDropContainer, DropBlock };
export interface Options {
    renderNode?: (props: any) => React.Component<BlockProps, {}>;
    renderNodeFunctions?: [(props: any) => React.ReactNode];
    renderBlock: (isDragging: boolean, children: any) => React.ReactNode;
}
export interface Plugin {
    renderNode: (props: any) => React.ReactNode;
    onChange: (event: any, props: any, var3: any) => void;
    onKeyDown: (event: any, props: any) => void;
    plugins: [{
        renderEditor: (props: any, editor: Editor) => React.ReactNode;
    }];
}
export declare const ReactDnDPlugin: (options: Options) => Plugin;
export declare const inject: (plugins: [any], options: Options) => any[];
