import AppDispatcher from '../../dispatcher'
import { _START, _SUCCESS, _FAIL} from '../constants'

export function asyncAC(callAPI, type) {
    return (data) => {
        AppDispatcher.dispatch({
            type: type + _START,
            data
        })

        setTimeout(() => {
            callAPI(data)
                .done((response) => AppDispatcher.dispatch({
                    type: type + _SUCCESS,
                    data,
                    response
                }))
                .fail((error) => AppDispatcher.dispatch({
                    type: type + _FAIL,
                    data,
                    error
                }))
        }, 1000)
    }
}