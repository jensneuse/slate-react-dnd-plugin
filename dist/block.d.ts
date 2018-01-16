/// <reference types="react" />
import * as React from 'react';
export interface BlockProps {
    connectDragSource: (arg: any) => React.ReactElement<any>;
    connectDropTarget: (arg: any) => React.ReactElement<any>;
    isDragging: boolean;
    moveCard: () => {};
    editor: any;
    children: any;
}
declare const _default: React.ComponentClass<{}>;
export default _default;
