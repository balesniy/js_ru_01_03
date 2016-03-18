import React, { Component, PropTypes } from 'react'
import Comment from './Comment'
import toggleOpen from '../HOC/toggleOpen'
import linkedState from 'react-addons-linked-state-mixin'

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
    render() {
        const { isOpen, comments, toggleOpen } = this.props
        const actionText = isOpen ? 'hide comments' : 'show comments'

        const commentItems = comments.map((comment) => <li key={comment.id}><Comment comment = {comment}/></li>)
        return (
            <div>
                <a href = "#" onClick = {toggleOpen}>{actionText}</a>
                <ul>{isOpen ? commentItems : null}</ul>
                {this.getInput()}
            </div>
        )
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