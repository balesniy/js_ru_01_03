import React, { Component, PropTypes } from 'react'

class App extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div>
                <h1>News App Name!</h1>
                {this.props.children}
            </div>
        )
    }
}

export default App