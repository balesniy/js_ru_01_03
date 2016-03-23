import React from 'react'
import { Link } from 'react-router'


export default (props)=> {

    const {comment:{user,text,article}}=props;
        return (
            <div className="content">
                <div className="post-meta">{user}</div>
                <div className="post post-description">{text}</div>
                <div className="post-meta"><Link to={`/articles/${article}`}>article</Link></div>
            </div>
        )
}


