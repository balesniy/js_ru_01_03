import React from 'react'
import Comment from './Comment'
import AddCommentForm from './addCommentForm.js'
import toggleOpen from '../HOC/toggleOpen'
import {loadComments} from '../actions/comments.js'

const CommentList = (props)=> {

    const { isOpen, toggleOpen, article, article: {comments,id} } = props;
    const actionText = isOpen ? 'hide comments' : 'show comments';

        const handleOpen=()=>{
            if(!comments.loading && !comments.loaded) loadComments(id);
            toggleOpen()
        };

        const getCommentItems=()=>{

            if (comments.loading) {

                return <h3>Loading {comments.length} comments...</h3>
            }

            return article.getRelation('comments').map((comment) =>
                <li key={comment.id}>
                    <Comment comment = {comment}/>
                </li>)
        };

        return (
            <div>
                <a href = "#" onClick = {handleOpen}>{actionText}</a>
                <ul>{isOpen ? getCommentItems() : null}</ul>

                <AddCommentForm submit={props.addComment}/>
            </div>
        )

}

export default toggleOpen(CommentList)