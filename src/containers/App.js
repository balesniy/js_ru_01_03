import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

class App extends Component {


    render() {
        return (
            <div>
                <h1>News App Name!</h1>
                <Link to="/articles">Articles</Link>
                <Link to="/comments/0">Comments</Link>

                {this.props.children}
            </div>
        )
    }
}

export default App