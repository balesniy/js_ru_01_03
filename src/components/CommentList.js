import React, { Component, PropTypes } from 'react'
import Comment from './Comment'
import toggleOpen from '../HOC/toggleOpen'
import linkedState from 'react-addons-linked-state-mixin'
import {loadComments} from '../actions/comments.js'


const CommentList = React.createClass({
    mixins: [linkedState],
    propTypes: {
        comments: PropTypes.array,
        addComment: PropTypes.func.isRequired
    },

    getInitialState() {
        return {
            comment: ''
        }
    },



    componentWillReceiveProps(nextProps){
        if (!nextProps.isOpen || this.props.loading|| this.props.isOpen) return

        const comments = this.props.article.getRelation('comments');
        if (comments.includes(undefined)) loadComments(this.props.article.id);
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

        const comments = this.props.article.getRelation('comments')
        if (comments.includes(undefined)) {

            return <h3>comments: {comments.length}</h3>
        }

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