import React, { Component, PropTypes } from 'react'
import {findDOMNode} from 'react-dom'
import CommentList from './CommentList'
import { deleteArticle } from '../actions/articles'

class Article extends Component {
    static propTypes = {
        isOpen: PropTypes.bool,
        article: PropTypes.object.isRequired
    }

    render() {
        return (
            <div ref="container">
                <a href = "#" onClick = {this.handleDelete}>delete</a>
                {this.getTitle()}
                {this.getBody()}
            </div>
        )
    }

    handleDelete = (ev) => {
        ev.preventDefault()
        deleteArticle(this.props.article.id)
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