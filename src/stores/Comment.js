import AppDispatcher from '../dispatcher'
import { ADD_COMMENT,LOAD_COMMENTS,_START,_SUCCESS } from '../actions/constants'
import SimpleStore from './SimpleStore'

class Comment extends SimpleStore {
    constructor(stores, initialState) {
        super(stores, initialState)

        this.dispatchToken = AppDispatcher.register((action) => {
            const { type, data,response } = action

            switch (type) {
                case ADD_COMMENT:
                    this.__add({
                        text: data.comment,
                        id: this.generateId()
                    })
                    break;

                case LOAD_COMMENTS + _START:
                    this.loading = true
                    break;

                case LOAD_COMMENTS + _SUCCESS:
                    this.loading=false
                    response.forEach(this.__add)
                    break;

                default: return
            }
            this.emitChange()
        })
    }
}

export default Comment