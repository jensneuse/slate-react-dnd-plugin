/// <reference types="react" />
import * as React from 'react';
export interface BlockProps {
    connectDragSource: (arg: any) => React.ReactNode;
    connectDropTarget: (arg: any) => React.ReactNode;
    isDragging: boolean;
    moveCard: () => {};
    editor: any;
    children: any;
    renderBlock: (isDragging: boolean, children: any) => React.ReactNode;
}
export interface ExternalBlockProps {
    editor: any;
    renderBlock: (isDragging: boolean, children: any) => React.ReactNode;
}
declare const _default: React.ComponentClass<ExternalBlockProps>;
export default _default;
