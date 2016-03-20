import React, { Component, PropTypes } from 'react'
import Article from './Article'
import oneOpen from '../HOC/oneOpen'

const ArticleList = (props) =>{

        const { articles, isItemOpen, openItem } =props;

        const articleItems = articles.map((article) =>
            <li key={article.id}>
                <Article article={article}
                         openArticle = {openItem(article.id)}
                         isOpen = {isItemOpen(article.id)}/>
            </li>
        );
        return (
            <div>
                <ul>
                    {articleItems}
                </ul>
            </div>
        )
};

export default oneOpen(ArticleList)