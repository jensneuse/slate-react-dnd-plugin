/// <reference types="react" />
import * as React from "react";
import { Editor } from "slate-react";
import { BlockProps } from "./block";
import DragPreviewBlock from "./drag-preview-block";
import DragDropContainer from "./container";
import DropBlock from "./drop-block";
import EditorProvider from "./editor-provider";
export { DragPreviewBlock, DragDropContainer, DropBlock, EditorProvider };
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
