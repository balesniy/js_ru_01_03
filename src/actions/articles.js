import AppDispatcher from '../dispatcher'
import { loadAll, loadById } from './api/articles'
import { asyncAC } from './api/utils'
import { DELETE_ARTICLE, LOAD_ALL_ARTICLES, LOAD_ARTICLE_BY_ID } from './constants'


export function deleteArticle(id) {
    AppDispatcher.dispatch({
        type: DELETE_ARTICLE,
        data: {
            id
        }
    })
}

export const loadAllArticles = asyncAC(loadAll, LOAD_ALL_ARTICLES)
export const loadArticleById = asyncAC(loadById, LOAD_ARTICLE_BY_ID)