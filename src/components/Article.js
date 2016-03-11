import React, { Component, PropTypes } from 'react'
import {findDOMNode} from 'react-dom'
import CommentList from './CommentList'

class Article extends Component {
    static propTypes = {
        isOpen: PropTypes.bool,
        article: PropTypes.object.isRequired
    }


    componentWillMount() {
        console.log('---', 'going to mount');
    }

    componentDidMount() {
        console.log('---', 'mounted to: ', this.refs.container);
    }

    componentDidUpdate() {
        console.log('---', 'comments', findDOMNode(this.refs.comments));
    }

    render() {
        return (
            <div ref="container">
                <a href = "#" onClick = {this.props.openArticle}>select???</a>
                {this.getTitle()}
                {this.getBody()}
            </div>
        )
    }

    getBody() {
        const { article, isOpen } = this.props
        if (!isOpen) return <noscript />
        return (
            <div>
                <p>{article.text}</p>
                <CommentList ref= "comments" comments = {article.comments || []} />
            </div>
        )
    }
    getTitle() {
        const { article: { title }, openArticle  } = this.props
        return  (
            <h3 onClick={openArticle}>
                {title}
            </h3>
        )
    }
}

export default Article