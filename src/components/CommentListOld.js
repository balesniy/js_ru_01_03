import React from 'react'
import Comment from './Comment'
import AddCommentForm from './addCommentForm'
import toggleOpen from '../mixins/toggleOpen'

export default React.createClass({
    mixins: [toggleOpen],

    getInitialState() {
        return {
            comments: this.props.comments
        }
    },

    render: function() {
        const isOpen  = this.isOpen();
        const actionText = isOpen ? 'hide comments' : 'show comments';

        const comments = this.state.comments.map((comment) =>
                <li key={comment.id}><Comment comment = {comment}/></li>
            );
        return (
            <div>
                <a href = "#" onClick = {this.toggleOpen}>{actionText}</a>
                <ul>{isOpen ? comments : null}</ul>
                <AddCommentForm submit={this.handleFormSubmit}/>
            </div>
        )
    },
    handleFormSubmit(comment){

        this.setState({
            comments:this.state.comments.concat(comment)
        })

    }
});