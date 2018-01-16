/// <reference types="react" />
import * as React from 'react';
export interface BlockProps {
    connectDragSource: (arg: any) => React.ReactNode;
    connectDropTarget: (arg: any) => React.ReactNode;
    isDragging: boolean;
    moveCard: () => {};
    editor: any;
    children: any;
}
declare const _default: React.ComponentClass<{
    editor: any;
}>;
export default _default;
