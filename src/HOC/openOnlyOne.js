import React, {Component as ReactComponent} from 'react'

export default (Component) => {
    return class extends ReactComponent {
        state = {
            openedId: null
        };

        render() {
            return <Component {...this.props} {...this.state}
                isOpen = {this.isOpen}
                handleOpen = {this.handleOpen.bind(this)}
                />
        }

        isOpen=(id)=>id===this.state.openedId;

        handleOpen = (openedId) => (ev) => {
            if (ev) ev.preventDefault();
            this.setState({ openedId })
        }
    }
}
