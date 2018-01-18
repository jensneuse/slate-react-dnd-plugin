/// <reference types="react" />
/// <reference types="react-dnd" />
import * as React from "react";
import { DropTargetMonitor } from "react-dnd";
export interface DropBlockInternlProps {
    connectDropTarget: (arg: any) => React.ReactNode;
    canDrop(props: any, monitor: DropTargetMonitor): boolean;
    onDrop(item: any, parent: any, change: any): void;
    onHover?(props: any, monitor: DropTargetMonitor, component: React.Component<any>): Object | void;
}
export interface DropBlockExternalProps {
    canDrop(props: any, monitor: DropTargetMonitor): boolean;
    onDrop(item: any, parent: any, change: any): void;
    onHover?(props: any, monitor: DropTargetMonitor, component: React.Component<any>): Object | void;
}
declare const _default: React.ComponentClass<DropBlockExternalProps>;
export default _default;
