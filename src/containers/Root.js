import React, { Component, PropTypes } from 'react'
import Counter from './Counter'
import { Provider } from 'react-redux'

class Root extends Component {
    static propTypes = {
        store: PropTypes.object
    };

    render() {
        return (
            <Provider store={this.props.store}>
                <Counter />
            </Provider>
        )
    }
}

export default Root