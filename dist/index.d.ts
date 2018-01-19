/// <reference types="react" />
import * as React from "react";
import { Editor } from "slate-react";
import { BlockProps } from "./block";
export { default as DragPreviewBlock } from "./drag-preview-block";
export { default as DragDropContainer } from "./container";
export { default as DropBlock } from "./drop-block";
export { default as EditorProvider } from "./editor-provider";
export interface Options {
    renderNode?: (props: any) => React.Component<BlockProps, {}>;
    renderNodeFunctions?: [(props: any) => React.ReactNode];
    renderBlock: (isDragging: boolean, children: any) => React.ReactNode;
}
export interface Plugin {
    renderNode: (props: any) => React.ReactNode;
    plugins: [{
        renderEditor: (props: any, editor: Editor) => React.ReactNode;
    }];
}
export declare const ReactDnDPlugin: (options: Options) => Plugin;
export declare const inject: (plugins: [any], options: Options) => any[];
