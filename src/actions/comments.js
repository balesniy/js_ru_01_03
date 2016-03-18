import { ADD_COMMENT } from './constants'
import AppDispatcher from '../dispatcher'

export function addComment(comment, articleId) {
    AppDispatcher.dispatch({
        type: ADD_COMMENT,
        data: {comment, articleId}
    })
}