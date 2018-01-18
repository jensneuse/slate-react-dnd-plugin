import * as React from "react"
import { compose } from "recompose"
import { DropTarget, DropTargetMonitor } from "react-dnd"
import * as PropTypes from "prop-types"
import { TARGET } from "./const"

export interface DropBlockInternlProps {
    connectDropTarget: (arg: any) => React.ReactNode,
    canDrop(props: any, monitor: DropTargetMonitor): boolean,
    onDrop(item:any, parent:any, change: any):void,
    onHover?(props: any, monitor: DropTargetMonitor, component: React.Component<any>): Object | void
}
export interface DropBlockExternalProps {
    canDrop(props: any, monitor: DropTargetMonitor): boolean,
    onDrop(item:any, parent:any, change: any):void,
    onHover?(props: any, monitor: DropTargetMonitor, component: React.Component<any>): Object | void
}

const target = {
    hover(props: any, monitor: DropTargetMonitor, component: React.Component<any>): Object | void {
        if (props.onHover){
            return props.onHover(props,monitor,component);
        }
    },
    drop(props: any, monitor: DropTargetMonitor, component: React.Component<any>): Object | void {

        const item: any = monitor.getItem();

        component
            .context
            .getEditor()
            .change((change: any) => {

                let parent = change
                    .value
                    .document
                    .getParent(item.key);

                props.onDrop(item, parent, change);

            });

        return;
    },
    canDrop(props: DropBlockInternlProps, monitor: DropTargetMonitor): boolean {
        return props.canDrop(props, monitor);
    }
};

class DropBlock extends React.Component<DropBlockInternlProps & DropBlockExternalProps> {

    static contextTypes = {
        getEditor: PropTypes.func
    }

    render() {
        return this.props.connectDropTarget(this.props.children);
    }
}

export default compose<DropBlockInternlProps, DropBlockExternalProps>(
    DropTarget(TARGET, target, connect => ({
        connectDropTarget: connect.dropTarget()
    })))(DropBlock);