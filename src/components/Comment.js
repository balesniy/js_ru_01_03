import React from 'react'


export default (props)=> {

    const {comment:{user,text}}=props;
        return (
            <div className="content">
                <div className="post-meta">{user}</div>
                <div className="post post-description">{text}</div>
            </div>
        )
}


