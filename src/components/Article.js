import React from 'react'
import Body from './Body.js'
import { deleteArticle, loadArticleById } from '../actions/articles'


export default (props)=> {

        const { article, isOpen, openArticle, article:{title} } = props;

        const handleDelete = (ev) => {
            ev.preventDefault();
            ev.stopPropagation();
            deleteArticle(article.id)
        };

        const handleOpen=()=>{
            if (!article.loaded && !article.loading) loadArticleById({id:article.id})
            openArticle()
        };

        return (
            <div>

                <h3 onClick={handleOpen}>{title} <a href = "#" onClick = {handleDelete}>delete</a> </h3>
                {!isOpen ? null :
                    <Body article={article}/>
                }
            </div>
        )

}