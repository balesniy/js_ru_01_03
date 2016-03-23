import React from 'react'
import CommentList from './CommentList'
import { addComment, loadComments } from '../actions/comments'



export default (props) => {

    const { id, loading, text} = props.article;

    if (loading) return <h3>Loading article</h3>

    return (
        <div>
            <p>{text || 'unloaded article body'}</p>

            <CommentList
                         article={props.article}
                         loadComments={()=>loadComments(id)}
                         addComment = {(comment) => addComment(comment, id)}/>


        </div>
    )
}