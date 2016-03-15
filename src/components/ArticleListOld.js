import React, { Component, PropTypes } from 'react'
import Article from './Article'
import CommentList from './CommentList'
import oneOpen from '../mixins/oneOpen'

const ArticleList = React.createClass({
    mixins: [oneOpen],
    render() {
        const articles = this.props.articles.map((article) =>
            <li key={article.id}>
                <Article article={article}
                         openArticle = {this.openItem(article.id)}
                         isOpen = {this.isItemOpen(article.id)}/>
            </li>
        )
        return (
            <div>
                <ul>
                    {articles}
                </ul>
            </div>
        )
    },

})

export default ArticleList