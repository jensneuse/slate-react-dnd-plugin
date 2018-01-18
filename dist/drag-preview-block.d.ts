/// <reference types="react-dnd" />
/// <reference types="react" />
import * as React from "react";
import { ConnectDragSource, ConnectDragPreview } from "react-dnd";
export interface DragPreviewBlockProps {
    connectDragSource: ConnectDragSource;
    connectDragPreview: ConnectDragPreview;
    isDragging: boolean;
    renderPreview?: (props: any, connectDragPreview: ConnectDragPreview) => any;
    renderBlock: (isDragging: boolean, children: any) => any;
}
export interface DragPreviewBlockExternalProps {
    renderPreview?: (props: any, connectDragPreview: ConnectDragPreview) => React.ReactElement<any>;
    onHover: (hoverIndex: number, item: any, parent: any, change: any) => {};
    renderBlock: (isDragging: boolean, children: any) => any;
}
declare const _default: React.ComponentClass<DragPreviewBlockExternalProps>;
export default _default;
