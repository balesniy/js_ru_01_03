import React, { Component, PropTypes } from 'react'
import Comment from './Comment'
import AddCommentForm from './addCommentForm.js'
import toggleOpen from '../HOC/toggleOpen'
import {loadComments} from '../actions/comments.js'
import { commentStore } from '../stores'

const CommentList = React.createClass({

    propTypes: {
        comments: PropTypes.array,
        addComment: PropTypes.func.isRequired
    },

    getInitialState() {
        return {
            comment: '',
            loading:false,
            comments: commentStore.getAllById(this.props.comments)
        }
    },


    componentWillReceiveProps(nextProps){
        if (this.state.loading) return

        const { article } = this.props
        const commentsText = article.getRelation('comments')

        if (commentsText.includes(undefined) && nextProps.isOpen) loadComments(article.id);
    },

    componentDidMount() {
        commentStore.addChangeListener(this.commentsChanged)
    },

    componentWillUnmount() {
        commentStore.removeChangeListener(this.commentsChanged)
    },


    commentsChanged ()  {

        this.setState({
            comments: commentStore.getByArticleId(this.props.article.id),
            loading: commentStore.loading
        })
    },


    render() {
        const { isOpen,toggleOpen } = this.props

        const actionText = isOpen ? 'hide comments' : 'show comments';


        return (
            <div>
                <a href = "#" onClick = {toggleOpen}>{actionText}</a>
                <ul>{isOpen ? this.getCommentItems() : null}</ul>

                <AddCommentForm submit={this.props.addComment}/>
            </div>
        )
    },

    getCommentItems(){


        if (this.state.loading) {

            return <h3>Loading {this.props.comments.length} comments...</h3>
        }

        const comments = this.state.comments;
        return comments.map((comment) => <li key={comment.id}><Comment comment = {comment}/></li>)
    }
});

export default toggleOpen(CommentList)