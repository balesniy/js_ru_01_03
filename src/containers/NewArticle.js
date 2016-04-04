import React, { Component, PropTypes } from 'react'

class NewArticle extends Component {
    static contextTypes = {
        user:PropTypes.string,
        router:PropTypes.object

    };

    componentWillMount(){

        if (!this.context.user) this.context.router.replace("/articles")

    }

    render() {
        return (
            <div>
                <h2>New Article Page</h2>
            </div>
        )
    }
}

export default NewArticle