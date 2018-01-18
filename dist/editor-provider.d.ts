/// <reference types="react" />
import * as React from "react";
import * as PropTypes from 'prop-types';
export interface EditorProviderProps {
}
export interface EditorProviderState {
    editor: any;
}
declare class EditorProvider extends React.Component<EditorProviderProps, EditorProviderState> {
    state: {
        editor: null;
    };
    static childContextTypes: {
        setEditor: PropTypes.Requireable<any>;
        getEditor: PropTypes.Requireable<any>;
    };
    getChildContext(): {
        getEditor: () => null;
        setEditor: (editor: any) => void;
    };
    render(): JSX.Element;
}
export default EditorProvider;
