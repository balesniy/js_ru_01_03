import React from 'react'
import Comment from './Comment'
import AddCommentForm from './addCommentForm.js'
import toggleOpen from '../HOC/toggleOpen'


const CommentList = (props)=> {

    const { isOpen, toggleOpen, loadComments, article, article: {comments} } = props;
    const actionText = isOpen ? 'hide comments' : 'show comments';

        const handleOpen=()=>{
            if(!comments.loading && !comments.loaded) loadComments();
            toggleOpen()
        };

        const getCommentItems=()=>{

            if (comments.loading) {

                return <h3>Loading {comments.length} comments...</h3>
            }

            return (
                <div>
                    <ul>
                        {article.getRelation('comments').map((comment) =>
                        <li key={comment.id}>
                            <Comment comment = {comment}/>
                        </li>)}
                    </ul>
                    <AddCommentForm submit={props.addComment}/>
                </div>
            )
        };

        return (
            <div>
                <a href = "#" onClick = {handleOpen}>{actionText}</a>
                {isOpen ? getCommentItems() : null}

            </div>
        )

}

export default toggleOpen(CommentList)