import React from 'react'
import CommentList from './CommentList'
import { addComment } from '../actions/comments'



export default (props) => {

    const { id, comments, loading, text} = props.article;

    if (loading) return <h3>Loading article</h3>

    return (
        <div>
            <p>{text}</p>

            <CommentList
                         article={props.article}
                         comments = {comments}
                         addComment = {(comment) => addComment(comment, id)}/>


        </div>
    )
}