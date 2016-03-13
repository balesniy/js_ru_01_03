import React, { Component, PropTypes } from 'react'
import Body from './Body'



export default (props)=> {

    const { article: { title }, openArticle, isOpen, article } = props;
        return (
            <div>
                <h3 onClick={openArticle} className="content-subhead">
                    {title}
                </h3>
                <Body article={article} isOpen={isOpen}/>
            </div>
        )
    }



