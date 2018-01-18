import * as React from "react"
import * as PropTypes from 'prop-types';

export interface EditorProviderProps {}
export interface EditorProviderState {
    editor: any
}

class EditorProvider extends React.Component<EditorProviderProps,EditorProviderState> {

    state = {
        editor: null
    }

    static childContextTypes = {
        setEditor: PropTypes.func,
        getEditor: PropTypes.func
    }

    getChildContext(){

        const that = this;

        return {
            getEditor: () => {
                return that.state.editor;
            },
            setEditor: (editor: any) => {
                that.setState({editor});
            }
        }
    }

    render(){
        return <div>{this.props.children}</div>;
    }
}

export default EditorProvider;