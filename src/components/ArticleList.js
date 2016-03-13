import React, { Component, PropTypes } from 'react'
import Article from './Article'
import openOnlyOne from '../HOC/openOnlyOne'

const ArticleList=(props)=>{

        const {handleOpen, isOpen}=props;

        const articles = props.articles.map((article) =>

            <div className='pure-u-1 pure-u-md-1-3' key={article.id}>
                <Article article={article}
                         openArticle = {handleOpen(article.id)}
                         isOpen = {isOpen(article.id)}/>
            </div>
        );

        return (
            <div className='pure-g'>

                    {articles}


            </div>
        )
    }




export default openOnlyOne(ArticleList)