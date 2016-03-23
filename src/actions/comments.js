import { ADD_COMMENT, LOAD_COMMENTS, LOAD_COMMENTS_PAGE } from './constants'
import AppDispatcher from '../dispatcher'
import { asyncAC } from './api/utils'
import { loadById, loadByPage } from './api/comments.js'

export function addComment(comment, articleId) {
    AppDispatcher.dispatch({
        type: ADD_COMMENT,
        data: {comment, articleId}
    })
}
export const loadComments = asyncAC(loadById, LOAD_COMMENTS)
export const loadCommentsPage = asyncAC(loadByPage, LOAD_COMMENTS_PAGE)