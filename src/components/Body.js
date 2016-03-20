import React from 'react'
import CommentList from './CommentList'


export default (props) => {
    const { article, isOpen, article:{comments}, addComment } = props
    if (!isOpen) return <noscript />
    if (article.loading) return <h3>Loading article</h3>
    return (
        <div>
            <p>{article.text}</p>

            <CommentList
                         article={article}
                         comments = {comments}
                         addComment = {addComment}/>


        </div>
    )
}