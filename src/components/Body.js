import React from 'react'
import CommentList from './CommentList'
import CommentListOld from './CommentListOld'

export default (props) => {
    const { isOpen, article:{text,comments} } = props;

    if (!isOpen) return <noscript />;

    return (

            <div className="content">

                {text}

                <CommentListOld comments = {comments || []} />

            </div>

    )
}