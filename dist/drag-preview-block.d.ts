/// <reference types="react-dnd" />
/// <reference types="react" />
import * as React from "react";
import { ConnectDragSource, ConnectDragPreview } from "react-dnd";
export interface DragPreviewBlockProps {
    connectDragSource: ConnectDragSource;
    connectDragPreview: ConnectDragPreview;
    isDragging: boolean;
    renderPreview?: () => React.ReactElement<any>;
}
export interface DragPreviewBlockExternalProps {
    renderPreview?: () => React.ReactElement<any>;
}
declare const _default: React.ComponentClass<DragPreviewBlockExternalProps>;
export default _default;
