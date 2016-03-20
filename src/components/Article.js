import React, { Component, PropTypes } from 'react'
import Body from './Body.js'
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
        const { article, isOpen, openArticle, article:{comments,title} } = this.props
        return (
            <div ref="container">
                <a href = "#" onClick = {this.handleDelete}>delete</a>

                <h3 onClick={openArticle}>{title}</h3>

                <Body article={article}
                      isOpen={isOpen}
                      comments={comments}
                      addComment = {this.addComment}/>
            </div>
        )
    }

    handleDelete = (ev) => {
        ev.preventDefault()
        deleteArticle(this.props.article.id)
    }

    addComment = (comment) => {
        addComment(comment, this.props.article.id)
    }

}

export default Article