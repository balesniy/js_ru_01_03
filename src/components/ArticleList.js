import React, { Component, PropTypes } from 'react'
import { deleteArticle, loadArticleById } from '../actions/articles'
import { Link } from 'react-router'


const ArticleList = (props) =>{

        const { articles} =props;
        const handleDelete = (id) =>(ev)=> {
            ev.preventDefault();
            deleteArticle(id)
        };

        const articleItems = articles.map((article) =>
            <li key={article.id}>

                <Link activeStyle={{ color: 'red' }} to={`/articles/${article.id}`}>{article.title}</Link>

                <a style={{marginLeft: 20, color: 'green'}} href = "#" onClick = {handleDelete(article.id)}>delete</a>
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

export default ArticleList