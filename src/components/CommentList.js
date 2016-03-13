import React, { Component, PropTypes } from 'react'
import Comment from './Comment'
import AddCommentForm from './addCommentForm'
import toggleOpen from '../HOC/toggleOpen'

const CommentList=(props)=> {
        const { isOpen, comments, toggleOpen } = props;

        const actionText = isOpen ? 'hide comments' : 'show comments';

        const commentItems = comments.map((comment) =>
            <Comment key={comment.id} comment = {comment}/>);

        return (
            <div>
                <button className="button-success pure-button" onClick = {toggleOpen}>{actionText}</button>
                {isOpen ? commentItems : null}
                <AddCommentForm/>
            </div>
        )
};


export default toggleOpen(CommentList)