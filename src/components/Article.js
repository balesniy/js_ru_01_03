import React, { Component, PropTypes } from 'react'
import {findDOMNode} from 'react-dom'
import CommentList from './CommentList'
import { deleteArticle, loadArticleById } from '../actions/articles'
import { addComment } from '../actions/comments'

class Article extends Component {
    static propTypes = {
        isOpen: PropTypes.bool,
        article: PropTypes.object.isRequired
    }

    componentWillReceiveProps(nextProps) {
        const { article, isOpen } = nextProps
        if (article.loaded || article.loading) return

        if (isOpen && !this.props.isOpen) loadArticleById({id: article.id})
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
        if (article.loading) return <h3>Loading article</h3>
        return (
            <div>
                <p>{article.text}</p>
                {this.getCommentList()}
            </div>
        )
    }

    getCommentList() {
        const { article } = this.props
        const comments = article.getRelation('comments')
        if (comments.includes(undefined)) return <h3>comments: {comments.length}</h3>
        return  <CommentList ref= "comments"
                             comments = {comments}
                             addComment = {this.addComment}/>

    }

    addComment = (comment) => {
        addComment(comment, this.props.article.id)
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