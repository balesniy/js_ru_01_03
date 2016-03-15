import React, {Component as ReactComponent} from 'react'

export default (Component) => {
    return class extends ReactComponent {
        state = {
            openItemId: null
        }

        render() {
            return <Component {...this.props} {...this.state}
                openItem = {this.openItem}
                isItemOpen = {this.isItemOpen}
            />
        }

        openItem = (openItemId) => (ev) => {
            if (ev) ev.preventDefault()
            this.setState({ openItemId })
        }

        isItemOpen = (id) => this.state.openItemId === id
    }
}