import AppDispatcher from '../dispatcher'
import { ADD_COMMENT } from './constants'

export function addComment(data) {
    AppDispatcher.dispatch({
        type: ADD_COMMENT,
        data
    })
}