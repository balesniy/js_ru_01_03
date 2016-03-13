import React, { Component, PropTypes } from 'react'
import Article from './Article'
import openOnlyOne from '../mixins/openOnlyOne.js'

const ArticleList=React.createClass({
    mixins:[openOnlyOne],

    render(){

        const articles = this.props.articles.map((article) =>

                <div className='pure-u-1 pure-u-md-1-3' key={article.id}>
                    <Article article={article}
                             openArticle = {this.handleOpen(article.id)}
                             isOpen = {this.isOpen(article.id)}/>
                </div>
        );

        return (
            <div className='pure-g'>

                {articles}


            </div>
        )
    }


});




export default ArticleList