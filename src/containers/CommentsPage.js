import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import {commentStore} from '../stores'
import Comment from '../components/Comment.js'

export default class extends Component  {
    constructor(props) {
        super(props)
        this.state = {
            comments: commentStore.getByPage(props.params.page)
        }
    }

    componentDidMount() {
        commentStore.addChangeListener(this.commentsChanged)
    }

    componentWillUnmount() {
        commentStore.removeChangeListener(this.commentsChanged)
    }

    componentWillReceiveProps(nextProps) {

        this.commentsChanged(nextProps)
    }


    commentsChanged =(props=this.props) => {
        const { page } = props.params
        this.setState({
            comments: commentStore.getByPage(page)
        })
    }
    render(){
    const {page}=this.props.params
    const comments = this.state.comments;

    if (commentStore.loading) return <div>Loading...</div>
    return (


            <div>
            Comments offset={page * 10}
            <Link to={`/comments/${+page+1}`}>Туда</Link>
            <Link to={`/comments/${+page-1}`}>Сюда</Link>
            <ul>
                {comments.map(comment=>
                    <li key={comment.id}>
                        <Comment comment={comment}/>
                    </li>
            )}
            </ul>
        </div>

    )}
}