import React, { Component, PropTypes } from 'react'
import {findDOMNode} from 'react-dom'
import CommentList from './CommentList'
import { deleteArticle, loadArticleById } from '../actions/articles'
import { addComment } from '../actions/comments'
import { commentStore } from '../stores'

class Article extends Component {

    constructor(){
        super()
        this.state = {
            comments: commentStore.getAll(),
            loading: commentStore.loading
        }
    }

    static propTypes = {
        isOpen: PropTypes.bool,
        article: PropTypes.object.isRequired

    }

    componentWillReceiveProps(nextProps) {
        const { article, isOpen } = nextProps
        if (article.loaded || article.loading) return

        if (isOpen && !this.props.isOpen) loadArticleById({id: article.id})
    }

    componentDidMount() {
        commentStore.addChangeListener(this.commentsChanged)
    }

    componentWillUnmount() {
        commentStore.removeChangeListener(this.commentsChanged)
    }


    commentsChanged =()=>  {
        this.setState({
            comments: commentStore.getAll(),
            loading: commentStore.loading
        })
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
        const { article,comments } = this.props
        //const comments = article.getRelation('comments')
        //if (comments.includes(undefined)) return <h3>comments: {comments.length}</h3>
        return  <CommentList ref= "comments"
                             article={article}
                             loading={this.state.loading}
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