import React, { Component, PropTypes } from 'react'
import Comment from './Comment'
import toggleOpen from '../HOC/toggleOpen'
import linkedState from 'react-addons-linked-state-mixin'
import {loadComments} from '../actions/comments.js'
import { commentStore } from '../stores'

const CommentList = React.createClass({
    mixins: [linkedState],
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

        if (!this.state.comments.length && nextProps.isOpen) loadComments(this.props.article.id);
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

        const actionText = isOpen ? 'hide comments' : 'show comments'


        return (
            <div>
                <a href = "#" onClick = {toggleOpen}>{actionText}</a>
                <ul>{isOpen ? this.getCommentItems() : null}</ul>
                {this.getInput()}
            </div>
        )
    },
    getCommentItems(){


        if (this.state.loading) {

            return <h3>Loading {this.props.comments.length} comments...</h3>
        }

        const comments = this.state.comments
        return comments.map((comment) => <li key={comment.id}><Comment comment = {comment}/></li>)
    },

    getInput() {
        if (!this.props.isOpen) return null
        return <div>
            <input valueLink={this.linkState("comment")}/>
            <a href = "#" onClick = {this.addComment}>add comment</a>
        </div>
    },
    addComment(ev) {
        ev.preventDefault()
        this.props.addComment(this.state.comment)
        this.setState({
            comment: ''
        })
    }
})

export default toggleOpen(CommentList)