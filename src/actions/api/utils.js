import AppDispatcher from '../../dispatcher'
import { _START, _SUCCESS, _FAIL} from '../constants'

export function asyncAC(callAPI, type) {
    return () => {
        AppDispatcher.dispatch({
            type: type + _START
        })

        setTimeout(() => {
            callAPI()
                .done((response) => AppDispatcher.dispatch({
                    type: type + _SUCCESS,
                    response
                }))
                .fail((error) => AppDispatcher.dispatch({
                    type: type + _FAIL,
                    error
                }))
        }, 1000)
    }
}