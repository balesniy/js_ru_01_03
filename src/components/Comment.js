import React, { Component, PropTypes } from 'react'


export default (props)=> {

    const {comment:{name,text}}=props;
        return (
            <div className="content">
                <div className="post-meta">{name}</div>
                <div className="post post-description">{text}</div>
            </div>
        )
    }


